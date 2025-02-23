const filter = new Tone.AutoFilter({
  frequency: 9,
  type: "sine",
  depth: 0.6,
  baseFrequency: 200,
  octaves: 4,
  filter: {
    type: "lowpass",
    rolloff: -12,
    Q: 2,
  },
}).toDestination();

// Start the filter's internal LFO
filter.start();

// Enhanced synth
const synth = new Tone.DuoSynth({
  oscillator: {
    type: "triangle8",
    modulationType: "sine",
    harmonicity: 1.5,
    modulationIndex: 2,
  },
  envelope: {
    attack: 0.05,
    decay: 0.2,
    sustain: 0.4,
    release: 1.2,
  },
}).connect(filter);
// }).toDestination();

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const octaves = [4, 5];

// Create piano keys for each octave
octaves.forEach((octave) => {
  // Create a key for each note in the octave
  notes.forEach((note) => {
    const key = document.createElement("div");
    const isBlackKey = note.includes("#"); // Check if it's a sharp note (black key)
    key.className = isBlackKey ? "key black-key" : "key white-key";

    // Function to play the note when key is pressed
    const playNote = () => {
      synth.triggerAttackRelease(`${note}${octave}`, "2m");
    };

    key.addEventListener("click", playNote);

    piano.appendChild(key); // Add the key to the piano interface
  });
});

// Add these controls after the existing filter declaration
const controls = document.createElement("div");
controls.className = "controls";

// Frequency control
const freqControl = document.createElement("div");
freqControl.innerHTML = `
  <label>Filter Frequency: <span id="freqValue">9</span> Hz</label>
  <input type="range" min="0.1" max="20" step="0.1" value="9" id="frequency">
`;

// Depth control
const depthControl = document.createElement("div");
depthControl.innerHTML = `
  <label>Filter Depth: <span id="depthValue">0.6</span></label>
  <input type="range" min="0" max="1" step="0.01" value="0.6" id="depth">
`;

controls.appendChild(freqControl);
controls.appendChild(depthControl);
document.body.insertBefore(controls, piano);

// Add event listeners for the controls
document.getElementById("frequency").addEventListener("input", (e) => {
  const value = e.target.value;
  filter.frequency.value = value;
  document.getElementById("freqValue").textContent = value;
});

document.getElementById("depth").addEventListener("input", (e) => {
  const value = e.target.value;
  filter.depth.value = value;
  document.getElementById("depthValue").textContent = value;
});
