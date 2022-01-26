/** @param {NS} ns **/
export async function main(ns) {
  /*Very slightly improved version of Basic Hack script.  Checks if server can make money and aborts (throwing error) if it doesn't. */
    const args = ns.flags([['help', false]]);
    const hostname = args._[0];
    if(args.help || !hostname) {
        ns.tprint("This script will generate money by hacking a target server.");
        ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`);
        return;
    }
    // Defines how much money a server should have before we hack it
    // In this case, it is set to 75% of the server's max money
    var moneyThresh = ns.getServerMaxMoney(hostname) * 0.75;

    //Abort script if server has no money capacity.//
    if(moneyThresh == 0){
        ns.tprint("Aborting, server does not make money.");
        return;
    }


    // Defines the maximum security level the target server can
    // have. If the target's security level is higher than this,
    // we'll weaken it before doing anything else
    var securityThresh = ns.getServerMinSecurityLevel(hostname) + 1;
    while (true) {
        if (ns.getServerSecurityLevel(hostname) > securityThresh) {
            await ns.weaken(hostname);
        } else if (ns.getServerMoneyAvailable(hostname) < moneyThresh) {
            await ns.grow(hostname);
        } else {
            await ns.hack(hostname);
        }
    }
}
