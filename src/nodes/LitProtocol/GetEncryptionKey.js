const defaultColor = "#290000"

function GetEncryptionKey()
{
    this.addInput("accessControlConditions", "array")
    this.addInput("toDecrypt", "string")
    this.addInput("chain", "string")
    this.addInput("authSig", "object")
    this.addInput("get", -1);
    this.addOutput("(Uint8Array) symmetricKey", "array");

    this.properties = {
        color:defaultColor,
    }

    this.currentTitleColor = defaultColor

    this.size = [400, 70]
}

//name to show
GetEncryptionKey.title = "Get Encryption Key";

//function to call when the node is executed
GetEncryptionKey.prototype.onAction = async function(){


    const accessControlConditions = this.getInputData(0);
    const toDecrypt = this.getInputData(1);
    const chain = this.getInputData(2);
    const authSig = this.getInputData(3);

    if( accessControlConditions && chain && toDecrypt && authSig ){

        console.log("accessControlConditions:", accessControlConditions);
        console.log("toDecrypt:", toDecrypt);
        console.log("chain:", chain);
        console.log("authSig:", authSig);

        const symmetricKey = await global.litNodeClient.getEncryptionKey({
            accessControlConditions,
            toDecrypt,
            chain,
            authSig
        })

        console.log("symmetricKey:", symmetricKey);

        this.setOutputData(0, symmetricKey);

        GetEncryptionKey.title_color = '#F43A2C'

    }else{

        GetEncryptionKey.title_color = defaultColor;

    }
}

export default GetEncryptionKey