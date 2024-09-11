function neonCursorWithTail(options) {
    const numTails = options.tailCount || 10; // Number of tails to create
    const tailElements = [];

    // Create multiple tail elements
    for (let i = 0; i < numTails; i++) {
        const tail = document.createElement('div');
        tail.classList.add('cursor-tail');
        document.body.appendChild(tail);
        tailElements.push(tail);
    }

    const tailColors = [
        'rgba(255, 0, 0, 0.8)',   // Red
        'rgba(255, 255, 0, 0.8)', // Yellow
        'rgba(0, 255, 0, 0.8)',   // Green
        'rgba(0, 255, 255, 0.8)', // Cyan
        'rgba(0, 0, 255, 0.8)',   // Blue
        'rgba(255, 0, 255, 0.8)'  // Magenta
    ];

    let posX = 0, posY = 0;
    let lastX = Array(numTails).fill(0);
    let lastY = Array(numTails).fill(0);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        posX = e.clientX;
        posY = e.clientY;
    });

    function render() {
        // Update positions for each tail
        for (let i = numTails - 1; i >= 0; i--) {
            if (i === 0) {
                lastX[i] = posX;
                lastY[i] = posY;
            } else {
                lastX[i] = lastX[i - 1];
                lastY[i] = lastY[i - 1];
            }

            // Apply positions and colors
            tailElements[i].style.transform = `translate3d(${lastX[i] - 7.5}px, ${lastY[i] - 7.5}px, 0)`;
            tailElements[i].style.backgroundColor = tailColors[i % tailColors.length];
            tailElements[i].style.boxShadow = `0 0 10px ${tailColors[i % tailColors.length]}`;
        }

        // Continue the animation
        requestAnimationFrame(render);
    }

    render();
}

neonCursorWithTail({
    tailCount: 15 // Number of trailing circles behind the cursor
});
