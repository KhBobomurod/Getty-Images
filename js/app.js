// Selectors
const auth = "u8TstglmeVBFp3rKaMSX02yhpDTa6zMrGwvFmLdK6J656NBB97ya8hAC";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let fetchLink;
let searchValue;
let page = 1;
let currentSearch;
const more = document.querySelector(".more");

// Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

// Update Input
function updateInput(e) {
  searchValue = e.target.value;
}

// fetch API
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

// Generate photos
function generaPictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href="${photo.src.large}" target="_blank">Download</a>
    </div>
    <img src="${photo.src.large}"></img>
    `;
    gallery.appendChild(galleryImg);
  });
}

// Created photos
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generaPictures(data);
}

curatedPhotos();

// clear
function clear() {
  gallery.innerHTML = "";
  searchInput.innerHTML = "";
}

// Search photos
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generaPictures(data);
}

// load more
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generaPictures(data);
}
