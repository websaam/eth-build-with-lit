var Web3 = require('web3');

function ToBase16() {
  this.addInput("input", "");
  this.addOutput("output", "string")
  this.properties = {}
  this.size[0] = 160
}

ToBase16.title = "To Base 16";

ToBase16.prototype.onStart = function() {
  this.web3 = new Web3()
}


ToBase16.prototype.onExecute = function() {
  if (this.inputs[0] && this.getInputData(0)) {
    if(!this.web3){
      this.web3 = new Web3()
    }
    let strVal = ""+this.getInputData(0)
    //console.log("to hex of ",strVal)
    // let output = ""+this.web3.utils.ToBase16(strVal)
    let output = global.LitJsSdk.uint8arrayToString(this.getInputData(0), 'base16');
    //console.log(output)
    this.setOutputData(0,output)
  }else{
    this.setOutputData(0,null)
  }
};

export default ToBase16
