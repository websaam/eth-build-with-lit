function IPFSFetch()
{
    this.addInput("path", "string")
    this.addInput("fetch", -1)
    this.addOutput("data","string");

    this.properties = {}
    
    this.size = [400, 120]
}

//name to show
IPFSFetch.title = "IPFS Fetch";

//function to call when the node is executed
IPFSFetch.prototype.onAction = async function(){

    // -- prepare
    const path = this.getInputData(0);

    console.log("Before:", path);
    
    if( path ){
        
        console.log("After:", path);

        const link = `https://ipfs.io/ipfs/${path}`;

        console.log("Fetch:",link);

        const res = await fetch(link);
        console.log("res:", res);

        const data = await res.text();

        console.log("data:", data);

        this.setOutputData(0, data);
    }

}

export default IPFSFetch