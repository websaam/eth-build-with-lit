const defaultColor = "#290000"

function SaveEncryptionKey()
{
    this.addInput("accessControlConditions", "array,object")
    this.addInput("symmetricKey", "array")
    this.addInput("authSig", "object")
    this.addInput("chain", "string")
    this.addInput("save to Lit Nodes", -1)
    this.addOutput("(Uint8Array) encryptedSymmetricKey","");

    this.properties = {
        color:defaultColor,
    }

    this.currentTitleColor = defaultColor

    
    this.size = [400, 120]
    
}

//name to show
SaveEncryptionKey.title = "Save Encryption Key";

//function to call when the node is executed
SaveEncryptionKey.prototype.onAction = async function(){

    // -- prepare
    const accessControlConditions = this.getInputData(0);
    const symmetricKey = this.getInputData(1);
    const authSig = this.getInputData(2);
    const chain = this.getInputData(3);

    if( accessControlConditions && symmetricKey && authSig && chain ){

        SaveEncryptionKey.title_color = '#F43A2C'

        const encryptedSymmetricKey = await global.litNodeClient.saveEncryptionKey({
            accessControlConditions,
            symmetricKey,
            authSig,
            chain,
        });
    
        console.log("encryptedSymmetricKey:", encryptedSymmetricKey);
    
    
        this.setOutputData(0, encryptedSymmetricKey);
    }else{
        SaveEncryptionKey.title_color = defaultColor
    }

}

export default SaveEncryptionKey