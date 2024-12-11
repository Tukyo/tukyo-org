const rootStyles = getComputedStyle(document.documentElement);

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
const socialLinksContainer = document.querySelector(".social-links");

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
                "Face Before.mp3"
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

const socialLinks = {
    "Tukyo": {
        Spotify: { url: "https://open.spotify.com/artist/23hzZ7fIHWVjgiQieMxBba?si=eaP_AYjaQ-6IZ718JIOH6w&nd=1&dlsi=d65e3d1d6e41436fL", icon: '<i class="fa-brands fa-spotify"></i>' },
        AppleMusic: { url: "https://music.apple.com/us/artist/tukyo/1394828977", icon: '<i class="fa-brands fa-itunes-note"></i>' },
        Soundcloud: { url: "https://soundcloud.com/tukyo", icon: '<i class="fa-brands fa-soundcloud"></i>' },
        Youtube: { url: "https://www.youtube.com/tukyo", icon: '<i class="fa-brands fa-youtube"></i>' },
        Bandcamp: { url: "https://tukyo.bandcamp.com/", icon: '<i class="fa-brands fa-bandcamp"></i>' }
    },
    "Navil": {
        Spotify: { url: "https://open.spotify.com/artist/7M29ch5pE6VmNCfsSLGu7k?si=9fRXWnM0SOidQoDQguiIxA", icon: '<i class="fa-brands fa-spotify"></i>' },
        AppleMusic: { url: "https://music.apple.com/us/artist/navil/1718605341", icon: '<i class="fa-brands fa-itunes-note"></i>' },
        Soundcloud: { url: "https://soundcloud.com/navil-barbier-290911563", icon: '<i class="fa-brands fa-soundcloud"></i>' },
        Youtube: { url: "https://www.youtube.com/@itsnaville", icon: '<i class="fa-brands fa-youtube"></i>' },
        Telegram: { url: "https://t.me/navilmusicc", icon: '<i class="fa-brands fa-telegram"></i>' }
    }
};

let isDraggingAlbumList = false;
let socialLinksPresent = false;
let currentArtist = null;
let currentAlbum = null;
let waveColor = null;
let progressColor = null;
let albumColor = null;
let volume = 1;
let isPlaying = false;