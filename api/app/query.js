const { Gateway, Wallets, } = require('fabric-network');



const helper = require('./helper')



const query = async (channelName, chaincodeName, args, fcn, userCnic, org_name) => {

    try {
        const ccp = await helper.getCCP(org_name)

        // Create a new file system based wallet for managing identities.
        const walletPath = await helper.getWalletPath(org_name) 
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        let identity = await wallet.get(userCnic);
        if (!identity) {
            console.log(`An identity for the user ${userCnic} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(userCnic, org_name, true)
            identity = await wallet.get(userCnic);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet, identity: userCnic, discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);
        let result;

        if (fcn == "queryCar" || fcn =="queryCarsByOwner" || fcn == 'getHistoryForAsset') {
            result = await contract.evaluateTransaction(fcn, args[0]);
        } 
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        result = JSON.parse(result.toString());
        const _result = {
            result,
            error: null,
            errorData:null
        }
        return _result
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        
        const result = {
            result: error.message,
            error: true,
            errorData: error
        }
        return result 

    }
}
   
exports.query = query