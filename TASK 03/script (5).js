const songs = [
  {
    title: "Vinmeen Vithayil",
    artist: "Harris Jayaraj",
    cover: "https://i1.sndcdn.com/artworks-000072931355-lj3mbw-t500x500.jpg",
    file: "song1.mp3"
  },
  {
    title: "Aalaporan Tamizhan",
    artist: "A. R. Rahman",
    cover: "https://upload.wikimedia.org/wikipedia/en/0/05/Aalaporan_Thamizhan.jpg",
    file: "song2.mp3"
  },
  {
    title: "Why This Kolaveri",
    artist: "Dhanush",
    cover: "https://i.ytimg.com/vi/BwpXzt20pQw/hqdefault.jpg",
    file: "song3.mp3"
  }
];

let currentIndex = 0;

// DOM elements
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const timeDisplay = document.getElementById("songTime");
const coverImg = document.getElementById("currentCover");
const titleText = document.getElementById("songTitle");
const artistText = document.getElementById("songArtist");

// Load and play a song
function loadSong(index) {
  const song = songs[index];
  coverImg.src = song.cover;
  titleText.textContent = song.title;
  artistText.textContent = song.artist;
  audio.src = song.file;

  // Play the song
  audio.play().then(() => {
    playPauseBtn.textContent = "⏸";
  }).catch((err) => {
    console.error("Audio error:", err);
  });
}

// Toggle play/pause
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
});

// Show song progress (every second)
audio.addEventListener("timeupdate", () => {
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  timeDisplay.textContent = ${minutes}:${seconds};
});

// Next/Previous buttons
document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
});

// Load the first song on page load
window.addEventListener("DOMContentLoaded", () => {
  loadSong(currentIndex);
});