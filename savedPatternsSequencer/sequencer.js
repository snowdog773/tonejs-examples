document.addEventListener("DOMContentLoaded", () => {
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = 60;

  const sequencerSteps = 8;
  const notes = [
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
    "C5",
    "C#5",
    "D5",
    "D#5",
    "E5",
    "F5",
    "F#5",
    "G5",
    "G#5",
    "A5",
    "A#5",
    "B5",
  ];

  // Define patterns
  const patterns = {
    melody1: [
      { step: 0, note: "C4" },
      { step: 4, note: "E4" },
      { step: 8, note: "G4" },
      { step: 12, note: "C5" },
    ],
    melody2: [
      { step: 0, note: "G4" },
      { step: 3, note: "E4" },
      { step: 6, note: "D4" },
      { step: 9, note: "C4" },
    ],
    scom: [
      { step: 0, note: "D4" },
      { step: 1, note: "D5" },
      { step: 2, note: "A4" },
      { step: 3, note: "D4" },
      { step: 4, note: "G5" },
      { step: 5, note: "D4" },
      { step: 6, note: "F#5" },
      { step: 7, note: "D4" },
    ],
  };

  // Function to load a pattern
  function loadPattern(patternName) {
    // Clear current pattern
    document.querySelectorAll(".sequencer-cell.active").forEach((cell) => {
      cell.classList.remove("active");
    });

    // Apply new pattern
    patterns[patternName].forEach(({ step, note }) => {
      const cell = document.querySelector(
        `.sequencer-cell[data-step="${step}"][data-note="${note}"]`
      );
      if (cell) cell.classList.add("active");
    });
  }

  const sequencerGrid = document.getElementById("sequencerGrid");

  // Create grid cells
  notes.forEach((note, rowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.className = "sequencer-row";

    for (let step = 0; step < sequencerSteps; step++) {
      const cell = document.createElement("div");
      cell.className = "sequencer-cell";
      cell.dataset.note = note;
      cell.dataset.step = step;

      cell.addEventListener("click", () => {
        cell.classList.toggle("active");
        synth.triggerAttackRelease(note, "8n");
      });

      rowElement.appendChild(cell);
    }
    sequencerGrid.appendChild(rowElement);
  });

  // Add pattern selector
  const controlsDiv = document.querySelector(".controls");
  const patternSelect = document.createElement("select");
  Object.keys(patterns).forEach((patternName) => {
    const option = document.createElement("option");
    option.value = patternName;
    option.textContent = patternName;
    patternSelect.appendChild(option);
  });

  patternSelect.addEventListener("change", (e) => {
    loadPattern(e.target.value);
  });

  controlsDiv.appendChild(patternSelect);

  // Set up control buttons
  document
    .querySelector(".controls #startButton")
    .addEventListener("click", () => {
      Tone.start();
      Tone.Transport.start();
    });

  document.getElementById("stopButton").addEventListener("click", () => {
    Tone.Transport.stop();
  });

  // Create the playback loop
  const sequencerLoop = new Tone.Loop((time) => {
    const position = Tone.Transport.position.split(":");
    const quarterNote = parseInt(position[1]);
    const sixteenthNote = parseInt(position[2]);
    const currentStep = (quarterNote * 4 + sixteenthNote) % sequencerSteps;

    document.querySelectorAll(".current-step").forEach((cell) => {
      cell.classList.remove("current-step");
    });

    document
      .querySelectorAll(`.sequencer-cell[data-step="${currentStep}"]`)
      .forEach((cell) => {
        cell.classList.add("current-step");
      });

    document
      .querySelectorAll(`.sequencer-cell[data-step="${currentStep}"].active`)
      .forEach((cell) => {
        synth.triggerAttackRelease(cell.dataset.note, "8n", time);
      });
  }, "16n").start(0);
});
