function DecryptString()
{
    this.addInput("encryptedData", "object")
    this.addInput("symmetricKey", "array")
    this.addInput("decrypt", -1);
    this.addOutput("decryptedString","object");
    this.properties = {}
    this.size = [400, 70]
}

//name to show
DecryptString.title = "Decrypt String";

//function to call when the node is executed
DecryptString.prototype.onAction = async function(){


    const encryptedData = this.getInputData(0);
    const symmetricKey = this.getInputData(1);

    if( encryptedData && symmetricKey ){

        console.log("encryptedData:", encryptedData);
        console.log("symmetricKey:", symmetricKey);

        const decryptedString = await global.LitJsSdk.decryptString(
            encryptedData,
            symmetricKey
        )

        console.log("decryptedString:", decryptedString);

        this.setOutputData(0, decryptedString);
    }
}

export default DecryptString