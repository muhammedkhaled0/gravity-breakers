export function renderGallery(images, lang, containerEl) {
  if (!containerEl) return;

  if (!Array.isArray(images) || images.length === 0) {
    containerEl.innerHTML = "";
    containerEl.hidden = true;
    containerEl.style.display = "none";
    return;
  }

  containerEl.hidden = false;
  containerEl.style.display = "block";

  const slidesHtml = images
    .map((img, idx) => {
      const altText = typeof img.alt === "object" ? img.alt[lang] || img.alt.ar || "" : img.alt || "";
      const captionText =
        typeof img.caption === "object" ? img.caption[lang] || img.caption.ar || "" : img.caption || "";
      const creditText = img.credit ? `NASA / ${img.credit}` : "NASA";

      return `
        <figure class="gallery-slide" data-index="${idx}">
          <img src="${img.src}" alt="${altText}" class="gallery-photo" loading="lazy" />
          ${captionText || creditText ? `<figcaption class="gallery-caption"><span class="gallery-text">${captionText}</span> <span class="gallery-credit">${creditText}</span></figcaption>` : ""}
        </figure>
      `;
    })
    .join("");

  containerEl.innerHTML = `
    <div class="gallery-track">
      ${slidesHtml}
    </div>
  `;
}

