let currentPageNum = 1;
const totalPages = 4;
let isPlaying = false;
const audio = document.getElementById('backgroundMusic');

function openAlbum() {
  document.getElementById('albumCover').style.display = 'none';
  document.getElementById('albumPages').style.display = 'block';
  showPage(1);

  // Start music when album is opened
  playMusic();
}

function goToCover() {
  document.getElementById('albumPages').style.display = 'none';
  document.getElementById('albumCover').style.display = 'block';
  currentPageNum = 1;
}

function showPage(pageNum) {
  for (let i = 1; i <= totalPages; i++) {
    document.getElementById('page' + i).style.display = 'none';
  }
  const currentPage = document.getElementById('page' + pageNum);
  currentPage.style.display = 'block';
  currentPage.classList.add('page-flip');
  setTimeout(() => currentPage.classList.remove('page-flip'), 600);
  document.getElementById('currentPage').textContent = pageNum;
  document.getElementById('prevBtn').disabled = pageNum === 1;
  document.getElementById('nextBtn').disabled = pageNum === totalPages;
}

function changePage(direction) {
  const newPage = currentPageNum + direction;
  if (newPage >= 1 && newPage <= totalPages) {
    currentPageNum = newPage;
    showPage(currentPageNum);
  }
}

function revealMessage() {
  const hiddenMessage = document.getElementById('hiddenMessage');
  hiddenMessage.style.display = 'block';
}

function openEnvelope() {
  alert(
    `sayang,

    aku tau kita ketemu dari tempat yang ga biasa.
    tapi dari semua cara, kamu yang paling bikin aku betah.

    aku mungkin ga selalu bisa ada di samping kamu,
    tapi aku selalu ada buat kamu.
    
    makasih ya,
    udah bikin dunia kecil aku jadi berarti.`
  );
}


// Music functions
function playMusic() {
  // Try to play music (may be blocked by browser autoplay policy)
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Autoplay started successfully
      isPlaying = true;
      updateMusicIcon();
    }).catch(error => {
      // Autoplay was prevented
      console.log("Autoplay prevented:", error);
      // Show a message or handle the case where autoplay is blocked
    });
  }
}

function showMusicPrompt() {
  // This function can be used to show a prompt for users to enable music
  console.log("Please click the music icon to enable sound.");
}

function toggleMusic() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
  updateMusicIcon();
}

function updateMusicIcon() {
  const icon = document.getElementById('musicIcon');
  if (isPlaying) {
    icon.className = 'fas fa-pause';
  } else {
    icon.className = 'fas fa-music';
  }
}

function showMusicPrompt() {
  // Create a simple prompt to start music
  const prompt = document.createElement('div');
  prompt.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        font-family: 'Kalam', cursive;
        max-width: 90%;
      `;
  prompt.innerHTML = `
        <h3 style="color: #8B4513; margin-bottom: 10px;">🎵 Musik Romantis</h3>
        <p style="color: #5D4037; margin-bottom: 15px;">Putar musik latar untuk pengalaman yang lebih romantis?</p>
        <button onclick="this.parentElement.remove(); audio.play(); isPlaying = true; updateMusicIcon();" 
                style="background: #8B4513; color: white; border: none; padding: 8px 16px; 
                       border-radius: 5px; cursor: pointer; margin-right: 10px;">Ya</button>
        <button onclick="this.parentElement.remove();" 
                style="background: #ccc; color: #333; border: none; padding: 8px 16px; 
                       border-radius: 5px; cursor: pointer;">Tidak</button>
      `;
  document.body.appendChild(prompt);
}

// Set initial volume
audio.volume = 0.3;

document.querySelectorAll('.polaroid').forEach(p => {
  p.addEventListener('click', () => {
    p.style.animation = 'float 1s ease';
    setTimeout(() => (p.style.animation = ''), 1000);
  });
});

document.addEventListener('keydown', e => {
  if (document.getElementById('albumPages').style.display === 'block') {
    if (e.key === 'ArrowLeft') changePage(-1);
    else if (e.key === 'ArrowRight') changePage(1);
    else if (e.key === 'Escape') goToCover();
  }
});

setInterval(() => {
  document.querySelectorAll('.doodle').forEach(d => {
    d.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
  });
}, 3000);

window.addEventListener('load', () => {
  setTimeout(() => console.log('💕 Album Cinta siap dibuka! Klik cover album untuk memulai.'), 1000);
  // Initialize floating hearts
  initFloatingHearts();
});

// ===== FLOATING HEARTS AMBIENT EFFECT =====
function initFloatingHearts() {
  const container = document.getElementById('floatingHeartsContainer');
  const hearts = ['💕', '💖', '💗', '💘', '💝'];

  // Create initial hearts
  for (let i = 0; i < 8; i++) {
    createFloatingHeart(container, hearts);
  }

  // Add new hearts periodically
  setInterval(() => {
    if (Math.random() > 0.3) {
      createFloatingHeart(container, hearts);
    }
  }, 2000);
}

function createFloatingHeart(container, hearts) {
  const heart = document.createElement('div');
  const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
  const randomLeft = Math.random() * window.innerWidth;
  const randomDelay = Math.random() * 2;
  const randomDuration = Math.random() * 3 + 7;

  heart.className = `floating-heart heart-${(Math.floor(Math.random() * 5) + 1)}`;
  heart.textContent = randomHeart;
  heart.style.left = randomLeft + 'px';
  heart.style.animationDelay = randomDelay + 's';
  heart.style.animationDuration = randomDuration + 's';
  heart.style.opacity = (0.4 + Math.random() * 0.4);

  container.appendChild(heart);

  // Remove heart after animation completes
  setTimeout(() => {
    heart.remove();
  }, (randomDuration + randomDelay) * 1000);
}

// Handle page visibility to pause music when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden && isPlaying) {
    audio.pause();
  } else if (!document.hidden && isPlaying) {
    audio.play();
  }
});

// Add touch feedback for mobile
document.addEventListener('touchstart', function (e) {
  if (e.target.classList.contains('page-btn') ||
    e.target.classList.contains('reveal-btn') ||
    e.target.classList.contains('polaroid') ||
    e.target.classList.contains('sticky-note')) {
    e.target.style.transform = 'scale(0.95)';
  }
});

document.addEventListener('touchend', function (e) {
  if (e.target.classList.contains('page-btn') ||
    e.target.classList.contains('reveal-btn') ||
    e.target.classList.contains('polaroid') ||
    e.target.classList.contains('sticky-note')) {
    e.target.style.transform = '';
  }
});

// Gallery Media Player Functionality - Support untuk semua polaroid (foto & video)
function initializeGalleryMedia() {
  document.querySelectorAll('.polaroid[data-type]').forEach(polaroid => {
    const type = polaroid.getAttribute('data-type');

    if (type === 'video') {
      const videoSrc = polaroid.getAttribute('data-src');

      // Create video element if not exists
      let video = polaroid.querySelector('.gallery-video');
      if (!video) {
        video = document.createElement('video');
        video.className = 'gallery-video';
        video.controls = false;
        video.autoplay = true;
        video.muted = true;
        video.loop = false;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';

        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';
        video.appendChild(source);

        const caption = polaroid.querySelector('.polaroid-caption');
        if (caption) {
          polaroid.insertBefore(video, caption);
        } else {
          polaroid.appendChild(video);
        }
      }

      polaroid.classList.add('video-polaroid');

      // Video event listeners
      video.addEventListener('play', function () {
        polaroid.classList.add('playing');
        document.querySelectorAll('.polaroid[data-type="video"] .gallery-video').forEach(otherVideo => {
          if (otherVideo !== video && !otherVideo.paused) {
            otherVideo.pause();
          }
        });
      });

      video.addEventListener('pause', function () {
        polaroid.classList.remove('playing');
      });

      video.addEventListener('ended', function () {
        polaroid.classList.remove('playing');
      });

      video.addEventListener('click', function (e) {
        e.stopPropagation();
        if (this.paused) {
          this.play();
        } else {
          this.pause();
        }
      });

      // Play icon click handler - untuk toggle play/pause saat klik icon play
      const playIcon = polaroid.querySelector('.video-play-icon');
      if (playIcon) {
        playIcon.addEventListener('click', function (e) {
          e.stopPropagation();
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        });
      }

      video.setAttribute('tabindex', '0');
    }
  });
}

// Hook ke showPage untuk reinitialize media saat page berubah
const originalShowPage = showPage;
showPage = function (pageNum) {
  originalShowPage(pageNum);
  setTimeout(() => initializeGalleryMedia(), 100);
};

// Initial setup
initializeGalleryMedia();

// ===== MEDIA PROTECTION - Prevent Copy/Save =====

// Disable right-click on images and videos
document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' ||
    e.target.closest('.polaroid') || e.target.closest('.photo-grid')) {
    e.preventDefault();
    return false;
  }
});

// Disable drag on images and videos
document.addEventListener('dragstart', function (e) {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
    e.preventDefault();
    return false;
  }
});

// Disable keyboard shortcuts for save (Ctrl+S) on media
document.addEventListener('keydown', function (e) {
  // Disable Ctrl+S, Ctrl+Shift+S
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
    if (document.activeElement.tagName === 'IMG' ||
      document.activeElement.tagName === 'VIDEO' ||
      document.activeElement.closest('.polaroid')) {
      e.preventDefault();
      return false;
    }
  }
});

// Disable long press context menu on mobile for images
document.querySelectorAll('img, video').forEach(function (media) {
  media.addEventListener('touchstart', function (e) {
    // Prevent long press context menu
    media.style.webkitTouchCallout = 'none';
  });

  // Prevent selection
  media.addEventListener('selectstart', function (e) {
    e.preventDefault();
    return false;
  });
});

// Re-apply protection when new media is loaded (for dynamically added content)
function applyMediaProtection() {
  document.querySelectorAll('img, video, .gallery-video').forEach(function (media) {
    media.setAttribute('draggable', 'false');
    media.style.webkitUserSelect = 'none';
    media.style.userSelect = 'none';
    media.style.webkitTouchCallout = 'none';

    media.oncontextmenu = function () { return false; };
    media.ondragstart = function () { return false; };
  });
}

// Apply on load and periodically for dynamic content
window.addEventListener('load', applyMediaProtection);
setInterval(applyMediaProtection, 2000);