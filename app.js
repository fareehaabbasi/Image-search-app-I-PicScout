const assessKey = "FO9lH3JPjjymi5xJiiZUg4CDJbyVvaz98jOXEZ25QtU";

const fromElem = document.querySelector("form");
const inputElem = document.getElementById("search-input");
const searchRes = document.querySelector(".search-result");
const btn = document.getElementById("btn");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputElem.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${assessKey} 
  https://images.unsplash.com/photo-${assessKey}=jpg&fit=crop&w=1080&q=80&fit=max`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchRes.innerHTML = "";
  }

  results.map((result) => {
    const imagesWrapper = document.createElement("div");
    imagesWrapper.classList.add("search-res");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imagesWrapper.appendChild(image);
    imagesWrapper.appendChild(imageLink);
    searchRes.appendChild(imagesWrapper);
  });

  page++;
  if (page > 1) {
    btn.style.display = "block";
  }
}

fromElem.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

btn.addEventListener("click", () => {
  searchImages();
});
