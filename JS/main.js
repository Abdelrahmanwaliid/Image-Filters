const saturate = document.getElementById("saturate");
const contrast = document.getElementById("contrast");
const brightness = document.getElementById("brightness");
const sepia = document.getElementById("sepia");
const grayscale = document.getElementById("grayscale");
const blur = document.getElementById("blur");
const hueRotate = document.getElementById("hue-rotate");

const download = document.getElementById("download");
const upload = document.getElementById("upload");
const img = document.getElementById("img");
const reset = document.querySelector("span");
const imgBox = document.querySelector(".img-box");
const canvas = document.getElementById("canvas");
// Create ConText
const ctx = canvas.getContext("2d");

// Hide Some Elements
window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

// Show Elements when upload img
upload.onchange = function () {
  //Reset Value
  resetValue();

  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";

  // To Read Image
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

// Add Filters
let filters = document.querySelectorAll("ul li input");

filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    ctx.filter = `

    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-Rotate(${hueRotate.value}deg)
  
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

// Function to Reset Value
function resetValue() {
  //reset img
  ctx.filter = "none";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  //reset filter
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}

// Download Btn
download.onclick = function () {
  download.href = canvas.toDataURL();
};
