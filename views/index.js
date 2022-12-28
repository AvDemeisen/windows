const container = document.getElementById('container');
const overlay = document.getElementById('overlay');
const insideWall = document.getElementById('insideWall');

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

overlay.addEventListener("mousedown", dragStart);
overlay.addEventListener("mouseup", dragEnd);
overlay.addEventListener("mousemove", drag);

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function(event) {
    // Check if the device is tilted more than 20 degrees in either direction
    if (Math.abs(event.gamma) > 20 || Math.abs(event.beta) > 20) {
      // Calculate the drag values based on the tilt of the device
      let currentX = event.gamma;
      let currentY = event.beta;

      // Invert the drag values if the device is tilted in the opposite direction
      if (event.gamma < 0) {
        currentX = -currentX;
      }
      if (event.beta < 0) {
        currentY = -currentY;
      }

      // Set the translate values for the overlay and insideWall elements
      setTranslate(currentX, currentY, overlay);
      setTranslate(currentX * 0.9, currentY * 0.9, insideWall);
    }
  });
}


function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
  
  isDragging = true;
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;
  
  isDragging = false;
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
  

    const maxDrag = container.offsetWidth * 0.02; 
    if (Math.abs(currentX) > maxDrag || Math.abs(currentY) > maxDrag) {
      return;
    }
  
    xOffset = currentX;
    yOffset = currentY;
  
    setTranslate(currentX, currentY, overlay);
    setTranslate(currentX * 0.9, currentY * 0.9, insideWall);
  }
}

const setBackgroundImage = (elm, imageUrl) => {
  elm.style.backgroundImage = `url(${imageUrl})`;
};

const setTranslate = (xPos, yPos, el) => {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
};

const startFlicker = () => {
  setInterval(flicker, Math.random() * 1000 + 100);
};

const flicker = () => {
  const lit = Math.random() >= 0.5;
  const numFlickers = Math.floor(Math.random() * 4) + 1; 
  for (let i = 0; i < numFlickers; i++) {
    setTimeout(changeColor, Math.random() * 1000 + 100, lit); 
  }
};

const changeColor = (lit) => {
  setBackgroundImage(overlay, lit ? 'assets/WALL-LIT.png' : 'assets/WALL-UNLIT.png');
  setBackgroundImage(insideWall, lit ? 'assets/ROOM-LIT.png' : 'assets/ROOM-UNLIT.png');
};

startFlicker();


