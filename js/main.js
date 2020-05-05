var settings = {
    "async": true,
    "crossDomain": true,
    "url": "",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": "21280359f4mshe424cc8187c3cf9p18ebe4jsnd3a2e2520bc5"
    }};

var searchResults
var hotels = [];
var hotelNames = []
var hotelRatings = []
var someName = $(".first-card-header")

$("#go").click(function() {
    $("#recommendationOne").removeClass("is-hidden")
    $("#recommendationTwo").removeClass("is-hidden")
    $("#recommendationThree").removeClass("is-hidden")
    $("#recommendationFour").removeClass("is-hidden")
    $("#recommendationFive").removeClass("is-hidden")
});

$(".button").on("click", function() {
    var searchTerm = $(".input").val()
    settings.url = "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + searchTerm
    $.ajax(settings).then(function (response) {
        console.log(response);
        var desID = response.suggestions[0].entities[0].destinationId
        settings.url = "https://hotels4.p.rapidapi.com/properties/list?currency=USD&locale=en_US&sortOrder=PRICE&destinationId=" + desID + "&pageNumber=1&pageSize=5"
        $.ajax(settings).then(function (secondResponse) {
            console.log(secondResponse);
            searchResults = secondResponse.data.body.searchResults
            getHotelNames();
            var hotels = searchResults.results
            console.log(hotels)
            console.log(hotelNames)
        });
    });
});

$("#recommendationOne").on("click", function(){
    $(".modal").attr("class", "is-active")
})

function saveSearches() {
    localStorage.setItem("Searches", JSON.stringify(searches))
};

function getHotelNames(){
    for (var i = 0; i < 5; i++){
        hotelNames.push(searchResults.results[i].name)
}};

// Function for returning the link for booking by Google searching the name
// of the hotel/Airbnb name.
var googleAPI = "AIzaSyAQf-kqorH50R3Ae5kTKCcHvAJvOio4rk8";
var googleHotel = "https://www.googleapis.com/customsearch/v1?key="+googleAPI+"&cx=018340522822646408935:81mmayyki6o&q=orlando&callback=hndlr"

function hndlr(response) {
    console.log(response)
    // for (var i = 0; i < response.items.length; i++) {
    //   var item = response.items[i];
    //   // Output:
    //   console.log(item);
    // }
  }
    }
    someName.append("<p>").text(hotelNames[0]).attr("class", "card-header-title")
};
