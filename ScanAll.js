/** @param {NS} ns **/
export async function main(ns) {
/* Scan all servers, establish information about them.  
	pwnAll developed from this code. */
	function serverCheck(target) {
		/* target */
		let maxRAM = ns.getServerMaxRam(target);
		let isRooted = ns.hasRootAccess(target);
		let reqHack = ns.getServerRequiredHackingLevel(target);
		let minSec = ns.getServerMinSecurityLevel(target);
		let maxMoney = ns.getServerMaxMoney(target);
		return [target, maxRAM, isRooted, reqHack, minSec, maxMoney]
	}
	var hostname = 'home';

	let servers = serverCheck(hostname);
	let scanned = [hostname];
	let scanner2 = [];
	let scanner3 = [];
	let scanner = ns.scan(hostname);
	let checkme = 1;
	let rootable = [];
	let earnable = [];

	ns.tprint(servers);

	var portTakers = 0
    if (ns.fileExists('BruteSSH.exe')) {
        portTakers = portTakers + 1;
    }
    if (ns.fileExists('FTPCrack.exe')) {
        portTakers = portTakers + 1;
    }
    if (ns.fileExists('relaySMTP.exe')) {
        portTakers = portTakers + 1;
    }
    if (ns.fileExists('HTTPWorm.exe')) {
        portTakers = portTakers + 1;
    }
    if (ns.fileExists('SQLInject.exe')) {
        portTakers = portTakers + 1;
    }

	/* As long as there's something to scan, scan*/
	while (checkme > 0) {
		/* Loop through the SCANNER object, scanning identified servers..*/
		for (let i = 0; i < scanner.length; i++) {
			/* If the server isn't in the SERVERS list, scan it, add it to the scanned list. */
			if (servers.indexOf(scanner[i]) == -1) {
				servers.push(serverCheck(scanner[i]));

				if (ns.getServerMaxMoney(scanner[i]) > 0) {
					if (ns.getServerRequiredHackingLevel(scanner[i]) <= ns.getHackingLevel()) {
						earnable.push(scanner[i]);
					}
				}

				if (ns.getServerNumPortsRequired(scanner[i]) <= portTakers) {
					rootable.push(scanner[i]);
				}
				/*
				if (ns.hasRootAccess(scanner[i]) = 0) {
					if (ns.getServerRequiredHackingLevel(scanner[i]) <= ns.getHackingLevel) {
						rootable.push(scanner[i]);
					}
				}*/
				let scanner2 = (ns.scan(scanner[i]));
				/* Check the scan results just retrieved to see if they are unique, and if they've already been scanned.  */
				for (let i2 = 0; i2 < scanner2.length; i2++) {
					if (scanned.indexOf(scanner2[i2]) == -1) {
						scanner3.push(scanner2[i2]);
					}
				}
				scanned.push(scanner[i]);
			}
		}
		scanner = scanner3;
		scanner3 = [];
		checkme = scanner.length;

	}

	ns.tprint('Summary results:');
	ns.tprint('Unique hits to scan: ' + scanner3);
	ns.tprint('Last Scan results: ' + scanner2);
	ns.tprint('Servers Scanned (nameonly): ' + scanned);
	ns.tprint('Server stats: ' + servers);
	ns.tprint('Rootable Server names: ' + rootable)
	ns.tprint('Earnable Server names: ' + earnable)
	ns.tprint(rootable.length + ' Rootable servers identified.')
	ns.tprint(earnable.length + ' Earnable servers identified.')
	ns.tprint('Ended');

}
