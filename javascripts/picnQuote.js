//Random Quote Generator
fetch('randomQuotes.txt')
.then(response => response.text())
.then(text => {
    // Split words by new line
    words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
})
.catch(err => console.error('Error loading words:', err));

// Generate random word
        setInterval(function () {
            if (words.length === 0) {
                document.getElementById('customContent').textContent = 'Words not loaded yet!';
                return;
            }
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomWord = words[randomIndex];
            document.getElementById('customContent').textContent = randomWord;
        }, 10000);

//Edit photo display
const photoDisplay = document.getElementById("imgInPhotoCon");
const changePhoto = document.getElementById("editPhotoButton");

changePhoto.addEventListener("click", () =>{
    fileInput.click();
});

  fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;

      const photo = URL.createObjectURL(file);
      photoDisplay.src = photo;
});
