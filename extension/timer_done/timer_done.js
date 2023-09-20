async function reset(){
  await browser.runtime.sendMessage({ reset: true });
  close();
}
;
const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', reset);