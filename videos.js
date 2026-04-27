const feed = document.querySelector(".video-feed");
const feedItems = Array.from(document.querySelectorAll(".video-item"));
const prevButton = document.querySelector("[data-nav='prev']");
const nextButton = document.querySelector("[data-nav='next']");
let activeIndex = 0;

function setActiveSlide(index) {
  if (!feedItems.length) return;
  const safeIndex = Math.max(0, Math.min(index, feedItems.length - 1));
  activeIndex = safeIndex;

  feedItems.forEach((item, i) => {
    item.classList.toggle("is-active", i === safeIndex);
  });
}

function scrollToSlide(index) {
  if (!feedItems.length || !feed) return;
  const safeIndex = Math.max(0, Math.min(index, feedItems.length - 1));
  feedItems[safeIndex].scrollIntoView({ behavior: "smooth", block: "start" });
  setActiveSlide(safeIndex);
}

function updateActiveByPosition() {
  if (!feedItems.length) return;
  const viewportCenter = window.innerHeight / 2;
  let closestIndex = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  feedItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(viewportCenter - itemCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  setActiveSlide(closestIndex);
}

if (feed) {
  feed.addEventListener("scroll", updateActiveByPosition, { passive: true });
}

if (prevButton) {
  prevButton.addEventListener("click", () => {
    scrollToSlide(activeIndex - 1);
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    scrollToSlide(activeIndex + 1);
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    scrollToSlide(activeIndex + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    scrollToSlide(activeIndex - 1);
  }
});

window.addEventListener("resize", updateActiveByPosition);
window.addEventListener("load", updateActiveByPosition);
