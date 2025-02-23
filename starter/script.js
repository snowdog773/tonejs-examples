const button = document.getElementById("test-button");

const synth = new Tone.Synth().toDestination();
button.addEventListener("click", () => synth.triggerAttackRelease("C4", "4n"));
