let filterA = document.getElementById("blur");
let filterB = document.getElementById("contrast");
let filterC = document.getElementById("hue-rotate");
let filterD = document.getElementById("sepia");

let noFlipBtn = document.getElementById("no-flip");
let flipXBtn = document.getElementById("flip-x");
let flipYBtn = document.getElementById("flip-y");

let uploadButton = document.getElementById("upload-button");
let image = document.getElementById("chosen-image");

let resetLabel = document.getElementById("reset-label");
let downloadLabel = document.getElementById("download-label");

function resetFilter() {
    filterA.value = "0";
    filterB.value = "100";
    filterC.value = "0";
    filterD.value = "0";
    noFlipBtn.checked = true;
    addFilter();
    flipImage();
}

uploadButton.onchange = () => {
    resetFilter();
    document.querySelector(".image-container").style.display = "block";
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    reader.onload = () => {
        image.setAttribute("src", reader.result);
    }
}

let slider = document.querySelectorAll(".filter input[type='range']");
slider.forEach(slider => {
    slider.addEventListener("input", addFilter);
})

function addFilter(){
    image.style.filter = `blur(${filterA.value}px) contrast(${filterB.value}%) hue-rotate(${filterC.value}deg) sepia(${filterD.value}%)`; 
}

let radioBtns = document.querySelectorAll(".flip-option input[type='radio']");
radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("click", flipImage);
})

function flipImage(){
    if(flipXBtn.checked){
        image.style.transform = "scaleX(-1)";
    }
    else if(flipYBtn.checked){
        image.style.transform = "scaleY(-1)"; 
    }
    else{
        image.style.transform = "scale(1,1)";
    }
}

// Add event listener for the Reset label
resetLabel.addEventListener("click", function() {
    resetFilter();
});

// Add event listener for the Download label
downloadLabel.addEventListener("click", function() {
    if (image.src) {
        // Create a canvas to apply the filters and flip transformations
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // Apply transformations
        ctx.filter = image.style.filter;
        if (flipXBtn.checked) {
            ctx.scale(-1, 1);
            ctx.drawImage(image, -canvas.width, 0, canvas.width, canvas.height);
        } else if (flipYBtn.checked) {
            ctx.scale(1, -1);
            ctx.drawImage(image, 0, -canvas.height, canvas.width, canvas.height);
        } else {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }

        // Convert canvas to image and trigger download
        canvas.toBlob(function(blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'edited-image.png';
            link.click();
        });
    } else {
        alert("Please upload an image first.");
    }
});
