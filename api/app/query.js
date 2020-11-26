const { Gateway, Wallets, } = require('fabric-network');
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')

const helper = require('./helper')
const query = async (channelName, chaincodeName, args, fcn, userEmail, org_name) => {

    try {
        const ccp = await helper.getCCP(org_name)

        // Create a new file system based wallet for managing identities.
        const walletPath = await helper.getWalletPath(org_name) 
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        let identity = await wallet.get(userEmail);
        if (!identity) {
            console.log(`An identity for the user ${userEmail} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(userEmail, org_name, true)
            identity = await wallet.get(userEmail);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet, identity: userEmail, discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);
        let result;

        if (fcn == "queryCar" || fcn =="queryCarsByOwner" || fcn == 'getHistoryForAsset') {
            result = await contract.evaluateTransaction(fcn, args[0]);
        } 
        
        console.log(result)
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        result = JSON.parse(result.toString());
        return result
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error.message

    }
}
   
exports.query = query