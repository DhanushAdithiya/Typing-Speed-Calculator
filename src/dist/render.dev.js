"use strict";

var _require = require("electron"),
    ipcRenderer = _require.ipcRenderer;

var inputField = document.querySelector(".input-txt");
var typingText = document.querySelector(".text");
var clock = document.querySelector(".timer");
var WPM = document.querySelector(".WPM");
var resetBtn = document.querySelector(".btn-reset");
var themeSelector = document.querySelector(".theme-settings");
var themeTable = document.querySelector(".theme-picker");
var colorThemes = document.querySelectorAll('[name="theme"]');

var randomGenerator = function randomGenerator() {
  return Math.ceil(Math.random() * 100);
};

var randomQuoteGen = function randomQuoteGen() {
  fetch("dataset/quotes.json").then(function (results) {
    return results.json();
  }).then(function (data) {
    typingWriteup = data[randomGenerator()].Quote;
    typingText.textContent = typingWriteup;
    document.getElementsByName("inputf")[0].placeholder = typingWriteup; // console.log(typingWriteup);
  });
};

randomQuoteGen();
var i = 0; // used to evaluate the typed text with the prompt text

var text = ""; // used for the input text

var time = 60;

function wordCount(str) {
  return str.split(" ").length;
} // console.log(typingWriteup.length);


var calcWPM = function calcWPM(str, timeTaken) {
  var words = wordCount(str);
  var speedCPS = words / timeTaken;
  var speedWPM = speedCPS * 60;
  console.log(words);
  console.log(speedCPS);
  console.log(speedWPM);
  WPM.innerHTML = "your typing speed is ".concat(speedWPM.toFixed(2), " Words Per Minute");
}; // const timeoutCalc = function (str, timeTaken) {};


inputField.addEventListener("keyup", function () {
  text = inputField.value;

  if (text === typingWriteup[0]) {
    console.log("started");
    var timer = setInterval(function () {
      time--;
      clock.innerHTML = time;

      if (time <= 0) {
        clearInterval(timer);
        WPM.innerHTML = "Your typing speed is ".concat(text.split(" ").length - 0.5, " Words Per Minute ");
      } else if (text == typingWriteup) {
        clearInterval(timer);
        timeTaken = 60 - time;
        calcWPM(typingWriteup, timeTaken);
      }
    }, 1000);
  }
});
inputField.addEventListener("keyup", function () {
  text = inputField.value; // console.log(text);
  // console.log(i);
  // console.log(text[i], typingWriteup[i]);

  if (text[i] === typingWriteup[i]) {
    i++; // console.log("coorect");

    typingText.classList.remove("mistake");
  } else if (text[i] !== typingWriteup[i]) {
    typingText.classList.add("mistake"); // console.log("mistake");
  }
}); // inputField.addEventListener("click", function () {});
// while (time > 0) {
//   if (inputField.value != 0) {
//     console.log("ACTIVE");
//   }
// }

resetBtn.addEventListener("click", function () {
  location.reload();
});
themeSelector.addEventListener("click", function () {
  console.log("clicked");
  themeTable.classList.toggle("hidden");
}); // CODE TO SAVE YOUR THEME PREF

var storeTheme = function storeTheme(theme) {
  localStorage.setItem("theme", theme);
};

colorThemes.forEach(function (themeOption) {
  themeOption.addEventListener("click", function () {
    storeTheme(themeOption.id);
  });
});

var retriveTheme = function retriveTheme() {
  var activeTheme = localStorage.getItem("theme");
  colorThemes.forEach(function (themeOptions) {
    if (themeOptions.id === activeTheme) {
      themeOptions.checked = true;
    }
  });
};

document.onload = retriveTheme();