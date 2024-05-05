const imageSource = document.getElementById("qr-img")
const apiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=";
const download = document.getElementById("download-btn")
const btn = document.getElementById("generate-btn");
btn.addEventListener("click", () => {
    let inputField = document.getElementById("link").value;
   if(inputField.length!==0){
    imageSource.src = apiUrl+inputField;
    // document.getElementsByClassName("input").value = "   "
   }
});
window.addEventListener('contextmenu', function (e) { 
    // do something here... 
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
                const img = document.createElement('img');
                img.src = url;
                document.body.appendChild(img);
                img.addEventListener('load', () => {
                    navigator.clipboard.writeText(url);

                    console.log('Image copied to clipboard:', img);
                    document.body.removeChild(img);
                    URL.revokeObjectURL(url);
                });
            })
            .catch(error => {
                console.error('Error fetching or processing image:', error);
            });
    } catch (error) {
        console.error('Error:', error);
    }
});

