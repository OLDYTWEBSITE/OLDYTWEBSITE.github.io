<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $targetDir = "uploads/";
  $targetFile = $targetDir . basename($_FILES["video"]["name"]);
  $uploadOk = 1;
  $videoFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

  // Check if file is a video
  $check = getimagesize($_FILES["video"]["tmp_name"]);
  if($check !== false) {
    echo "File is a video - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not a video.";
    $uploadOk = 0;
  }

  // Check if file already exists
  if (file_exists($targetFile)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
  }

  // Check file size
  if ($_FILES["video"]["size"] > 500000000) { // Adjust the maximum file size according to your needs
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
  }

  // Allow only specific video file formats
  $allowedFormats = array("mp4", "avi", "mov");
  if (!in_array($videoFileType, $allowedFormats)) {
    echo "Sorry, only MP4, AVI, and MOV files are allowed.";
    $uploadOk = 0;
  }

  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
  } else {
    if (move_uploaded_file($_FILES["video"]["tmp_name"], $targetFile)) {
      $videoId = pathinfo($targetFile, PATHINFO_FILENAME); // Extract the video ID from the uploaded file's name

      // Generate the HTML file name based on the video ID
      $htmlFileName = 'Video_Id=' . $videoId . '.html';

      // Generate the video URL based on the video ID
      $videoUrl = 'https://oldytwebsite.github.io/Video_Id=' . $videoId;

      // Generate the HTML content by replacing the VIDEO_URL placeholder with the actual video URL
      $htmlContent = str_replace('VIDEO_URL', $videoUrl, file_get_contents('video.html'));

      // Save the generated HTML content to a file
      file_put_contents($htmlFileName, $htmlContent);

      // Redirect to the generated HTML page
      header('Location: ' . $htmlFileName);
      exit;
    } else {
      echo "Sorry, there was an error uploading your file.";
    }
  }
}
?>
