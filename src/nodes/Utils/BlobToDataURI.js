//node constructor class
function BlobToDataURI()
{
    this.addInput("input", "");
    this.addOutput("output","string");

    this.properties = {}

    // this.size = [256, 70]
}

//name to show
BlobToDataURI.title = "To DataURI";

//function to call when the node is executed
BlobToDataURI.prototype.onExecute = async function(){

    const message = this.getInputData(0);

    // console.log("message:", message)

    if( message ){
        const data = await new Promise(function (resolve, reject){
            var reader = new FileReader();
    
            reader.onload = function (e){
                var data = e.target.result;
                resolve(data);
            };
            reader.readAsDataURL(message);
        });
        
        this.setOutputData(0, data);
    }

}

export default BlobToDataURI