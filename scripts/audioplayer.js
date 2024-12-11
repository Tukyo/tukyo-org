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
    const isWaveSurferPlaying = wavesurfer.isPlaying()
    if (isWaveSurferPlaying) {
        playButtonIcon.src = "assets/img/icon/pause.svg"
        isPlaying = true
    } else {
        playButtonIcon.src = "assets/img/icon/play.svg"
        isPlaying = false
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
const initialTrack = "assets/audio/Tukyo/Nibble/deSypher.mp3"

wavesurfer.load(initialTrack)
wavesurfer.on("audioprocess", () => { // Sets the timecode current timestamp as audio plays
    const time = wavesurfer.getCurrentTime()
    currentTime.innerHTML = formatTimecode(time)
})

playButton.addEventListener("click", togglePlay)
volumeIcon.addEventListener("click", toggleMute)
volumeSlider.addEventListener("input", handleVolumeChange)

const loadArtists = () => { // Load artists and their albums
    trackList.innerHTML = "";

    socialLinksPresent = false;

    const artistTitle = document.createElement("h2");
    artistTitle.innerHTML = "Artists";
    artistTitle.classList.add("artist-item");
    trackList.appendChild(artistTitle);

    trackList.classList.add("artist-list");
    trackList.classList.remove("album-list");
    trackList.classList.remove("large-album-list");
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

const loadAlbums = (artist) => { // Load albums for a specific artist
    currentArtist = artist;
    trackList.innerHTML = "";
    trackList.classList.remove("artist-list");
    trackList.classList.remove("track-list");
    trackList.classList.add("album-list");

    backButton.style.display = "block";

    if (!socialLinksPresent) { socialLinksContainer.innerHTML = ""; }

    if (socialLinks[artist] && !socialLinksPresent) {
        Object.entries(socialLinks[artist]).forEach(([platform, { url, icon }]) => {
            const linkElement = document.createElement("a");
            linkElement.href = url;
            linkElement.target = "_blank"; // Open in a new tab
            linkElement.rel = "noopener noreferrer"; // Security best practice
            linkElement.innerHTML = icon; // Use the specific icon for the platform
            linkElement.classList.add("social-link", `social-${platform.toLowerCase()}`); // Add platform-specific class
            socialLinksContainer.appendChild(linkElement);
            setSocialColors(null);
            socialLinksPresent = true;
        });
    }

    Object.keys(audioData[artist]).forEach(album => {
        const albumItem = document.createElement("li");
        albumItem.classList.add("album-item");

        // Add random animation delay
        const minDelay = 0.01;
        const maxDelay = 0.1;
        const randomDelay = (Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2);
        albumItem.style.animationDelay = `${randomDelay}s`;

        // Create the album cover image
        const albumCover = document.createElement("img");
        albumCover.src = `assets/audio/${artist}/${album}/cover.jpg`;
        albumCover.alt = `${album} Cover`;
        albumCover.classList.add("album-cover");
        albumCover.draggable = false;

        // Create the album title
        const albumTitle = document.createElement("span");
        albumTitle.textContent = album === "Two-Thousand-Two" ? "2002" : album;
        albumTitle.classList.add("album-title");
        albumTitle.draggable = false;

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

    const largeAlbumListLength = 4; // Number of albums to trigger the large list style
    const albumCount = trackList.querySelectorAll('.album-item').length;
    if (albumCount > largeAlbumListLength) {
        console.log("Large album list detected...");
        trackList.classList.add('large-album-list');
        
        const largeAlbumList = document.querySelector(".large-album-list");

        makeScrollable(document.querySelector(".large-album-list"));
        largeAlbumList.addEventListener("dragstart", (e) => {
            e.preventDefault(); // Prevent the browser's drag-and-drop behavior
        });
    }
};

const loadTracks = (artist, album) => {
    if (isDraggingAlbumList) return; // Prevent loading tracks while dragging the album list

    currentAlbum = album;
    trackList.innerHTML = "";
    trackList.classList.remove("album-list");
    trackList.classList.remove("large-album-list");
    trackList.classList.add("track-list");
    backButton.style.display = "block";

    const tracks = audioData[artist][album].tracks;
    const albumColor = audioData[artist][album].color;

    tracks.forEach((track, index) => {
        const trackItem = document.createElement("li");
        trackItem.textContent = track.replace(".mp3", ""); // Display track name without extension
        trackItem.dataset.src = `assets/audio/${artist}/${album}/${track}`;
        trackItem.dataset.color = albumColor; // Store the album color in a data attribute
        trackItem.classList.add("track-item");

        // Add random animation delay
        const minDelay = 0.01;
        const maxDelay = 0.1;
        const randomDelay = (Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2);
        trackItem.style.animationDelay = `${randomDelay}s`;

        // Set up hover effects programmatically
        trackItem.addEventListener("mouseenter", () => {
            trackItem.style.backgroundColor = trackItem.dataset.color; // Use the data-color attribute
            trackItem.style.color = "white"; // Optional: Adjust text color for contrast
        });

        trackItem.addEventListener("mouseleave", () => {
            trackItem.style.backgroundColor = ""; // Reset to default background
            trackItem.style.color = ""; // Reset text color
        });

        if (index === 0) {
            if (!isPlaying) { loadTrack(trackItem.dataset.src, false); }
        }

        trackItem.addEventListener("click", () => loadTrack(trackItem.dataset.src));
        trackList.appendChild(trackItem);
    });
};
const loadTrack = (src, autoplay = false) => {
    console.log(`Loading: ${src}`);
    const albumColorData = audioData[currentArtist][currentAlbum].color;

    albumColor = albumColorData;
    
    setWaveColors(albumColor);
    if (currentAlbum !== null) {
        setSocialColors(albumColor);
    }

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
        loadTrack(nextSrc, true); // Play the next track
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

backButton.addEventListener("click", () => { // Go back to the previous level
    if (currentAlbum) {
        loadAlbums(currentArtist);
        currentAlbum = null;
    } else if (currentArtist) {
        loadArtists();
        currentArtist = null;
        socialLinksContainer.innerHTML = "";
    }
});

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
const setSocialColors = (albumColor) => {
    const socialLinks = document.querySelectorAll(".social-link");

    socialLinks.forEach((link) => {
        if (albumColor !== null) {
            link.style.color = albumColor;
        } else {
            link.style.color = waveColor;
        }
    });
}

const makeScrollable = (scrollContainer) => {
    isDraggingAlbumList = false;
    let startX, scrollLeft;
    let holdTimer = null;

    const startDragging = (e) => {
        clearTimeout(holdTimer); 
        holdTimer = setTimeout(() => {
            isDraggingAlbumList = true;
            console.log("Dragging album list...");
            scrollContainer.classList.add("dragging");
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        }, 75); 
    };

    const stopDragging = () => {
        scrollContainer.classList.remove("dragging");

        setTimeout(() => { 
            isDraggingAlbumList = false;
        }, 100); 
    };

    const dragging = (e) => {
        if (!isDraggingAlbumList) return;

        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = x - startX; 
        scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener("mousedown", startDragging);
    scrollContainer.addEventListener("mouseleave", stopDragging);
    scrollContainer.addEventListener("mouseup", stopDragging);
    scrollContainer.addEventListener("mousemove", dragging);
};


setTrackTitle(initialTrack)
loadArtists(); // Load artists when the page loads