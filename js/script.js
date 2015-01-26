/**
 * Created by Dylan on 25/01/2015.
 */

var MODE = {
    LIST: 0,
    ADD: 1
};

var currentMode = MODE.LIST;

var newDrive;

var tabGeocode = [];

var tabMarker = [];

var rendererOptions = {
    draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
var directionsService = new google.maps.DirectionsService();
var map;

var france = new google.maps.LatLng(46.71109, 1.7191036);

window.onload = function() {
    listDrives();
};

function initialize() {

    var mapOptions = {
        zoom: 5,
        center: france
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

    google.maps.event.addListener(map, 'click', function(e) {
        if(currentMode == MODE.ADD)
        {
            if(newDrive.address1 == '--' || newDrive.address2 == '--')
            {
                placeMarker(e.latLng, map);
                getAddress(e.latLng);
            }
        }
    });

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
    });
}

function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });

    map.panTo(position);

    tabMarker.push(marker);
}

function clearMarkers() {
    for(var i = 0; i < tabMarker.length; i++)
    {
        tabMarker[i].setMap(null);
    }

    tabMarker = [];
}

function calcRoute(originAddress, destinationAddress) {
    var request = {
        origin: originAddress,
        destination: destinationAddress,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    directionsDisplay.setMap(map);
}

function clearDirections() {
    directionsDisplay.setMap(null);
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000.0;

    newDrive.updateDistance(Math.floor(total));

    document.getElementById('distance').innerHTML = Math.floor(total) + ' km';
}

google.maps.event.addDomListener(window, 'load', initialize);

function listDrives() {
    clearMarkers();
    clearDirections();

    getDrives();
}

function getDrives() {
    var xmlhttp = xmlHTTP();

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            console.log(xmlhttp.responseText);

            var tabDrives = JSON.parse(xmlhttp.responseText);
            var tableDrives = eId('tableDrives');

            if(tabDrives[0] == 'success')
            {
                console.log('true');

                for(var i = 0; i < tabDrives[1].length; i++)
                {
                    var drive = tabDrives[1][i];

                    var row = tableDrives.insertRow(-1);

                    var cell1 = row.insertCell(0);
                    cell1.innerHTML = (i + 1);

                    var cell2 = row.insertCell(1);
                    cell2.innerHTML = drive.date;

                    var cell3 = row.insertCell(2);
                    cell3.innerHTML = drive.address1;

                    var cell4 = row.insertCell(3);
                    cell4.innerHTML = drive.address2;

                    var cell5 = row.insertCell(4);
                    cell5.innerHTML = drive.distance + ' km';

                    var cell6 = row.insertCell(5);
                    cell6.innerHTML = setTimeString(drive.time);
                }
            }
            else
            {
                console.log('error');
            }
        }
    };

    xmlhttp.open("GET", "php/getDrives.php", true);
    xmlhttp.send();
}

function addDrive() {
    clearMarkers();
    clearDirections();

    currentMode = MODE.ADD;
    newDrive = new DRIVE();

    eId('address1').innerHTML = '--';
    eId('address2').innerHTML = '--';
    eId('distance').innerHTML = '-- km';
    eId('time').innerHTML = '0 hour(s), 0 minute(s)';
}

function confirmAddDrive() {
    newDrive.date = eId('datepicker').value;

    var xmlhttp = xmlHTTP();

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            console.log(xmlhttp.responseText);

            if(xmlhttp.responseText == 'true')
            {
                eId('addDriveLi').classList.remove('active');
                eId('listDrivesLi').classList.add('active');

                listDrives();
            }
            else
            {
                console.log('error');
            }
        }
    };

    xmlhttp.open("POST", "php/addDrive.php", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("date=" + newDrive.date + "&address1=" + newDrive.address1 + "&address2=" + newDrive.address2 + "&distance=" + newDrive.distance + "&time=" + newDrive.time);
}

function setTimeString(time) {
    var hours = Math.floor(time/60);
    var minutes = time - (hours * 60);

    return hours + ' hour(s), ' + minutes + ' minute(s)';
}

function plusTime() {
    newDrive.plusTime();

    eId('time').innerHTML = setTimeString(newDrive.time);

    timeoutPlusLess = setTimeout(plusTime, 100);
}

function lessTime() {
    newDrive.lessTime();

    eId('time').innerHTML = setTimeString(newDrive.time);

    timeoutPlusLess = setTimeout(lessTime, 100);
}

function clearTimeoutPlusLess() {
    clearTimeout(timeoutPlusLess);
}

function getAddress(position) {
    var xmlhttp = xmlHTTP();

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            tabGeocode = JSON.parse(xmlhttp.responseText);

            console.log(tabGeocode);
            console.log(tabGeocode.results[0].formatted_address);

            if(newDrive.address1 == '--')
            {
                newDrive.address1 = tabGeocode.results[0].formatted_address;

                document.getElementById('address1').innerHTML = newDrive.address1;
            }
            else
            {
                newDrive.address2 = tabGeocode.results[0].formatted_address;

                document.getElementById('address2').innerHTML = newDrive.address2;

                clearMarkers();
                calcRoute(document.getElementById('address1').innerHTML, document.getElementById('address2').innerHTML);
            }
        }
    };

    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.k + "," + position.D + "&sensor=true";

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function xmlHTTP() {
    return (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
}

function eId(id) {
    return document.getElementById(id);
}

$(function() {
    $( "#datepicker" ).datepicker({
        dateFormat: "dd/mm/yy"
    });
});