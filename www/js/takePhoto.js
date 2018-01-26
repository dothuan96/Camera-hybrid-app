/**
 * Warning: Using DATA_URL is not recommended! The DATA_URL destination
 * type is very memory intensive, even with a low quality setting. Using it
 * can result in out of memory errors and application crashes. Use FILE_URI
 * or NATIVE_URI instead.
 */
document.addEventListener("deviceready", onDevice, false);

function onDevice() {
  document.getElementById('cam-btn').addEventListener('click', accessCamera);
  document.getElementById('brows-btn').addEventListener('click', openFilePicker);

  //take a picture by srcType = Camera.PictureSourceType.CAMERA
  function accessCamera(selection) {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);

    navigator.camera.getPicture(onSuccess, onFail, options);
  }

  /*pick a photo from library by srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;*/
  function openFilePicker(selection) {
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;   //change source to library
    var options = setOptions(srcType);

    navigator.camera.getPicture(onSuccess, onFail, options);
  }

  /*photo options*/
  function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

  function onSuccess(imageURI) {
      var image = document.getElementById('myImage');
      image.src = imageURI;
      createNewFileEntry(imageURI);
  }

  function onFail(message) {
      alert('Failed because: ' + message);
  }
}
