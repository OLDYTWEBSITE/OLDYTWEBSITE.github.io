document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var targetDir = "uploads/";
  var fileInput = document.querySelector('input[type="file"]');
  var targetFile = targetDir + fileInput.files[0].name;
  var uploadOk = 1;
  var videoFileType = targetFile.split('.').pop().toLowerCase();

  // Check if file is a video
  var file = fileInput.files[0];
  var check = new FileReader();
  check.onloadend = function() {
    var video = document.createElement('video');
    video.src = check.result;
    video.onloadedmetadata = function() {
      if (video.duration > 0) {
        console.log("File is a video.");
        uploadOk = 1;
      } else {
        console.log("File is not a video.");
        uploadOk = 0;
      }
      uploadFile();
    };
  };
  check.readAsDataURL(file);

  function uploadFile() {
    // Check if file already exists
    if (uploadOk === 1) {
      fetch(targetFile, { method: 'HEAD' })
        .then(function(response) {
          if (response.ok) {
            console.log("Sorry, file already exists.");
            uploadOk = 0;
          }
          checkFileSize();
        });
    } else {
      checkFileSize();
    }
  }

  function checkFileSize() {
    // Check file size
    if (file.size > 500000000) { // Adjust the maximum file size according to your needs
      console.log("Sorry, your file is too large.");
      uploadOk = 0;
    }
    checkFileFormat();
  }

  function checkFileFormat() {
    // Allow only specific video file formats
    var allowedFormats = ["mp4", "avi", "mov"];
    if (!allowedFormats.includes(videoFileType)) {
      console.log("Sorry, only MP4, AVI, and MOV files are allowed.");
      uploadOk = 0;
    }
    upload();
  }

  function upload() {
    // Check if uploadOk is set to 0 by an error
    if (uploadOk === 0) {
      console.log("Sorry, your file was not uploaded.");
    } else {
      var formData = new FormData();
      formData.append('video', file);

      fetch('upload.php', { method: 'POST', body: formData })
        .then(function(response) {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error("Error uploading file.");
          }
        })
        .then(function(responseText) {
          var videoId = responseText; // Assuming the PHP script returns the video ID

          // Generate the HTML file name based on the video ID
          var htmlFileName = 'Video_Id=' + videoId + '.html';

          // Generate the video URL based on the video ID
          var videoUrl = 'https://oldytwebsite.github.io/Video_Id=' + videoId;

          // Generate the HTML content by replacing the VIDEO_URL placeholder with the actual video URL
          var htmlContent = getHtmlContent().replace('VIDEO_URL', videoUrl);

          // Save the generated HTML content to a file
          var blob = new Blob([htmlContent], { type: 'text/html' });
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = htmlFileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

        })
        .catch(function(error) {
          console.log(error.message);
        });
    }
  }

  function getHtmlContent() {
    // Replace with your own logic to retrieve the HTML content
    // For example, you can make an AJAX request to get the content
    return '<html>\n' +
           '  <body>\n' +
           '    <video src="VIDEO_URL" controls></video>\n' +
           '  </body>\n' +
           '</html>';
  }
});
