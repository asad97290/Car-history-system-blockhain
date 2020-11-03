import {useEffect} from "react"
import axios from 'axios'

const app = ()=>{

const url = "http://localhost:4000/channels/mychannel/chaincodes/fabcar?fcn=queryAllCars";
let pk = null;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDQyNTE5MTAsInVzZXJuYW1lIjoic2hhIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE2MDQyMTU5MTB9.M7mM-L1f_1aHtm2AUxCOE22MYcVlr1tR0sRSXI7ISn0"
let conf = {
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
};


// const createPostData = async (pk, data) => {
	
// 	return {
// 		fcn: "CreateSampleData",
// 		peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
// 		chaincodeName: "test_cc",
// 		channelName: "mychannel",
// 		args: [JSON.stringify(data), pk]
// 	}
// }
// const postFarmerData = async (pk) => {
// 	console.log(pk)
// 	let data = {
// 		created_at: (new Date).getTime(),
// 		name: 'Ramlal Oberoi',
// 		weight: 1000
// 	}
// 	let postData = await createPostData(pk.toString(), data)
// 	// console.log("before AXIOS call", postData)

// 	return axios.post(url, postData, conf
// 	).then(function (response) { console.log(`${pk.toString()} => `, response.data); }
// 	).catch(function (error) { console.log(error); });

// };

const fetch = async () =>{
    try{
    const output = await axios.get(url,conf)
    console.log(output.data.result[4].Record.owner)
    }catch(err){
        throw err;
    }
}
useEffect(() => {
    fetch()
  }, []);
return <div></div>
}

export default app
