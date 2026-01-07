document.addEventListener("DOMContentLoaded", () => {

  // ================= CLOCK =================
  function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = m < 10 ? "0" + m : m;
    document.getElementById('time').innerHTML = h + ":" + m;
    setTimeout(startTime, 1000);
  }
  startTime();

  // ================= TIMER VALUES =================
  let focus = 25 * 60;
  let shortbr = 5 * 60;
  let longbr = 15 * 60;

  let time = focus;
  let totalTime = focus;

  // ================= ELEMENTS =================
  const timerFill = document.getElementById("timerFill");
  const focusValue = document.getElementById("focusInput");
  const shortValue = document.getElementById("shortInput");
  const longValue = document.getElementById("longInput");
  const saveInputButton = document.getElementById("saveTimerButton");
  const pomoToggle = document.getElementById("pomoSequenceToggle");
  const inputs = [focusValue, shortValue, longValue];

  let playing = false;

  // Init bar
  timerFill.style.height = "100%";
  timerFill.style.backgroundColor = "#06003cff";

  focusValue.value = 25;
  shortValue.value = 5;
  longValue.value = 15;

  // ================= MODE SETUP =================
  document.querySelector("input[value='focus']").checked = true;
  document.getElementById("focusModeButton").style.backgroundColor = "#3f4daaff";

  function applyTime(mode) {
    if (mode === "focus") {
      time = focus;
      totalTime = focus;
    }
    if (mode === "short") {
      time = shortbr;
      totalTime = shortbr;
    }
    if (mode === "long") {
      time = longbr;
      totalTime = longbr;
    }

    timerFill.style.height = "100%";
    timerFill.style.backgroundColor = "#06003cff";
    document.getElementById("pomoTxt").innerHTML = formatTime(time);
  }

  // ================= MODE BUTTONS =================
  document.querySelectorAll(".pomoModeButtons > div").forEach(div => {
    div.addEventListener("click", () => {
      stopTimer();

      document.querySelectorAll(".pomoModeButtons > div")
        .forEach(b => b.style.backgroundColor = "#232D6D");

      const radio = div.querySelector("input");
      radio.checked = true;
      div.style.backgroundColor = "#3f4daaff";

      applyTime(radio.value);
    });
  });

  // ================= SAVE BUTTON =================
  saveInputButton.addEventListener("click", () => {
    focus = focusValue.value * 60;
    shortbr = shortValue.value * 60;
    longbr = longValue.value * 60;

    const mode = document.querySelector("input[name='mode']:checked").value;
    applyTime(mode);
  });

  // ================= TIMER CORE =================
  let timerInterval = null;

  function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
      if (time <= 0) {
        stopTimer();
        timerFill.style.height = "0%";
        resetTimer();
        return;
      }

      time--;
      document.getElementById("pomoTxt").innerHTML = formatTime(time);

      const percent = (time / totalTime) * 100;
      timerFill.style.height = percent + "%";

      if (percent <= 30) timerFill.style.backgroundColor = "#1500f9ff";
      else if (percent <= 60) timerFill.style.backgroundColor = "#210099ff";
      else timerFill.style.backgroundColor = "#06003cff";

    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetTimer() {
    stopTimer();
    applyTime(document.querySelector("input[name='mode']:checked").value);
  }

  // ================= FORMAT =================
  function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}


  document.getElementById("pomoTxt").innerHTML = formatTime(time);

  // ================= BUTTON HOOKS =================
  document.getElementById("playButton").addEventListener("click", () => {
  if(!playing){
    startTimer(); 
    document.querySelector("#playButton img").setAttribute("src", "assets/buttonsSvg/pauseButton.svg");
    playing = true;
  }
  else if(playing){
    stopTimer();
    document.querySelector("#playButton img").setAttribute("src", "assets/buttonsSvg/playButton.svg");
    playing = false;
  };
  });

  document.getElementById("resetButton").addEventListener("click", resetTimer);

  document.getElementById("addButton").addEventListener("click", () => {
    // Add 5 minutes (300 seconds)
  time += 300;
  totalTime += 300; // also increase totalTime so the vertical bar reflects the new total

  // Update timer display
  document.getElementById("pomoTxt").innerHTML = formatTime(time);

  // Update vertical timer bar
  const percent = (time / totalTime) * 100;
  document.getElementById("timerFill").style.height = percent + "%";

  // Optional: adjust color based on new percentage
  if (percent <= 30) document.getElementById("timerFill").style.backgroundColor = "#d9534f";
  else if (percent <= 60) document.getElementById("timerFill").style.backgroundColor = "#f0ad4e";
  else document.getElementById("timerFill").style.backgroundColor = "#06003cff";
  });

});

//EDIT PANEL 
const editTimerPanel = document.querySelector(".editTimerPanel");

document.getElementById("editTimerButton").addEventListener("click", () => {
  editTimerPanel.classList.add("show");
  editTimerPanel.style.display = "flex";
});

document.getElementById("closeEditTimer").addEventListener("click", () => {
  editTimerPanel.classList.remove("show");
});
