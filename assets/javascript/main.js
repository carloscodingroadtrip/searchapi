// API key  SD0M60BqZZdOFGH7yLnrDxkB0hPcjY2g   // fixed_height_still & fixed_height
$(document).ready(() => {
    var arrTheme = ['Batman', 'Superman', 'Wonder Woman', 'Green Lantern','The Flash', 'BatGirl','Aquaman','Bane','Firestorm','Hawkman'];
    var query, rating, newBtn,queryURL, imgHt, imgWd, xAxis, newImgWidth;
    var limit = 15;

    // Append the first 15 btns from our array to the page
    for (var item in arrTheme) {
        $('#displaybuttons').append(`<button class="btn btn-success">${arrTheme[item]}</button>`);
    }

    //Listen to Enter (key), then create a new button and also call the searchAPI function
    document.addEventListener("keydown", function(event) {  //listen for keydown "ENTER"
        if((event.which === 13)) {
            event.preventDefault();
            newBtn = $('#user-search').val(); //Get the value from the input field
            //if value was NOT empty, then
            if (newBtn !== '') {
                $('#displaybuttons').append(`<button class="btn btn-warning">${newBtn}</button>`); //add the button
                $('input').val(''); //Clear the user input field.
                $('.gif').remove(); //remove any gifs with the class 'gif'
                //Build the queryURL
                queryURL = `https://api.giphy.com/v1/gifs/search?api_key=SD0M60BqZZdOFGH7yLnrDxkB0hPcjY2g&q=${newBtn}&limit=${limit}&offset=0&rating=&lang=en`;
                //Call the API with our query
                searchAPI(queryURL);
            }
        }
    });

    $(document).on('click', 'button', (e) => {
        $('.gif').remove();
        query = e.target.textContent;
        queryURL = `https://api.giphy.com/v1/gifs/search?api_key=SD0M60BqZZdOFGH7yLnrDxkB0hPcjY2g&q=${query}&limit=${limit}&offset=0&rating=&lang=en`;
        searchAPI(queryURL);
    });

    function searchAPI(queryURL) {
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then((res) => {
            console.log(res.data);
            $.each(res.data, (index, item) => {
                imgHt = item.images.fixed_height_still.height;
                imgWd = item.images.fixed_height_still.width;
                xAxis = 125 / imgHt;
                newImgWidth = xAxis * imgWd;
                $('#content').append(`<div class="gif"><p>Rating: ${item.rating.toUpperCase()}</p><img src=${item.images.fixed_height_still.url} width=${newImgWidth} height="125"></div>`);
            });
        });
    }

});