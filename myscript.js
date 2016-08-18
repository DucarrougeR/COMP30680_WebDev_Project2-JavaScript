// Weather API key = "aeea9844f36e8bc56c13659042b5b15c" 
// Google Maps API Key = "AIzaSyATd1rGXJE_i9sj2VDTIKUO5hn5QBYI4eY"
 //////////////////////////////////////////////////////////////////////////////////////////////////////
 // GLOBAL VARIABLES
var json;
var latitude;
var longitude;
var Temp;
var Mini;
var Maxi;
var Graphic;
//////////////////////////////////////////////////////////////////////////////////////////////////////
// TOGGLE VIEW ON ADDITIONAL DETAILS FOR WEATHER
function showhide2(id) {
    var e = document.getElementById(id);
    city = userForm.elements["city"].value;
    //alert("Loading 3-Hours Data for " + city); 
    e.style.display = (e.style.display == 'none') ? 'block' : 'none';
}

function showtemperature(id) {
    var e = document.getElementById(id);
    e.style.display = (e.style.display == 'none') ? 'block' : 'none';
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// GET THE DATA FROM OpenWeatherMap API AND DISPLAY IN TABLE 
// Function for 1-5 days
var loadData = function (){
  var base = "http://api.openweathermap.org/data/2.5/forecast";
  var daily = "/daily";                          		//get 1 result per day
  var what ="?q=";
  var city = userForm.elements["city"].value;    		//user direct input
  var comma = ",";                               		//add comma for api call formatting
  var country = userForm.elements["mySelect"].value;  	//user selection in list
  var apiKey = "&mode=json&appid=aeea9844f36e8bc56c13659042b5b15c&units=";
  var units = userForm.elements["units"].value;   		//user choice in radio button
  var add = "&cnt=";
  var days = userForm.elements["day"].value;          		//user choice in radio button
    alert("Loading Weather Data for " + city + ", " + country +" in " + units + " units.");   
  var URL = base + daily + what +city + comma + country + apiKey + units + add + days;

    var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        var str = JSON.stringify(myArr, null, 4);
        myFunction(myArr, days);
    }
};
xmlhttp.open("GET", URL, true);
xmlhttp.send();

    function myFunction(arr, days) {
        var out = "<h1><font color='blue'>"+userForm.elements["city"].value+"</font></h1><table><tr><th>Day</th><th>  Weather</th><th></th><th>  Temperature</th><th>  Minimum</th><th>  Maximum</th><th>Rain</th></tr>";
        var i;
        //var time = (arr.list[i].dt).toDateString();
        latitude = arr.city.coord.lat;
        longitude = arr.city.coord.lon;
        Temp = arr.list[0].temp.day;
        Mini = arr.list[0].temp.min;
        Maxi = arr.list[0].temp.max;
        Graphic = arr.list[0].weather[0].icon;
        for(i = 0; i < days ; i++) {
        	//////////////////////////// Error Handling if no rain expected
        	if (arr.list[i].rain==null){
        		var rain = "None";
        	} else {
        		rain = arr.list[i].rain + "<i>mm</i>";
        	}
        	//////////////////////////// Error handling for displaying correct unit type based on user choice
        	if (units == "metric"){
        		var elem = "<i>°C</i>"
        	} else {
        		elem = "<i>°F</i>"
        	}
        	//// CONVERT the DT element (TimeStamp) to actual data
        	var a = new Date(arr.list[i].dt * 1000);
			var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			var year = a.getFullYear();
			var month = months[a.getMonth()];
			var date = a.getDate();
			var time =  month + ' ' + date + ', ' + year  ;
        	
        	//////////////////////////// Error Handling in <div> capitalize the words to display properly
	        out += "</td><td>" + time +
	        "</td><td>" + arr.list[i].weather[0].main +
	        "</td><td>" + "<img src =http://openweathermap.org/img/w/" + arr.list[i].weather[0].icon + ".png>" +
	        "</td><td>" + arr.list[i].temp.day + elem +
	        "</td><td>" + arr.list[i].temp.min + elem +
	        "</td><td>" + arr.list[i].temp.max + elem +
	        "</td><td>" + rain +
	        " </td></tr>"
        }
        out+="</table>";
        document.getElementById("dataTable").innerHTML = out ;
        var latitude = arr.city.coord.lat;
        var longitude = arr.city.coord.lon;

        setupMap(latitude, longitude);

//////// ADD THE PRESSURE ELEMENT  ////////
        var outpressure = "<table><tr><th>  Pressure</th> </tr>";
        for(i = 0; i < days ; i++) {
	        outpressure += "</td><td>" +
	        	arr.list[i].pressure +
	        "hPa</td></tr>"
        }
        outpressure+="</table>";
        document.getElementById("pressureTable").innerHTML = outpressure ;

//////// ADD THE HUMIDITY ELEMENT  ////////
        var outhumidity = "<table><tr><th>  Humidity</th> </tr>";
        for(i = 0; i < days ; i++) {
	        outhumidity += "</td><td>" +
	        	arr.list[i].humidity +
	        "%</td></tr>"
        }
        outpressure+="</table>";
        document.getElementById("humidityTable").innerHTML = outhumidity ;

//////// ADD THE WIND SPEED ELEMENT  ////////
        var outwind = "<table><tr><th>  Wind speed</th> </tr>";
        for(i = 0; i < days ; i++) {
        	if (userForm.elements["units"].value == "metric"){
        		var wind2 = arr.list[i].speed + " meter/s";
        	} else {
        		wind2 = arr.list[i].speed + " feet/s";
        	}
	        outwind += "</td><td>" +
	        	wind2 +
	        "</td></tr>"
        }
        outpressure+="</table>";
        document.getElementById("windspeedTable").innerHTML = outwind ;

    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// GET THE DATA FROM OpenWeatherMap API AND DISPLAY IN TABLE 
// Function for 3 hrs data
 var loadMore = function(){
	var base2 = "http://api.openweathermap.org/data/2.5/forecast";
	var what2 ="?q=";                        		
	var city2 = userForm.elements["city"].value;    		//user direct input
	var comma2 = ",";                               		//add comma for api call formatting
	var country2 = userForm.elements["mySelect"].value;  	//user selection in list
	var apiKey2 = "&appid=aeea9844f36e8bc56c13659042b5b15c&units=";
	var units2 = userForm.elements["units"].value;   		//user choice in radio button
	var add2 = "&cnt=";
	var days2 = userForm.elements["day"].value*8;          	//user choice in radio button  
	var URL2 = base2 + what2 +city2 + comma2 + country2 + apiKey2 + units2 + add2 + days2;
    
	var xmlhttp2 = new XMLHttpRequest();
	xmlhttp2.onreadystatechange2 = function() {
    if (xmlhttp2.readyState2 == 4 && xmlhttp2.status2 == 200) {
        var myArr2 = JSON.parse(xmlhttp2.responseText2);
        var str2 = JSON.stringify(myArr2, null, 4);
        newFunction(myArr2, days2);
        alert(str2);
    }
};
xmlhttp2.open("GET", URL2, true);
xmlhttp2.send();
alert("before function for 3 hrs --")

    var newFunction = function (arr, days2) {
    	alert("Inside function 3h")
        var out2 = "<table><tr><th> 111 </th><th> 222 </th><th> 333  </th><th> 444 </th></tr>";
        var y;
        alert("about to show 3hr")
        for(y = 0; y < days2 ; y++) {
	        out2 += "<td>" +
	        	arr2.list[y].weather[0].main + "</td><td>" +
	        	"<img src =http://openweathermap.org/img/w/" + arr2.list[y].weather[0].icon + ".png>" + "</td><td>" +
	        	arr2.list[y].temp.min + "</td><td>" +
	        	arr2.list[y].temp.max + "</td></tr>"
        }
        out+="</table>";
        document.getElementById("moreData").innerHTML = out2 ;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// GET THE MAP TO SHOW ON GPS COORDINATES FROM JSON FILE
var marker;
// latitude = 53.3438;
// longitude = -6.2546;
var myLatLng = {lat: latitude, lng: longitude};
// create map
function setupMap(latitude, longitude) {
    var map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: latitude, lng: longitude},
	    zoom: 6,
	    mapTypeId: google.maps.MapTypeId.HYBRID
	});

// content for window on map
        	//////////////////////////// Error Handling in <div> capitalize the words to display properly
	var contentString = '<div id="content">'+'<h2>'+userForm.elements["city"].value+'</h2>'+
		'<b>Temperature: '+Temp+
	    '°</b>'+'<br>Minimum: '+Mini+
	    '°'+'<br>Maximum: '+Maxi+
	    '°'+'<img src =http://openweathermap.org/img/w/'+Graphic+'.png></div>';

//create window object for map
	var infowindow = new google.maps.InfoWindow({
	    content: contentString
	 });

//create marker on map
	var marker = new google.maps.Marker({
	    position: {lat: latitude, lng: longitude},
	    map: map,
	    draggable: false,
	    title: userForm.elements["city"].value,
	    animation: google.maps.Animation.DROP,
	    icon:"images/marker.png"
	  });

    //event click= show window
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

