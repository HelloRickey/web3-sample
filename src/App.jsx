import React, { useState } from "react";
import "./App.css";
import Web3 from "web3";
import abi from "./abi.json";
function App() {
  const [account, setAccount] = useState();
  const [username, setUsername] = useState();
  const [displayName, setDisplayName] = useState();
  const [contractAddress, setContractAddress] = useState(
    "0xB8D0d2f2c70F69620698D937F671a2093b15c3a4"
  );

  const handleSaveName = async () => {
      if (window.ethereum) {
        var web3 = new Web3(window.ethereum);
      } else {
        window.alert(
          "Non-Ethereum browser detected. Please install MetaMask plugin"
        );
      }
    var contract = new web3.eth.Contract(abi, contractAddress);

    contract.methods
      .saveName(username)
      .send({ from: account }, function (error) {
        console.log(error);
      })
      .on("transactionHash", function (hash) {})
      .on("receipt", function (receipt) {
        return receipt;
      });
  };
  const querName = async () => {
      if (window.ethereum) {
        var web3 = new Web3(window.ethereum);
      } else {
        window.alert(
          "Non-Ethereum browser detected. Please install MetaMask plugin"
        );
      }
    var contract = new web3.eth.Contract(abi, contractAddress);
    var result = await contract.methods.getName().call();

    setDisplayName(result);
  };
  const connectWallet = async () => {
    var that = this;
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0] != null) {
        setAccount(accounts[0]);
      }
    } else {
      alert("Please install metamask");
    }
  };
  const handleChange = async (e) => {
    setUsername(e.target.value);
  };
  return (
    <div className="App">
      <br />
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
      <div>Wallet Account:{account}</div>
      <br />
      <div>
        Name:
        <input type="text" onChange={handleChange} />
        <button onClick={handleSaveName}>Save</button>
      </div>
      <br />
      <div>
        <button onClick={querName}>Query Name</button>
        <div>{displayName}</div>
      </div>
    </div>
  );
}

export default App;
