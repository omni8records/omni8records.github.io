const ctx = new AudioContext({ latencyHint: "interactive" });
let counter = 0;
function playPling() {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // 300, 1000, 1800 etc
  // 
  osc.frequency.value = 700;
  // sine/triangle/square/sawtooth
  const waveTypes = { 1: "sine", 2: "sawtooth", 3: "triangle" };
  osc.type = waveTypes[counter] || "square"; // Default

  const now = ctx.currentTime;

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.start(now);
  osc.stop(now + 0.25);
}
const laughSound = document.getElementById("laughSound");

function playLaugh() {
  laughSound.currentTime = 0;
  laughSound.play();
}

function playSound() {
  if (counter) { playPling(); return; }
  playLaugh();
}

const stack = document.querySelector(".card-stack");

if (stack) {
  let busy = false;

  stack.addEventListener("click", rotateStack);

  function rotateStack() {
    if (busy) return;

    const cards = stack.querySelectorAll(".stack-card");

    if (cards.length < 2) return;

    busy = true;
    // Sound
    // 


    playSound();
    counter = (counter + 1) % 4;


    // Last Cards is on Top.
    const topCard = cards[cards.length - 1];

    topCard.classList.add("leaving");

    topCard.addEventListener(
      "transitionend",
      () => {



        // Card Rotation
        stack.prepend(topCard);

        // Clear.
        const newCards = stack.querySelectorAll(".stack-card");

        newCards.forEach((card) => {
          card.classList.remove("front", "back", "leaving");
          card.classList.add("back");
        });

        // Last moves to top.
        newCards[newCards.length - 1].classList.remove("back");
        newCards[newCards.length - 1].classList.add("front");

        busy = false;
      },
      { once: true }
    );
  }
}