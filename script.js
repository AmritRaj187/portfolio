document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
    
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    
        // Existing theme toggle logic
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    });

    // Reveal sections on scroll
    const sections = document.querySelectorAll('.section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Back-to-top button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

function getRandomColor() {
    // Generate a random hexadecimal color code
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('DOMContentLoaded', async () => {
    const audio = new Audio();
    audio.volume = 0.1;
    let isPlaying = false;
    let songs = [];
    let currentSongIndex = -1;
    let currentTime = 0;

    const musicToggle = document.getElementById('music-toggle');
    const songInfo = document.getElementById('song-info');

    // Fetch song data from JSON
    try {
        const response = await fetch('assets/music/songs.json');
        songs = await response.json();
    } catch (error) {
        console.error('Failed to load songs:', error);
    }

    const showSongInfo = (title, artist) => {
        songInfo.textContent = `${title} - ${artist}`;
        songInfo.style.display = 'block';
        songInfo.style.animation = 'none';
        requestAnimationFrame(() => {
            songInfo.style.animation = '';
        });
    };

    const playSong = () => {
        if (currentSongIndex === -1) {
            currentSongIndex = Math.floor(Math.random() * songs.length);
            audio.src = songs[currentSongIndex].file;
        }
        audio.currentTime = currentTime;
        audio.play().catch((err) => {
            console.error("Autoplay failed:", err);
        });
        isPlaying = true;

        const currentSong = songs[currentSongIndex];
        showSongInfo(currentSong.title, currentSong.artist);
        musicToggle.classList.add('rotating');
    };

    const pauseSong = () => {
        audio.pause();
        currentTime = audio.currentTime;
        isPlaying = false;
        musicToggle.classList.remove('rotating');
    };

    audio.addEventListener('ended', () => {
        currentTime = 0;
        currentSongIndex = Math.floor(Math.random() * songs.length);
        playSong();
    });

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    songInfo.addEventListener('animationend', () => {
        songInfo.style.display = 'none';
    });
});
