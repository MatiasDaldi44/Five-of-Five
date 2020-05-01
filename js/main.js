
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=new%20york",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
		"x-rapidapi-key": "21280359f4mshe424cc8187c3cf9p18ebe4jsnd3a2e2520bc5"
	}
}
$.ajax(settings).then(function (response) {
    console.log(response);
    var hotelName = response.suggestions[3]
    console.log(hotelName)
});


// A function that will get hotel name and return an image of the hotel and display it in modal.

