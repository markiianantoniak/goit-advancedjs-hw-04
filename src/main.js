import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showElement,
  hideElement,
  showLoadingIndicator,
  hideLoadingIndicator,
  showEndMessage,
  hideEndMessage,
  smoothScrollToNextImages,
} from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loadingIndicator = document.querySelector('.loading-indicator');
const endMessage = document.querySelector('.end-message');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentSearchQuery = '';
let currentPage = 1;
let totalHits = 0;

hideElement(loadMoreBtn);
hideElement(loadingIndicator);
hideElement(endMessage);

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSearchFormSubmit(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (!searchQuery) {
    alert('Please enter a search query');
    return;
  }

  if (searchQuery === currentSearchQuery) {
    alert('You are already viewing results for this query');
    return;
  }

  currentSearchQuery = searchQuery;
  currentPage = 1;
  clearGallery(gallery);
  hideElement(loadMoreBtn);
  hideElement(endMessage);

  await fetchAndRenderImages();
}

async function onLoadMoreClick() {
  currentPage += 1;
  await fetchAndRenderImages(false);
}

async function fetchAndRenderImages(isNewSearch = true) {
  try {
    showLoadingIndicator(loadingIndicator);
    hideElement(loadMoreBtn);

    const data = await fetchImages(currentSearchQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      alert(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    renderGallery(data.hits, gallery);
    lightbox.refresh();

    if (isNewSearch && data.totalHits > 0) {
      alert(`Hooray! We found ${data.totalHits} images.`);
    }

    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage >= totalPages) {
      hideElement(loadMoreBtn);
      showEndMessage(endMessage);
    } else {
      showElement(loadMoreBtn);
      hideEndMessage(endMessage);
    }

    if (!isNewSearch) {
      smoothScrollToNextImages();
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  } finally {
    hideLoadingIndicator(loadingIndicator);
  }
}
