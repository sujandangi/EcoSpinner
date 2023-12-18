const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const wheelSize = Math.min(window.innerWidth - 20, 500); // Adjusting wheel size
canvas.width = wheelSize;
canvas.height = wheelSize;
const data = ['Switch to LEDs',
'Fix Leaky Pipes',
'Reduce Plastic Use',
'Less Paper Go Digital',
'Stop Food Waste',
'Take the Stairs',
'Shorter Showers',
'Rethink Bottled Water',
'Reduce GHG',
'Walk More',
'Turn Lights Off',
'Recycle'];
const colors = [
    '#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5',
    '#ff8b94', '#a8e6cf', '#dcedc1', '#ffd3b6',
    '#ffaaa5', '#ff8b94', '#a8e6cf', '#dcedc1'
];
let angle = 0;
let spinSpeed = 0;
let isSpinning = false;

// Function to draw the wheel
function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = wheelSize / 2 - 10; // Adjusted for padding

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the wheel sections
for (let i = 0; i < data.length; i++) {
    const startAngle = (i / data.length) * Math.PI * 2;
    const endAngle = ((i + 1) / data.length) * Math.PI * 2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();

    // Add a border to the sections
    ctx.strokeStyle = '#fba7b6'; // Neon-colored border
    ctx.lineWidth = 1; // Border width
    ctx.stroke();

    // Add a box shadow to the sections
    // ctx.shadowColor = '#b8d8be'; // Shadow color
    // ctx.shadowBlur = 20; // Shadow blur radius
    // ctx.shadowOffsetX = 3; // Horizontal shadow offset
    // ctx.shadowOffsetY = 3; // Vertical shadow offset

    // Add text labels to the sections
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + (endAngle - startAngle) / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#065535';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(data[i], radius / 2, 0);
    ctx.restore();
}

}

// Function to spin the wheel
function spin() {
    if (!isSpinning) {
        // Generate a random spinSpeed between 5 and 10 for a spin animation
        spinSpeed = Math.random() * 5 + 5;
        isSpinning = true;
        animateSpin();
    }
}

// Function to animate the spinning
function animateSpin() {
    if (spinSpeed > 0.1) {
        // Rotate the wheel by the spinSpeed
        angle += spinSpeed;
        spinSpeed -= 0.1;

        // Clear and redraw the wheel at the new angle
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawWheel();

        // Continue the animation
        requestAnimationFrame(animateSpin);
    } else {
        // Finish the spinning animation
        isSpinning = false;
        // Optionally, you can add logic to determine the selected option based on the final angle
    }
}

// Call the drawWheel function when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    drawWheel();
});

// Add an event listener to the "Spin" button to trigger spinning
document.getElementById('spinButton').addEventListener('click', spin);
