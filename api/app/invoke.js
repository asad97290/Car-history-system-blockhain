const { Gateway, Wallets, DefaultEventHandlerStrategies } = require('fabric-network');
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')


const helper = require('./helper')
const {contractListener,getCar } = require("./listeners");


const invokeTransaction = async (channelName, chaincodeName, fcn, args, userCnic, org_name,offDb) => {
    try {
        logger.debug(util.format('\n============ invoke transaction on channel %s ============\n', channelName));

        const ccp = await helper.getCCP(org_name) //JSON.parse(ccpJSON);

        // Create a new file system based wallet for managing identities.
        const walletPath = await helper.getWalletPath(org_name) //path.join(process.cwd(), 'wallet');
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

        

        const connectOptions = {
            wallet, identity: userCnic, discovery: { enabled: true, asLocalhost: true },
            eventHandlerOptions: {
                commitTimeout: 100,
                strategy: DefaultEventHandlerStrategies.NETWORK_SCOPE_ALLFORTX
            }
            // transaction: {
            //     strategy: createTransactionEventhandler()
            // }
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, connectOptions);

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        const contract = network.getContract(chaincodeName);
        await contract.addContractListener(contractListener)

        let result
        let message;
        if (fcn === "createCar" ) {
            
            result = await contract.submitTransaction(fcn, args[0], args[1], args[2], args[3], args[4],args[5], args[6]);
            
            // let output = JSON.parse(result.toString());
            let _result = await getCar() 
            let a= {
                result:[_result]
            }
            // console.log("+++++++++++++++++++++++",JSON.parse(result.toString()))
            await offDb.insert(a, args[0])
            message = `Successfully added the car asset with key ${args[0]}`
        
        } else if (fcn === "changeCarOwner") {
            result = await contract.submitTransaction(fcn, args[0], args[1]);
            let _result = await getCar()
            // let output = JSON.parse(result.toString());
            let a = await offDb.get(args[0])
            // console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK",a)
            a.result.push(_result)
           
            await offDb.insert({ _id: a._id, _rev: a._rev,result:a.result  })
            // await offDb.insert([...output.result], args[0])
            
            // let b = await offDb.get(args[0])
       
         
            message = `Successfully changed car owner with key ${args[0]}`
        } 
        else {
            
            return `Invocation require either createCar or changeCarOwner as function but got ${fcn}`
        }

        await gateway.disconnect();

        result = JSON.parse(result.toString());

        let response = {
            message: message,
            result
        }

        return response;


    } catch (error) {

        console.log(`Getting error: ${error}`)
        return error.message

    }
}

exports.invokeTransaction = invokeTransaction;