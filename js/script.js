var topics = ["Colombia","France","Italy","Brasil","United States","Portugal","Argentina","Chile"];
var countriesdiv = document.getElementById("countries");
var buttons = document.getElementsByClassName("countriesbtn");
var imagecontaindiv = document.getElementById ("imagecontain");
var url = "https://api.giphy.com/v1/gifs/search?api_key=RANHjz2L1Drs7AUTUKTyWRWnP2iuiQpy&q=";

//loop through topics array, create buttons and add them to our DIV
for(var i = 0;i < topics.length; i++){
    countriesdiv.innerHTML += '<button id="" type="button" class="countriesbtn btn btn-primary">' + topics[i] +  '</button>';    
}

function getCountryGifs(countryName) {
    var still = [];
    var playingImg = [];
    var markupStill = '';
    imagecontaindiv.innerHTML = '';

    //this gets our data from the API
    fetch(url +  countryName + '&limit=10')
        .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        //this creates our still image and animated image arrays
        for(var ij = 0;ij < myJson.data.length; ij++){
            markupStill = '<div><img class="' + ij + '" width="200" src="' + myJson.data[ij].images.original_still.url  + '" /><br>'+ myJson.data[ij].rating + '</div>'
            
            still.push(myJson.data[ij].images.original_still.url);
            playingImg.push(myJson.data[ij].images.preview_gif.url);
            
            //adds the current still images to the DOM
            imagecontaindiv.innerHTML += markupStill;
        }

        $("#imagecontain img").each(function(i){
            var index = i;
            $(this).on("click", function(){
                var fileEx = $(this).attr('src');

                if(fileEx.search("preview") < 0){
                    $(this).attr('src', playingImg[index]);
                } else {
                    $(this).attr('src', still[index]);
                }
            });
        });
    });
}

function appendEvents(){
    $(".countriesbtn").each(function(i){
        var index = i;
        $(this).on("click", function(){
            getCountryGifs(topics[index]);
        }); 
    });
}

$(document).ready(function(){
    appendEvents();

    var userInput = document.getElementById("userInput");
    $("#add").on("click", function(){
        topics.push(userInput.value);

        countriesdiv.innerHTML += '<button id="" type="button" class="countriesbtn btn btn-primary">' + userInput.value +  '</button>';
        appendEvents();
    });

});

