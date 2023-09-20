const svg = document.getElementById("svg");
const divider = document.getElementById("divider");
let timeDuration;
let currentState;

browser.runtime.sendMessage({ interog: true });

const timeSpanElement = document.getElementById('timeSpan');
browser.runtime.onMessage.addListener((message) => {
  if (message.enabled == false) {
    const status = document.getElementById("status");
    status.textContent = "Disabled";
    svg.style.fill = "red";
    timeSpanElement.style.display = "none";
    divider.style.display = "none";
  } else if (message.enabled == true) {
    const status = document.getElementById("status");
    status.textContent = "Enabled";
    svg.style.fill = "green";
    timeSpanElement.style.display = "block";
    divider.style.display = "block";
  };
  if (message.number) {
    timeDuration = message.number;
    timeSpanElement.textContent = timeDuration + ' remaining';
  };
});

// looks terrible -- too bad
function toggle() {
  if (svg.style.fill == "red") {
    const status = document.getElementById("status");
    status.textContent = "Enabled";
    svg.style.fill = "green";
    timeSpanElement.style.display = "block";
    divider.style.display = "block";
    browser.runtime.sendMessage({ fillColorChanged: 'green' });
  } else if (svg.style.fill == "green") {
    const status = document.getElementById("status");
    status.textContent = "Disabled";
    svg.style.fill = "red";
    timeSpanElement.style.display = "none";
    divider.style.display = "none";
    browser.runtime.sendMessage({ fillColorChanged: 'red' });
  };
};

const enableToggle = document.getElementById("enableToggle");
enableToggle.addEventListener('click', toggle);