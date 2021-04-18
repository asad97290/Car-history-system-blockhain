


// function showTransactionData(transactionData) {
//     console.log(JSON.stringify(transactionData))
// 	const creator = transactionData.actions[0].header.creator;
// 	console.log(`    - submitted by: ${creator.mspid}-${creator.id_bytes.toString('hex')}`);
// 	for (const endorsement of transactionData.actions[0].payload.action.endorsements) {
// 		console.log(`    - endorsed by: ${endorsement.endorser.mspid}-${endorsement.endorser.id_bytes.toString('hex')}`);
// 	}
// 	const chaincode = transactionData.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec;
// 	console.log(`    - chaincode:${chaincode.chaincode_id.name}`);
// 	console.log(`    - function:${chaincode.input.args[0].toString()}`);
// 	for (let x = 1; x < chaincode.input.args.length; x++) {
// 		console.log(`    - arg:${chaincode.input.args[x].toString()}`);
// 	}
// }

contractListener = async (event) => {
    console.log("==========================================")
    // The payload of the chaincode event is the value place there by the
    // chaincode. Notice it is a byte data and the application will have
    // to know how to deserialize.
    // In this case we know that the chaincode will always place the asset
    // being worked with as the payload for all events produced.
    const asset = JSON.parse(event.payload.toString());
    console.log(`<-- Contract Event Received: ${event.eventName} - ${JSON.stringify(asset)}`);
};



module.exports = {
    contractListener
}