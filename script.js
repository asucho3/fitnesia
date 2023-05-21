// TESTIMONIALS (slider component)

const testimonialNav = document.querySelectorAll('.move');
const testimonials = document.querySelectorAll('.testimonial');
const toggleMenu = document.querySelector('.toggleMenu');

const offset = 50;
let currentIndex = 0;

// moveTestimonials slides the testimonials left/right depending on which button the user clicks
// whichever item has the dataset.code set to 0 will be the one to be showed (because (0-1)*50 = -50% and that's the translateX that centers the testimonial)

const moveTestimonials = function (e) {
  let direction;
  if (e.target.classList.contains('next')) {
    if (currentIndex === testimonials.length - 1) return;
    direction = -1;
  }
  if (e.target.classList.contains('previous')) {
    if (currentIndex === 0) return;
    direction = 1;
  }
  currentIndex -= direction;

  testimonials.forEach((el) => {
    // hide all the elements
    el.classList.add('hidden');
    // apply transformation
    el.dataset.code = String(+el.dataset.code + direction);
    el.style.transform = `translate(${(el.dataset.code - 1) * offset}%, -50%)`;
    // only show the item that has the dataset.code set to 0
    if (el.dataset.code === '0') el.classList.remove('hidden');

    // reveal both buttons
    testimonialNav.forEach((el) => {
      el.classList.remove('hidden');
    });
    if (currentIndex === 0) {
      // hide the 'previous' button if this is the first item
      testimonialNav.forEach((el) => {
        if (el.classList.contains('previous')) {
          el.classList.add('hidden');
        }
      });
    }
    if (currentIndex === testimonials.length - 1) {
      // hide the 'previous' button if this is the last item
      testimonialNav.forEach((el) => {
        if (el.classList.contains('next')) {
          el.classList.add('hidden');
        }
      });
    }
  });
};

// initialize the testimonials' positions
const init = function () {
  testimonials.forEach((el) => {
    el.classList.add('hidden');
    el.style.transform = `translate(${(el.dataset.code - 1) * offset}%, -50%)`;
    if (el.dataset.code === '0') el.classList.remove('hidden');
    // hide the 'previous' button
    testimonialNav.forEach((el) => {
      if (el.classList.contains('previous')) {
        el.classList.add('hidden');
      }
    });
  });
};

// add the event listeners for the testimonial navigation (previous/next)
testimonialNav.forEach((el) =>
  el.addEventListener('click', function (e) {
    moveTestimonials(e);
  })
);

init();

// FAQ (accordion component)
const faqContainer = document.querySelector('.faq-container');

faqContainer.addEventListener('click', function (e) {
  if (!e.target.closest('.faq-container')) return;
  const allFaqItems = document.querySelectorAll('.faq-item');
  allFaqItems.forEach((el) => {
    if (el === e.target.closest('.faq-item')) return;
    el.classList.remove('active');
    el.querySelector('.faq-text').classList.add('collapse');
  });
  const faqItem = e.target.closest('.faq-item');
  faqItem.classList.toggle('active');
  const faqText = faqItem.querySelector('.faq-text');
  faqText.classList.toggle('collapse');

  const newsletter = document.querySelector('.newsletter-container');
  if (faqItem.classList.contains('active')) {
    newsletter.style.marginTop = '5.7rem';
    return;
  }
  newsletter.style.marginTop = '8.6rem';
});

// Sticky nav
const header = document.querySelector('.header');
const hero = document.querySelector('.section-hero');

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    hero.style.marginTop = `${header.getBoundingClientRect().height}px`;
    header.classList.add('sticky');
  }
  if (entry.isIntersecting) {
    header.classList.remove('sticky');
    hero.style.marginTop = '0';
  }
};

const navObserver = new IntersectionObserver(stickyNav, {
  threshold: 0.1,
});

navObserver.observe(hero);

// Navigation
document.body.addEventListener('click', function (e) {
  if (!e.target.classList.contains('nav-link')) return;
  document.querySelector(`${e.target.getAttribute('href')}`).scrollIntoView({
    alignToTop: true,
    behavior: 'smooth',
  });
  header.classList.remove('visible');
});

// Mobile menu
toggleMenu.addEventListener('click', function (e) {
  if (!e.target.classList.contains('toggleMenu')) return;
  header.classList.toggle('visible');
});
