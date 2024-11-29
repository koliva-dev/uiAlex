let isDragging = false;
let offsetX, offsetY;

const frame = document.getElementById('pseudoDetachedFrame');
const header = frame.querySelector('.frame-header');
const closeButton = document.getElementById('closeFrame');
const restoreButton = document.getElementById('restoreFrame');

// Function to start dragging
header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - frame.offsetLeft;
    offsetY = e.clientY - frame.offsetTop;
    frame.style.cursor = 'grabbing';
});

// Function to drag the frame
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        frame.style.left = `${e.clientX - offsetX}px`;
        frame.style.top = `${e.clientY - offsetY}px`;
    }
});

// Stop dragging
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        frame.style.cursor = 'grab';
    }
});

// Close the frame
closeButton.addEventListener('click', () => {
    frame.classList.add('hidden');
});

// Restore the frame
restoreButton.addEventListener('click', () => {
    frame.classList.remove('hidden');
});
// Save position on drag end
document.addEventListener('mouseup', () => {
    if (isDragging) {
        const position = { top: frame.style.top, left: frame.style.left };
        localStorage.setItem('framePosition', JSON.stringify(position));
    }
});

// Restore position on page load
window.addEventListener('load', () => {
    const savedPosition = JSON.parse(localStorage.getItem('framePosition'));
    if (savedPosition) {
        frame.style.top = savedPosition.top;
        frame.style.left = savedPosition.left;
    }
});
