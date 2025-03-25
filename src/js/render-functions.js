export function renderGallery(images, galleryElement) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <div class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${downloads}
          </p>
        </div>
      </div>
    `
    )
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}

export function showElement(element) {
  element.classList.remove('is-hidden');
}

export function hideElement(element) {
  element.classList.add('is-hidden');
}

export function showLoadingIndicator(element) {
  element.classList.remove('is-hidden');
}

export function hideLoadingIndicator(element) {
  element.classList.add('is-hidden');
}

export function showEndMessage(element) {
  element.classList.remove('is-hidden');
}

export function hideEndMessage(element) {
  element.classList.add('is-hidden');
}

export function smoothScrollToNextImages() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
