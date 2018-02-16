/* JS goes here */
var allShows;
$('document').ready(function() {
    $.ajax({
        type : 'GET',
        url : 'http://localhost:3000/shows',
        success : function(response) {
            handleShowsLoaded(response);
            setSelectedShow(response[0].id);
            $('#shows-list li').first().addClass('active');
        },
        error : function(xhr, textStatus, errorThrown) {
            console.log("error");
        }
    });
});

function handleShowsLoaded(shows){
    allShows = shows;
    //loop thru all shows, fill the UL (data-id= show.id)
    for(let i=0; i < allShows.length; i++){
        let id = allShows[i].id;
        let ul = document.getElementById("shows-list");
        let li = document.createElement("li");
        li.setAttribute("id", id); // added line)
        li.onclick = function() {
            $('#shows-list li').removeClass('active');
            $(this).addClass('active');
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
    let episodesElement = document.getElementById("selected-show-episodes");
    let titleElement = document.getElementById("selected-show-title");

    let showImage = show.product_image_url;
    let showEpisodes = show.episodes;
    let showTitle = show.title;

    imageElement.setAttribute("src", showImage);
    episodesElement.innerHTML = showEpisodes + " EPISODES";
    titleElement.innerHTML = showTitle;
}