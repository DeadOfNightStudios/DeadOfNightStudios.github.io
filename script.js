/* All Header and Footer Logic goes here */

window.onload = function() {
  loadHomePage(this);
  
  document.getElementById('load-character')
    .addEventListener('change', loadCharacterSheet, false);
};

/* Page Loading Functions */
  
function loadMyrpgPage() {
  
  // Show Save & Load of Character Sheet
  document.getElementById("character-functions").classList.remove('character-functions-hidden');
  document.getElementById("character-functions").classList.add('character-functions');
  
  loadFile("myrpg.html");
}

function loadHomePage() {
  loadFile("home.html");
}

/* Utilitiy Functions */

function loadFile(fileName) {
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.open('get', fileName, true);
  xmlHttpRequest.onreadystatechange = function() {
    if (xmlHttpRequest.status == 200) { 
      document.getElementById("content").innerHTML = xmlHttpRequest.responseText;
    } 
  }
  xmlHttpRequest.send();
}