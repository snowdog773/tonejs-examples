const button = document.getElementById("test-button");

const synth = new Tone.FMSynth().toDestination();

const songArray = [
  { note: "C4", duration: "8n", time: 0 },
  { note: "D4", duration: "8n", time: 0.5 },
  { note: "E4", duration: "8n", time: 1 },
  { note: "F4", duration: "8n", time: 1.5 },
  { note: "G4", duration: "8n", time: 2 },
  { note: "A4", duration: "8n", time: 2.5 },
  { note: "B4", duration: "8n", time: 3 },
  {
    note: "C5",
    duration: "8n",
    time: 3.5,
  },
];
// Create a sequence that loops through the songArray
const sequence = new Tone.Sequence(
  (time, event) => {
    synth.triggerAttackRelease(event.note, event.duration, time);
  },
  songArray.map((event) => event),
  "8n"
);

sequence.loop = true;

const playSong = () => {
  // Start the transport if it's not running
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
    sequence.start(0);
    button.textContent = "Stop";
  } else {
    Tone.Transport.stop();
    sequence.stop();
    button.textContent = "Play";
  }
};

button.addEventListener("click", () => playSong());
