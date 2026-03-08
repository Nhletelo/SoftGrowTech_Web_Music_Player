const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlistUI = document.getElementById("playlist");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

let currentSong = 0;

const songs = [
{
    title:"All In",
    artist:"Nasty C",
    src:"music/song1.mp3",
    duration:"3:55"
},
{
    title:"Soja",
    artist:"Black Sherif",
    src:"music/song2.mp3",
    duration:"3:01"
},
{
    title:"Can't Help It",
    artist:"Jomo Kays",
    src:"music/song3.mp3",
    duration:"3:07"
}
];

function loadSong(index){
    const song = songs[index];
    audio.src = song.src;
    title.textContent = song.title;
    artist.textContent = song.artist;
}

function playSong(){
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseSong(){
    audio.pause();
    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
    if(audio.paused){
        playSong();
    }else{
        pauseSong();
    }
});

nextBtn.addEventListener("click", () => {
    currentSong++;
    if(currentSong >= songs.length){
        currentSong = 0;
    }
    loadSong(currentSong);
    playSong();
});

prevBtn.addEventListener("click", () => {
    currentSong--;
    if(currentSong < 0){
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

function displayPlaylist(){
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist} (${song.duration})`;

        li.addEventListener("click", () => {
            currentSong = index;
            loadSong(index);
            playSong();
        });

        playlistUI.appendChild(li);
    });
}

displayPlaylist();
loadSong(currentSong);