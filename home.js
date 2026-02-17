document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector('.sidebar');
  const scrollDown = document.querySelector('.scroll-down');
  const heroSection = document.querySelector('.hero');

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Show sidebar & scroll-down
        sidebar.style.opacity = '1';
        sidebar.style.pointerEvents = 'auto';

        scrollDown.style.opacity = '1';
        scrollDown.style.pointerEvents = 'auto';
        scrollDown.style.animation = 'blink 1.5s infinite'; // resume blink
      } else {
        // Hide sidebar & scroll-down completely
        sidebar.style.opacity = '0';
        sidebar.style.pointerEvents = 'none';

        scrollDown.style.opacity = '0';
        scrollDown.style.pointerEvents = 'none';
        scrollDown.style.animation = 'none'; // REMOVE blink completely
      }
    });
  }, { threshold: 0.05 });

  heroObserver.observe(heroSection);

  // Existing section animations (unchanged)
  function animateSection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;

        if (section.classList.contains("intuition-page")) {
          const text = section.querySelector(".intuition");
          const moons = section.querySelectorAll(".moon");

          text.classList.add("visible");

          moons.forEach((moon, i) => {
            setTimeout(() => {
              moon.classList.add("visible");
            }, i * 500);
          });
        }

        if (section.classList.contains("dream-loop")) {
          const dreamMoons = section.querySelectorAll(".moon-dream");

          dreamMoons.forEach((moon, i) => {
            setTimeout(() => {
              moon.classList.add("visible");
            }, i * 600);
          });
        }
      }
    });
  }

  const sectionObserver = new IntersectionObserver(animateSection, {
    threshold: 0.8
  });

  document.querySelectorAll(".intuition-page, .dream-loop").forEach(sec => {
    sectionObserver.observe(sec);
  });
});
