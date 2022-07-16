function CheckAndSignAuthMessage()
{
    this.addInput("chain", "string")
    this.addInput("sign", -1);
    this.addOutput("authSign","object");
    this.properties = {}
    this.size = [400, 70]
}

//name to show
CheckAndSignAuthMessage.title = "Check & Sign Auth Msg";

//function to call when the node is executed
CheckAndSignAuthMessage.prototype.onAction = async function(){


    const chain = this.getInputData(0);

    if( chain ){
        const authSig = await global.LitJsSdk.checkAndSignAuthMessage({chain})
        this.setOutputData(0, authSig);
    }
}

export default CheckAndSignAuthMessage