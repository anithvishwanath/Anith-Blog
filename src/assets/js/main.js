document.addEventListener('DOMContentLoaded', function () {
    barba.use(barbaCss);

    barba.init({
        prevent: ({ el }) => {
            return el.classList.contains('rss-link');
        },
        transitions: [
            {
                name: 'fade',
                once() { },
                beforeEnter(data) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                },
                afterEnter(data) {
                    data.next.container.classList.remove('fade-enter', 'fade-enter-active');
                    fetchNowPlaying();
                }
            }
        ]
    });
});

function fetchNowPlaying() {
    var apiLink = "https://ws.audioscrobbler.com/2.0/?";
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
        document.getElementById("track-name").textContent = "";
        document.getElementById("artist-name").textContent = "";
        document.getElementById("album-artwork").setAttribute("src", "");
        document.getElementById("listen-date").textContent = "";

        // Process the track data received from the API (e.g., display it)
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
            statusElement.textContent += "🎶 Now playing on Spotify";
        } else {
            // var date = data.recenttracks.track[0].date["uts"];
            // console.log(date);
            //statusElement.textContent = date;
            var date = parseInt(data.recenttracks.track[0].date.uts);
            var localDate = new Date(date * 1000);

            var dateTimeOptions = {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short"
            }

            var localDateTimeString = localDate.toLocaleString("en-CA", dateTimeOptions);

            // var testString = {{ listenDateTime }};

            // Manually capitalize "a.m." and "p.m."
            localDateTimeString = localDateTimeString.replace(/\ba\.m\./gi, "am").replace(/\bp\.m\./gi, "pm");

            // Remove space between time and "AM/PM" indicator
            localDateTimeString = localDateTimeString.replace(/\s(am|pm)/gi, "$1");

            statusElement.textContent = localDateTimeString;
        }
    }

    // Fetch data using Fetch API
    fetch(link)
        .then(response => response.json()) // Parse the response as JSON
        .then(getTrackData) // Call the getTrackData function with the parsed data
        .catch(error => console.error(error)); // Handle any errors
    //})
}