package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
	"github.com/hyperledger/fabric/common/flogging"
)

// SmartContract Define the Smart Contract structure
type SmartContract struct {
}

// Car :  Define the car structure.  Structure tags are used by encoding/json library
type Car struct {
	VIN	   string `json:"vin"`
	Year   string `json:"year"`	
	Make   string `json:"make"`
	Model  string `json:"model"`
	Colour string `json:"colour"`
	OwnerCnic string `json:"ownerCnic"`
	CarPic  string `json:"carPic"`
}

// Init ;  Method for initializing smart contract
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

var logger = flogging.MustGetLogger("fabcar_cc")

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	cars := []Car{
		Car{VIN: "4Y1SL65848Z411439", Year:"2018", Make: "Toyota", Model: "Corolla", Colour: "white",  OwnerCnic:"42101-2696589-3", CarPic: "https://carhistorypictures.s3-ap-southeast-1.amazonaws.com/2018_Toyota_Corolla.jpg"},
		Car{VIN: "9X1SL65848Z411439", Year:"2016", Make: "Audi", Model: "R8", Colour: "white", OwnerCnic:"42101-1196589-3", CarPic: "https://carhistorypictures.s3-ap-southeast-1.amazonaws.com/audi.jpg"},
	}

	i := 0
	for i < len(cars) {
		carAsBytes, _ := json.Marshal(cars[i])
		APIstub.PutState(cars[i].VIN, carAsBytes)
		i = i + 1
	}

	return shim.Success(nil)
}

func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	function, args := APIstub.GetFunctionAndParameters()
	logger.Infof("Function name is:  %d", function)
	logger.Infof("Args length is : %d", len(args))

	switch function {
	case "queryCar":
		return s.queryCar(APIstub, args)
	case "initLedger":
		return s.initLedger(APIstub)
	case "createCar":
		return s.createCar(APIstub, args)
	case "changeCarOwner":
		return s.changeCarOwner(APIstub, args)
	case "getHistoryForAsset":
		return s.getHistoryForAsset(APIstub, args)
	case "queryCarsByOwner":
		return s.queryCarsByOwner(APIstub, args)
	default:
		return shim.Error("Invalid Smart Contract function name.")
	}
}

func (s *SmartContract) queryCar(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}
	

	carAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to read from world state")
	}

	if carAsBytes == nil {
		return shim.Error("does not exist")
	}
	return shim.Success(carAsBytes)
}

func (s *SmartContract) createCar(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 7 {
		return shim.Error("Incorrect number of arguments. Expecting 8")
	}
	var car = Car{VIN: args[0], Year: args[1], Make: args[2], Model: args[3], Colour: args[4], OwnerCnic: args[5], CarPic:args[6]}

	carAsBytes, _ := json.Marshal(car)
	APIstub.PutState(args[0], carAsBytes)

	indexName := "ownerCnic~vin"
	colorNameIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{car.OwnerCnic, args[0]})
	if err != nil {
		return shim.Error(err.Error())
	}
	value := []byte{0x00}
	APIstub.PutState(colorNameIndexKey, value)

	return shim.Success(carAsBytes)
}

func (S *SmartContract) queryCarsByOwner(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments")
	}
	owner := args[0]

	ownerAndIdResultIterator, err := APIstub.GetStateByPartialCompositeKey("ownerCnic~vin", []string{owner})
	if err != nil {
		return shim.Error(err.Error())
	}

	defer ownerAndIdResultIterator.Close()

	var i int
	var id string

	var cars []byte
	bArrayMemberAlreadyWritten := false

	cars = append([]byte("["))

	for i = 0; ownerAndIdResultIterator.HasNext(); i++ {
		responseRange, err := ownerAndIdResultIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		objectType, compositeKeyParts, err := APIstub.SplitCompositeKey(responseRange.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		id = compositeKeyParts[1]
		assetAsBytes, err := APIstub.GetState(id)

		if bArrayMemberAlreadyWritten == true {
			newBytes := append([]byte(","), assetAsBytes...)
			cars = append(cars, newBytes...)

		} else {
			cars = append(cars, assetAsBytes...)
		}

		fmt.Printf("Found a asset for index : %s asset id : ", objectType, compositeKeyParts[0], compositeKeyParts[1])
		bArrayMemberAlreadyWritten = true

	}

	cars = append(cars, []byte("]")...)

	return shim.Success(cars)
}

func (t *SmartContract) getHistoryForAsset(stub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	carVIN := args[0]

	resultsIterator, err := stub.GetHistoryForKey(carVIN)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing historic values for the marble
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Value\":")
		// if it was a delete operation on given key, then we need to set the
		//corresponding value null. Else, we will write the response.Value
		//as-is (as the Value itself a JSON marble)
		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}

		buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		buffer.WriteString("\"")

		buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))
		buffer.WriteString("\"")

		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- getHistoryForAsset returning:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

func (s *SmartContract) changeCarOwner(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	indexName := "ownerCnic~vin"
	carAsBytes, _ := APIstub.GetState(args[0])
	car := Car{}

	json.Unmarshal(carAsBytes, &car)
	// delete old key
	ownerCaridIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{car.OwnerCnic, args[0]})
	if err != nil {
		return shim.Error(err.Error())
	}
	err = APIstub.DelState(ownerCaridIndexKey)
	if err != nil {
		return shim.Error("Failed to delete state:" + err.Error())
	}

	// add new record
	car.OwnerCnic = args[1]

	carAsBytes, _ = json.Marshal(car)
	APIstub.PutState(args[0], carAsBytes)

	// add new key
	newOwnerCaridIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{args[1], args[0]})
	if err != nil {
		return shim.Error(err.Error())
	}
	value := []byte{0x00}
	APIstub.PutState(newOwnerCaridIndexKey, value)

	return shim.Success(carAsBytes)
}


// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {
	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
 