document.addEventListener("DOMContentLoaded", () => {
  const synth = new Tone.PolySynth().toDestination();

  // Create a 16-step sequencer with 8 different notes
  const sequencerSteps = 16;
  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

  // Get the grid container
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
    console.log(position);
    const quarterNote = parseInt(position[1]);
    const sixteenthNote = parseInt(position[2]);
    const currentStep = (quarterNote * 4 + sixteenthNote) % sequencerSteps;

    // Remove previous column highlighting
    document.querySelectorAll(".current-step").forEach((cell) => {
      cell.classList.remove("current-step");
    });

    // Add highlighting to current column
    document
      .querySelectorAll(`.sequencer-cell[data-step="${currentStep}"]`)
      .forEach((cell) => {
        cell.classList.add("current-step");
      });

    // Play active notes
    document
      .querySelectorAll(`.sequencer-cell[data-step="${currentStep}"].active`)
      .forEach((cell) => {
        synth.triggerAttackRelease(cell.dataset.note, "16n", time);
      });
  }, "16n").start(0);
});
