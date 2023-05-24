/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
  navToogle = document.getElementById('nav-toogle'),
  navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if (navToogle) {
  navToogle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
}
console.log(navLink);
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillList = document.getElementById('skills__list');
const skillsIcon = document.getElementById('skills__icon-down');

function openSkillsBar() {
  skillList.classList.toggle('skills__list-open');
  skillsIcon.classList.toggle('skills__icon-down-opened');
}
/*==================== ACCORDION SKILLS 2 ====================*/
skillsIcon.addEventListener('click', openSkillsBar);

const skillList2 = document.getElementById('skills__list2');
const skillsIcon2 = document.getElementById('skills__icon-down2');

function openSkillsBar2() {
  skillList2.classList.toggle('skills__list-open2');
  skillsIcon2.classList.toggle('skills__icon-down-opened');
}

skillsIcon2.addEventListener('click', openSkillsBar2);

/*==================== QUALIFICATION TABS ====================*/

const qd1 = document.getElementById('qualification__data-info1');
const qd2 = document.getElementById('qualification__data-info2');
const qd3 = document.getElementById('qualification__data-info3');
const qd4 = document.getElementById('qualification__data-info4');

const cargarImagen = (entradas, oservador) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      console.log('Imagen dentro del VP');
      entrada.target.classList.add('visible');
    } else {
      // No se si me gusta este efecto
      /* entrada.target.classList.remove('visible');*/
    }
  });
};

const observador = new IntersectionObserver(cargarImagen, {
  root: null,
  rootMargin: '0px',
  threshold: 0.8,
});

observador.observe(qd1);
observador.observe(qd2);
observador.observe(qd3);
observador.observe(qd4);

/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper('.portfolio__container', {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  /*
  const scrollY = window.pageYOffset*/

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    sectionId = section.getAttribute('id');

    if (
      this.scrollY > sectionTop &&
      this.scrollY <= sectionTop + sectionHeight
    ) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link');
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById('header');
  if (this.scrollY >= 80) {
    nav.classList.add('scroll__header');
  } else {
    nav.classList.remove('scroll__header');
  }
}

window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const nav = document.getElementById('scroll__top');
  if (this.scrollY >= 80) {
    console.log(this.scrollY);
    nav.classList.add('show__scroll');
  } else {
    nav.classList.remove('show__scroll');
  }
}

window.addEventListener('scroll', scrollUp);

const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  //     reset: true
});

sr.reveal('.home__social', {});
sr.reveal('.home__img', {});
sr.reveal('.home__title, .home__subtitle, .home__description', { delay: 300 });
sr.reveal('.home__contact-icon', { delay: 400 });

sr.reveal('.button__scroll-reveal', {});

/*==================== SEND CONTACT INFORMATION ====================*/

const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();

  btn.classList.add('cargando');

  const serviceID = 'default_service';
  const templateID = 'template_bh65hvn';

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.classList.remove('cargando');
      alert('Message sent correctly!');
    },
    (err) => {
      btn.classList.remove('cargando');
      alert(JSON.stringify(err));
    }
  );
});

/*==================== TRADUCCION EN/ES ====================*/

const traductionBtn = document.getElementsByClassName('traductionBtn');
const textsToChange = document.querySelectorAll('[data-section]');

const changeLanguage = async (language) => {
  const requestJson = await fetch(`../assets/languages/${language}.json`);
  const texts = await requestJson.json();
  for (const textToChange of textsToChange) {
    const fromTextSection = textToChange.dataset.section;
    const textValue = textToChange.dataset.value;
    textToChange.innerHTML = texts[fromTextSection][textValue];
  }
};

for (let i = 0; i < traductionBtn.length; i++) {
  traductionBtn[i].addEventListener('click', (e) => {
    changeLanguage(e.target.dataset.language);
  });
}

const languageToggle = document.getElementById('languageToggle');
const content = document.getElementById('content');

languageToggle.addEventListener('click', function () {
  content.textContent =
    content.textContent === 'Hola, bienvenido a mi página.'
      ? 'Hello, welcome to my page.'
      : 'Hola, bienvenido a mi página.';
  languageToggle.classList.toggle('active');
});
