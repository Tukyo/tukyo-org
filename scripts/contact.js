document.addEventListener('DOMContentLoaded', function () {
    console.log('Contact details loaded...');

    const linkIcon = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';
    const copyIcon = '<i class="fa-solid fa-copy"></i>';

    const contactDetails = {
        Email: { address: "tko@tukyowave.com", icon: '<i class="fa-solid fa-envelope"></i>', hoverIcon: copyIcon },
        deSypher: { link: "https://desypher.net/", icon: '<i class="fa-solid fa-globe"></i>', hoverIcon: linkIcon },
        Github: { link: "https://github.com/tukyo", icon: '<i class="fa-brands fa-github"></i>', hoverIcon: linkIcon  },
        TwitterX: { link: "https://twitter.com/tukyowave", icon: '<i class="fa-brands fa-twitter"></i>', hoverIcon: linkIcon  },
        Telegram: { link: "https://t.me/tukyohub", icon: '<i class="fa-brands fa-telegram"></i>', hoverIcon: linkIcon  },
        Instagram: { link: "https://instagram.com/tukyowave", icon: '<i class="fa-brands fa-instagram"></i>', hoverIcon: linkIcon  },
        Youtube: { link: "https://www.youtube.com/tukyo", icon: '<i class="fa-brands fa-youtube"></i>', hoverIcon: linkIcon  },
        Linkedin: { link: "https://linkedin.com/in/tukyo/", icon: '<i class="fa-brands fa-linkedin"></i>', hoverIcon: linkIcon  },
        Medium: { link: "https://tukyo.medium.com/", icon: '<i class="fa-brands fa-medium"></i>', hoverIcon: linkIcon  },
    };

    const contactColors = [
        { light: "rgba(255,123,123,1)", dark: "rgba(103,25,19,1)" },
        { light: "rgba(255,214,123,1)", dark: "rgba(103,78,26,1)" },
        { light: "rgba(123,255,171,1)", dark: "rgba(17,123,23,1)" },
        { light: "rgba(123,171,255,1)", dark: "rgba(24,40,120,1)" },
        { light: "rgba(255,123,255,1)", dark: "rgba(146,29,145,1)" }
    ];

    const contactContent = document.querySelector('.contact-content');

    const hoverRadius = 100;
    const movementIntensity = 10;
    const easingSpeed = 0.1;

    if (contactContent) {
        const bubbles = [];
    
        Object.keys(contactDetails).forEach(key => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
    
            const chosen = contactColors[Math.floor(Math.random() * contactColors.length)];
            contactItem.style.background = `radial-gradient(circle at 30% 30%, ${chosen.light}, ${chosen.dark})`;
    
            const linkElement = document.createElement('div');
            linkElement.innerHTML = contactDetails[key].icon;
            linkElement.className = 'contact-link';
    
            contactItem.appendChild(linkElement);
    
            if (key === 'Email') {
                contactItem.title = "Click to copy email";
                contactItem.addEventListener('click', () => {
                    navigator.clipboard.writeText(contactDetails[key].address).then(() => {
                        alert('Email copied to clipboard!');
                    });
                });
            } else {
                contactItem.title = `Visit ${key}`;
                contactItem.addEventListener('click', () => {
                    window.open(contactDetails[key].link, '_blank');
                });
            }
    
            contactItem.addEventListener('mouseenter', () => {
                linkElement.innerHTML = contactDetails[key].hoverIcon;
            });
    
            contactItem.addEventListener('mouseleave', () => {
                linkElement.innerHTML = contactDetails[key].icon;
            });
    
            contactItem.dataset.targetX = 0;
            contactItem.dataset.targetY = 0;
            bubbles.push(contactItem);
            contactContent.appendChild(contactItem);
        });
    

        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
    
            bubbles.forEach(bubble => {
                const rect = bubble.getBoundingClientRect();
                const bubbleX = rect.left + rect.width / 2;
                const bubbleY = rect.top + rect.height / 2;
    
                const distX = mouseX - bubbleX;
                const distY = mouseY - bubbleY;
                const distance = Math.sqrt(distX * distX + distY * distY);
    
                if (distance < hoverRadius) {
                    const movementFactor = (hoverRadius - distance) / hoverRadius;
                    bubble.dataset.targetX = movementIntensity * movementFactor * (distX / distance);
                    bubble.dataset.targetY = movementIntensity * movementFactor * (distY / distance);
                } else {
                    bubble.dataset.targetX = 0;
                    bubble.dataset.targetY = 0;
                }
            });
        });
        setInterval(() => {
            bubbles.forEach(bubble => {
                const currentTransform = getComputedStyle(bubble).transform;
                const matrix = new DOMMatrix(currentTransform === 'none' ? '' : currentTransform);
                const currentX = matrix.m41;
                const currentY = matrix.m42;
    
                const targetX = parseFloat(bubble.dataset.targetX);
                const targetY = parseFloat(bubble.dataset.targetY);
    
                const easedX = currentX + (targetX - currentX) * easingSpeed;
                const easedY = currentY + (targetY - currentY) * easingSpeed;
    
                bubble.style.transform = `translate(${easedX}px, ${easedY}px)`;
            });
        }, 16); // ~60 FPS
    }
});