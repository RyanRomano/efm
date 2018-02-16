/* JS goes here */
let allShows;
//xscroll pos
let position = 0;

$('document').ready(function() {
    //grab url parts
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    let path = window.location.href;
    let pathID = path.split("=")[1];

    //watch horizontal scroll
    $('#shows-list-container').on('scroll', function() {
        position = $(this).scrollLeft();
    });

    $.ajax({
        type : 'GET',
        url : 'http://localhost:3000/shows',
        success : function(response) {
            handleShowsLoaded(response);
            let numberCaption = document.createElement('h2');

            //Land on home -> render 1st show, else render by id
            if(path == baseUrl){                
                //toggle active class
                $('#shows-list li').removeClass('active');
                $('#shows-list li').first().addClass('active');
                
                //Create caption for first show in show selector
                numberCaption.innerHTML = $('#' + response[0].id).index() + 1;
                numberCaption.setAttribute("id", "after");
                let selectedShow = document.getElementById(response[0].id);
                selectedShow.appendChild(numberCaption);

                setSelectedShow(response[0].id);
            } else {
                //toggle active class
                $('#shows-list li').removeClass('active');
                $('#'+pathID).addClass('active');

                //Jump to position when LI clicked
                $('#shows-list-container').scrollLeft(sessionStorage.getItem("position"));

                //Create number caption under active show selector
                numberCaption.innerHTML = $('#' + pathID).index() + 1;
                numberCaption.setAttribute("id", "after");
                let selectedShow = document.getElementById(pathID);
                selectedShow.appendChild(numberCaption);

                setSelectedShow(pathID);
            }
        },
        error : function(xhr, textStatus, errorThrown) {
            console.log("error");
        }
    });
});

function handleShowsLoaded(shows){

    allShows = shows;
    for(let i=0; i < allShows.length; i++){
        //Create LI with id=show.id
        let id = allShows[i].id;
        let ul = document.getElementById("shows-list");
        let li = document.createElement("li");
        li.setAttribute("id", id);

        //Get base url
        let getUrl = window.location;
        let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

        //save current position, href to new url, set show
        li.onclick = function() {
            location = (baseUrl + "?id=" + id);
            sessionStorage.setItem("position", position);
            window.location =  baseUrl + '?id=' + id;
            setSelectedShow(id);
        };
        //add to show selector list of [] [] [] ...
        ul.appendChild(li);
    }
}

//Get show
function getShowByID(showID){
    for(let i=0; i < allShows.length; i++){
        if(allShows[i].id == showID){
            return allShows[i];
        }
    }
}

function setSelectedShow(showID) {

    let show = getShowByID(showID);

    //Get reference to HTML to fill
    let imageElement = document.getElementById("selected-show-image");
    let episodesElement = document.getElementById("selected-show-episodes");
    let titleElement = document.getElementById("selected-show-title");

    //Grab data from show
    let showImage = show.product_image_url;
    let showEpisodes = show.episodes;
    let showTitle = show.title;

    //Set data
    imageElement.setAttribute("src", showImage);
    episodesElement.innerHTML = showEpisodes + " EPISODES";
    titleElement.innerHTML = showTitle.toUpperCase();
}