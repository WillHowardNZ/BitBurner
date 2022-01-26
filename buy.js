/** @param {NS} ns **/
export async function main(ns) {
  /* Script to purchase most expensive server can currently afford (up to 8 TB memory).  
  Needs better programming, since uses a simple if*/
	var hostname = 'home';
	/*
	ns.tprint(ns.getServerMaxMoney(hostname) * 0.75);
    var moneyThresh = ns.getServerMaxMoney(hostname) * 0.75;
	ns.tprint(moneyThresh);
	if(moneyThresh == 0){
		ns.tprint('Abort');
		return;
	}*/
	const script = 'SmolHack.js'; /* Script, hard coded. (Code forked from deploy.js) */
	const script_args = ["joesguns", 62500000, 5]
	const price8192 = ns.getPurchasedServerCost(8192);
	const price4096 = ns.getPurchasedServerCost(4096);
	const price2048 = ns.getPurchasedServerCost(2048);
	const price1024 = ns.getPurchasedServerCost(1024);
	const price512 = ns.getPurchasedServerCost(512);
	const price256 = ns.getPurchasedServerCost(256);
	const price128 = ns.getPurchasedServerCost(128);
/*	const price064 = ns.getPurchasedServerCost(64);
	const price032 = ns.getPurchasedServerCost(32);*/
	ns.tprint(ns.getPurchasedServers());
	const servers = ns.getPurchasedServers();
	var serverCount = servers.length;
	const playerStats = ns.getPlayer();
	var money = playerStats.money;
	ns.tprint(money);
	if(money>price8192){
		ns.purchaseServer("RAM8192-" + (serverCount+1), 8192);
		const host = "RAM8192-"+(serverCount+1);
		const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
		ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
		await ns.scp(script, ns.getHostname(), host);
		ns.exec(script, host, threads, ...script_args);
	}else 	if(money>price4096){
		ns.purchaseServer("RAM4096-" + (serverCount+1), 4096);
		const host = "RAM4096-"+(serverCount+1);
		const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
		ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
		await ns.scp(script, ns.getHostname(), host);
		ns.exec(script, host, threads, ...script_args);
	}else if(money>price2048){
		ns.purchaseServer("RAM2048-" + (serverCount+1), 2048);
		const host = "RAM2048-"+(serverCount+1);
		const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
		ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
		await ns.scp(script, ns.getHostname(), host);
		ns.exec(script, host, threads, ...script_args);
	}else if(money>price1024){
		ns.purchaseServer("RAM1024-" + (serverCount+1), 1024);
		const host = "RAM1024-"+(serverCount+1);
		const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
		ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
		await ns.scp(script, ns.getHostname(), host);
		ns.exec(script, host, threads, ...script_args);
	}else if(money>price512){
		ns.purchaseServer("RAM0512-" + (serverCount+1), 512);
		const host = "RAM0512-"+(serverCount+1);
		const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
		ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
		await ns.scp(script, ns.getHostname(), host);
		ns.exec(script, host, threads, ...script_args);
	}/*else if(money>price256){
		ns.purchaseServer("RAM0256-" + (serverCount+1), 256);
		const host = "RAM0256-"+(serverCount+1);
		const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
		ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
		await ns.scp(script, ns.getHostname(), host);
		ns.exec(script, host, threads, ...script_args);
	}else if(money>price128){
		ns.purchaseServer("RAM0128-" + (serverCount+1), 128);
		const host = "RAM0128-"+(serverCount+1);
		ns.exec(deploySH.js,)
		const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
		ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
		await ns.scp(script, ns.getHostname(), host);
		ns.exec(script, host, threads, ...script_args);
	}else if (money>price064){
		ns.purchaseServer("RAM0064--" + (serverCount+1), 64);
	}else if (money>price032){
		ns.purchaseServer("RAM0032--" + (serverCount+1), 32);
	}*/
	/*for (let i = 0; i < servers.length; i++) {
    ns.tprint(servers[i]);
	}*/

	ns.tprint('Ended');

}
