/** @param {NS} ns **/
export async function main(ns) {
/* Script to attack all servers, and apply on-hack using "SmolHack.js" to all Earnable servers. (Servers that are currently hackable).*/

	function serverCheck(target) {
		/* target */
		let maxRAM = ns.getServerMaxRam(target);
		let isRooted = ns.hasRootAccess(target);
		let reqHack = ns.getServerRequiredHackingLevel(target);
		let minSec = ns.getServerMinSecurityLevel(target);
		let maxMoney = ns.getServerMaxMoney(target);
		return [target, maxRAM, isRooted, reqHack, minSec, maxMoney]
	}
	function pwn(target) {
		if (ns.fileExists('BruteSSH.exe')) {
			ns.brutessh(target);
		}
		if (ns.fileExists('FTPCrack.exe')) {
			ns.ftpcrack(target);
		}
		if (ns.fileExists('relaySMTP.exe')) {
			ns.relaysmtp(target);
		}
		if (ns.fileExists('HTTPWorm.exe')) {
			ns.httpworm(target);
		}
		if (ns.fileExists('SQLInject.exe')) {
			ns.sqlinject(target);
		}
		ns.nuke(target);
		ns.tprint('Hahaha.  ' + target + ' pwned.');
	}
	var hostname = 'home';
	const script = 'SmolHack.js'; /* Script, hard coded. (Code forked from deploy.js) */
	var script_args = []
	
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
					if (!ns.hasRootAccess(scanner[i])) {
						rootable.push(scanner[i]);
					}
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


	for (let i = 0; i < rootable.length; i++) {
		pwn(rootable[i]);
		var maxThreads = Math.floor((ns.getServerMaxRam(rootable[i]) - ns.getServerUsedRam(rootable[i])) / ns.getScriptRam('SmolHack.js'));
		var generalThreads = Math.floor(maxThreads / earnable.length);
		var bonusServers = maxThreads % earnable.length;
		ns.tprint('Max Threads on server: ' + rootable[i] + ' - ' + maxThreads);
		ns.tprint('Earnable servers - ' + (earnable.length - bonusServers) + '@' + generalThreads + ' with ' + bonusServers + '@ ' + (generalThreads + 1));
		await ns.scp(script, ns.getHostname(), rootable[i]);
		for (let i2 = 0; i2 < earnable.length; i2++) {
			var targetMax = ns.getServerMaxMoney(earnable[i2]);
			var targetMin = ns.getServerMinSecurityLevel(earnable[i2]);
			script_args[0] = earnable[i2];
			script_args[1] = targetMax;
			script_args[2] = targetMin;
			if (i2 < bonusServers) {
				ns.tprint(`Launching script '${script}' on server '${rootable[i]}' with ${(generalThreads + 1)} threads and the following arguments: ${script_args}`);
				ns.exec(script, rootable[i], (generalThreads + 1), ...script_args);
				ns.tprint(earnable[i2] + ' @ ' + (generalThreads + 1) + ' threads');
			} else if (generalThreads > 0) {
				ns.tprint(`Launching script '${script}' on server '${rootable[i]}' with ${generalThreads} threads and the following arguments: ${script_args}`);
				ns.exec(script, rootable[i], (generalThreads), ...script_args);
				ns.tprint(earnable[i2] + ' @ ' + (generalThreads) + ' threads');
			}
		}

	}


	ns.tprint('Summary results:');
	ns.tprint('Unique hits to scan: ' + scanner3);
	ns.tprint('Last Scan results: ' + scanner2);
	ns.tprint('Servers Scanned (nameonly): ' + scanned);
	ns.tprint('Rootable Server names: ' + rootable)
	ns.tprint('Earnable Server names: ' + earnable)
	ns.tprint(rootable.length + ' Rootable servers identified.')
	ns.tprint(earnable.length + ' Earnable servers identified.')
	ns.tprint('Ended');

}
