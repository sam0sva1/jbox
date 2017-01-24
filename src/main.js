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

var deadline = new Date(Date.parse(new Date(2017, 0, 15, 12, 0, 0, 0)));
initializeClock('clock', deadline);
//initializeMap('mapKeeper');

var shadow = document.getElementById('shadow');
var application = document.getElementById('application');
var appAcception = document.querySelector('.app-acception');
var appRejection = document.querySelector('.app-rejection');
var subscription = document.getElementById('subscription');
var forms = {
  shadow: {},
  application: {},
  subscription: {}
};
forms.shadow.show = function() {
  shadow.classList.remove('hide'); 
}
forms.shadow.hide = function() {
  shadow.classList.add('hide'); 
}
forms.application.show = function() {
  application.classList.remove('hide');
}
forms.application.hide = function() {
  application.classList.add('hide'); 
}
forms.application.accept = function() {
  forms.application.hide();
  forms.application.clear();
  appAcception.classList.remove('hide');
  setTimeout(function() {
    appAcception.classList.add('hide');
    forms.shadow.hide();
  }, 3000);
}
forms.application.reject = function() {
  forms.application.hide();
  forms.application.clear();
  appRejection.classList.remove('hide');
  setTimeout(function() {
    appRejection.classList.add('hide');
    forms.shadow.hide();
  }, 3000);
}
forms.application.clear = function() {
  document.querySelector('.app__input-name').value = '';
  document.querySelector('.app__input-email').value = '';
  document.querySelector('.app__input-phone').value = '';
  document.querySelector('.app__area-descr').value = '';
}
forms.subscription.clear = function() {
  document.querySelector('.subscr__input-email').value = '';
}
forms.subscription.show = function() {
  subscription.classList.remove('hide');
}
forms.subscription.hide = function() {
  subscription.classList.add('hide'); 
}
forms.showApplicationForm = function() {
  forms.shadow.show();
  forms.application.show();
}
forms.hideApplicationForm = function() {
  forms.shadow.hide();
  forms.application.hide();
  forms.application.clear();
}
forms.showSubscriptionForm = function() {
  forms.shadow.show();
  forms.subscription.show();
}
forms.hideSubscriptionForm = function() {
  forms.shadow.hide();
  forms.subscription.hide();
  forms.subscription.clear();
}

var appCaller = document.getElementById('app__caller');
var appCloser = document.getElementById('app__close');
var subscrCaller = document.getElementById('subscr__caller');
var subscrCloser = document.getElementById('subscr__close');
function onAppCallerClickHandler() {
  forms.showApplicationForm();
}
function onAppCloserClickHandler() {
  forms.hideApplicationForm();
}
function onSubscrCallerClickHandler() {
  forms.showSubscriptionForm();
}
function onSubscrCloserClickHandler() {
  forms.hideSubscriptionForm();
}
appCaller.addEventListener('click', onAppCallerClickHandler);
appCloser.addEventListener('click', onAppCloserClickHandler);
subscrCaller.addEventListener('click', onSubscrCallerClickHandler);
subscrCloser.addEventListener('click', onSubscrCloserClickHandler);
VMasker(document.querySelector(".app__input-phone")).maskPattern("(999) 999-99-99");

var appSender = document.querySelector(".app__button");
var subscrSender = document.querySelector(".subscr__button")

function onAppSenderClickHandler() {
  var name = document.querySelector('.app__input-name').value;
  var email = document.querySelector('.app__input-email').value;
  var phone = document.querySelector('.app__input-phone').value;
  var descr = document.querySelector('.app__area-descr').value;
  axios.post('/member/add', {
    name: name,
    email: email,
    phone: phone,
    description: descr
  }).then(function(response) {
    if(response.status === 200) {
      forms.application.accept();
    }
  }).catch(function(error) {
    console.log(error);
    forms.application.reject();
  });
}
function onSubscrSenderClickHandler() {
  
}

appSender.addEventListener('click', onAppSenderClickHandler);