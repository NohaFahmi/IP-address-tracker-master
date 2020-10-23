$(document).ready(function(){
    var ip;
    var api_key = "at_DaQcr0TiBH3QMqLQJyQTKVaPDHJpY";

    var grayMarker = new L.Icon({
        iconUrl: '../images/icon-location.svg',
        iconSize: [20, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var myMap = L.map('map').setView([30.0444, 31.2357], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9oYW1vaGFtbWVkIiwiYSI6ImNrZ2xiZG5idTByamkzMG5hb3JrdG5mazQifQ.kn4WxorvMQJI5Q8GA4O13A', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(myMap);

    //adding marker
    
    var marker = L.marker([30.0444, 31.2357], {icon: grayMarker}).addTo(myMap);

    $('form').submit(function(e) {

        e.preventDefault();
        
        ip = $('.search-box').val();
        $.get("https://geo.ipify.org/api/v1?apiKey=" + api_key + "&ipAddress=" + ip,function(data){

            $('.data__ip__text').html(data.ip);

            $('.data__location__text').html(data.location.city + ', ' + data.location.region + ' ' + data.location.postalCode);

            $('.data__time__text').html('UTC' + data.location.timezone);

            $('.data__isp__text').html(data.isp);

            myMap.setView([data.location.lat, data.location.lng], 15);

            marker = new L.marker([data.location.lat, data.location.lng], {icon: grayMarker}).addTo(myMap);
        });
    });

});
    
   