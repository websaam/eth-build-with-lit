//node constructor class
function ToBlob()
{
    this.addInput("input", "");
    this.addOutput("output","object");

    this.properties = {}

    // this.size = [256, 70]
}

//name to show
ToBlob.title = "To Blob";

//function to call when the node is executed
ToBlob.prototype.onExecute = async function(){

    const message = this.getInputData(0);

    // console.log("message:", message)

    // data:application/octet-stream;base64,AhQvo6PfSGH6Y/RomwnjBfSMYW/w2pGyl+HTX7eMRcEJkHEAv+f/KYJ6KPDttWns

    if( message && Object.keys(message).length > 0 ){

        function dataURLtoBlob( dataUrl, callback )
        {
            var req = new XMLHttpRequest;

            req.open( 'GET', dataUrl );
            req.responseType = 'arraybuffer'; // Can't use blob directly because of https://crbug.com/412752

            req.onload = function fileLoaded(e)
            {
                // If you require the blob to have correct mime type
                var mime = this.getResponseHeader('content-type');

                callback( new Blob([this.response], {type:mime}) );
            };

            req.send();
        }


        // console.log(Object.keys(message).length);
        dataURLtoBlob(message, (blob) => {
            this.setOutputData(0, blob);
        })

        // const test = await fetch(message).then((res) => {
        //     console.log(res);
        // });

        // console.log("Testing:", test);

        // try{
        //     const msg = toString(message);
        //     const part1 = toString(msg?.split(',')[1]);

        //     var byteString = Buffer.from(part1, 'utf8').toString('base64')
        //     var mimeString = toString(toString(msg?.split(',')[0]).split(':')[1]).split(';')[0]
        //     var ab = new ArrayBuffer(byteString.length);
        //     var ia = new Uint8Array(ab);
        //     for (var i = 0; i < byteString.length; i++) {
        //         ia[i] = byteString.charCodeAt(i);
        //     }
        //     var blob = new Blob([ab], {type: mimeString});
        //     console.log("blob?:", blob);
            
        // }catch(e){
            
        // }
        

        // const msg = await fetch(message);
        
        // console.log("msg:", msg);

        
    }

}

export default ToBlob