setInterval(setClock, 1000);

const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');

function setClock() {
  // Get current date
  const currentDate = new Date();
  //   We divide seconds by 60 to get the ratio in order to use below
  const secondsRatio = currentDate.getSeconds() / 60;
  // we add secondsRatio to minutesRation in order for minute hand to move slightly as time goes by
  // if we didn't do that then the minuteHand would move only when minute changes
  // we want hands to move slightly while time goes by. Especially the hour hand. If we didn't calculate the ratio and add it to each hand
  // then the hourHand for example would move only when hour changes. To put it simply
  // we want hourHand to be between 1 and 2 when it's 1:30 so if we add the minuteRatio to hourRatio
  // then when setRotation function is called the hourHand rotates slightly and this is how clocks work
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRation) {
  element.style.setProperty('--rotation', rotationRation * 360);
}
// Load function as soon as page loads in order for clock not to wait 1 sec before rotate
setClock();
