/** @param {NS} ns **/
/*import {serverCheck} from 'library.js';*/
export async function main(ns) {

	/*Replace Server script. 
	// Turn off lowestRAM server if it's got lower RAM than highest RAM server.
	*/

	//ns.tprint(servers);
	var lowestRAM = 99999999;
	var currentRAM = 99999999;
	var highestRAM = 8;
	var targetserver = 'home';
	var host = '';
	var keepGoing = 1;
	while (keepGoing == 1) {
		//		ns.tprint('This happened');
		let servers = (ns.getPurchasedServers());
		let servernumber = servers.length;
		let highestserver = servernumber;
		for (let i = 0; i < servers.length; i++) {
			//ns.tprint(servers[i]);
			currentRAM = (ns.getServerMaxRam(servers[i]));
			//ns.tprint(currentRAM);
			if (lowestRAM > currentRAM) {
				lowestRAM = currentRAM;
				targetserver = servers[i];
			}
			if (highestRAM < currentRAM) {
				highestRAM = currentRAM
			}

			servernumber = (servers[i].substr(servers[i].length - 2));
			let servernumber3digit = (servers[i].substr(servers[i].length - 3));
			if (parseInt(servernumber3digit) > parseInt(servernumber)) {
				servernumber = servernumber3digit;
			}
		}

		if (servers.length > 20) {
			if (parseInt(servernumber) > highestserver) {
				highestserver = parseInt(servernumber)
			}
		}
		if (lowestRAM == 1048576) {
			keepGoing = 0;
			ns.tprint('All upgraded! Goodbye!');
			ns.exit();
		}
		//		ns.tprint('Best Server = ' + highestRAM);
		//		ns.tprint('Worst Server = ' + targetserver);
		//		ns.tprint('Worst RAM = ' + lowestRAM);
		if (servers.length == 0) {
			highestRAM = 8;
			lowestRAM = 7;
		}
		highestRAM = highestRAM * 8
		while (lowestRAM < highestRAM && highestRAM > 4) {
			if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(highestRAM)) {
				highestserver = highestserver + 1
				if (servers.length == 25) {
					ns.killall(targetserver);
					ns.deleteServer(targetserver);
				}
				host = "RAM" + highestRAM + "^-^" + (highestserver);
				ns.purchaseServer(host, highestRAM);
				ns.toast('Welcome new server: ' + host);
				if (servers.length == 25) {
					highestRAM = lowestRAM;
				}
			} highestRAM = highestRAM / 2
		}
		//ns.run('pwnAll.js', 1);
		lowestRAM = 99999999;
		await (ns.asleep(10000));
	}
}
