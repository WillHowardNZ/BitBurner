/** @param {NS} ns **/
export async function main(ns) {
  /* Deploys SmolHack to designated server, targeting designated server.  Note, invalid targeting uses Backup to JoesGuns. 
  Forked from deploy.js in the tutorial scripts.*/
	const args = ns.flags([["help", false]]);
	if (args.help || args._.length < 2) {
		ns.tprint("This script deploys another script on a server with maximum threads possible.");
		ns.tprint(`Usage: run ${ns.getScriptName()} HOST TARGETHOST`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles foodnstuff`);
		return;
	}
	/* Deploys SmolHack.js, a simplified version of Basic_Hack.js that receives input parameters. */
	const host = args._[0]; /* HOST to Deploy SmolHack.js to, and run from. */
	const script = 'SmolHack.js'; /* Script, hard coded. (Code forked from deploy.js) */

	var targetHost = args._[1]; /* Server it will run against. */
	const backupHost = 'joesguns'; /* Backup server, if target server doesn't have possibility fo making money, it will retarget here. */
	var script_args = []

	/* Check can deploy, error if not */
	if (!ns.serverExists(host)) {
		ns.tprint(`Host Server '${host}' does not exist. Aborting.`);
		return;
	}
	/* Check target exists, if not retarget.*/
	if (!ns.serverExists(targetHost)) {
		ns.tprint(`Target Server '${targetHost}' does not exist. Using Backup.`);
		targetHost == backupHost;
	}
	/* Check Script file exists, if not throw error.*/
	if (!ns.ls(ns.getHostname()).find(f => f === script)) {
		ns.tprint(`Script '${script}' does not exist. Aborting.`);
		return;
	}
	/* Determine if Target server can make money, if not switch to Backup.*/
	if (ns.getServerMaxMoney(targetHost) == 0) {
		ns.tprint(`Target Server '${targetHost}' does not exist. Using Backup.`);
		script_args[0] = backupHost;
	} else if (ns.getServerRequiredHackingLevel(host) > ns.getHackingLevel()) {
		script_args[0] = backupHost;
		ns.tprint("Target too hard, going to Joe's.");
	} else script_args[0] = targetHost;
	/* Retrieve server hardcoded values, and pass through to make SmolHack as small as possible. */
	const targetMax = ns.getServerMaxMoney(script_args);
	const targetMin = ns.getServerMinSecurityLevel(script_args);
	script_args[1] = targetMax;
	script_args[2] = targetMin;



	ns.killall(host);
	const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
	ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
	await ns.scp(script, ns.getHostname(), host);
	ns.exec(script, host, threads, ...script_args);
}
