let car;
contractListener = async (event) => {

    const asset = JSON.parse(event.payload.toString());
    console.log(`<-- Contract Event Received: ${JSON.stringify(asset)}`);

    const eventTransaction = event.getTransactionEvent();
    console.log(` -------transaction id---------: ${eventTransaction.transactionId} `);

    car = {
        asset,
        txId:eventTransaction.transactionId,
        date:new Date().toLocaleString()
    }
  
};

getCar = async()=>{
    return car;
}

module.exports = {
    contractListener,
    getCar
}