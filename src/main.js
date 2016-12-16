function initializeMap(id) {
    var options = {
      center: new google.maps.LatLng(55.75, 37.62),
      zoom: 12,
      mapTypeId: "Toner",
      disableDefaultUI: true,
    };

    var map = new google.maps.Map(document.getElementById(id), options);
    map.mapTypes.set("Toner", new google.maps.StamenMapType("toner"));
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.unit__time-days');
  var hoursSpan = clock.querySelector('.unit__time-hours');
  var minutesSpan = clock.querySelector('.unit__time-minutes');
  var secondsSpan = clock.querySelector('.unit__time-seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date(2016, 11, 25, 12, 0, 0, 0)));
initializeClock('clock', deadline);
initializeMap('mapKeeper');