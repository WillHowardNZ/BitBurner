/** @param {NS} ns **/
export async function main(ns) {
	/** Purpose: list prices for a number of server pricepoints, to help decision making early game. */
	const price8192 = ns.getPurchasedServerCost(8192);
	const price4096 = ns.getPurchasedServerCost(4096);
	const price2048 = ns.getPurchasedServerCost(2048);
	const price1024 = ns.getPurchasedServerCost(1024);
	const price512 = ns.getPurchasedServerCost(512);
	const price256 = ns.getPurchasedServerCost(256);
	const price128 = ns.getPurchasedServerCost(128);

	var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});
	ns.tprint('Price128: '  +formatter.format(price128)) ;
	ns.tprint('Price256: '  +formatter.format(price256)) ;
	ns.tprint('Price512: '  +formatter.format(price512)) ;
	ns.tprint('Price1024: ' +formatter.format(price1024));
	ns.tprint('Price2048: ' +formatter.format(price2048));
	ns.tprint('Price4096: ' +formatter.format(price4096));
	ns.tprint('Price8192: ' +formatter.format(price8192));
}
