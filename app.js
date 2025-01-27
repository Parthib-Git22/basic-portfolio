let menu = document.querySelector(".menu");
let checkBox = document.getElementById("check-box");

window.addEventListener("load", function(){
    checkBox.checked = false;
    menu.style.display = 'none';
})
checkBox.addEventListener("change",function(){
    if(checkBox.checked){
        menu.style.display = 'block';
    }else{
        menu.style.display = 'none';
    }
})

function handleResize(){
    if(window.innerWidth >= 768){
        checkBox.checked = false;
        menu.style.display = 'none';
    }
}

// if the window size >= 768px then even if the checkBox was checked in small screen , it gets unchecked
window.addEventListener("resize",handleResize);

handleResize(); // initial check


let spanText = document.querySelector(".Home .left .description p span");

const words = [`Fullstack Development`, `Frontend Development`, `Backend Development`];

let wordIdx = 0;
let charIdx = 0;
let typingSpeed = 125;
let erasingSpeed = 50;
let delay = 1000;

function type(){
    if(charIdx < words[wordIdx].length){
        // type the current word
        spanText.innerText += words[wordIdx].charAt(charIdx); // f
        // move on to the next character of the word
        charIdx++;
        // set a delay to type the next character of the word
        setTimeout(type, typingSpeed);
    }else{
        // charIdx = curWord.length
        // the curWord is finished typing -> erase it to type the next word
        // add a delay between words
        setTimeout(erase, delay);
    }
}

function erase(){
    if(charIdx > 0){
        // erase
        spanText.innerText = words[wordIdx].slice(0, charIdx - 1); // one character removed from end
        charIdx--;
        setTimeout(erase, erasingSpeed);
    }else{
        // charIdx = 0
        // curWord is finished erasing -> move on to type the next word
        if(wordIdx < words.length - 1) wordIdx++;
        else wordIdx = 0;
        setTimeout(type, delay);
    }
}
setTimeout(type, typingSpeed);

//Page refresh

let nameIcon = document.querySelector(".navbar .name");

nameIcon.addEventListener('click', function(evt){
    evt.preventDefault(); // prevents the default anchor behaviour
    location.reload();
})

// Temporary

// function printDimensions(){
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     console.log(`width = ${width}, height = ${height}`);
// }

// window.addEventListener("resize", printDimensions);
// printDimensions();

// Display form details in console

const form = document.querySelector(".form-container form");

form.addEventListener("submit", function(evt){
    evt.preventDefault();

    const name = form.querySelector(".lt").value;
    const email = form.querySelector(".rt").value;
    const subj = form.querySelector(".subj input").value;
    const msg = form.querySelector(".msg textarea").value;

    console.log("Form Details : ");
    console.log(`Name : ${name}`);
    console.log(`Email : ${email}`);
    console.log(`Subject : ${subj}`);
    console.log(`Message : ${msg}`);

    form.reset();
});

// const submitBtn = document.querySelector(".form-container form .btn");

// submitBtn.addEventListener("click", function(evt){
//     evt.preventDefault();

// })


// Intersection observer 

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar .nav-links .nav-link");
const menuLinks = document.querySelectorAll(".menu .menu-links .menu-link");

// console.log(sections);
// console.log(navLinks);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            // console.log(entry.target);

            // remove active class from all other nav items
            if(window.innerWidth <= 768) menuLinks.forEach((menuLink) => menuLink.classList.remove("active"));
            else navLinks.forEach((navLink) => navLink.classList.remove("active"));

            // add active class to current nav link
            const id = entry.target.getAttribute("id");
            console.log(id);
            const activeLink = window.innerWidth <= 768 ? document.querySelector(`.menu .menu-links .menu-link[href="#${id}"]`) : document.querySelector(`.navbar .nav-links .nav-link[href="#${id}"]`);
            if(activeLink) activeLink.classList.add("active");

            entry.target.classList.add("show"); // only added for the 1st time when scrolled
        }
    })
}, {
    threshold: .15,
})

sections.forEach((section) => {
    observer.observe(section);
})