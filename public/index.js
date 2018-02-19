//////////////////////////////////////////////////////////////////////////////////////////
// Makes a request for Show Data, sets current show
let allShows;
let pathID = getParameterByName("id",window.location);

$('document').ready(function() {
    $.ajax({
        type : 'GET',
        url : '/shows',
        success : function(response) {

            // Populate HTML elements with data
            handleShowsLoaded(response);

            // Checks URL param for current ID, sets selected show with corresponding ID
            let activeShowId = response[0].id;
            if (pathID != null && pathID != "") {
              activeShowId = pathID;
            }
            setSelectedShow(activeShowId)
        },
        error : function(xhr, textStatus, errorThrown) {
            console.log("error");
        }
    });
});

//////////////////////////////////////////////////////////////////////////////////////////
// Creates List Items and Assigns id to each. On LI click, set the URL with ID param "?=idHere"
function handleShowsLoaded(shows){
    allShows = shows;
    for(let i=0; i < allShows.length; i++){

        // Create LI with id=show.id
        let id = allShows[i].id;
        let ul = document.getElementById("shows-list");
        let li = document.createElement("li");
        li.setAttribute("id", id);

        // Get base url
        let getUrl = window.location;
        let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

        // Save current position, href to new url, set show
        li.onclick = function() {
            location = (baseUrl + "?id=" + id);
            window.location =  baseUrl + '?id=' + id;
            // setSelectedShow(id);
        };

        // Add to show selector list of [] [] [] ...
        ul.appendChild(li);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
// Returns show based on provided ID
function getShowByID(showID){
    for(let i=0; i < allShows.length; i++){
        if(allShows[i].id == showID){
            return allShows[i];
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
// Fills html elements with data from show, from given show ID
function setSelectedShow(pathID) {
    setPageState(pathID);
    let show = getShowByID(pathID);

    // Get reference to HTML to fill elements
    let imageElement = document.getElementById("selected-show-image");
    let episodesElement = document.getElementById("selected-show-episodes");
    let titleElement = document.getElementById("selected-show-title");

    // Grab data from show
    let showImage = show.product_image_url;
    let showEpisodes = show.episodes;
    let showTitle = show.title;

    // Set data
    imageElement.setAttribute("src", showImage);
    episodesElement.innerHTML = showEpisodes + " EPISODES";
    titleElement.innerHTML = showTitle.toUpperCase();
}

//////////////////////////////////////////////////////////////////////////////////////////
// https://stackoverflow.com/a/17086002
// returns segment of URL ("id", url) - returns a9/d6/b8,etc
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//////////////////////////////////////////////////////////////////////////////////////////
// Sets active list item in show selector & inserts index beneath it. 
// Scrolls to active item on reload
function setPageState(pathID){
    let numberCaption = document.createElement('h2');
    if(pathID == ""){                
        //toggle active class
        $('#shows-list li').removeClass('active');
        $('#shows-list li').first().addClass('active');
        
        //Create caption for first show in show selector
        numberCaption.innerHTML = $('#' + response[0].id).index() + 1;
        numberCaption.setAttribute("id", "after");
        let selectedShow = document.getElementById(response[0].id);
        selectedShow.appendChild(numberCaption);
        
    } else {
        //toggle active class
        $('#shows-list li').removeClass('active');
        $('#'+pathID).addClass('active');

        //Get target container and target scroll location
        let $container = $('#shows-list');
        let $scrollTo = $('#' + pathID);

        //Scroll to target
        //if screen is less than 980
        if($(window).width() < 980) {
            $container.scrollLeft(
                $scrollTo.offset().left - $container.offset().left - 145
            );
        } else {
            $container.scrollLeft(
                $scrollTo.offset().left - $container.offset().left - 150
            );
        }

        //Create number caption under active show selector
        numberCaption.innerHTML = $('#' + pathID).index() + 1;
        numberCaption.setAttribute("id", "after");
        let selectedShow = document.getElementById(pathID);
        selectedShow.appendChild(numberCaption);
    }
}