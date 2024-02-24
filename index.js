const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/TheKill.mp3',
        displayName: 'The Kill',
        cover: 'assets/TheKill.png',
        artist: '30 Seconds To Mars',
    },
    {
        path: 'assets/SelfEsteem.mp3',
        displayName: 'Self Esteem',
        cover: 'assets/SelfEsteem.png',
        artist: 'The Offspring',
    },
    {
        path: 'assets/HowYouRemindMe.mp3',
        displayName: 'How You Remind Me',
        cover: 'assets/HowYouRemindMe.png',
        artist: 'Nickelback',
    }
]

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;

    playBtn.classList.replace('fa-play', 'fa-pause'); //Change play button to pause button
    playBtn.setAttribute('title', 'Pause'); // Change button hover title
    music.play(); // play the music
}

function pauseMusic(){
    isPlaying = false;

    playBtn.classList.replace('fa-pause', 'fa-play'); //Change pause button to play button
    playBtn.setAttribute('title', 'Play'); // Change button hover title
    music.pause(); // pause the music
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    // ensures that navigation through the list of songs can cycle through continuously without exceeding the array's bounds.
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime =  (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}: ${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}: ${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);