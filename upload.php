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
      echo "The file " . basename($_FILES["video"]["name"]) . " has been uploaded.";
    } else {
      echo "Sorry, there was an error uploading your file.";
    }
  }
}
?>
