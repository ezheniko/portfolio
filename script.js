document.addEventListener("DOMContentLoaded", init);

function init() {
  let startBtn = document.querySelector(".user-link__element");
  startBtn.addEventListener('click', showContent);
  document.getElementById("about").addEventListener("click", showAbout);
  document.getElementById("career").addEventListener("click", showCareer);
  document.getElementById("portfolio").addEventListener("click", showPortfolio);
}


function showContent(e) {
  e.preventDefault();
  navElemInitPosition();
  document.querySelector(".enter-screen").remove();
  document.querySelector(".wrapper").hidden = false;
  document.querySelector(".footer").hidden = false;
  menuAnimation();
  showAbout();
}

function showCareer(e) {
  toggleClass(e);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `php/server.php?section=career`, true);

  xhr.onreadystatechange = function(){
    if(xhr.readyState != 4) return;
    let info = JSON.parse(xhr.responseText);

    document.querySelector(".main-content").innerHTML = `
    <h2 class="content__header content__header_margin">Career path</h2>
    <div class="content-info">
      <div class="career-image">
        <img src="${info.images[0]}" alt="career image" class="career-image__pic">
      </div>
      <div class="career-path">
        <ul class="career-path__list">
        ${createTextHTML(info.career)}
        </ul>
      </div>
    </div>`;
  }

  xhr.send(null);

  function createTextHTML(info) {
    let text = '';
    for (let item of info) {
      text += `
      <li class="career-path__element">
        <div class="career-path__company-name">${item.company_name}</div>
        <div class="career-path__post">${item.position}</div>
        <div class="career-path__time">${item.time}</div>
      </li>`;
    }
    return text;
  }
}

function showAbout(e) {
  if(e) {toggleClass(e);}
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `php/server.php?section=about`, true);

  xhr.onreadystatechange = function(){
    if(xhr.readyState != 4) return;
    let info = JSON.parse(xhr.responseText);

    document.querySelector(".main-content").innerHTML = `
    <div class="user-img">
      <img src="${info.images[0]}" alt="Yevhen Kozhevnikov" class="user-img__photo">
    </div>
    <div class="user-about">
      <h2 class="content__header">About me</h2>
      <div class="user-about__text">
        ${createTextHTML(info.about)}
      </div>
      <div class="download">
        <a href="./files/yevhen_kozhevnikov.pdf" class="user-about__download-link">Download CV</a>
      </div>
    </div>`;
  }

  xhr.send(null);

  function createTextHTML(info) {
    let text = '';
    for (let i = 1; i < info.length; i++) {
      text += `<p>${info[i]}</p>`;
    }
    return text;
  }
}

function showPortfolio(e) {
  toggleClass(e);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `php/server.php?section=portfolio`, true);

  xhr.onreadystatechange = function(){
    if(xhr.readyState != 4) return;
    let info = JSON.parse(xhr.responseText);
    console.log(info);

    document.querySelector(".main-content").innerHTML = `
    <h2 class="content__header content__header_margin">Portfolio</h2>
    <div class="content-info">
      <ul class="portfolio-list">
        ${createTextHTML(info)}
      </ul>
    </div>`;
  }

  xhr.send(null);

  function createTextHTML(info) {
    let text = '';
    for (let item of info) {
      text += `
      <li class="portfolio-tile">
        <a href="${item.link}" class="portfolio-tile__link">
          <div class="portfolio-tile__image image-${item.classname}"></div>
          <div class="portfolio-tile__name">${item.name}</div>
          <div class="portfolio-tile__about">${item.about}</div>
          <div class="portfolio-tile__type">${item.type}</div>
        </a>
      </li>`;
    }
    return text;
  }
}


function toggleClass(event) {
  let activeLink = document.querySelector(".navigation__link_active");
  if (activeLink) activeLink.classList.remove("navigation__link_active");
  event.currentTarget.classList.add("navigation__link_active");
}

function navElemInitPosition() {
  const navigationElements = document.querySelectorAll(".navigation__elem");

  let startRightCord = document.querySelector(".sidebar").getBoundingClientRect().right;

  for (let navElem of navigationElements) {
    navElem.style.right = startRightCord;
    navElem.style.transition = ".5s";
  }
}

function menuAnimation() {
  const navigationElements = document.querySelectorAll(".navigation__elem");
  let num = 1;

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