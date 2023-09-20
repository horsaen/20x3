var time = 60 * 20;
let enabledState = true;

browser.runtime.onMessage.addListener((message) => {
  if (message.fillColorChanged == 'red') {
    enabledState = false;
    stopLogging();
  } else if (message.fillColorChanged == 'green') {
    enabledState = true;
    startLogging(time);
  }
  if (message.reset) {
    enabledState = true;
    startLogging(time);
  }
  if (message.interog) {
    browser.runtime.sendMessage({ enabled: enabledState });
  }
});


let intervalId = null;

function clickme(){
  browser.tabs.create({ url: 'timer_done/timer_done.html'});
};

let interation = 0;
function startLogging(duration) {
  let textContent
  var timer = duration, minutes, seconds;
  intervalId = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      textContent = minutes + ":" + seconds;

      interation += 1
      if (interation == duration) {
        clickme();
        interation = 0;
        enabledState = false;
        stopLogging();
      };

      browser.runtime.sendMessage({ number: textContent });

      if (--timer < 0) {
          timer = duration;
      };
  }, 1000);
};

function stopLogging() {
  clearInterval(intervalId);
};


// Initialize the extension with logging disabled.
startLogging(time);