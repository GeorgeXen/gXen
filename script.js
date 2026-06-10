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


// Scroll-in animations using IntersectionObserver
document.addEventListener("DOMContentLoaded", function() {
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

// Tech Nodes Animated Background
const canvas = document.getElementById("techNodesCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");

    let particlesArray = [];

    // Set canvas dimensions
    function setCanvasDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Mouse interaction
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function() {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Move particle
        update() {
            // Reverse direction if hitting edge
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Prevent getting stuck outside bounds on resize
            if (this.x > canvas.width) this.x = canvas.width;
            if (this.x < 0) this.x = 0;
            if (this.y > canvas.height) this.y = canvas.height;
            if (this.y < 0) this.y = 0;

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            // Draw
            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;

        // Limit max particles to maintain performance
        if (numberOfParticles > 200) numberOfParticles = 200;

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1; // 1 to 3
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5; // -0.5 to 0.5
            let directionY = (Math.random() * 1) - 0.5; // -0.5 to 0.5
            let color = '#3b82f6'; // Vibrant blue accent color

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connect particles
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    // Connection to mouse
                    if (mouse.x && mouse.y) {
                        let mouseDistance = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x)) +
                                            ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));
                        if (mouseDistance < 25000) {
                             ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue})`;
                             ctx.lineWidth = 1;
                             ctx.beginPath();
                             ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                             ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                             ctx.stroke();
                             continue;
                        }
                    }

                    // Normal connection
                    ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    init();
    animate();
}
