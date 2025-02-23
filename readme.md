COPY STUFF FROM HERE

CSS FOR KEYBOARD

.piano {
display: flex;
justify-content: center;
padding: 20px;
min-height: 220px;
margin: auto;
}

.white-key {
width: 60px;
height: 200px;
background-color: white;
border: 1px solid #333;
z-index: 1;
margin: 0;
}

.black-key {
width: 40px;
height: 120px;
background-color: black;
margin: 0 -20px;
/_ negative margin to overlap with white keys _/
z-index: 2;
}

.white-key:hover {
background-color: #f0f0f0;
}

.black-key:hover {
background-color: #333;
}

.white-key:active {
background-color: #e0e0e0;
}

.black-key:active {
background-color: #222;
}
# tonejs-examples
