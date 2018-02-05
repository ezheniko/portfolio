document.addEventListener("DOMContentLoaded", init);

function init() {
  const navigationElements = document.querySelectorAll(".navigation__elem");
  let num = 1;

  let startRightCord = document.querySelector(".sidebar").getBoundingClientRect().right;

  for (let navElem of navigationElements) {
    navElem.style.right = startRightCord;
    navElem.style.transition = ".5s";
  }

  if (window.innerWidth > 768) {
    for (let navElem of navigationElements) {
      setTimeout(() => {
        navElem.style.right = 0;
      }, 1 * num);
      num += 250;
    }
  } else {
    for (let i = navigationElements.length - 1; i >= 0; i--, num += 250) {
      setTimeout(() => {
        navigationElements[i].style.right = 0;
      }, 1 * num);
    }
  }

}