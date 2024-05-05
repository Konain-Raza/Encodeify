const imageSource = document.getElementById("qr-img")
const apiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=";
const download = document.getElementById("download-btn")
const btn = document.getElementById("generate-btn");
btn.addEventListener("click", () => {
    let inputField = document.getElementById("link").value;
   if(inputField.length!==0){
    imageSource.src = apiUrl+inputField;
    document.getElementById("link").value=" ";
    
   }
});
window.addEventListener('contextmenu', function (e) { 
    e.preventDefault(); 
  }, false);
download.addEventListener("click", () => {
    try {
        fetch(imageSource.src)
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'image.png';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    } catch (error) {
        console.error('Error:', error);
    }
});


document.querySelector('.copy').addEventListener('click', () => {
    try {
        fetch(imageSource.src)
            .then(response => response.blob())
            .then(blob => {
                console.log('Blob:', blob);
                const url = URL.createObjectURL(blob);
                const img = new Image();
                img.crossOrigin = "Anonymous"; // Allow cross-origin resource sharing
                img.src = url;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(canvasBlob => {
                        const item = new ClipboardItem({ "image/png": canvasBlob });
                        navigator.clipboard.write([item]);
                        console.log('Image copied to clipboard:', canvasBlob);
                    });
                };
            })
            .catch(error => {
                console.error('Error fetching or processing image:', error);
            });
    } catch (error) {
        console.error('Error:', error);
    }
});



