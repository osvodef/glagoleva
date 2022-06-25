const rightColumn = document.querySelector('.column-right');
const indicator = document.querySelector('.indicator');

function adjustBackground() {
    const offset = window.scrollX + rightColumn.getBoundingClientRect().left;

    document.body.style.backgroundPositionX = `${-1600 + offset}px`;
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
        if (section.getBoundingClientRect().top > 0) {
            return section;
        }
    }

    return sections[sections.length - 1];
}

adjustBackground();
moveIndicator();

window.addEventListener('resize', () => adjustBackground());
window.addEventListener('scroll', () => moveIndicator());
