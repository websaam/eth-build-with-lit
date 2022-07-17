function Humanised()
{
    this.addInput("accessControlConditions", "array,object")
    // this.addInput("read", -1);
    this.addOutput("humanised","string");
    this.properties = {}
    this.size = [400, 70]
}

//name to show
Humanised.title = "Humanised";

//function to call when the node is executed
Humanised.prototype.onExecute = async function(){


    const accessControlConditions = this.getInputData(0);

    if( accessControlConditions ){
        
        let data;
        try{
            data = await global.LitJsSdk.humanizeAccessControlConditions({
                accessControlConditions
            })
            this.setOutputData(0, data);
        }catch(e){
            console.error(e);
        }
    }
}

export default Humanised