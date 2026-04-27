const feedItems = document.querySelectorAll(".video-item");

function toggleActiveItem() {
  const viewportCenter = window.innerHeight / 2;
  let closest = null;
  let minDistance = Infinity;

  feedItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(viewportCenter - itemCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closest = item;
    }
  });

  feedItems.forEach((item) => item.classList.remove("is-active"));
  if (closest) {
    closest.classList.add("is-active");
  }
}

window.addEventListener("scroll", toggleActiveItem, { passive: true });
window.addEventListener("resize", toggleActiveItem);
window.addEventListener("load", toggleActiveItem);
