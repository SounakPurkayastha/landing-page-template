let show = false;

document.querySelector('body').addEventListener('click', (e) => {
    if (e.target.classList.value !== 'menu-icon' && e.target.classList.value !== 'nav-center') {
        show = false;
        document.querySelector('.nav-center').style.right = '-250px';
    }
});

document.querySelector('.menu-icon').addEventListener('click', () => {

    if (!show) 
        document.querySelector('.nav-center').style.right = '0px';
    
    else
        document.querySelector('.nav-center').style.right = '-250px';
    
    show = !show;
})

const getStartedButton = document.querySelectorAll('.get-started-button');

const introSection = document.querySelector('#intro-section');

getStartedButton.forEach((button) => button.addEventListener('click', () => {
    introSection.scrollIntoView({behavior:"smooth"});
}));

document.querySelector('.nav-links').addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav-link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }
})

const header = document.querySelector('header');

const stickyNav = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting)
        document.querySelector('.nav-container').classList.remove('sticky');
    else
        document.querySelector('.nav-container').classList.add('sticky');
}

const navHeight = document.querySelector('.nav-container').getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin:`30px`
});

headerObserver.observe(header);

const allSections = document.querySelectorAll('section');

const showSection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        entry.target.classList.remove('section-hidden');
        sectionObserver.unobserve(entry.target);
    }
}

const sectionObserver = new IntersectionObserver(showSection, {
    root: null,
    threshold:0.2
});

allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section-hidden')
});

const slides = document.querySelectorAll('.slide');

slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`)

const rightButton = document.querySelector('.slider-btn-right');
const leftButton = document.querySelector('.slider-btn-left');


let currentSlide = 0;
const maxSlides = slides.length;

const goToSlide = (slide) => {
    slides.forEach((s,i) => s.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
}

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % maxSlides;
    goToSlide(currentSlide);
}

const prevSlide = () => {
    if (currentSlide === 0)
        currentSlide = maxSlides - 1;
    else
        currentSlide = (currentSlide - 1) % maxSlides;
    goToSlide(currentSlide);
}

rightButton.addEventListener('click', () => {
    nextSlide();    
})

leftButton.addEventListener('click', () => {
    prevSlide();
})

let sliderInterval = setInterval(nextSlide, 5000);

const slider = document.querySelector(".slider");

slider.addEventListener("mouseenter", () => clearInterval(sliderInterval));

slider.addEventListener("mouseleave", () => sliderInterval = setInterval(nextSlide, 5000));