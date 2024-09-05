
// Sctript for scanning status

     const contentBox = document.getElementById('status');
     const contents = [
                     'Connecting to domain...',
         'Parsing Domain...',
         'Pre-evaluate data...',
         'Almost done!'
     ];

     let index = 0;

     function changeContent() {
         if (index < contents.length) {
             contentBox.style.opacity = 0; // Fade out
             setTimeout(() => {
                 contentBox.textContent = contents[index];
                 contentBox.style.opacity = 1; // Fade in
                 index++;
                 if (index < contents.length) {
                     setTimeout(changeContent, 3000);
                 }
             }, 500); // Wait for fade-out to complete before changing content
         }
     }

     setTimeout(changeContent, 3000); // Start the first change after 3 seconds
