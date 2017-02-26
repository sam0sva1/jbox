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

var deadline = new Date(Date.parse(new Date(2017, 3, 1, 12, 0, 0, 0)));
initializeClock('clock', deadline);
//initializeMap('mapKeeper');

var shadow = document.getElementById('shadow');

var description = document.getElementById('description');
var descrCaller = document.getElementById('drop');
var descrCloser = document.getElementById('descr__close');

var application = document.getElementById('application');
var appAcception = document.querySelector('.app-acception');
var appRejection = document.querySelector('.app-rejection');
var appCaller = document.getElementById('app__caller');
var appCloser = document.getElementById('app__close');

var subscrAcception = document.querySelector('.subscr-acception');
var subscrRejection = document.querySelector('.subscr-rejection');
var subscription = document.getElementById('subscription');
var subscrCaller = document.getElementById('subscr__caller');
var subscrCloser = document.getElementById('subscr__close'); 

var forms = {
  shadow: {},
  description: {},
  application: {},
  subscription: {}
};
forms.shadow.show = function() {
  shadow.classList.remove('hide'); 
}
forms.shadow.hide = function() {
  shadow.classList.add('hide'); 
}

forms.description.show = function() {
  description.classList.remove('hide');
}
forms.description.hide = function() {
  description.classList.add('hide'); 
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
  //forms.application.clear();
  appRejection.classList.remove('hide');
  setTimeout(function() {
    appRejection.classList.add('hide');
    forms.shadow.hide();
  }, 3000);
}

forms.subscription.accept = function() {
  forms.subscription.hide();
  forms.subscription.clear();
  subscrAcception.classList.remove('hide');
  setTimeout(function() {
    subscrAcception.classList.add('hide');
    forms.shadow.hide();
  }, 3000);
}
forms.subscription.reject = function() {
  forms.subscription.hide();
  subscrRejection.classList.remove('hide');
  setTimeout(function() {
    subscrRejection.classList.add('hide');
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


forms.showDescription = function() {
  forms.shadow.show();
  forms.description.show();
}
forms.hideDescription = function() {
  forms.shadow.hide();
  forms.description.hide();
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

function onDescrCallerClickHandler() {
  forms.showDescription();
}
function onDescrCloserClickHandler() {
  forms.hideDescription();
}

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

descrCaller.addEventListener('click', onDescrCallerClickHandler);
descrCloser.addEventListener('click', onDescrCloserClickHandler);
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
    console.log(response.status);
    if(response.status === 200) {
      forms.application.accept();
    }
  }).catch(function(error) {
    console.log(error);
    forms.application.reject();
  });
}
function onSubscrSenderClickHandler() {
  var email = document.querySelector('.subscr__input-email').value;
  axios.post('/subscriber/add', {
    email: email
  }).then(function(response) {
    if(response.status === 200) {
      forms.subscription.accept();
    }
  }).catch(function(error) {
    console.log(error);
    forms.subscription.reject();
  });
}

appSender.addEventListener('click', onAppSenderClickHandler);
subscrSender.addEventListener('click', onSubscrSenderClickHandler);









