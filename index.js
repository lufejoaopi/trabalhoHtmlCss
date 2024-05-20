// Function to redirect to a specified URL
function redirecionar(url) {
    window.location.href = url;
}

// Select all slide elements, previous and next buttons, and menu elements
const slides = document.querySelectorAll('.slide');
const anterior = document.querySelector('.anterior');
const proximo = document.querySelector('.proximo');
const menuLista = document.querySelector('.menu-lista'); 
const menuLinks = document.querySelector('.menu-links');

// Toggle menu active class on click
menuLista.addEventListener('click', () => {
  menuLista.classList.toggle('menu-ativo');
  menuLinks.classList.toggle('menu-ativo');
});

let slideAtual = 0; // Initialize the current slide index

// Function to display the slide at the given index
function mostrarSlide(indice) {
    slides.forEach(slide => {
        slide.style.opacity = 0; // Hide all slides
        slide.style.transition = 'opacity 0.5s ease'; // Add smooth transition
        slide.setAttribute('aria-hidden', 'true'); // Set ARIA attribute for accessibility
    });
    slides[indice].style.opacity = 1; // Show the current slide
    slides[indice].classList.add('ativo'); // Add active class to the current slide
    slides[indice].setAttribute('aria-hidden', 'false'); // Set ARIA attribute for accessibility
}

mostrarSlide(slideAtual); // Show the initial slide

// Event listener for the previous button
anterior.addEventListener('click', () => {
    slideAtual--;
    if (slideAtual < 0) {
        slideAtual = slides.length - 1; // Loop to the last slide
    }
    mostrarSlide(slideAtual);
});

// Event listener for the next button
proximo.addEventListener('click', () => {
    slideAtual++;
    if (slideAtual >= slides.length) {
        slideAtual = 0; // Loop to the first slide
    }
    mostrarSlide(slideAtual);
});

// Automatically change the slide every 3 seconds
let autoSlide = setInterval(() => {
    proximo.click();
}, 3000);

// Pause the slideshow when hovering over slides
slides.forEach(slide => {
    slide.addEventListener('mouseover', () => {
        clearInterval(autoSlide);
    });

    slide.addEventListener('mouseout', () => {
        autoSlide = setInterval(() => {
            proximo.click();
        }, 3000);
    });
});
