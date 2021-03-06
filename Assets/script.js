// var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=622cc2d17b381749819ca514f549fee0";
// var queryURL2 = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?id=524901&appid=622cc2d17b381749819ca514f549fee0";
// var queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";
//  var queryParams1 = {
//     "appid": "622cc2d17b381749819ca514f549fee0",
//     q: "city"
// }
// var queryParams2 = {
//     "api-key": "622cc2d17b381749819ca514f549fee0",
//     q: "city"
// }
// var queryParams3 = {
//     "api-key": "622cc2d17b381749819ca514f549fee0",
//     q: "city"
// }
// // console.log(queryURL + $.param(queryParams));
// // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=WXFWGVAR0fkuPpmxkZS8wDgQhwKGXnTD

// // queryParams.q = $('#search-term').val().trim()

// $.ajax({
//     url: queryURL,
//     method: "GET",
//     // data: queryParams
//   })
//   .then(function(response){
// console.log(response)
// });

// $.ajax({
//     url: queryURL2,
//     method: "GET",n
//     // data: queryParams
//   })
//   .then(function(response){
// console.log(response)
// });

// function todayweather (){
// var newcity =  $("#currentCity").append(response);
// }



// store the value of the inputlet 
city = $("#searchTerm").val();// store api key
const apiKey = "&appid=622cc2d17b381749819ca514f549fee0";
apiKeyS = "622cc2d17b381749819ca514f549fee0";
let date = new Date();
$("#searchTerm").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});
$("#searchBtn").on("click", function () {
    $('#forecastH5').addClass('show');
    // get the value of the input from user  
    city = $("#searchTerm").val();    // clear input box  
    $("#searchTerm").val("");
    // full url to call api  const 
    queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
   

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let tempF = (response.main.temp - 273.15) * 1.80 + 32; console.log(Math.floor(tempF))
        getCurrentConditions(response); getCurrentForecast(response); makeList();
    })
});

// var lati 
// var long
// queryUrl2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKeyS + "&lat=" + lati + "&lon=" +long;
// $.ajax({ url: queryUrl2, method: "GET" }).then(function (response2) {
//   console.log(response2);
//    lati = response.coord.lat;
//    long = response.coord.lon;
// })

// $(".card").on("click", function(response) {
//     getCurrentConditions(response); 
//          });
function makeList() { let listItem = $("<li>").addClass("list-group-item").text(city); $(".list").append(listItem); }
function getCurrentConditions(response) {

    tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);
    $('#currentCity').empty();
    
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
    //  const UV = $("<p>").addClass("card-text current-UV").text("UV Index: " + response)
   
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)
}
function getCurrentForecast() {
    $.ajax({ url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey, method: "GET" }).then(function (response) {
        console.log(response)
        console.log(response.dt)
        $('#forecast').empty();
     
        let results = response.list;
        console.log(results)    
        startDate = 20    
        endDate = startDate + 5
        for (let i = 0; i < results.length; i++) {
            let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
            let hour = results[i].dt_txt.split('-')[2].split(' ')[1]; console.log(day); console.log(hour);
            if (results[i].dt_txt.indexOf("12:00:00") !== -1) {                     
                let temp = (results[i].main.temp - 273.15) * 1.80 + 32; let tempF = Math.floor(temp);
                const card = $("<div>").addClass("card col-md-2 ml-4 bg-secondary text-white");
                const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
                const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
                const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
                cardBody.append(cityDate, image, temperature, humidity); card.append(cardBody); $("#forecast").append(card);
            }
        }
    });
}

