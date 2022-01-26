/** @param {NS} ns **/
export async function main(ns) {
  /* Script for opening and taking control of servers.  
  Calls pwnSH.js to install SmolHack on the server just taken over.*/
    const args = ns.flags([['help', false]]);
    const hostname = args._[0];
    if (args.help || !hostname) {
        ns.tprint("This script will pwn target server.");
        ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`);
        return;
    }
    var portTakers = 0
    if (ns.fileExists('BruteSSH.exe')) {
        ns.brutessh(hostname);
        portTakers = portTakers + 1;
    }
    if (ns.fileExists('FTPCrack.exe')) {
        ns.ftpcrack(hostname);
        portTakers = portTakers + 1;
    }
    if (ns.fileExists('relaySMTP.exe')) {
        ns.relaysmtp(hostname);
        portTakers = portTakers + 1;
    }
    if (ns.fileExists('HTTPWorm.exe')) {
        ns.httpworm(hostname);
        portTakers = portTakers + 1;
    }
    if (ns.fileExists('SQLInject.exe')) {
        ns.sqlinject(hostname);
        portTakers = portTakers + 1;
    }

    if (portTakers >= ns.getServerNumPortsRequired(hostname)) {
        // Get root access to target server
        ns.nuke(hostname);
        ns.tprint('Hahaha.  ' + hostname + ' pwned.');
        ns.exec('pwnSH.js','home',1,hostname);

    } else ns.tprint('Did not pwn, get more Port Methods.');
    /*Backdoors via script not available yet.
    ns.installBackdoor(hostname);*/
}
