document.addEventListener("DOMContentLoaded", () => { console.log("Timeline Data initialized..."); });

// #region Data
const fontAwesomeLinkIcon = `<i class="fa-solid fa-arrow-up-right-from-square"></i>`;
const fontAweseomVideo = `Watch ${fontAwesomeLinkIcon}`;
const fontAwesomeMusic = `Listen ${fontAwesomeLinkIcon}`;
const fontAwesomeBuy = `Buy ${fontAwesomeLinkIcon}`;

const tukyoDirectory = "assets/audio/Tukyo/";
const tukyoBandcamp = "https://tukyo.bandcamp.com/album/";
const youtube = "https://www.youtube.com/watch?v=";

const profectioImg = `https://raw.githubusercontent.com/Tukyo/Profectio/refs/heads/main/images/compressed/`;
function getOpenseaURL(string) { return `https://opensea.io/collection/profectio?search[stringTraits][0][name]=Track%20${string}&search[stringTraits][0][values][0]=`; }

const timelineColors = {
    "KeyColor": "#671913",
    "MusicColor": "#674e1a",
    "VideoColor": "#117b17",
    "CodeColor": "#182878",
    "GeneralColor": "#b5b5b5"
};
const pixelSizes = {
    "MainSize": 100,
    "SecondarySize": 85,
    "TertiarySize": 70,
    "SmallSize": 50
}
const timelineSizes = {
    main: { width: pixelSizes.MainSize, height: pixelSizes.MainSize },
    secondary: { width: pixelSizes.SecondarySize, height: pixelSizes.SecondarySize },
    tertiary: { width: pixelSizes.TertiarySize, height: pixelSizes.TertiarySize },
    small: { width: pixelSizes.SmallSize, height: pixelSizes.SmallSize }
};
const linkLengths = {
    "long": 200,
    "short": 100
};

const timelineData = {
    nodes: [
        { id: 'a', text: 'Inception of Tukyo', homeX: 25, homeY: 60, hoverHTML: 'April 22, 2015', color: timelineColors.KeyColor, ...timelineSizes.main, connections: ['b'] },

        { id: 'b', text: 'Various Music Videos', homeX: 400, homeY: 100, hoverHTML: '2015 - 2023', color: timelineColors.VideoColor, ...timelineSizes.main, connections: ['c'] },

        { id: 'c', text: 'Start Flowing', homeX: 185, homeY: 140, hoverHTML: 'April 28, 2016', color: timelineColors.MusicColor, ...timelineSizes.main, connections: ['d'], subgroup: [
                { id: 'c1', img: `${tukyoDirectory}Start Flowing/cover.jpg`, hoverHTML: fontAwesomeMusic, link: `${tukyoBandcamp}start-flowing`, color: timelineColors.MusicColor, ...timelineSizes.secondary, linkLength: linkLengths.long, connections: ['c'] },
                { id: 'c2', video: `${tukyoDirectory}Start Flowing/midnightsummer.mp4`, hoverHTML: fontAweseomVideo, link: `${youtube}BToi56kK3Lg`, color: timelineColors.VideoColor, ...timelineSizes.tertiary, linkLength:linkLengths.short, connections: ['c1'] },
                { id: 'c3', video: `${tukyoDirectory}Start Flowing/sophie.mp4`, hoverHTML: fontAweseomVideo, link: `${youtube}5kW_DPHrzFA`, color: timelineColors.VideoColor, ...timelineSizes.tertiary, linkLength:linkLengths.short, connections: ['c1'] },
        ]},

        { id: 'd', text: '2002', homeX: 400, homeY: 100, hoverHTML: 'January 24, 2018', color: timelineColors.MusicColor, ...timelineSizes.main, connections: ['e'], subgroup: [
            { id: 'd1', img: `${tukyoDirectory}Two-Thousand-Two/cover.jpg`, hoverHTML: fontAwesomeMusic, link: `${tukyoBandcamp}2002`, color: timelineColors.MusicColor, ...timelineSizes.secondary, connections: ['d'] },
        ]},

        { id: 'e', text: 'Diversion / Complicite', homeX: 700, homeY: 100, hoverHTML: 'February 15, 2019', color: timelineColors.MusicColor, ...timelineSizes.main, linkLength: linkLengths.long, connections: ['f'], subgroup: [
            { id: 'e1', img: `${tukyoDirectory}Diversion/cover.jpg`, hoverHTML: fontAwesomeMusic, link: `${tukyoBandcamp}diversion`, color: timelineColors.MusicColor, ...timelineSizes.secondary, connections: ['e'] },
            { id: 'e2', img: `${tukyoDirectory}Complicite/cover.jpg`, hoverHTML: fontAwesomeMusic, link: `${tukyoBandcamp}complicite`, color: timelineColors.MusicColor, ...timelineSizes.secondary, connections: ['e'] },
            { id: 'e3', video: `${tukyoDirectory}Diversion/thethoughtyousaw.mp4`, hoverHTML: fontAweseomVideo, link: `${youtube}pmxUA9P0iOA`, color: timelineColors.VideoColor, ...timelineSizes.tertiary, linkLength: linkLengths.short, connections: ['e1'] },
            { id: 'e4', video: `${tukyoDirectory}Complicite/babeyouarenoordinarything.mp4`, hoverHTML: fontAweseomVideo, link: `${youtube}Dt6buhLTaMc`, color: timelineColors.VideoColor, ...timelineSizes.tertiary, linkLength: linkLengths.short, connections: ['e2'] }
        ]},

        { id: 'f', text: 'Video Game Alchemy', homeX: 900, homeY: 100, hoverHTML: 'January 21, 2020', color: timelineColors.MusicColor, ...timelineSizes.main, connections: ['g'], subgroup: [
            { id: 'f1', img: `${tukyoDirectory}Video Game Alchemy/cover.jpg`, hoverHTML: fontAwesomeMusic, link: `${tukyoBandcamp}video-game-alchemy`, color: timelineColors.MusicColor, ...timelineSizes.secondary, connections: ['f'] },
        ]},

        { id: 'g', text: 'Coloboma', homeX: 100, homeY: 300, hoverHTML: 'February 10, 2021', color: timelineColors.MusicColor, ...timelineSizes.main, connections: ['h'], subgroup: [
            { id: 'g1', img: `${tukyoDirectory}Coloboma/cover.jpg`, hoverHTML: fontAwesomeMusic, link: `${tukyoBandcamp}coloboma`, color: timelineColors.MusicColor, ...timelineSizes.secondary, connections: ['g'] },
        ]},

        { id: 'h', text: 'Profectio Album & NFT Collection', homeX: 300, homeY: 300, hoverHTML: 'June 21, 2022', color: timelineColors.CodeColor, ...timelineSizes.main, connections: ['i'], subgroup: [
            { id: 'h1', img: `${tukyoDirectory}Profectio/cover.jpg`, hoverHTML: fontAwesomeMusic, link: `${tukyoBandcamp}profectio`, color: timelineColors.MusicColor, ...timelineSizes.secondary, linkLength:linkLengths.long, connections: ['h'] },
            { id: 'h2', img: `${profectioImg}1.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("I")}Introduction`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h3', img: `${profectioImg}2.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("II")}Opener`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h4', img: `${profectioImg}3.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("III")}ClockWork`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h5', img: `${profectioImg}4.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("IV")}Hilltop%20Reprise`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h6', img: `${profectioImg}5.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("V")}Clam%20Shell%20Tribune`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h7', img: `${profectioImg}6.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("VI")}Naiwatha%20Village`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h8', img: `${profectioImg}7.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("VII")}Throne`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h9', img: `${profectioImg}8.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("VIII")}Interlude`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h10', img: `${profectioImg}9.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("IX")}Slow%20Movement`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h11', img: `${profectioImg}10.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("X")}Continuation%20X`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h12', img: `${profectioImg}11.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("XI")}Harp%20Interlude`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h13', img: `${profectioImg}12.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("XII")}Forward%20Walk`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h14', img: `${profectioImg}13.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("XIII")}Cliffs%20of%20Shazaar`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h15', img: `${profectioImg}14.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("XIV")}Minor%20Occurrence`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h16', img: `${profectioImg}15.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("XV")}I%20Have%20No%20Answer`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
            { id: 'h17', img: `${profectioImg}16.jpg`, hoverHTML: fontAwesomeBuy, link: `${getOpenseaURL("XVI")}Doreen%20Armitage`, color: timelineColors.CodeColor, ...timelineSizes.tertiary, connections: ['h1'] },
        ]},

        { id: 'i', text: 'Artificiaphobia', homeX: 500, homeY: 300, hoverHTML: 'August 1, 2023', color: timelineColors.MusicColor, ...timelineSizes.main, connections: ['j'], subgroup: [
            { id: 'i1', img: `${tukyoDirectory}Artificiaphobia/cover.jpg`, hoverHTML: fontAwesomeMusic, link: `${tukyoBandcamp}artificiaphobia`, color: timelineColors.MusicColor, ...timelineSizes.secondary, connections: ['i'] },
            { id: 'i2', video: `${tukyoDirectory}Artificiaphobia/artificiaphobia.mp4`, hoverHTML: fontAweseomVideo, link: `${youtube}_9IX9spM2P4`, color: timelineColors.VideoColor, ...timelineSizes.tertiary, connections: ['i1'] }
        ]},

        { id: 'j', text: 'Sypher Token Deployed', homeX: 700, homeY: 300, hoverHTML: 'April 30, 2024', color: timelineColors.CodeColor, ...timelineSizes.main, connections: ['k'], subgroup: [
            { id: 'j1', img: `https://raw.githubusercontent.com/Tukyo/sypherbot-public/refs/heads/main/assets/img/botpic.png`, hoverHTML: fontAwesomeLinkIcon, link: 'https://basescan.org/token/0x21b9d428eb20fa075a29d51813e57bab85406620', color: timelineColors.CodeColor, ...timelineSizes.secondary, connections: ['j'] },
            { id: 'j2', img: `https://raw.githubusercontent.com/Tukyo/deSypher/refs/heads/main/public/assets/coingecko.webp`, hoverHTML: fontAwesomeLinkIcon, link: 'https://www.coingecko.com/en/coins/sypher', color: timelineColors.GeneralColor, ...timelineSizes.small, connections: ['j1'] },
            { id: 'j3', img: `https://raw.githubusercontent.com/Tukyo/deSypher/refs/heads/main/public/assets/coinmarketcap.webp`, hoverHTML: fontAwesomeLinkIcon, link: 'https://coinmarketcap.com/dexscan/base/0xb0fbaa5c7d28b33ac18d9861d4909396c1b8029b/', color: timelineColors.GeneralColor, ...timelineSizes.small, connections: ['j1'] },
            { id: 'j4', img: `https://raw.githubusercontent.com/Tukyo/deSypher/refs/heads/main/public/assets/dexscreener.webp`, hoverHTML: fontAwesomeLinkIcon, link: 'https://dexscreener.com/base/0xb0fbaa5c7d28b33ac18d9861d4909396c1b8029b', color: timelineColors.GeneralColor, ...timelineSizes.small, connections: ['j1'] },
            { id: 'j5', img: `https://raw.githubusercontent.com/Tukyo/deSypher/refs/heads/main/public/assets/dextools.webp`, hoverHTML: fontAwesomeLinkIcon, link: 'https://www.dextools.io/app/en/base/pair-explorer/0xb0fbaa5c7d28b33ac18d9861d4909396c1b8029b?t=1733716421727', color: timelineColors.GeneralColor, ...timelineSizes.small, connections: ['j1'] }
        ]},

        { id: 'k', text: 'deSypher on Mainnet', homeX: 900, homeY: 300, hoverHTML: 'June 3, 2024', color: timelineColors.CodeColor, ...timelineSizes.main, connections: ['l'], subgroup: [
            { id: 'k1', img: `https://raw.githubusercontent.com/Tukyo/deSypher/refs/heads/main/public/assets/logo_square.webp`, hoverHTML: fontAwesomeLinkIcon, link: 'https://desypher.net/', color: timelineColors.CodeColor, ...timelineSizes.secondary, connections: ['k'] }
        ]},
        
        { id: 'l', text: 'Sypherbot Released', homeX: 500, homeY: 500, hoverHTML: 'November 19, 2024', color: timelineColors.CodeColor, ...timelineSizes.main, connections: ['m'], subgroup: [
            { id: 'l1', img: `https://raw.githubusercontent.com/Tukyo/sypherbot-public/refs/heads/main/assets/img/botpic.png`, hoverHTML: fontAwesomeLinkIcon, link: 'https://t.me/sypher_robot', color: timelineColors.CodeColor, ...timelineSizes.secondary, connections: ['l'] }
        ]},

        { id: 'm', text: 'Nibble', homeX: 700, homeY: 500, hoverHTML: 'December 1, 2024', color: timelineColors.MusicColor, ...timelineSizes.main, connections: ['n'], subgroup: [
            { id: 'm1', img: `${tukyoDirectory}Nibble/cover.jpg`, hoverHTML: fontAwesomeMusic, link: `${tukyoBandcamp}nibble`, color: timelineColors.MusicColor, ...timelineSizes.secondary, connections: ['m'] },
        ]},

        { id: 'n', text: 'You are Here', homeX: 900, homeY: 500, hoverHTML: 'More Creations Coming Soon!', color: timelineColors.KeyColor, width: pixelSizes.MainSize, height: pixelSizes.MainSize }
    ]
};
// #endregion Data

// #region Youtube Data
const maxVideoBubbleSize = 100;
const minVideoBubbleSize = 25;

const youtubeData = {
    videos: [
        { title: "Ambience of Anime III :final mix:", link: "https://www.youtube.com/watch?v=b_oG_MprcuA", views: "1.1K" },
        { title: "Aritus - Lovin'", link: "https://www.youtube.com/watch?v=gXbUeHcJPWE", views: "1.1K" },
        { title: "Ξdo Lee - Shadow Box", link: "https://www.youtube.com/watch?v=EMvlLYNqyoU", views: "1.1K" },
        { title: "コンシャス x IBUKI - ＰＵＲＩＴＹ", link: "https://www.youtube.com/watch?v=oQFxXeZR_-M", views: "1.1K" },
        { title: "Tukyo - Book of Twilight", link: "https://www.youtube.com/watch?v=l7jVlOGH4ww", views: "1.2K" },
        { title: "BLANDA - Sinquisitive [Ecstasy Music Video]", link: "https://www.youtube.com/watch?v=RacC9_dnw2M", views: "1.2K" },
        { title: "Keyboard Kid - Lips (ft. Iain Mannix)", link: "https://www.youtube.com/watch?v=GSaMTZtQpgQ", views: "1.2K" },
        { title: "Ｋ ａ ｚ ｚ ｅ ｔ ｔ ｅ カセット // Summer Love", link: "https://www.youtube.com/watch?v=wTYubd5czLI", views: "1.2K" },
        { title: "Slime Girls - Summer is Gone", link: "https://www.youtube.com/watch?v=NEb4-1nk0fQ", views: "1.2K" },
        { title: "Grynpyret - Green Thrill Zone (ft. Sensei)", link: "https://www.youtube.com/watch?v=dTsadu71SA4", views: "1.2K" },
        { title: "Meishi Smile :) AJS", link: "https://www.youtube.com/watch?v=z7_ZPRr6vRk", views: "1.2K" },
        { title: "(マクロス) Macross 82-99 - Been Thinking About It", link: "https://www.youtube.com/watch?v=Z2j1MzXLBNI", views: "1.2K" },
        { title: "glocque - heart sling", link: "https://www.youtube.com/watch?v=56ABBimyPOM", views: "1.3K" },
        { title: "telepopmusik // breathe (octbr flip)", link: "https://www.youtube.com/watch?v=77l0alUMdq8", views: "1.3K" },
        { title: "Where are ü now - Ember Island Cover (Minnesota remix) //Music Video", link: "https://www.youtube.com/watch?v=xcEAg4CjvX0", views: "1.3K" },
        { title: "Shura - White Light (Blonde's Acid Trip)", link: "https://www.youtube.com/watch?v=32lcXrHbBEg", views: "1.3K" },
        { title: "Jade Blue - Inside (ft. Shane Blackshaw) (Holy Series IV)", link: "https://www.youtube.com/watch?v=gtCrnnez03U", views: "1.3K" },
        { title: "Jamal Woon x Oshi \"Jamal Hit 1k\"", link: "https://www.youtube.com/watch?v=wwTQ6oYJg1g", views: "1.5K" },
        { title: "h-y // Marley & Bailey (Cover) //", link: "https://www.youtube.com/watch?v=5xVacj3PfAc", views: "1.5K" },
        { title: "Pyokn – “うすずみ色前線 (Kero Kero Bonito) [Sarah Bonito]", link: "https://www.youtube.com/watch?v=yoob2Pct4Ic", views: "1.7K" },
        { title: "Handbook - Melon", link: "https://www.youtube.com/watch?v=85B50LXv_E0", views: "1.8K" },
        { title: "I LOVE YOU 愛してる  by Future Girlfriend 音楽", link: "https://www.youtube.com/watch?v=r-2WIYutKz0", views: "1.9K" },
        { title: "The Bilinda Butchers - SIGH", link: "https://www.youtube.com/watch?v=Sq_J0KoXtmA", views: "1.9K" },
        { title: "when i run, don't chase me", link: "https://www.youtube.com/watch?v=-jI9IzTlN90", views: "101" },
        { title: "Yung Senzu Bean - Nemo", link: "https://www.youtube.com/watch?v=d84LrzDciOU", views: "104" },
        { title: "Future Girlfriend 音楽 // Benson Cut 今夜", link: "https://www.youtube.com/watch?v=aZiMlMwGlCQ", views: "105K" },
        { title: "Myztik onE  - Turnt Up Ft. Nick-L (Prod. Nick-L)", link: "https://www.youtube.com/watch?v=WtVajd0F_Jk", views: "106" },
        { title: "=ODDEEO= - [World.rar III] (Ft. Avanna)", link: "https://www.youtube.com/watch?v=78uw2-Fy-qg", views: "10K" },
        { title: "Yung Lean - Yoshi City [SYSTEM'89 REMIX]", link: "https://www.youtube.com/watch?v=fmDoKHlfsi0&t=119s", views: "10K" },
        { title: "Falliccia", link: "https://www.youtube.com/watch?v=R2mK8ZsG99o&t=71s", views: "112" },
        { title: "Tukyo's -- //  |ＶＥＲＹ| Chill Mix \\", link: "https://www.youtube.com/watch?v=rdFoPBf7cdc", views: "118" },
        { title: "josh pan - if", link: "https://www.youtube.com/watch?v=0dLAdmTc9jw", views: "124" },
        { title: "Tukyo's House Mix *The Visual Experience*", link: "https://www.youtube.com/watch?v=7hQcakSxF3s", views: "126" },
        { title: "Masego x Medasin - The Pink Polo EP", link: "https://www.youtube.com/watch?v=rkxPi2PsErw&t=630s", views: "128K" },
        { title: "コンシャス|THOUGHTS //s h r i n e s", link: "https://www.youtube.com/watch?v=N_FIEVsgZ68", views: "136" },
        { title: "Love Over Entropy - Tonii (Dixon Retouch)", link: "https://www.youtube.com/watch?v=ItvB_FMfr-I&t=68s", views: "13K" },
        { title: "Perfume VS Sebastien Tellier-「23:30」TheLasttrak MIX", link: "https://www.youtube.com/watch?v=pVQAFa7IPhs", views: "140" },
        { title: "💔 Farewell Summer 💔", link: "https://www.youtube.com/watch?v=ddj3R3ZeMuM", views: "144" },
        { title: "Handbook - I'll Wait", link: "https://www.youtube.com/watch?v=9EZAtZJleYY", views: "149" },
        { title: "Who Moved the TV", link: "https://www.youtube.com/watch?v=6WhC1UCAg5w", views: "154" },
        { title: "Tukyo's Mix // 2 //", link: "https://www.youtube.com/watch?v=nKni3KZxOSY", views: "159" },
        { title: "Wɧɨsρα -- Ariel", link: "https://www.youtube.com/watch?v=GqP5A4azZro", views: "161" },
        { title: "Tukyo x bigf0ck - Intruder", link: "https://www.youtube.com/watch?v=tvPUT4NplbM", views: "169" },
        { title: "Shirobon - Dimensions (Full Album) (Pixel Visuals)", link: "https://www.youtube.com/watch?v=vcvVaBQnm5E&t=97s", views: "16K" },
        { title: "Aso -- Kyoto.(ft.lamp)", link: "https://www.youtube.com/watch?v=JEpKDd-90O4", views: "16K" },
        { title: "Astroblk.  - Metamorphaesis (東京)", link: "https://www.youtube.com/watch?v=9qEu3UJJ7lg", views: "170" },
        { title: "Japanese Wallpaper - Arrival", link: "https://www.youtube.com/watch?v=s90h2teZWTw", views: "177" },
        { title: "Giraffage - Tell Me (Spazzkid Remix)", link: "https://www.youtube.com/watch?v=mQFi8fOvrvs", views: "181" },
        { title: "Feeling Distant (Tukyo キーOへ Original Mix)", link: "https://www.youtube.com/watch?v=YeOz2bJAGyw", views: "183" },
        { title: "Thought Tempo //Barrington 1110 あ̸̲̖̘̀な̛͇͚̱͍̖̯た͏̭͇̻̦̝̗の̧̡̦͈̝͖͖̣̥͘感͏҉̦̭̙想̶̙̖͜͢", link: "https://www.youtube.com/watch?v=eYvHsNYr0bY", views: "188" },
        { title: "ＶＡＰＯＲ.ＷＭＶ", link: "https://www.youtube.com/watch?v=AEYp3DMZZlQ", views: "190" },
        { title: "Yung Senzu Bean - Steps", link: "https://www.youtube.com/watch?v=Al4bvzvV_S0", views: "194" },
        { title: "Rescue by Akihabara シ", link: "https://www.youtube.com/watch?v=MJH3e-0ioZo&t=98s", views: "195" },
        { title: "Aritus x Fibre - Don't", link: "https://www.youtube.com/watch?v=mkcQ6M1MD0A", views: "1K" },
        { title: "Tycho - Coastal Brake //Music Video", link: "https://www.youtube.com/watch?v=hHVb05fK-V0", views: "2.2K" },
        { title: "Tukyo | Live at Blue Moon Tavern", link: "https://www.youtube.com/watch?v=d8NjeU_X76U&t=755s", views: "2.3K" },
        { title: "Khüdósoul - Kodak (feat. Olukara)", link: "https://www.youtube.com/watch?v=2y15IGbuyMI", views: "2.3K" },
        { title: "MEISHI SMILE - Selfless (feat. Calendula)", link: "https://www.youtube.com/watch?v=RKUo2dWGGAg", views: "2.3K" },
        { title: "♡✞ PASTEL GHOST ✞♡ - CLOUDS ('Visions of You' TEES Remix)", link: "https://www.youtube.com/watch?v=RtrAH59-ljc", views: "2.3K" },
        { title: "M. Hisataakaa - 風の通り道 『となりのトトロ』より (feat. Karakuri of A.Y.B. Force)", link: "https://www.youtube.com/watch?v=GDtI9lTLKIA&t=1s", views: "2.5K" },
        { title: "Oshi - ROGUETWO", link: "https://www.youtube.com/watch?v=zwxhx5miKGg", views: "2.5K" },
        { title: "Seattle Protests Flashbombed / National Guard Positioned on Roofs in Capitol Hill", link: "https://www.youtube.com/watch?v=8VBFcnD6TJM", views: "2.6K" },
        { title: "Aso - My", link: "https://www.youtube.com/watch?v=ix0JWCrakp4", views: "2.6K" },
        { title: "Future Girlfriend -- クラッシュon you", link: "https://www.youtube.com/watch?v=nJ9cyPQoxoE", views: "2.6K" },
        { title: "SHINee - Married To The Music (Night Tempo Edit)", link: "https://www.youtube.com/watch?v=__Drvy6zoTQ", views: "2.8K" },
        { title: "GH - This May Be Our Last Chance", link: "https://www.youtube.com/watch?v=mbTXrmvr3tw", views: "200" },
        { title: "Nor ノル", link: "https://www.youtube.com/watch?v=kEVLYj8HMlg", views: "204" },
        { title: "Tukyo - Ｌisten Ｓleep Ｄream", link: "https://www.youtube.com/watch?v=xKxH_OyN4fk", views: "205" },
        { title: "Hotline Bling (Future Funk) (Fibre Edit)", link: "https://www.youtube.com/watch?v=FOV6VVPK9yg&t=69s", views: "20K" },
        { title: "Tribute", link: "https://www.youtube.com/watch?v=8JrrnLWJ1KQ", views: "210" },
        { title: "Different Summer Haven [AMV]", link: "https://www.youtube.com/watch?v=nbxAHcuvon4&t=4s", views: "211" },
        { title: "Sábo. - Sunny Days", link: "https://www.youtube.com/watch?v=SYiekUTGd2M", views: "216" },
        { title: "Druid Cloak - Wraithborne Falls", link: "https://www.youtube.com/watch?v=djRheQLka_g", views: "216" },
        { title: "ナニダトNanidato //Rise Up", link: "https://www.youtube.com/watch?v=PjmOWXQcb18", views: "21K" },
        { title: "Dada Life - One Last Night On Earth (Speaker of the House Remix)", link: "https://www.youtube.com/watch?v=Q22SPkFtDBw", views: "225" },
        { title: "The Rain", link: "https://www.youtube.com/watch?v=jRMoJZ9xcFw", views: "227" },
        { title: "Comet (with Alexander Lewis & Chase Moore) (Holy Series VII)", link: "https://www.youtube.com/watch?v=FW786qZLQ1w", views: "229" },
        { title: "KỊⱣ - Ultimate", link: "https://www.youtube.com/watch?v=EuZQfIxjAmA", views: "231" },
        { title: "『Drip Drop』- Harro Dandy", link: "https://www.youtube.com/watch?v=LlBO6bTFPms", views: "23K" },
        { title: "Renzu - Kemonogatari", link: "https://www.youtube.com/watch?v=Iap5SY1zhPQ", views: "240" },
        { title: "Ambience of Trap Vol. I", link: "https://www.youtube.com/watch?v=dEBZmltvb7I", views: "243" },
        { title: "PYRMDPLAZA X ABRAHAM BLUE - WHATEVER YOU WANT (Holy Series III)", link: "https://www.youtube.com/watch?v=k4a3jxrYMxA", views: "248" },
        { title: "#Botanicals", link: "https://www.youtube.com/watch?v=gfQClqQ7yqs&t=3s", views: "256" },
        { title: "Flip-D | Corridors of Time |", link: "https://www.youtube.com/watch?v=8Nx7xWK0iSc", views: "261" },
        { title: "Keira -- Blue Mountain Vapors.", link: "https://www.youtube.com/watch?v=FbU8w0DM6OI&t=3s", views: "262" },
        { title: "Chipzel - Only Human (Trey Frey Remix)", link: "https://www.youtube.com/watch?v=g4_-_7chW-w", views: "26K" },
        { title: "Tukyo - Artificiaphobia", link: "https://www.youtube.com/watch?v=_9IX9spM2P4", views: "274" },
        { title: "bsd.u vip", link: "https://www.youtube.com/watch?v=GmjIldrbwJk", views: "279" },
        { title: "Flamingosis/Cofresi   //Lotus Blossom", link: "https://www.youtube.com/watch?v=DqzIEAcvpEo", views: "294" },
        { title: "Tukyo - Start Flowing (Album Sampler)", link: "https://www.youtube.com/watch?v=oPE3HYZZ_v0", views: "295" },
        { title: "Myztik onE x コンシャスTHOUGHTS -  (Bubba Kush)", link: "https://www.youtube.com/watch?v=NKr5JT7Q5BY", views: "297" },
        { title: "Kill Me Baby - Two O'clock In The Morning", link: "https://www.youtube.com/watch?v=UMUcsRtnGlM", views: "2K" },
        { title: "コンシャスTHOUGHTS - You and Me", link: "https://www.youtube.com/watch?v=56buYk6Z72k", views: "3.1K" },
        { title: "JINZO THE TRAP LORD ✨ ベリファイ名 // GREAT FAIRY'S FOUNTAIN 1998 ✨", link: "https://www.youtube.com/watch?v=G__IQ_e0uXo&t=14s", views: "3.1K" },
        { title: "Ryan Hemsworth - Afterglow", link: "https://www.youtube.com/watch?v=bDDXYyNePs4", views: "3.2K" },
        { title: "DeeJMD - Belong", link: "https://www.youtube.com/watch?v=9YoIhK9FkV4", views: "3.3K" },
        { title: "Modernpearl - III", link: "https://www.youtube.com/watch?v=wyAcWG5uvAk", views: "3.3K" },
        { title: "BLU J - CFMF remix", link: "https://www.youtube.com/watch?v=VM79Sp0H908", views: "3.6K" },
        { title: "The Bilinda Butchers - Sentimental Girls Violent Joke (ft. Smany)", link: "https://www.youtube.com/watch?v=ZexfvAmfKGI", views: "3.6K" },
        { title: "Whispa - Hamara", link: "https://www.youtube.com/watch?v=C6ELCNHoEME", views: "3.7K" },
        { title: "Spire - Still Don't Understand ❄ yitaku Remix", link: "https://www.youtube.com/watch?v=8qtIezfMSKo", views: "311" },
        { title: "Møme // Jetpack", link: "https://www.youtube.com/watch?v=hmLDANQCd9U&t=118s", views: "314" },
        { title: "Darius - Helios feat. Wayne Snow (Myd Remix)", link: "https://www.youtube.com/watch?v=UJNsepmObrw", views: "314" },
        { title: "Anatole. Away.", link: "https://www.youtube.com/watch?v=7gGDcARjG84", views: "319" },
        { title: "Toro Y Moi - Samantha Full Mixtape //With Visuals", link: "https://www.youtube.com/watch?v=BLL18252cJU", views: "31K" },
        { title: "Fetty Wap - Trap Queen (Figgy Remix) (Holy Series II)", link: "https://www.youtube.com/watch?v=aHx_FeWtGsE", views: "323" },
        { title: "Iridescent Dreams (Tukyo キーOへ Original Mix)", link: "https://www.youtube.com/watch?v=RlZNqcVkesM", views: "335" },
        { title: "Ana Criado & Omnia - No One Home \/Neo-Tokyo\/ (Tukyo)", link: "https://www.youtube.com/watch?v=Vu-q-wapgBY", views: "336" },
        { title: "You Were Supposed to Be My Sanctuary", link: "https://www.youtube.com/watch?v=-wfY2T-viIM", views: "340" },
        { title: "マクロスMACROSS 82-99 - プラスJutsu", link: "https://www.youtube.com/watch?v=6qNgxnsfkWM", views: "34K" },
        { title: "Tukyo - The Meditative Mix (￣。￣)～ｚｚｚ", link: "https://www.youtube.com/watch?v=7vpZCcaKTlA", views: "351" },
        { title: "Tukyo - The Thought You Saw (Music Video)", link: "https://www.youtube.com/watch?v=pmxUA9P0iOA", views: "352" },
        { title: "Dreadeurope - N2+", link: "https://www.youtube.com/watch?v=HMV2akGITPE&t=3s", views: "365" },
        { title: "hot tea because that's what you are, a hottie", link: "https://www.youtube.com/watch?v=jXVgMrX3cVM", views: "368" },
        { title: "Eight Dollar Machine (Music Video)", link: "https://www.youtube.com/watch?v=V9ex-SNvjys", views: "377" },
        { title: "system //must be it ft. louis", link: "https://www.youtube.com/watch?v=6UN6jBI8fQ4", views: "394" },
        { title: "ナニダトNanidato // Angel's Touch", link: "https://www.youtube.com/watch?v=giO6FVLQ_Vs", views: "39K" },
        { title: "TUKYO - CRUSH", link: "https://www.youtube.com/watch?v=jNEtE7DeyZQ", views: "3K" },
        { title: "Amami Apples", link: "https://www.youtube.com/watch?v=hAboni4QgSE", views: "3K" },
        { title: "Anatole - Colours", link: "https://www.youtube.com/watch?v=-4MNi4fD2wA", views: "4.1K" },
        { title: "♡✞ＰＡＳＴＥＬ ＧＨＯＳＴ✞♡ // SHADOWS (Sidewalks and Skeletons Remix)", link: "https://www.youtube.com/watch?v=r3rR1imuC8s", views: "4.4K" },
        { title: "恋はみずいろ 『syatten』", link: "https://www.youtube.com/watch?v=EyRGg3kbodY", views: "4.6K" },
        { title: "Amazon Go Grocery Destroyed 05/30/2020", link: "https://www.youtube.com/watch?v=GKHOBO4SnpM", views: "4.8K" },
        { title: "(: Meishi Smile :) - バーモント・キッス (DREAM POP RMX.)", link: "https://www.youtube.com/watch?v=flHoPEZ3yGw", views: "4.9K" },
        { title: "Astroblk. - Tranquility", link: "https://www.youtube.com/watch?v=Qd27tm-T3MY", views: "407" },
        { title: "(マクロス) MACROSS 82-99 - Fun Tonight", link: "https://www.youtube.com/watch?v=ZsYyuEFISlE", views: "40K" },
        { title: "NiteMoves - Polypel (Drummer from Tycho)", link: "https://www.youtube.com/watch?v=sqsknmE5Y24", views: "411" },
        { title: "Handbook - Flag Iris #Botanicals", link: "https://www.youtube.com/watch?v=qNxkgXFqkgU", views: "412" },
        { title: "Babe, You are No Ordinary Thing (Tukyo キーOへ Original Mix)", link: "https://www.youtube.com/watch?v=Dt6buhLTaMc", views: "413" },
        { title: "Riverwave - Sunny Crabby", link: "https://www.youtube.com/watch?v=UgtQpaETiss", views: "419" },
        { title: "Tukyo - Immediate Reaction", link: "https://www.youtube.com/watch?v=uxfpWD7R6aA", views: "422" },
        { title: "Tennyson - Like What [MV]", link: "https://www.youtube.com/watch?v=OyLLswpi69c", views: "422" },
        { title: "『PHAUN』 Dream Island // prod. by VANTAGE //", link: "https://www.youtube.com/watch?v=_n407kZCDPs", views: "439" },
        { title: "Saint Pepsi - Unhappy", link: "https://www.youtube.com/watch?v=-79ZDu74ryE", views: "441" },
        { title: "spire -- a million miles away", link: "https://www.youtube.com/watch?v=Vy2CRJdEceU", views: "459" },
        { title: "Astroblk. - Yamane", link: "https://www.youtube.com/watch?v=LGVqPf82FRg", views: "473" },
        { title: "Felix - Ain Afraid", link: "https://www.youtube.com/watch?v=R5OnIOKzp4A", views: "482" },
        { title: "Wall, Dawn - Between the Sheets", link: "https://www.youtube.com/watch?v=Ex7TsPFW9cA", views: "483" },
        { title: "Jump, Ashlynn - Used to Be Golden", link: "https://www.youtube.com/watch?v=BbURlaAMHKY", views: "494" },
        { title: "Primary & Ohhyuk - Bawling (Night Tempo センパイ Edit)", link: "https://www.youtube.com/watch?v=iXsPXMFHFa0", views: "5.4K" },
        { title: "Daft Punk - One More Time [Season] (Said Remix)", link: "https://www.youtube.com/watch?v=wLfy6uL0_GM", views: "5.6K" },
        { title: "Night Tempo (｡◕‿‿◕｡) Candy", link: "https://www.youtube.com/watch?v=Aje0L965KdQ", views: "5.9K" },
        { title: "MYSTERIOUS エイリアン 『 』- Dance Floors (Summer Nights) AMV", link: "https://www.youtube.com/watch?v=kQBKNe_WOkc", views: "530" },
        { title: "Bicep  //Just", link: "https://www.youtube.com/watch?v=2UQsnUYuOc0", views: "540" },
        { title: "ENTHEO / NTO / - H a l f ◐ M o o n (Ft. MAÏA)", link: "https://www.youtube.com/watch?v=yn9WFeLAJ4g", views: "566" },
        { title: "Pogo - Where is Ethan?", link: "https://www.youtube.com/watch?v=ykIOMzkCAoc", views: "586" },
        { title: "Alina Baraz & Galimatias  -  Maybe", link: "https://www.youtube.com/watch?v=YgNuyAWwiuA", views: "589" },
        { title: "アヘンヘイズ // FXCK WIT IT \\", link: "https://www.youtube.com/watch?v=7Ko0q0OBmNg", views: "59K" },
        { title: "マクロス MACROSS 82-99 - Lynn Minmay", link: "https://www.youtube.com/watch?v=hj5vjBio03A", views: "5K" },
        { title: "Aso -- Nothing But Luv. [ft.Lamp]", link: "https://www.youtube.com/watch?v=Z5LSKQlIYuo", views: "6.2K" },
        { title: "oshi fly", link: "https://www.youtube.com/watch?v=S1J0QWzwiVU", views: "604" },
        { title: "||  TKO に  //Side Project\\  ||", link: "https://www.youtube.com/watch?v=FTOivSblbaw", views: "61" },
        { title: "♡ コンシャスTHOUGHTS ♡", link: "https://www.youtube.com/watch?v=s_antyh_NGE", views: "611" },
        { title: "Ambience of Anime Vol. II", link: "https://www.youtube.com/watch?v=Gw7GfegV10Q", views: "616" },
        { title: "Tukyo - The Eastern Capitol of Music 音楽の東の首都", link: "https://www.youtube.com/watch?v=g5b_klMgG40", views: "622" },
        { title: "Ewan Dobson - Time", link: "https://www.youtube.com/watch?v=pM9pmbBw_SI", views: "639" },
        { title: "Little Dragon - Klapp Klapp (starRo Remix) (Holy Series I)", link: "https://www.youtube.com/watch?v=jA0gjyjwrXc", views: "649" },
        { title: "Tukyo - //Talking to You\\", link: "https://www.youtube.com/watch?v=X2BrzgcheKk", views: "663" },
        { title: "WHAT YOU SEEK", link: "https://www.youtube.com/watch?v=nM6vxPQ9fuM", views: "668" },
        { title: "Fatboy Slim - Mad Flava (Autograf Remix)", link: "https://www.youtube.com/watch?v=svfHdMAQZgs", views: "669" },
        { title: "fvde - Don't Leave", link: "https://www.youtube.com/watch?v=OQzk3sgbCcc", views: "680" },
        { title: "Tukyo - Midnight Summer", link: "https://www.youtube.com/watch?v=BToi56kK3Lg", views: "691" },
        { title: "Primary (ft. OHHYUK) - Bawling", link: "https://www.youtube.com/watch?v=Sh_yHRhmfFY", views: "693" },
        { title: "Ujico*/Snail's House - Cocoa", link: "https://www.youtube.com/watch?v=7v-I0XPzb74", views: "7.2K" },
        { title: "P R E T T Y G I R L S D O N ' T H A L L U C I N A T E", link: "https://www.youtube.com/watch?v=OAl7uLM7ve0&t=165s", views: "7.7K" },
        { title: "Police Return to Occupied East Precinct & Cal Anderson \" #CHAZ #CHOP \"", link: "https://www.youtube.com/watch?v=9kiUrS-K7mM", views: "706" },
        { title: "유카리", link: "https://www.youtube.com/watch?v=x6aoqw41H2c&t=262s", views: "716" },
        { title: "Tukyo", link: "https://www.youtube.com/watch?v=UjkyryLMfec", views: "745" },
        { title: "Come Chill w/ Me :)", link: "https://www.youtube.com/watch?v=VVgMitN6E0A", views: "748" },
        { title: "couches", link: "https://www.youtube.com/watch?v=cIVihdHegWc", views: "759" },
        { title: "Rollergirl! - Teenagers", link: "https://www.youtube.com/watch?v=IQjq9sLilzo", views: "771" },
        { title: "Dj Sunglasses - NYC", link: "https://www.youtube.com/watch?v=idyPzYenSYk", views: "774" },
        { title: "OSHI - Take Flight", link: "https://www.youtube.com/watch?v=76-Ux40Devg", views: "784" },
        { title: "MEISHI SMILE - Breathe :)", link: "https://www.youtube.com/watch?v=JwcrnbDoVfo", views: "789" },
        { title: "Tukyo - Can't Stand to Sit (Original Mix)", link: "https://www.youtube.com/watch?v=HewdYl0lfEc", views: "79" },
        { title: "shou - where the 2d hoes at?", link: "https://www.youtube.com/watch?v=BqbxsgLA7jc", views: "794" },
        { title: "dot - About You (XXYYXX cover)", link: "https://www.youtube.com/watch?v=9RrEZ99_I-k", views: "858" },
        { title: "Counting Stars", link: "https://www.youtube.com/watch?v=eSET6Zhcq1U", views: "87" },
        { title: "Ambience of Anime Vol. I", link: "https://www.youtube.com/watch?v=rl43Hy29Xzk", views: "883" },
        { title: "Kristofferson // ｓｈａｔｔｅｒ", link: "https://www.youtube.com/watch?v=ABvBXuEb4P4", views: "886" },
        { title: "Future Girlfriend 音楽 X 悲しい ANDROID   APARTMENT - 今を生きる", link: "https://www.youtube.com/watch?v=yvB0d1KoabQ", views: "8K" },
        { title: "imagine peaking on this, with manitee (Holy Series VI)", link: "https://www.youtube.com/watch?v=WHqkI6np7LA", views: "92" },
        { title: "Pretty Boy Aaron - You (ft. Flowery)", link: "https://www.youtube.com/watch?v=ILtgnXaI6NE", views: "926" },
        { title: "Kasbo - World Away //Music Video", link: "https://www.youtube.com/watch?v=vnpTC5atFkI", views: "932" },
        { title: "Shirobon - Out of Love", link: "https://www.youtube.com/watch?v=nMEPckXyhL4", views: "933" },
        { title: "THOUGHT 08", link: "https://www.youtube.com/watch?v=-vDjzJQfZqM&t=3s", views: "96" },
        { title: "dasta - kiss", link: "https://www.youtube.com/watch?v=LtxwKbgZ0KI", views: "972" },
        { title: "Tukyo - Sophie", link: "https://www.youtube.com/watch?v=5kW_DPHrzFA", views: "974" },
        { title: "Flamingosis - Pleasure Palette", link: "https://www.youtube.com/watch?v=DQVSIo5CCew", views: "987" },
    ]
};

function parseVideoViews(views) {
    if (views.endsWith("K") || views.endsWith("k")) {
        return parseFloat(views) * 1000; // Convert "2k" to 2000
    } else if (views.endsWith("M") || views.endsWith("m")) {
        return parseFloat(views) * 1000000; // Convert "1.2M" to 1200000
    } else {
        return parseInt(views, 10); // Convert "123" to 123
    }
}
// #endregion YouTube Data