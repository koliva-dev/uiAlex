async function youTubeIframeManagaer(
    utubeAnchorElt,
    scriptUtubeId,
    videoHeight,
    videoWidth,
    videoId
) {
    var utubeScriptTag = document.getElementById(`${scriptUtubeId}`);
    utubeScriptTag.src = "https://www.youtube.com/iframe_api";
    utubeScriptTag.defer = true;
    utubeAnchorElt.appendChild(utubeScriptTag);

    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player(`${utubeAnchorElt.id}`, {
            height: `${videoHeight}`,
            width: `${videoWidth}`,
            videoId: `${videoId}`,
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }
}