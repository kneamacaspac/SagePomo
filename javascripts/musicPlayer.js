const closeEditMusicButton = document.getElementById("closeEditMusic");

closeEditMusicButton.addEventListener("click", () => {
    document.querySelector(".editMusic").style.display = "none";
});

const spotifySetting = document.getElementById("spotifySettingButton");

spotifySetting.addEventListener("click", () => {
    document.querySelector(".editMusic").style.display = "flex";
});

const localMusicSetting = document.getElementById("localMusicSettingButton");

localMusicSetting.addEventListener("click", () => {
    document.querySelector(".editMusic").style.display = "flex";
});

spotifyMode = document.querySelector("input[name='playlist'][value='spotify']");
spotifyMode.checked = true;

localMusicMode = document.querySelector("input[name='playlist'][value='localMusic']");

const saveMusicButton = document.getElementById("saveMusicButton");
const spotifyLink = document.getElementById("linkInput");

saveMusicButton.addEventListener("click", () => {
    // Update playlist mode 
    const selectedPlaylistMode = document.querySelector("input[name='playlist']:checked").value;

    if (selectedPlaylistMode === "spotify") {
        document.getElementById("spotifyContainer").style.display= "flex";
        document.getElementById("localContainer").style.display = "none";
        
        let url = spotifyLink.value.trim();
        url = url.replace("open.spotify.com/", "open.spotify.com/embed/");

        document.querySelector("iframe").src = url;
        
    } else if (selectedPlaylistMode === "localMusic") {
        document.getElementById("spotifyContainer").style.display = "none";
        document.getElementById("localContainer").style.display = "flex";
    }
});

const spotifySwitch = document.getElementById("spotifySwitchButton");

spotifySwitch.addEventListener("click", () =>{
        spotifyMode.checked = true;
        document.getElementById("spotifyContainer").style.display= "flex";
        document.getElementById("localContainer").style.display = "none";
});

const localMusicSwitch = document.getElementById("localMusicBut");

localMusicSwitch.addEventListener("click", () =>{
        localMusicMode.checked = true;
        document.getElementById("spotifyContainer").style.display= "none";
        document.getElementById("localContainer").style.display = "flex";
});

//Local Music Feature
const audio = document.getElementById("audio");
const cover = document.getElementById("songCover");
const title = document.getElementById("songTitle");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const playlistBtn = document.getElementById("list");
const playlistEl = document.getElementById("playlist");
const loopBtn = document.getElementById("loop");

const playlistButtons = document.querySelectorAll(".playlist-btn");

let isLooping = false;
let currentPlaylist = "cozy"; 
let songIndex = 0;
let isPlaying = false;

const songs = {
  cozy: [
    { title: "Cozy 1", src: "assets/music/cozyJazz/cozy1.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" },
    { title: "Cozy 2", src: "assets/music/cozyJazz/cozy2.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic2.jpg" },
    { title: "Cozy 3", src: "assets/music/cozyJazz/cozy3.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" },
    { title: "Cozy 4", src: "assets/music/cozyJazz/cozy4.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" }
  ],

  piano: [   
    { title: "Piano 1", src: "assets/music/cozyJazz/cozy1.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" },
    { title: "Piano 2", src: "assets/music/cozyJazz/cozy2.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic2.jpg" },
    { title: "Piano 3", src: "assets/music/cozyJazz/cozy3.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" },
    { title: "Piano 4", src: "assets/music/cozyJazz/cozy4.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" }
  ],
  lofi: [   
    { title: "Lofi 1", src: "assets/music/cozyJazz/cozy1.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" },
    { title: "Lofi 2", src: "assets/music/cozyJazz/cozy2.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic2.jpg" },
    { title: "Lofi 3", src: "assets/music/cozyJazz/cozy3.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" },
    { title: "Lofi 4", src: "assets/music/cozyJazz/cozy4.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" }
  ],
  nature: [   
    { title: "Nature 1", src: "assets/music/cozyJazz/cozy1.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" },
    { title: "Nature 2", src: "assets/music/cozyJazz/cozy2.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic2.jpg" },
    { title: "Nature 3", src: "assets/music/cozyJazz/cozy3.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" },
    { title: "Nature 4", src: "assets/music/cozyJazz/cozy4.mp3", cover: "assets/musicCovers/cozyMusicCovers/cozyPic1.jpg" }
  ]
};

//when user clicks from settings
playlistButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const selected = btn.dataset.playlist; // cozy, nature, lofi, piano

        console.log("Selected playlist:", selected);

        // Fix: switch playlist properly
        changePlaylist(selected);

        // highlight clicked button
        playlistButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

function changePlaylist(name) {
    currentPlaylist = name;   
    songIndex = 0;

    loadSong(0);            
    audio.play();
    isPlaying = true;

    updatePlaylistUI();     
}


function loadLocalPlaylist(songsArray) {
    currentPlaylist = songsArray;
    currentSongIndex = 0;

    audio.src = currentPlaylist[currentSongIndex];
    audio.play();
}


// Load selected song
function loadSong(index) {
    const song = songs[currentPlaylist][index];

    audio.src = song.src;
    cover.src = song.cover;
    title.textContent = song.title;
}

loadSong(songIndex);

// Play / Pause
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        document.querySelector("#play img").src = "assets/buttonsSvg/playMusic.svg";
    } else {
        audio.play();
        document.querySelector("#play img").src = "assets/buttonsSvg/pauseMusic.svg";
    }
    isPlaying = !isPlaying;
});

// Next Song
nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs[currentPlaylist].length;
    loadSong(songIndex);
    audio.play();
    isPlaying = true;
});


// Previous Song
prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs[currentPlaylist].length) % songs[currentPlaylist].length;
    loadSong(songIndex);
    audio.play();
    isPlaying = true;
});


// Update progress bar
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

// Seek in audio
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Toggle playlist
playlistBtn.addEventListener("click", () => {
    playlistEl.classList.toggle("hidden");
});

const playlistList = document.getElementById("playlistList");

playlistList.addEventListener("change", (e) => {
    currentPlaylist = convertPlaylistName(e.target.value);
    songIndex = 0;
    
    updatePlaylistUI();
    loadSong(0);
});

function convertPlaylistName(str){
    if (str === "cozyJazz") return "cozy";
    if (str === "natureSounds") return "nature";
    if (str === "lofiMix") return "lofi";
    if (str === "softPiano") return "piano";
}

function updatePlaylistUI(){
    playlistEl.innerHTML = "";

    songs[currentPlaylist].forEach((song, idx) => {
        const li = document.createElement("li");
        li.textContent = song.title;
        li.dataset.index = idx;
        playlistEl.appendChild(li);
    });
}

updatePlaylistUI();

playlistEl.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        songIndex = e.target.getAttribute("data-index");
        loadSong(songIndex);
        audio.play();
        isPlaying = true;
        document.querySelector("#play img").src = "assets/buttonsSvg/pauseMusic.svg";
    }
});


//Loop Music
loopBtn.addEventListener("click", () => {
    isLooping = !isLooping;

    // Change icon
    document.querySelector("#loop img").src = 
        isLooping 
        ? "assets/buttonsSvg/looped.svg" 
        : "assets/buttonsSvg/loop.svg";

    // Update audio element loop property
    audio.loop = isLooping;
});


audio.addEventListener("ended", () => {
    if (!isLooping) {
        songIndex = (songIndex + 1) % songs[currentPlaylist].length;
        loadSong(songIndex);
        audio.play();
    }
});




