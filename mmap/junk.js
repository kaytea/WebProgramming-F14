var infowindow = new google.maps.InfoWindow();
var me;
var submitMe;
var places;
var map;
var myLat = 0;
var myLng = 0;
var mapDiv = document.getElementById('map_canvas');
var requestData = new XMLHttpRequest();
var locData;
var myLoc = new google.maps.LatLng(myLat, myLng);
var myMarker;// = new google.maps.Marker({position: myLoc});
var locaInfo = {
    center: myLoc,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

function init() {
    map = new google.maps.Map(mapDiv, locaInfo);
    getMyLocation();
}

google.maps.event.addDomListener(window, 'load', init);
init();
//makeMap();
requestData.onreadystatechange(dataReady());

function getMyLocation() {
    if (navigator.geolocation) {
        alert("Getting Pos.");
        navigator.geolocation.getCurrentPosition(myLoca_fun, function() {
            alert("CANNOT GET POSITION-- Location set to Tufts University");
            myLat = 42.4069;
            myLng = -71.1198;
        });
        alert("Got Pos-- " + myLat + ", " + myLng + "; making map");
        makeMap();
    } else {
        alert("Geolocation not supported. bummer./n We'll just pretend you're at Tufts");
        myLat = 42.4069;
        myLng = -71.1198;
    }
    alert("LOCATED: " + myLat + ", " + myLng + ".");
}

function myLoca_fun(me){
    alert("Getting Pos. 2");
    myLat = me.coords.latitude;
    myLng = me.coords.longitude;
    myLoc = {lat: myLat, lng: myLng};
    alert("New Location: " + myLat + ", " + myLng + ".");
    map.panTo(myLoc);
    myMarker = new google.maps.Marker({
        map: map,
        position: myLoc,
        title: "Here I Am!",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    });
	google.maps.event.addListener(myMarker, 'click', function() {
        infowindow.setContent(myMarker.title);
        infowindow.open(map, myMarker);
    });
}

function makeMap(){
    alert("Got Pos-- " + myLat + ", " + myLng + "; requesting JSON");
    requestData.open("POST", "http://chickenofthesea.herokuapp.com/sendLocation", true);
    requestData.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //submitMe = "login=SusanBones&lat=" + myLat + "&lng=" + myLng;
    //requestData.setRequestHeader("Content-length", submitMe.length);
    requestData.setRequestHeader("Connection", "close");
    //requestData.onreadystatechange(dataReady());
    requestData.onLoad = alert("JSON has loaded");
    requestData.send("login=SusanBones&lat=42&lng=-71");
}

function dataReady() {
    alert("testing for JSON; ready state = " + requestData.readyState);
    if (requestData.readyState == 4 && requestData.status == 200) {
        alert("getting JSON. yippee");
        //locData = JSON.parse(requestData.responseText);
        //alert("loaded: " + locData(characters[1].name));
    } else if (xhr.readyState == 4 && xhr.status == 500) {
        alert("uh-oh! JSON isnt there");
    }
}

/*// Calling Google Places API
    var request = {
        location: me,
        radius: '500',
        types: ['food']
	};
	service = new google.maps.places.PlacesService(map);
    service.search(request, callback);
}*/


// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
/*function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        alert("Got places back!");
        places = results;
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}*/
/*
function createStuMarker(student) {
    var stuLat = student.lat;
    var stuLng = student.lng;
    var stuLoc = new google.maps.LatLng(stuLat, stuLng);
    var stuMarker = new google.maps.Marker({
        map: map, position: stuLoc,
        title: "Login: "student.login,
        content: "Located: "+ stuLat +", "+ stuLng +"<br/> Last Login @: " + student.created_at
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.close();
        infowindow.setContent(stuMarker.title);
        infowindow.open(map, this);
    });
}

function createCharMarker(character){
    var charName = character.name;
    var charLat = character.loc.latitude;
    var charLng = character.loc.longitude;
    var charLoc = new google.maps.LatLng(charLat, charLng);
    var charMarker = new google.maps.Marker({
        map: map, position: charLoc,
        title: "Login: " + charName,
        content: "Located: "+ charLat +", "+ charLng +"<br/> Note: " + character.loc.note
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.close();
        infowindow.setContent(charMarker.title + charMarker.content);
        infowindow.open(map, this);
    });
    if (charName ===
}
*/