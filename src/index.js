function main() {
  const button = document.querySelector("#button");
  let currentTime = document.querySelector(".h1");
  const selectTime = document.querySelectorAll("select");
  const contentAlarm = document.querySelector(".content-alarm");

  let alarmSet = false;
  let alarmTime;
  const rigtoneSrc = new URL(
    "./files/ringtone.mp3",
    import.meta.url
  ).toString();
  let rigtone = new Audio(rigtoneSrc);
  for (let hour = 12; hour > 0; hour--) {
    hour = hour < 10 ? "0" + hour : hour;
    let option = `<option value="${hour}">${hour}</option>`;
    selectTime[0].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  for (let minute = 59; minute >= 0; minute--) {
    minute = minute < 10 ? "0" + minute : minute;
    let option = `<option value="${minute}">${minute}</option>`;
    selectTime[1].firstElementChild.insertAdjacentHTML("afterend", option);
  }
  for (let amPm = 2; amPm > 0; amPm--) {
    let isAmPm = amPm == 1 ? "AM" : "PM";
    let option = `<option value="${isAmPm}">${isAmPm}</option>`;
    selectTime[2].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  setInterval(() => {
    let date = new Date(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();

    amPm = "AM";
    if (h >= 12) {
      h = h - 12;
      amPm = "PM";
    }

    h = h == 0 ? (h = 12) : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.textContent = `${h} : ${m} : ${s} ${amPm}`;
    if (alarmTime == `${h}:${m}:${amPm}`) {
      console.log("Alarm Rinning");
      rigtone.play();
      rigtone.loop = true;
    }
  }, 1000);

  const addAlarm = () => {
    if (alarmSet) {
      alarmTime = "";
      rigtone.pause();
      contentAlarm.classList.remove("disable");
      button.textContent = "Add Alarm";
      return (alarmSet = false);
    }

    let time = `${selectTime[0].value}:${selectTime[1].value}:${selectTime[2].value}`;
    if (
      time.includes("Hour") ||
      time.includes("Minute") ||
      time.includes("AM/PM")
    ) {
      return alert("Please, select a valid time");
    }
    alarmSet = true;
    alarmTime = time;
    contentAlarm.classList.add("disable");
    button.textContent = "Clear Alarm";
  };

  button.addEventListener("click", addAlarm);
}
main();
