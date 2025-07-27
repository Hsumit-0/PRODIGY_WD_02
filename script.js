let [hours, minutes, seconds] = [0, 0, 0];
let display = document.getElementById("display");
let lastTimeDisplay = document.getElementById("last-time");
let beepSound = document.getElementById("beep");
let timer = null;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function start() {
  if (timer !== null) return;
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 1000);
}

function pause() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    beepSound.play(); 
  }
}

function reset() {
  pause();
  const currentTime = display.innerText;
  localStorage.setItem("lastTime", currentTime);
  lastTimeDisplay.innerText = `🕘 Last Time: ${currentTime}`;

  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
}

function downloadTime() {
  const timeText = "Last Stopwatch Time: " + display.innerText;
  const blob = new Blob([timeText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "stopwatch_time.txt";
  a.click();
}

window.onload = () => {
  updateDisplay();
  const last = localStorage.getItem("lastTime");
  if (last) {
    lastTimeDisplay.innerText = `🕘 Last Time: ${last}`;
  }
};