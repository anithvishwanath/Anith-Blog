document.addEventListener("DOMContentLoaded", function () {
    var apiLink = "http://ws.audioscrobbler.com/2.0/?";
    var method = "user.getrecenttracks";
    var user = "pxperlove";
    var api_key = "76141e8e654c9f354bda8423136669f9";
    var format = "json";

    var link =
        apiLink +
        "method=" +
        method +
        "&user=" +
        user +
        "&api_key=" +
        api_key +
        "&format=" +
        format;

    function getTrackData(data) {
        // Process the track data received from the API (e.g., display it)
        console.log(data); // Example: log the data to the console
        var track = data.recenttracks.track[0].name;
        document.getElementById("track-name").textContent += track;

        var artist = data.recenttracks.track[0].artist["#text"];
        document.getElementById("artist-name").textContent += artist;

        // Album art
        var img_src = data.recenttracks.track[0].image[3]["#text"];
        document.getElementById("album-artwork").setAttribute("src", img_src);

        getStatus(data);
    }

    function getStatus(data) {
        var isNowPlaying = data.recenttracks.track[0]["@attr"];

        var statusElement = document.getElementById("listen-date");

        // document.getElementById("listen-date").textContent += date;

        if (isNowPlaying) {
            statusElement.textContent += "Now playing on Spotify";
        } else {
            var date = data.recenttracks.track[0].date["#text"];
            console.log(date);
            statusElement.textContent = date;
        }
    }

    // Fetch data using Fetch API
    fetch(link)
        .then(response => response.json()) // Parse the response as JSON
        .then(getTrackData) // Call the getTrackData function with the parsed data
        .catch(error => console.error(error)); // Handle any errors
})