if(localStorage.getItem('fileRaw')){
    let fileRaw = localStorage.getItem('fileRaw');
    GetTableFromExcel(fileRaw);
}

else{
document.querySelector('#upload').addEventListener('click',UploadProcess)

// GetTableFromExcel(data, objTest)
    function UploadProcess() {
        //Reference the FileUpload element.
        var fileUpload = document.getElementById("file");
        
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        console.log(e.target.result);
                        
                        localStorage.setItem('fileRaw', e.target.result);

                        GetTableFromExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        GetTableFromExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    };

}

function GetTableFromExcel(data){
    console.log(data);
}

// Clear all items
localStorage.clear();
