const container = document.getElementById('container');
const resizeBtn = document.getElementById('resize-btn');

// Function to generate the grid
function createGrid(squaresPerSide) {
    container.innerHTML = '';
    const totalSquares = squaresPerSide * squaresPerSide;
    const squareSizePercent = 100 / squaresPerSide;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        
        square.style.width = `${squareSizePercent}%`;
        square.style.height = `${squareSizePercent}%`;
        
        square.dataset.darkness = 0;

        // Prevent the browser's default drag behavior so drawing is smooth
        square.addEventListener('dragstart', (e) => e.preventDefault());

        // Draw when a square is clicked directly
        square.addEventListener('mousedown', applyDarkeningEffect);

        // Draw when the mouse enters a square WHILE the left mouse button is held down
        square.addEventListener('mouseenter', (e) => {
            if (e.buttons === 1) {
                applyDarkeningEffect(e);
            }
        });

        container.appendChild(square);
    }
}

// Function to handle progressive darkening
function applyDarkeningEffect(e) {
    const square = e.target;
    let currentDarkness = parseInt(square.dataset.darkness);
    
    if (currentDarkness < 10) {
        currentDarkness += 1;
        square.dataset.darkness = currentDarkness;
        
        const opacity = currentDarkness / 10;
        square.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    }
}

// Event listener for the resizing button
resizeBtn.addEventListener('click', () => {
    let userInput = prompt('Enter the number of squares per side (maximum 100):', 16);
    
    if (userInput !== null) {
        let newSize = parseInt(userInput);
        
        if (isNaN(newSize) || newSize <= 0) {
            alert('Please enter a valid positive number.');
        } else if (newSize > 100) {
            alert('Grid too large! Please enter a number of 100 or less.');
        } else {
            createGrid(newSize);
        }
    }
});

// Initialize the default 16x16 grid
createGrid(16);