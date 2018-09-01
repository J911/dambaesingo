var registPos = {
  lat: null,
  lng: null
};
var regionCode;
var modal = document.querySelector('.modal');
var regist = document.querySelector('.regist');
var loc = document.querySelector('.location');
var modalMessage = document.getElementById('message');
var dimmer = document.querySelector('.dimmer');
var sideMenu = document.querySelector('.side-menu');
var sideMenuBtn = document.querySelector('.side-menu--btn');

var locations = {
  'seoul': {
    lat: 37.5642135,
    lng: 127.0016985
  },
  'busan': {
    lat: 35.209925947222,
    lng: 129.05055511923
  },
  'inchan': {
    lat: 37.4562557,
    lng: 126.70520620000002
  },
  'daegu': {
    lat: 35.8714354,
    lng: 128.601445
  },
  'daejeon': {
    lat: 36.35041189999999,
    lng: 127.38454750000005
  },
  'gwangju': {
    lat: 35.1595454,
    lng: 126.85260119999998
  }
};

dimmer.addEventListener('click', clickDimmer);
sideMenuBtn.addEventListener('click', showSlideMenu);

var container = document.getElementById('map');
var options = {
  center: new daum.maps.LatLng(33.450701, 126.570667),
  level: 3,
  disableDoubleClickZoom: true
};
var map = new daum.maps.Map(container, options);
var geocoder = new daum.maps.services.Geocoder();

geocoder.coord2RegionCode(126.9786567, 37.566826, updateRegionCode);

daum.maps.event.addListener(map, 'dblclick', function(mouseEvent) {
  var latlng = mouseEvent.latLng;
  registPos.lat = latlng.jb;
  registPos.lng = latlng.ib;
  showRegist();
});

daum.maps.event.addListener(map, 'dragend', updateRegion);

var icon = new daum.maps.MarkerImage(
  './img/no-smoking.png',
  new daum.maps.Size(35, 35),
  {
    alt: "no smoking!",
  }
);

function setCurrentPos() {
  showModal('내 위치로 이동중입니다.');
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var moveLatLng = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.panTo(moveLatLng);
      map.setLevel(3);
      setMarker(position.coords.latitude, position.coords.longitude);
      updateRegion();
      hideModal();
    });
  } else {
    showModal('위치정보를 불러올 수 없습니다.');
  }
}

function setMarker(lat, lng, icon) {
  var marker = new daum.maps.Marker({
    map: map,
    image: icon,
    position: new daum.maps.LatLng(lat, lng)
  });
  marker.setMap(map);
}

function showModal(msg) {
  modalMessage.innerText = msg;
  modal.setAttribute('state', 'show');
}

function hideModal() {
  modal.setAttribute('state', 'hide');
}

function showRegist() {
  regist.setAttribute('state', 'show');
}

function hideRegist() {
  regist.setAttribute('state', 'hide');
}

function showSlideMenu() {
  sideMenu.setAttribute('state', 'show');
}

function hideSlideMenu() {
  sideMenu.setAttribute('state', 'hide');
}

function showChangeLoc() {
  loc.setAttribute('state', 'show');
}

function hideChangeLoc() {
  loc.setAttribute('state', 'hide');
}

function clickDimmer() {
  modal.setAttribute('state', 'hide');
  sideMenu.setAttribute('state', 'hide');
  loc.setAttribute('state', 'hide');
}

function changeLocation(loc) {
  var latlng = locations[loc];
  var moveLatLng = new daum.maps.LatLng(latlng.lat, latlng.lng);
  map.panTo(moveLatLng);
  map.setLevel(8);
  
  hideChangeLoc();
}

function updateRegion() {
  var latlng = map.getCenter();
  geocoder.coord2RegionCode(latlng.ib, latlng.jb, updateRegionCode);
}

function updateRegionCode(result, status) {
  if (status === daum.maps.services.Status.OK) {
    var newRegionCode = result[0].code;
    if(regionCode === newRegionCode) return;
    regionCode = newRegionCode;
    updatePin();
  }
}

function updatePin() {
  axios.get('http://localhost:3000/api/v1/info/' + regionCode)
    .then(function (response) {
      var info = response.data.info;
      info.forEach(i => {
        setMarker(i.lat, i.lng, icon);
      });
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
    });
}

function registInfo() {
  hideRegist();
  showModal('등록중입니다.');
  axios.post('http://localhost:3000/api/v1/info/', {
    lat: registPos.lat,
    lng: registPos.lng,
    code: regionCode,
    contents: document.getElementById('contents').value
  })
    .then(function () {
      updatePin();
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      hideModal();
    });
}
setCurrentPos();
setMarker(33.450701, 126.570667, icon); //template
