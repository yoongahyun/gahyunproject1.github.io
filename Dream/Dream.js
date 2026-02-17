/* ===============================
   FADE TITLE → WHITE PAGE
================================ */

const whitePage = document.querySelector('.white-page');
const typewriter = document.querySelector('.typewriter');
const paragraphs = document.querySelectorAll('.content p');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const fadeStart = 50;
  const fadeEnd = 250;

  if (scrollY > fadeStart) {
    let opacity = (scrollY - fadeStart) / (fadeEnd - fadeStart);
    opacity = Math.min(opacity, 1);
    whitePage.style.opacity = opacity;
    typewriter.style.opacity = 1 - opacity;
  } else {
    whitePage.style.opacity = 0;
    typewriter.style.opacity = 1;
  }
});

/* ===============================
   PARAGRAPH FADE-IN
================================ */

function fadeInOnScroll() {
  const triggerLine = window.innerHeight * 0.85;

  paragraphs.forEach((p, index) => {
    const top = p.getBoundingClientRect().top;

    if (top < triggerLine && !p.classList.contains('visible')) {
      setTimeout(() => {
        p.classList.add('visible');
      }, index * 120);
    }
  });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

/* ===============================
   CHOICE OVERLAY SYSTEM
================================ */

const overlay = document.getElementById('choiceOverlay');
const choiceText = document.getElementById('choiceText');
const choiceButtons = document.getElementById('choiceButtons');
const triggers = document.querySelectorAll('.choice-trigger');

let activeTrigger = null;

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('used')) {
        entry.target.classList.add('used');
        activeTrigger = entry.target;

        const text = entry.target.dataset.text || "";
        const delay = parseInt(entry.target.dataset.delay || "600", 10);
        const choices = JSON.parse(entry.target.dataset.choices || "[]");

        setTimeout(() => {
          showOverlay(text, choices);
        }, delay);
      }
    });
  },
  { threshold: 0.6 }
);

triggers.forEach(trigger => observer.observe(trigger));

function showOverlay(text, choices) {
  choiceText.textContent = text;
  choiceButtons.innerHTML = "";

  choices.forEach(choice => {
    let el;

    if (choice.type === "link") {
      el = document.createElement("a");
      el.href = choice.value;
    } else {
      el = document.createElement("button");
      el.addEventListener("click", closeOverlay);
    }

    el.textContent = choice.label;
    el.className = "choice-btn";
    choiceButtons.appendChild(el);
  });

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';

  if (activeTrigger) {
    observer.unobserve(activeTrigger);
    activeTrigger = null;
  }
}

