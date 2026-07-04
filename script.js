const header = document.querySelector("[data-header]");
const navigation = document.querySelector("#siteNavigation");
const gallery = document.querySelector("[data-gallery]");
const lightbox = document.querySelector("#galleryModal");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const galleryModal = lightbox && window.bootstrap ? new bootstrap.Modal(lightbox) : null;

function setHeaderState() {
  if (header?.classList.contains("always-solid")) {
    header.classList.add("is-scrolled");
    return;
  }

  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navigation?.addEventListener("show.bs.collapse", () => {
  header?.classList.add("is-open");
});

navigation?.addEventListener("hidden.bs.collapse", () => {
  header?.classList.remove("is-open");
});

navigation?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    const collapse = bootstrap.Collapse.getOrCreateInstance(navigation, { toggle: false });
    collapse.hide();
  }
});

gallery?.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest("button") : null;
  if (!button || !lightbox || !lightboxImage) return;

  const fullImage = button.getAttribute("data-full");
  const preview = button.querySelector("img");
  if (!fullImage || !preview) return;

  lightboxImage.src = fullImage;
  lightboxImage.alt = preview.alt;
  galleryModal?.show();
});
