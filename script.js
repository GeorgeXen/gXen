$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Geοrge Xenofontos", "Γιώργος Ξενοφώντος"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Cypriot", " an Engineer", "in Brussels"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Audio trial =========================

const audio = document.getElementById("myAudio");
const playBtn = document.getElementById("playBtn");
const audioTime = document.getElementById("audioTime");
const waveformBar = document.getElementById("waveformBar");
const waveformProgress = document.getElementById("waveformProgress");

audio.addEventListener("loadedmetadata", () => {
    audioTime.textContent = `0:00 / ${formatTime(audio.duration)}`;
});

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa fa-play"></i>';
    }
});

audio.addEventListener("ended", () => {
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
});

audio.addEventListener("timeupdate", () => {
    const current = formatTime(audio.currentTime);
    const total = formatTime(audio.duration);
    audioTime.textContent = `${current} / ${total}`;

    const percent = (audio.currentTime / audio.duration) * 100;
    waveformProgress.style.width = `${percent}%`;
});

waveformBar.addEventListener("click", (e) => {
    const barWidth = waveformBar.clientWidth;
    const clickX = e.offsetX;
    const percent = clickX / barWidth;
    audio.currentTime = percent * audio.duration;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

// ===================================================

    // owl carousel script
    $('.carousel').owlCarousel({
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
});

