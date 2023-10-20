<?php
$videoId = $_GET['video_id']; // Assuming the video ID is passed as a query parameter

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
?>
