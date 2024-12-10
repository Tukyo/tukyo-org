const playButton = document.querySelector("#playButton")
const playButtonIcon = document.querySelector("#playButtonIcon")
const waveform = document.querySelector("#waveform")
const volumeIcon = document.querySelector("#volumeIcon")
const volumeSlider = document.querySelector("#volumeSlider")
const currentTime = document.querySelector("#currentTime")
const totalDuration = document.querySelector("#totalDuration")
const trackContainer = document.querySelector(".track-container");
const trackList = document.querySelector(".track-list");
const backButton = document.getElementById("back-button");
const trackTitleElement = document.getElementById("track-title");
const rootStyles = getComputedStyle(document.documentElement);

const audioData = {
    "Tukyo": {
        "Nibble": {
            "tracks": [
                "deSypher.mp3",
                "TariByte.mp3",
                "Eye2Eye.mp3",
                "Intercourse.mp3",
                "Shitufkc.mp3",
                "Tukyo.mp3",
            ],
            "color": "#1f1f1f"
        },
        "Artificiaphobia": {
            "tracks": [
                "Palace (feat. Midari).mp3",
                "EIP-3675.mp3",
                "Program Files (x86) (feat. Midari).mp3",
                "Chaos Computer Club (feat. Midari).mp3",
                "Terminal D.mp3",
                "Artificiaphobia (feat. Midari).mp3",
            ],
            "color": "#f25cad"
        },
        "Book of Twilight": {
            "tracks": [
                "Book of Twilight.mp3"
            ],
            "color": "#471844"
        },
        "Profectio": {
            "tracks": [
                "Introduction.mp3",
                "Opener.mp3",
                "ClockWork.mp3",
                "Hilltop Reprise.mp3",
                "Clam Shell Tribune.mp3",
                "Naiwatha Village.mp3",
                "Throne.mp3",
                "Interlude.mp3",
                "Slow Movement.mp3",
                "Continuation X.mp3",
                "Harp Interlude.mp3",
                "Forward Walk.mp3",
                "Cliffs of Shazaar.mp3",
                "Minor Occurrence.mp3",
                "I Have No Answer.mp3",
                "Doreen Armitage.mp3"
            ],
            "color": "#7f5fa0"
        },
        "Coloboma": {
            "tracks": [
                "The Legend Has Awoken.mp3",
                "The Artifact.mp3",
                "Normal Boy.mp3",
                "Too Late.mp3",
                "Interlude (Heart Pulse).mp3",
                "All Comes Crumbling Down.mp3",
                "Watchu' Need.mp3",
                "Never Say.mp3",
                "You Know the Cost.mp3",
                "Interlude (Night Alone).mp3",
                "Finger.mp3",
                "Pink 2.mp3"
            ],
            "color": "#e29e45"
        },
        "Video Game Alchemy": {
            "tracks": [
                "Side Street Dice.mp3",
                "Game_ver. 07.4-1.mp3",
                "Telepathy Potion.mp3",
                "Control Options Screen (Star Fox) X (llusion).mp3",
                "Arturian Sea.mp3",
                "Access Thru Wilderness_a.mp3",
                "Inshmanity Man.mp3",
                "Pixel Blast.mp3",
                "Your Side See Me.mp3",
                "Chronograph.mp3",
                "Tea Time.mp3",
                "Finne.mp3"
            ],
            "color": "#000000"
        },
        "Bitter With You": {
            "tracks": [
                "Bitter With You.mp3"
            ],
            "color": "#c11919"
        },
        "Diversion": {
            "tracks": [
                "Take It All Together.mp3",
                "The Thought You Saw.mp3",
                "Got Stickers (Interlude).mp3",
                "Stay at Home.mp3",
                "Diversions.mp3"
            ],
            "color": "#535063"
        },
        "Complicite": {
            "tracks": [
                "Complicite.mp3",
                "Simplifico.mp3",
                "Babe You are No Ordinary Thing.mp3",
                "TKO.mp3",
                "Felice.mp3"
            ],
            "color": "#2bc7de"
        },
        "Shinto Shrine": {
            "tracks": [
                "Shinto Shrine.mp3"
            ],
            "color": "#99e462"
        },
        "Two-Thousand-Two": {
            "tracks": [
                "One to Four.mp3",
                "Waiting for You Since 2002.mp3",
                "You Were There.mp3",
                "Zero Gravity.mp3",
                "My Life Is a Tiger in a Wedding Dress.mp3"
            ],
            "color": "#f47444"
        },
        "Start Flowing": {
            "tracks": [
                "Crush.mp3",
                "Waves.mp3",
                "Midnight Summer.mp3",
                "Sophie.mp3",
                "Obelisk.mp3",
                "Conifers.mp3",
                "Calm.mp3",
                "Fly With Me.mp3",
                "Reality in Splendor.mp3",
                "Cigarette Princess.mp3"
            ],
            "color": "#f598df"
        }
    },
    "Navil": {
        "I used to dream about u": {
            "tracks": [
                "I used to dream about u.mp3"
            ],
            "color": "#000000"
        },
        "Eternal Embrace": {
            "tracks": [
                "Eternal Embrace.mp3",
                "Daydreaming.mp3",
                "Whispers of Affection.mp3",
                "What if I Screw it Up.mp3",
                "When We Are Asleep.mp3",
                "In My Head It All Sounds Like This.mp3"
            ],
            "color": "#8a9e74"
        },
        "Enjoy": {
            "tracks": [
                "Enjoy.mp3",
                "Your personality sucks.mp3",
                "No Matter What.mp3",
                "Blurred Vision.mp3",
                "Gone.mp3",
                "Back2thosedays.mp3",
                "Blue.mp3"
            ],
            "color": "#ef3102"
        },
        "In my room, thinking about all": {
            "tracks": [
                "I'm an angel.mp3",
                "First day of school.mp3",
                "Commercial Love.mp3",
                "Slow Lonely Day.mp3",
                "Summer.mp3"
            ],
            "color": "#c8491b"
        }
    }
};

let currentArtist = null;
let currentAlbum = null;
let waveColor = null;
let progressColor = null;
let albumColor = null;
let volume = 1;

const initializeWavesurfer = (waveColor, progressColor) => {
    if (waveColor === null && progressColor === null) { 
        waveColor = rootStyles.getPropertyValue('--primary-highlight-color').trim();
        progressColor = rootStyles.getPropertyValue('--secondary-highlight-color').trim();
    }

    return WaveSurfer.create({
        container: "#waveform",
        responsive: true,
        height: 80,
        waveColor: waveColor,
        progressColor: progressColor,
    })
}

const togglePlay = () => {
    wavesurfer.playPause()
    const isPlaying = wavesurfer.isPlaying()
    if (isPlaying) {
        playButtonIcon.src = "assets/img/icon/pause.svg"
    } else {
        playButtonIcon.src = "assets/img/icon/play.svg"
    }
}

const handleVolumeChange = (e) => {
    volume = e.target.value / 100
    wavesurfer.setVolume(volume)
    setSliderBackground(e.target)
}
volumeSlider.addEventListener('input', (e) => {
    setSliderBackground(e.target); // Update background on input
});
function setSliderBackground(slider) {
    const value = volume * 100;
    slider.style.background = `linear-gradient(to right, ${albumColor} ${value}%, transparent ${value}%)`;
}
const updateSliderColors = (albumColor) => {
    const sliderTrack = document.querySelector(".volume-slider");

    if (sliderTrack) {
        const value = volume * 100;
        sliderTrack.style.background = `linear-gradient(to right, ${albumColor} ${value}%, transparent ${value}%)`;
    }

    // Add custom styles for the slider thumb
    const style = document.createElement("style");
    style.innerHTML = `
        .volume-slider::-webkit-slider-thumb {
            background: ${albumColor};
        }
        .volume-slider::-moz-range-thumb {
            background: ${albumColor};
        }
        .volume-slider::-ms-thumb {
            background: ${albumColor};
        }
    `;
    document.head.appendChild(style);
};

const formatTimecode = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
}
const toggleMute = () => {
    const isMuted = wavesurfer.getMuted(); // Check if muted
    wavesurfer.setMuted(!isMuted); // Toggle mute state

    if (isMuted) {
        volumeIcon.src = "assets/img/icon/volume.svg"; // Change icon to volume
        volumeSlider.disabled = false; // Enable the volume slider
    } else {
        wavesurfer.setMuted(true); // Mute the audio
        volumeIcon.src = "assets/img/icon/mute.svg"; // Change icon to mute
        volumeSlider.disabled = true; // Disable the volume slider
    }
}

let wavesurfer = initializeWavesurfer(waveColor, progressColor)
volumeSlider.value = 100;
const initialTrack = "assets/audio/Tukyo/nibble/deSypher.mp3"

wavesurfer.load(initialTrack)
wavesurfer.on("audioprocess", () => { // Sets the timecode current timestamp as audio plays
    const time = wavesurfer.getCurrentTime()
    currentTime.innerHTML = formatTimecode(time)
})

playButton.addEventListener("click", togglePlay)
volumeIcon.addEventListener("click", toggleMute)
volumeSlider.addEventListener("input", handleVolumeChange)

// Load artists and their albums
const loadArtists = () => {
    trackList.innerHTML = "";

    const artistTitle = document.createElement("h2");
    artistTitle.innerHTML = "Artists";
    trackList.appendChild(artistTitle);

    trackList.classList.add("artist-list");
    trackList.classList.remove("track-list");
    backButton.style.display = "none";

    Object.keys(audioData).forEach(artist => {
        const artistItem = document.createElement("li");
        artistItem.textContent = `${artist}`;
        artistItem.classList.add("artist-item");
        artistItem.addEventListener("click", () => loadAlbums(artist));
        trackList.appendChild(artistItem);
    });
};

// Load albums for a specific artist
const loadAlbums = (artist) => {
    currentArtist = artist;
    trackList.innerHTML = "";
    trackList.classList.remove("artist-list");
    trackList.classList.remove("track-list");
    trackList.classList.add("album-list");
    backButton.style.display = "block";

    Object.keys(audioData[artist]).forEach(album => {
        const albumItem = document.createElement("li");
        albumItem.classList.add("album-item");

        // Create the album cover image
        const albumCover = document.createElement("img");
        albumCover.src = `assets/audio/${artist}/${album}/_cover.jpg`;
        albumCover.alt = `${album} Cover`;
        albumCover.classList.add("album-cover");

        // Create the album title
        const albumTitle = document.createElement("span");
        albumTitle.textContent = album === "Two-Thousand-Two" ? "2002" : album;
        albumTitle.classList.add("album-title");

        albumItem.id = album.replace(/\s/g, "-"); // Replace spaces with dashes for the ID

        // Append the title and cover to the album item
        albumItem.appendChild(albumCover);
        albumItem.appendChild(albumTitle);

        // Get the album color from audioData
        const albumColor = audioData[artist][album].color;

        // Apply hover effect with the exact hex color
        albumItem.addEventListener("mouseenter", () => {
            albumItem.style.backgroundColor = albumColor;
        });

        albumItem.addEventListener("mouseleave", () => {
            albumItem.style.backgroundColor = ""; // Reset to default
        });

        albumItem.addEventListener("click", () => loadTracks(artist, album));
        trackList.appendChild(albumItem);
    });
};


const loadTracks = (artist, album) => {
    currentAlbum = album;
    trackList.innerHTML = "";
    trackList.classList.add("track-list");
    backButton.style.display = "block";

    const tracks = audioData[artist][album].tracks;
    const albumColor = audioData[artist][album].color;

    tracks.forEach(track => {
        const trackItem = document.createElement("li");
        trackItem.textContent = track.replace(".mp3", ""); // Display track name without extension
        trackItem.dataset.src = `assets/audio/${artist}/${album}/${track}`;
        trackItem.dataset.color = albumColor; // Store the album color in a data attribute

        // Set up hover effects programmatically
        trackItem.addEventListener("mouseenter", () => {
            trackItem.style.backgroundColor = trackItem.dataset.color; // Use the data-color attribute
            trackItem.style.color = "white"; // Optional: Adjust text color for contrast
        });

        trackItem.addEventListener("mouseleave", () => {
            trackItem.style.backgroundColor = ""; // Reset to default background
            trackItem.style.color = ""; // Reset text color
        });

        trackItem.addEventListener("click", () => playTrack(trackItem.dataset.src));
        trackList.appendChild(trackItem);
    });
};


backButton.addEventListener("click", () => { // Go back to the previous level
    if (currentAlbum) {
        loadAlbums(currentArtist);
        currentAlbum = null;
    } else if (currentArtist) {
        loadArtists();
        currentArtist = null;
    }
});

const playTrack = (src, autoplay = false) => {
    console.log(`Playing: ${src}`);
    const albumColorData = audioData[currentArtist][currentAlbum].color;

    albumColor = albumColorData;
    
    setWaveColors(albumColor);

    const savedVolume = wavesurfer.getVolume();
    const wasMuted = wavesurfer.getMuted();

    if (wavesurfer) {
        try {
            wavesurfer.destroy();
        } catch (error) {
            console.error("Error while destroying WaveSurfer instance:", error);
        }
    }

    // Reinitialize WaveSurfer with the new colors, and stored volume/mute state
    wavesurfer = initializeWavesurfer(waveColor, progressColor);
    wavesurfer.setVolume(savedVolume);
    wavesurfer.setMuted(wasMuted);
    wavesurfer.load(src);

    wavesurfer.on("audioprocess", () => { // Sets the timecode current timestamp as audio plays
        const time = wavesurfer.getCurrentTime()
        currentTime.innerHTML = formatTimecode(time)
    })
    wavesurfer.on("ready", () => {
        wavesurfer.seekTo(0); // Reset playback position to the start
        currentTime.textContent = formatTimecode(0); // Reset displayed time
        totalDuration.textContent = formatTimecode(wavesurfer.getDuration()); // Set total duration

        if (autoplay) {
            wavesurfer.play();
            playButtonIcon.src = "assets/img/icon/pause.svg"; // Update play button icon to pause
        }

        const slider = document.querySelector(".volume-slider");
        setSliderBackground(slider);
    });
    wavesurfer.on("finish", () => {
        console.log("Track finished starting next track...")
        playNextTrack(src); // Play the next track in the album
    });

    setTrackTitle(src); // Update the track title display
};
const playNextTrack = (currentSrc) => {
    const currentTracks = audioData[currentArtist][currentAlbum].tracks;

    // Find the index of the current track
    const currentTrackIndex = currentTracks.findIndex(
        (track) => currentSrc.endsWith(track)
    );

    // Check if there's a next track in the album
    if (currentTrackIndex >= 0 && currentTrackIndex < currentTracks.length - 1) {
        const nextTrack = currentTracks[currentTrackIndex + 1];
        const nextSrc = `assets/audio/${currentArtist}/${currentAlbum}/${nextTrack}`;
        playTrack(nextSrc, true); // Play the next track
    } else {
        console.log("End of album reached");
        playButtonIcon.src = "assets/img/icon/play.svg"; // Reset play button icon
    }
};


const setTrackTitle = (title) => {
    // Extract artist and track title from the file path
    playButtonIcon.src = "assets/img/icon/play.svg"

    const parts = title.split("/");
    const artist = parts[2]; // "artist name" is the third part of the path
    const trackTitle = parts.pop().replace(".mp3", ""); // Extract file name and remove extension

    // Display as "Artist - TrackTitle"
    trackTitleElement.textContent = `${artist} - ${trackTitle}`;
};

const adjustColor = (hexColor, percent) => {
    const num = parseInt(hexColor.slice(1), 16);
    const r = (num >> 16) + Math.round((percent / 100) * 255);
    const g = ((num >> 8) & 0x00ff) + Math.round((percent / 100) * 255);
    const b = (num & 0x0000ff) + Math.round((percent / 100) * 255);
    return `rgb(${Math.min(255, Math.max(0, r))}, ${Math.min(255, Math.max(0, g))}, ${Math.min(255, Math.max(0, b))})`;
};
const setWaveColors = (albumColor) => {
    waveColor = adjustColor(albumColor, 0);
    progressColor = adjustColor(albumColor, 20);

    updateSliderColors(albumColor);
};

setTrackTitle(initialTrack)
loadArtists(); // Load artists when the page loads