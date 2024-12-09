$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){ // Hide scroll up button
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 500){ // Show scroll up button
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0}); // scroll to top on click
        $('html').css("scrollBehavior", "auto"); // removing smooth scroll on slide-up button click
    });

    $('.navbar .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth"); // Apply smooth scroll on menu item click
    });

    $('.menu-btn').click(function(){ // toggle menu/navbar
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    var typed = new Typed(".typing", {
        strings: ["Onchain Games", "Art", "Open-Source Code", "Music", "Websites", "Smart Contracts", "Robots"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Onchain Games", "Art", "Open-Source Code", "Music", "Websites", "Smart Contracts", "Robots"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    $('.carousel').owlCarousel({
        strings: ["Game Developer", "Website Maker", "Designer", "Talented Coder"],
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        });
    });
});