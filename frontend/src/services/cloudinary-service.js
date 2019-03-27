export default{
    doUploadImg
}
const CLOUD_NAME = "dmr7h2h2h"
var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

function onSuccess(res) {
    console.log('uploadedImg', res);
    console.log('uploadedImg', res.url);
}


// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
   
    // A function to be called if request succeeds
    function onSuccess(res) {
        console.log('uploadedImg', res);
        console.log('uploadedImg', res.url);
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(img, onSuccess) {
    var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    var formData = new FormData();
    formData.append('file', img)
    formData.append('upload_preset', 'p4ktl68w');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.json()
    })
    // .then(onSuccess)
    .then(onSuccess=>{
        console.log(onSuccess);
       return  onSuccess
    })
    .catch(function (error) {
        console.error(error)
    })
}

