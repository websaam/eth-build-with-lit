function ParseAccs()
{
  this.addInput("input", "")
  this.addOutput("output", "array")

  this.properties = {}
  this.size = [250, 70]
}

//name to show
ParseAccs.title = "Parse ACCS";

//function to call when the node is executed
ParseAccs.prototype.onExecute = async function(){

  if( this.getInputData(0) ){
    // -- prepare
    const input = this.getInputData(0);
    var str = JSON.stringify(input?.replace(/(\r\n|\n|\r|\t)/g,"").replaceAll(' ', '').replace(/^\/|\/$/g, '').trim().replaceAll(/\\/g,'')).replaceAll("'", '"');

    // -- Sample
    // [
    //   {
    //     "contractAddress": "0x3110c39b428221012934A7F617913b095BC1078C",
    //     "standardContractType": "ERC1155",
    //     "chain": "ethereum",
    //     "method": "balanceOf",
    //     "parameters": [
    //       ":userAddress",
    //       "9541"
    //     ],
    //     "returnValueTest": {
    //       "comparator": ">",
    //       "value": "0"
    //     }
    //   }
    // ]

    console.log("str:", str);
    
    let parsed;

    try{
      // JSON.parse('{"contractAddress":"0x3110c39b428221012934A7F617913b095BC1078C"}');

      parsed = JSON.parse(JSON.parse('[' + str + ']')[0])
    }catch(e){
      parsed = null;
    }
    
    console.log(parsed);

    this.setOutputData(0, parsed);
  }
}

export default ParseAccs