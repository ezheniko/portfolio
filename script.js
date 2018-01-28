document.addEventListener("DOMContentLoaded", init);

function init() {
  const navigationElements = document.querySelectorAll(".navigation__elem");
  let num = 1;
  for (let navElem of navigationElements) {
    setTimeout(() => {
      navElem.style.marginLeft = 0;
    }, 500 * num++);
  }
}