var settings = {
    "async": true,
    "crossDomain": true,
    "url": "",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": "14d8622397msh9a9995defefaba9p1df56cjsn754c68d55754"
    }};

var searchResults
var hotels = [];
var hotelNames = [];
var hotelRatings = [];
var hotelNameforSearch = "";

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

$("footer").on("click", ".hotelResults", function(){
    hotelNameforSearch = this.parentNode.parentNode.children[0].innerText
    // Setting our Google Search parameter to read the name of hotelResult title for
    // the hotel chosen. Executing search with the new parameter.
    var newSearch = google.search.cse.element.getElement("results")
    newSearch.execute(hotelNameforSearch)
    // Changing the modal view style
    $(".modal").attr("class", "modal is-active");
    $(".modal-content").css("margin", "10em auto");
    $(".modal-content").css("max-height", "400px")
    $(".gsc-control-cse").css("padding", "3em")
})

$(".modal-close").on("click", function(){
    $(".modal").attr("class", "modal")
})

function saveSearches() {
    localStorage.setItem("Searches", JSON.stringify(searches))
};

function getHotelNames(){
    for (var i = 0; i < 5; i++){
        hotelNames.push(searchResults.results[i].name)
}};


// Function for creating Google Custom Search and setting results to display in modal.
const myInitCallback = function() {
    if (document.readyState == 'complete') {
        console.log(this)
      // Document is ready when CSE element is initialized.
      // Render an element with both search box and search results in div with id 'test'.
      google.search.cse.element.render(
          {
            div: "open",
            tag: 'searchresults-only'
           });
    } else {
      // Document is not ready yet, when CSE element is initialized.
      google.setOnLoadCallback(function() {
        // Render an element with both search box and search results in div with id 'test'.
        google.search.cse.element.render(
            {
                div: "open",
                tag: 'searchresults-only',
                gname: "results"
            });
      }, true);
    }
  };
  // Initializing Google Custom Search Engine
  window.__gcse = {
    parsetags: 'explicit',
    initializationCallback: myInitCallback
  };
