const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const volumeBtn = document.getElementById('volume-btn');
const volumeBar = document.getElementById('volume-bar')

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacito Design',
    },
];

// Chech if palying
let isPlaying = false;
let mainVolume= 0.5;

// Play

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or pause

playBtn.addEventListener('click', ()=> isPlaying ? pauseSong() : playSong() )


//Update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}

// Current song
let songIndex = 0;

// Next Song

function nextSong() {
    songIndex++;
    if ( songIndex > songs.length)  {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();

}

// Previous Song

function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong();

}

// On Load - select first song

loadSong(songs[songIndex]);

//  Update progress Bar

function updateProgressBar(e) {
    if(isPlaying) {      
        const {duration, currentTime} = e.srcElement;
        // update progress bar with
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Duration calc
        const durationMinutes = Math.floor(duration/60);
        let duratioSeconds = Math.floor(duration % 60);
        if (duratioSeconds < 10) {
            duratioSeconds = `0${duratioSeconds}`;
        };
        
        //delay Nan
        if(duratioSeconds) {
            durationEl.textContent = `${durationMinutes}:${duratioSeconds}`;
        }
        //Calculate display current
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        };
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        // music.volume = 0.1;
        
    }
}


function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration;
   
}   

function openVolumeBar() {
    volumeBar.hidden = !volumeBar.hidden;
    
}

function volumeBarEvents(e) {
    const fullVol = 155;
    console.log(e)
    let myVolume =  Math.round(150 - e.layerY);
    mainVolume = myVolume/150;
    console.log(e.layer)
    volumeBar.style.setProperty('--number', myVolume);
    volumeBar.style.setProperty('--number2', 100 - myVolume);
    music.volume = mainVolume;
   
    openVolumeBar();

}

function volumMmute() {
    console.log(volumeBtn.classList)
    if( volumeBtn.classList[1] === "fa-volume-up"){
    volumeBtn.classList.replace("fa-volume-up", "fa-volume-mute")
    music.volume = 0
    } else {
        volumeBtn.classList.replace("fa-volume-mute", "fa-volume-up")
        music.volume = mainVolume;
    }
}
// Event Listeners

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
volumeBtn.addEventListener('mouseover', openVolumeBar);
volumeBtn.addEventListener('click', volumMmute);

volumeBar.addEventListener('click', volumeBarEvents);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
