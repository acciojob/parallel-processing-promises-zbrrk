//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);

    img.src = url;
  });
}

// Main function for downloading all images
async function downloadAllImages() {
  output.innerHTML = ""; // clear previous content

  // Show loading spinner
  const loading = document.createElement("div");
  loading.textContent = "Loading...";
  loading.style.fontSize = "20px";
  loading.style.fontWeight = "bold";
  output.appendChild(loading);

  try {
    // Download all images in parallel
    const result = await Promise.all(
      images.map(imgObj => downloadImage(imgObj.url))
    );

    // Remove loading spinner
    loading.remove();

    // Display all images
    result.forEach(img => output.appendChild(img));

  } catch (error) {
    // Hide loading spinner
    loading.remove();

    // Show error message
    const err = document.createElement("div");
    err.textContent = error;
    err.style.color = "red";
    err.style.fontSize = "18px";
    output.appendChild(err);
  }
}

// Button click triggers download
btn.addEventListener("click", downloadAllImages);
