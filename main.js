const toggleButton = document.querySelector('.toggleLDMode');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('darkMode');
    document.body.classList.toggle('lightMode');
});
