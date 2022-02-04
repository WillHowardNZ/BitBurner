/** @param {NS} ns **/
/*import {serverCheck} from 'library.js';*/
export async function main(ns) {

	// Purchase server script.
  // Buys new servers if there are not yet 25. 
  // Replaces them with higher grade servers if there are at least 25.
  // Hat tip to RedditThread I borrowed the timer function from: https://www.reddit.com/r/Bitburner/comments/ribd84/purchase_server_autoscaling_script_107gb/
	// Turn off lowestRAM server if it's got lower RAM than highest RAM server.
  
  // NOTE: This script relies on:
  // 1. Also running NewHarvests.js on a timer. (This script is my lazy way of ensuring any new servers that I can root are rooted.
  // 1.1. NewHarvests.js relies on having SmolHack.js to deploy. (SmolHack is the smallest Hack/Grow/Weaken my noob self made.)
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
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(highestRAM * 8)) {
			if (servers.length == 25) {
				ns.killall(targetserver);
				ns.deleteServer(targetserver);
			}
			host = "RAM" + highestRAM * 8 + "-" + (highestserver + 1);
			ns.purchaseServer(host, highestRAM * 8);
		} else if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(highestRAM * 4)) {
			if (servers.length == 25) {
				ns.killall(targetserver);
				ns.deleteServer(targetserver);
			}
			host = "RAM" + highestRAM * 4 + "-" + (highestserver + 1);
			ns.purchaseServer(host, highestRAM * 4);
		} else if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(highestRAM * 2)) {
			if (servers.length == 25) {
				ns.killall(targetserver);
				ns.deleteServer(targetserver);
			}
			host = "RAM" + highestRAM * 2 + "-" + (highestserver + 1);
			ns.purchaseServer(host, highestRAM * 2);
		} else if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(highestRAM) && servers.length < 25) {
			host = "RAM" + highestRAM + "-" + (highestserver + 1);
			ns.purchaseServer(host, highestRAM);
		} else if (lowestRAM < highestRAM && servers.length == 25) {
			if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(highestRAM)) {
				// If we have enough money, then:
				//  1. Kill scripts on worst server.
				//  2. Scrap the worst server.
				//  3. Purchase the new server
				//  4. rerun pwnAll to make sure all servers are appropriately attacked.
				ns.killall(targetserver);
				ns.deleteServer(targetserver);
				host = "RAM" + highestRAM + "-" + (highestserver + 1);
				ns.purchaseServer(host, highestRAM);
			}
			else while (lowestRAM < (highestRAM / 2)) {
				if (lowestRAM < highestRAM / 2 && servers.length == 25) {
					if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(highestRAM / 2)) {
						// If we have enough money, then:
						//  1. Kill scripts on worst server.
						//  2. Scrap the worst server.
						//  3. Purchase the new server
						//  4. rerun pwnAll to make sure all servers are appropriately attacked.
						ns.killall(targetserver);
						ns.deleteServer(targetserver);
						host = "RAM" + highestRAM / 2 + "-" + (highestserver + 1);
						ns.purchaseServer(host, highestRAM / 2);
						highestRAM = lowestRAM;
					}
				} highestRAM = highestRAM / 2
			}
		}
		if (host != '') {
			ns.toast('Welcome new server: ' + host);
			host = '';
		}
		//ns.run('pwnAll.js', 1);
		lowestRAM = 99999999;
		await (ns.asleep(10000));
	}
}
