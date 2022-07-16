import React from 'react';
import ReactDOM from 'react-dom'

//node constructor class
function EncryptSring()
{
    this.addInput("message", "string")
    this.addInput("encrypt", -1);
    
//   this.addInput("A","number");
//   this.addInput("B","number");
    this.addOutput("(Blob Object) encryptedData","object");
    this.addOutput("(Uint8Array(32)) symmetricKey","array");
    this.properties = {}
  this.size = [256, 70]
}

//name to show
EncryptSring.title = "Encrypt String";

//function to call when the node is executed
EncryptSring.prototype.onAction = async function(){

    const message = this.getInputData(0);

    const { encryptedData, symmetricKey } = await global.LitJsSdk.encryptString(message);

    // console.log("encryptedData:", encryptedData);
    console.log("symmetricKey:", symmetricKey);

    this.setOutputData(0, encryptedData);
    this.setOutputData(1, symmetricKey);
}

export default EncryptSring