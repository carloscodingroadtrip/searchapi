// API key  SD0M60BqZZdOFGH7yLnrDxkB0hPcjY2g   //Images to use from the API: fixed_height_still & fixed_height
$(document).ready(function (){
    var arrTheme = ['Batman', 'Superman', 'Wonder Woman', 'Green Lantern','The Flash', 'BatGirl','Aquaman','Bane','Firestorm','Hawkman'];
    var query, rating, newBtn,queryURL, imgHt, imgWd, xAxis, newImgWidth, responseAPI, clickedImgIndex;
    var limit = 12;
    var gifsData = [];

    // Append the first 12 btns from our array to the page
    for (var item in arrTheme) {
        $('#displaybuttons').append(`<button class="btn btn-success">${arrTheme[item]}</button>`);
    }

    //Listen to Enter (key), then create a new button and also call the searchAPI function
    document.addEventListener("keydown", function(e) {  //listen for keydown "ENTER"
        if((e.which === 13)) {
            e.preventDefault();
            newBtn = $('#user-search').val(); //Get the value from the input field
            //if value was NOT empty, then
            if (newBtn !== '') {
                $('#displaybuttons').append(`<button class="btn btn-warning">${newBtn}</button>`); //add the button
                $('input').val(''); //Clear the user input field.
                $('#content').empty(); //remove any gifs with the class 'gif'
                //Build the queryURL
                queryURL = `https://api.giphy.com/v1/gifs/search?api_key=SD0M60BqZZdOFGH7yLnrDxkB0hPcjY2g&q=${newBtn}&limit=${limit}&offset=0&rating=&lang=en`;
                //Call the API with our query
                searchAPI(queryURL);
            }
        }
    });

    //Listen to the on click event on any button being displayed.
    $(document).on("click", "button", function (e) {
        $("#content").empty();
        query = e.target.textContent;
        queryURL = `https://api.giphy.com/v1/gifs/search?api_key=SD0M60BqZZdOFGH7yLnrDxkB0hPcjY2g&q=${query}&limit=${limit}&offset=0&rating=&lang=en`;
        searchAPI(queryURL);
    });

    //Query the API and get the response.
    function searchAPI(queryURL) {
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (res) {
            //Allocate the response to a global variable called responseAPI
            $.each(res.data, function (index, item) {
                imgHt = item.images.fixed_height_still.height;
                imgWd = item.images.fixed_height_still.width;
                xAxis = 125 / imgHt;
                newImgWidth = xAxis * imgWd;
                 $("#content").append(`<div class="gif"><p>Rating: ${item.rating.toUpperCase()}</p>
                    <img src=${item.images.fixed_height_still.url} width=${newImgWidth} height="125" value=${index} />
                    </div>`);
            });
            responseAPI = res;
        });
    }

    //Below will grab the onClick on any of our images being displayed.
    $("#content").on("click", "img" , function() {
        var clickedImg = $(this), //Get the image that was clicked
            clickedImgIndex = clickedImg.attr("value"); //Get the value attriburte

        //Use the current source attribute to compare it to our responseAPI data.
        if (clickedImg.attr("src") === responseAPI.data[clickedImgIndex].images.fixed_height_still.url) {
            clickedImg.attr("src", responseAPI.data[clickedImgIndex].images.fixed_height.url);
        } else {
            clickedImg.attr("src", responseAPI.data[clickedImgIndex].images.fixed_height_still.url);
        }
    });
});
