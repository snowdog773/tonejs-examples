const synth = new Tone.DuoSynth().toDestination();

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
      synth.triggerAttackRelease(`${note}${octave}`, "8n");
    };

    key.addEventListener("click", playNote);

    piano.appendChild(key); // Add the key to the piano interface
  });
});
