#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP_1=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    local PP_2=$(one_line_pem $7)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEER0PEM}#$PP_1#" \
        -e "s#\${CAPEM}#$CP#" \
        -e "s#\${PEER1PEM}#$PP_2#" \
        $HOME/BasicNetwork-2.0/api/config/ccp-template.json
}


ORG=1
P0PORT=7051
P1PORT=8051
CAPORT=7054
PEER0PEM=$HOME/BasicNetwork-2.0/artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
CAPEM=$HOME/BasicNetwork-2.0/artifacts/channel/crypto-config/peerOrganizations/org1.example.com/ca/ca.org1.example.com-cert.pem
PEER1PEM=$HOME/BasicNetwork-2.0/artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt
echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEER0PEM $PEER1PEM $CAPEM)" > $HOME/BasicNetwork-2.0/api/config/connection-org1.json

ORG=2
P0PORT=9051
P1PORT=10051
CAPORT=8054
PEER0PEM=$HOME/BasicNetwork-2.0/artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
CAPEM=$HOME/BasicNetwork-2.0/artifacts/channel/crypto-config/peerOrganizations/org2.example.com/ca/ca.org2.example.com-cert.pem
PEER1PEM=$HOME/BasicNetwork-2.0/artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt
echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEER0PEM $PEER1PEM $CAPEM)" > $HOME/BasicNetwork-2.0/api/config/connection-org2.json
