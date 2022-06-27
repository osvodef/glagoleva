const contacts = document.querySelector('.section.contacts');
const rightColumn = document.querySelector('.column-right');
const indicator = document.querySelector('.indicator');
const about = document.querySelector('.section.about');
const header = document.querySelector('.header');
const topbar = document.querySelector('.topbar');
const menu = document.querySelector('.menu');

let menuOpen = false;

function adjustBackground() {
    const offset = window.scrollX + rightColumn.getBoundingClientRect().left;

    document.body.style.backgroundPositionX = `${-1600 + offset}px`;
    topbar.style.backgroundPositionX = `${-1600 + offset}px`;
    menu.style.left = `${Math.floor(offset)}px`;
}

function adjustTopbar() {
    if (window.innerWidth <= 720 || header.getBoundingClientRect().bottom < 0) {
        topbar.style.display = 'block';
    } else {
        topbar.style.display = 'none';
    }
}

function adjustContacts() {
    const padding = window.innerWidth > 1200 ? 120 : 90;
    const topbarHeight = window.innerWidth > 1200 ? 98 : 60;
    const position = about.getBoundingClientRect().bottom + padding;

    if (position < topbarHeight + 30) {
        contacts.classList.add('fixed');
    } else {
        contacts.classList.remove('fixed');
    }
}

function moveIndicator() {
    const allSections = document.querySelectorAll('.expitem, .editem');
    const allStars = document.querySelectorAll('.expitem-indicator, .editem-indicator');
    const allHeaders = document.querySelectorAll('.expitem-name');

    const section = selectSection(allSections);
    const star = section.querySelector('.expitem-indicator, .editem-indicator');
    const header = section.querySelector('.expitem-name');

    for (const star of allStars) {
        star.style.transform = 'scale(0)';
    }

    for (const header of allHeaders) {
        header.classList.remove('selected');
    }

    star.style.transform = 'scale(1)';

    if (header) {
        header.classList.add('selected');
    }
}

function selectSection(sections) {
    for (const section of sections) {
        if (section.getBoundingClientRect().top > topbar.offsetHeight) {
            return section;
        }
    }

    return sections[sections.length - 1];
}

function openMenu() {
    menu.style.transform = 'translateX(0)';

    const button = document.querySelector('.menu-button.mobile');
    button.src = 'close.svg';
    button.style.width = '14px';

    menuOpen = true;
}

function closeMenu() {
    menu.style.transform = 'translateX(100%)';

    const button = document.querySelector('.menu-button.mobile');
    button.src = 'menu-black.svg';
    button.style.width = '19px';

    menuOpen = false;
}

function toggleMenu() {
    if (menuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

adjustBackground();
adjustContacts();
adjustTopbar();
moveIndicator();

window.addEventListener('resize', () => adjustBackground());
window.addEventListener('resize', () => adjustContacts());
window.addEventListener('resize', () => adjustTopbar());
window.addEventListener('scroll', () => adjustContacts());
window.addEventListener('scroll', () => adjustTopbar());
window.addEventListener('scroll', () => moveIndicator());

document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', () => toggleMenu());
});
document.querySelector('.close-button').addEventListener('click', () => closeMenu());

document.querySelectorAll('.menu-item a').forEach(item => {
    item.addEventListener('click', e => {
        closeMenu();

        if (item.getAttribute('href') === '#contacts' && window.innerWidth <= 720) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
});

window.addEventListener('load', () => {
    document.querySelectorAll('.asterisk').forEach(asterisk => {
        asterisk.style.transform = 'scale(1)';
    });
});
