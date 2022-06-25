function adjustBackground() {
    const rightColumn = document.querySelector('.column-right');
    const offset = window.scrollX + rightColumn.getBoundingClientRect().left;

    document.body.style.backgroundPositionX = `${-1600 + offset}px`;
}

adjustBackground();

window.addEventListener('resize', () => adjustBackground());
