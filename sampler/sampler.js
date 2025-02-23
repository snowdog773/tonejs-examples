// Add microphone and recorder setup
const mic = new Tone.UserMedia();
const recorder = new Tone.Recorder();
let recordedBuffer = null;

// Create sampler instance
const sampler = new Tone.Sampler({
  urls: {},
  onload: () => {
    console.log("Sampler loaded");
  },
}).toDestination();

// Add record button functionality
document.getElementById("recordButton").addEventListener("click", async () => {
  await mic.open();
  mic.connect(recorder);
  recorder.start();
});

// Add stop recording button functionality
document
  .getElementById("stopRecordButton")
  .addEventListener("click", async () => {
    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);

    // Load recorded audio into buffer
    const buffer = new Tone.Buffer(url, () => {
      recordedBuffer = buffer;
      sampler.add("C4", recordedBuffer);
      mic.close();
    });
  });

// Create piano keyboard with improved layout
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const octaves = [4, 5];
const keyboard = document.createElement("div");
keyboard.className = "piano-keyboard";

// Create piano keys for each octave
octaves.forEach((octave) => {
  notes.forEach((note) => {
    const key = document.createElement("div");
    const isBlackKey = note.includes("#");
    key.className = isBlackKey ? "key black-key" : "key white-key";
    const fullNote = `${note}${octave}`;

    key.addEventListener("click", () => {
      if (recordedBuffer) {
        sampler.triggerAttack(fullNote);
      }
    });

    keyboard.appendChild(key);
  });
});

document.body.appendChild(keyboard);
