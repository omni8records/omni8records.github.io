// Omni8 Records — workshop interaction hooks
const ctx = new AudioContext({ latencyHint: "interactive" });

function playPling() {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // 300, 1000, 1800 etc
  osc.frequency.value = 700;

  // sine/triangle/square/sawtooth
  const waveTypes = { 1: "sine", 2: "sawtooth", 3: "triangle" };
  osc.type = waveTypes[1] || "square"; // Default

  const now = ctx.currentTime;

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.start(now);
  osc.stop(now + 0.25);
}

const processButtons = document.querySelectorAll(".process-button");
const popup = document.getElementById("videoPopup");
const video = document.getElementById("myVideo");
const audio = document.getElementById("myAudio");
const closeBtn = document.getElementById("closeBtn");

// SAFETY CHECK: Ensure popup and video exist in the DOM
if (popup && video) {

  // Runs however the modal is closed, including Escape
  popup.addEventListener("close", () => {
    video.pause();
    video.src = "";

    audio.pause();
    audio.removeAttribute("src");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.close();
    });
  }
}

processButtons.forEach(button => {
  button.addEventListener("click", () => {

    const videoFile = button.dataset.video;
    const audioFile = button.dataset.audio;

    // Video is assumed always to exist for process buttons
    video.src = videoFile;

    // Clean up any audio left from a previous button
    audio.pause();
    audio.removeAttribute("src");

    if (audioFile) {

      // Separate audio overrides the video's own soundtrack
      video.muted = true;

      audio.src = audioFile;
      audio.volume = 0.56;

    } else {

      // No separate audio: use the sound embedded in the video
      video.muted = false;
      video.volume = 0.56;
    }

    popup.showModal();

    video.play().catch(error => {
      console.log("Video playback was prevented by the browser:", error);
    });

    if (audioFile) {
      audio.play().catch(error => {
        console.log("Audio playback was prevented by the browser:", error);
      });
    }
  });
});
const workshopImages = [
  "./Resources/Omni8Records_Frame0.png",
  "./Resources/Omni8Records_Frame2.png",
  "./Resources/Omni8Records_Frame4.png",
  "./Resources/Omni8Records_Frame6.png"
];

const imageA = document.getElementById("workshopImageA");
const imageB = document.getElementById("workshopImageB");

let currentWorkshopImage = 0;
let showingA = true;

setInterval(() => {

  const nextImage =
    (currentWorkshopImage + 1) % workshopImages.length;

  if (showingA) {
    imageB.src = workshopImages[nextImage];
    imageB.style.opacity = 1;
  } else {
    imageA.src = workshopImages[nextImage];
    imageB.style.opacity = 0;
  }

  showingA = !showingA;
  currentWorkshopImage = nextImage;

}, 8000);