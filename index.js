import{a as L,S as b}from"./assets/vendor-F5i0Czsd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const w="49395214-508d98637227ed6d41be849b6",v="https://pixabay.com/api/";async function S(e,t=1,s=15){try{return(await L.get(v,{params:{key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:s}})).data}catch(n){throw new Error(`Failed to fetch images: ${n.message}`)}}function E(e,t){const s=e.map(({webformatURL:n,largeImageURL:r,tags:o,likes:c,views:g,comments:y,downloads:p})=>`
      <div class="photo-card">
        <a href="${r}">
          <img src="${n}" alt="${o}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${c}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${g}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${y}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${p}
          </p>
        </div>
      </div>
    `).join("");t.insertAdjacentHTML("beforeend",s)}function q(e){e.innerHTML=""}function $(e){e.classList.remove("is-hidden")}function i(e){e.classList.add("is-hidden")}function H(e){e.classList.remove("is-hidden")}function M(e){e.classList.add("is-hidden")}function P(e){e.classList.remove("is-hidden")}function I(e){e.classList.add("is-hidden")}function O(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}const x=document.querySelector("#search-form"),m=document.querySelector(".gallery"),a=document.querySelector(".load-more"),u=document.querySelector(".loading-indicator"),l=document.querySelector(".end-message");let A=new b(".gallery a",{captionsData:"alt",captionDelay:250}),f="",d=1,B=0;i(a);i(u);i(l);x.addEventListener("submit",C);a.addEventListener("click",D);async function C(e){e.preventDefault();const t=e.currentTarget.elements.searchQuery.value.trim();if(!t){alert("Please enter a search query");return}if(t===f){alert("You are already viewing results for this query");return}f=t,d=1,q(m),i(a),i(l),await h()}async function D(){d+=1,await h(!1)}async function h(e=!0){try{H(u),i(a);const t=await S(f,d);if(B=t.totalHits,t.hits.length===0){alert("Sorry, there are no images matching your search query. Please try again.");return}E(t.hits,m),A.refresh(),e&&t.totalHits>0&&alert(`Hooray! We found ${t.totalHits} images.`);const s=Math.ceil(t.totalHits/15);d>=s?(i(a),P(l)):($(a),I(l)),e||O()}catch(t){alert(`Error: ${t.message}`)}finally{M(u)}}
//# sourceMappingURL=index.js.map
