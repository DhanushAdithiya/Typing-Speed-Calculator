const { ipcRenderer } = require("electron");

const inputField = document.querySelector(".input-txt");
const typingText = document.querySelector(".text");
const clock = document.querySelector(".timer");
const WPM = document.querySelector(".WPM");
const resetBtn = document.querySelector(".btn-reset");
const themeSelector = document.querySelector(".theme-settings");
const themeTable = document.querySelector(".theme-picker");
const colorThemes = document.querySelectorAll('[name="theme"]');

const randomGenerator = function () {
  return Math.ceil(Math.random() * 100);
};

const randomQuoteGen = function () {
  fetch("dataset/quotes.json")
    .then((results) => results.json())
    .then(function (data) {
      typingWriteup = data[randomGenerator()].Quote;
      typingText.textContent = typingWriteup;

      document.getElementsByName("inputf")[0].placeholder = typingWriteup;
      // console.log(typingWriteup);
    });
};
randomQuoteGen();

let i = 0; // used to evaluate the typed text with the prompt text
let text = ""; // used for the input text
let time = 60;

function wordCount(str) {
  return str.split(" ").length;
}

// console.log(typingWriteup.length);

const calcWPM = function (str, timeTaken) {
  const words = wordCount(str);
  const speedCPS = words / timeTaken;
  const speedWPM = speedCPS * 60;
  console.log(words);
  console.log(speedCPS);
  console.log(speedWPM);
  WPM.innerHTML = `your typing speed is ${speedWPM.toFixed(
    2
  )} Words Per Minute`;
};

// const timeoutCalc = function (str, timeTaken) {};

inputField.addEventListener("keyup", function () {
  text = inputField.value;

  if (text === typingWriteup[0]) {
    console.log("started");

    const timer = setInterval(() => {
      time--;
      clock.innerHTML = time;
      if (time <= 0) {
        clearInterval(timer);
        WPM.innerHTML = `Your typing speed is ${
          text.split(" ").length - 0.5
        } Words Per Minute `;
      } else if (text == typingWriteup) {
        clearInterval(timer);
        timeTaken = 60 - time;
        calcWPM(typingWriteup, timeTaken);
      }
    }, 1000);
  }
});

inputField.addEventListener("keyup", function () {
  text = inputField.value;
  // console.log(text);

  // console.log(i);
  // console.log(text[i], typingWriteup[i]);
  if (text[i] === typingWriteup[i]) {
    i++;
    // console.log("coorect");
    typingText.classList.remove("mistake");
  } else if (text[i] !== typingWriteup[i]) {
    typingText.classList.add("mistake");
    // console.log("mistake");
  }
});

// inputField.addEventListener("click", function () {});
// while (time > 0) {
//   if (inputField.value != 0) {
//     console.log("ACTIVE");
//   }
// }

resetBtn.addEventListener("click", () => {
  location.reload();
});

themeSelector.addEventListener("click", () => {
  console.log("clicked");
  themeTable.classList.toggle("hidden");
});

// CODE TO SAVE YOUR THEME PREF
const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
  });
});

const retriveTheme = function () {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOptions) => {
    if (themeOptions.id === activeTheme) {
      themeOptions.checked = true;
    }
  });
};

document.onload = retriveTheme();
