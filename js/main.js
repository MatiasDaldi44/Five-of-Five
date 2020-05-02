
var searchResults
var hotels = [];
var hotelNames = []
var hotelRatings = []

$(document).ready(function () {
    $("#go").click(function () {
        $("#recommendationOne").removeClass("is-hidden")
        $("#recommendationTwo").removeClass("is-hidden")
        $("#recommendationThree").removeClass("is-hidden")
        $("#recommendationFour").removeClass("is-hidden")
        $("#recommendationFive").removeClass("is-hidden")
    });

});

var searchTerm = "miami"

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + searchTerm,
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": "21280359f4mshe424cc8187c3cf9p18ebe4jsnd3a2e2520bc5"
    }
}
$.ajax(settings).done(function (response) {
    console.log(response);
    var desID = response.suggestions[0].entities[0].destinationId
    var secondSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hotels4.p.rapidapi.com/properties/list?currency=USD&locale=en_US&sortOrder=PRICE&destinationId=" + desID + "&pageNumber=1&pageSize=5",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key": "21280359f4mshe424cc8187c3cf9p18ebe4jsnd3a2e2520bc5"
        }
    }
    $.ajax(secondSettings).done(function (secondResponse) {
        console.log(secondResponse);
        searchResults = secondResponse.data.body.searchResults
        getHotelNames();
        var hotels = searchResults.results
        console.log(searchResults);
        console.log(hotels)
        console.log(hotelNames)
    });
});

function getHotelNames(){
    for (var i = 0; i < 5; i++){
        hotelNames.push(searchResults.results[i].name)
    }
}