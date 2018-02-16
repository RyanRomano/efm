/* JS goes here */
var allShows;
$('document').ready(function() {
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    let path = window.location.href;
    let pathID = path.split("=")[1];

    $.ajax({
        type : 'GET',
        url : 'http://localhost:3000/shows',
        success : function(response) {
            handleShowsLoaded(response);
            if(path == baseUrl){
                setSelectedShow(response[0].id);
                $('#shows-list li').removeClass('active');
                $('#shows-list li').first().addClass('active');
            } else {
                setSelectedShow(pathID);
                $('#shows-list li').removeClass('active');
                $('#'+pathID).addClass('active');

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
        let id = allShows[i].id;
        let ul = document.getElementById("shows-list");
        let li = document.createElement("li");
        li.setAttribute("id", id);
        let getUrl = window.location;
        let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

        li.onclick = function(e) {
            e.preventDefault();
            location = (baseUrl + "?id=" + id);
            window.location =  baseUrl + '?id=' + id;
            setSelectedShow(id);
        };

        ul.appendChild(li);
    }
}

function getShowByID(showID){
    for(let i=0; i < allShows.length; i++){
        if(allShows[i].id == showID){
            return allShows[i];
        }
    }
}

function setSelectedShow(showID) {

    show = getShowByID(showID);

    let imageElement = document.getElementById("selected-show-image");
    imageElement.setAttribute("src", "");

    let episodesElement = document.getElementById("selected-show-episodes");
    let titleElement = document.getElementById("selected-show-title");

    let showImage = show.product_image_url;
    let showEpisodes = show.episodes;
    let showTitle = show.title;

    imageElement.setAttribute("src", showImage);
    episodesElement.innerHTML = showEpisodes + " EPISODES";
    titleElement.innerHTML = showTitle;
}


// let url = window.location.href;
// let urlArray = url.split('=');
// let path = urlArray[1];

// for(let i=0; i < response.length; i++){
//     if(response[i].id == path) {
//         setSelectedShow(response[i].id);
//         $('#shows-list li').nth-child(i).addClass('active');
//     } else {
//      setSelectedShow(response[0].id);
//      $('#shows-list li').first().addClass('active');
//     }
// }

// let getUrl = window.location;
// let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
// location.href = baseUrl + "?id=" + id;
