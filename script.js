document.addEventListener("DOMContentLoaded", init);

function init() {
  if (sessionStorage.getItem('activeSection')) {
    showContent();
    document.getElementById("about").addEventListener("click", showAbout);
    document.getElementById("career").addEventListener("click", showCareer);
    document.getElementById("portfolio").addEventListener("click", showPortfolio);
    document.getElementById("feedback").addEventListener("click", showFeedback);
  } else {
  let startBtn = document.querySelector(".user-link__element");
  startBtn.addEventListener('click', showContent);
  document.getElementById("about").addEventListener("click", showAbout);
  document.getElementById("career").addEventListener("click", showCareer);
  document.getElementById("portfolio").addEventListener("click", showPortfolio);
  document.getElementById("feedback").addEventListener("click", showFeedback);
  }
}


function showContent(e) {
  if (e) e.preventDefault();
  navElemInitPosition();
  document.querySelector(".enter-screen").remove();
  document.querySelector(".wrapper").hidden = false;
  document.querySelector(".footer").hidden = false;
  menuAnimation();
  switch (sessionStorage.getItem('activeSection')) {
    case 'career':
      showCareer();
      break;
    case 'portfolio':
      showPortfolio();
      break;
    case 'feedback':
      showFeedback();
      break;
    default:
      showAbout();
      break;
  }
  // showAbout();
}

function showFeedback(e) {
  history.pushState(null, "New title", "/writeme");
  if(e) {toggleClass(e);}
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `php/server.php?section=about`, true);

  xhr.onreadystatechange = function(){
    if(xhr.readyState != 4) return;
    let info = JSON.parse(xhr.responseText);

    document.querySelector(".main-content").innerHTML = `
    <div class="form">
      <div class="form__control">
        <div class="form__control-text form__control-text_show">write comment</div>
        <div class="form__control-text form__control-text_hide">hide form</div>
      </div>
      <div class="form__wrap" style="max-height: 0;">
        <form class="form__form">
          <h2 class="form__title">Form for you write on a wall</h2>
          <div class="form__elem">
            <label for="name" class="form__label">Your name:</label>
            <input class="form__input" type="text" id="name" name="name" placeholder="What is your name, bro?">
          </div>
          <label class="form__label form__label_msg" for="message">Write here something, I'll apreciate if you'll be polite and friendly!</label>
          <textarea class="form__message" name="message" id="message" required></textarea>
          <input type="submit" value="Send" class="form__submit">
        </form>
      </div>
    </div>
    <div class="comments__wall">
      <ul class="comments__list">
      </ul>
      <div class="comments__control comments__control_right">
        <button class="comments__btn comments__btn_prev">Previous comments</button>
      </div>
      <div class="comments__control comments__control_left">
        <button class="comments__btn comments__btn_next">Next comments</button>
      </div>
    </div>`;
    let formControl = document.querySelector(".form__control");
    formControl.addEventListener('click', showHide);
    document.querySelector('.form__form').addEventListener('submit', sendComment);
    showComments.current = 0;
    showComments(10);
    document.querySelector('.comments__btn_prev').addEventListener('click', () => {showComments(10);} );
    document.querySelector('.comments__btn_next').addEventListener('click', () => {showComments(-10);} );
  }

  xhr.send(null);

  sessionStorage.setItem('activeSection', 'feedback');
}

function showCareer(e) {
  history.pushState(null, "New title", "/career");
  if(e) {toggleClass(e);}
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
  sessionStorage.setItem('activeSection', 'career');
}

function showAbout(e) {
  history.pushState(null, "New title", "/about");
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
        <a href="./files/yevhen_kozhevnikov.pdf" class="user-about__download-link" target="_blank">Download CV</a>
      </div>
    </div>`;
    //document.querySelector(".user-about__download-link").addEventListener('click', download);
  }

  xhr.send(null);

  function createTextHTML(info) {
    let text = '';
    for (let i = 1; i < info.length; i++) {
      text += `<p>${info[i]}</p>`;
    }
    return text;
  }
  sessionStorage.setItem('activeSection', 'about');
}

function showPortfolio(e) {
  history.pushState(null, "New title", "/portfolio");
  if(e) {toggleClass(e);}
  // toggleClass(e);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `php/server.php?section=portfolio`, true);

  xhr.onreadystatechange = function(){
    if(xhr.readyState != 4) return;
    let info = JSON.parse(xhr.responseText);

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
  sessionStorage.setItem('activeSection', 'portfolio');
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

function download(e) {
  e.preventDefault(e);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `php/download.php?file=yevhen_kozhevnikov.pdf`, true);

  xhr.onreadystatechange = function(){
    if(xhr.readyState != 4) return;
  }

  xhr.send(null);
}

function showHide() {
  let htmlFS = parseInt(getComputedStyle(document.documentElement).fontSize);
  let wrap = this.nextElementSibling;
  let form = document.querySelector(".form__form");
  let formHeight = form.offsetHeight;
  
  if (showHide.state) {
    showHide.state = !showHide.state;
    wrap.style.maxHeight = `${formHeight / htmlFS}rem`;
    // wrap.style.maxHeight = 0;
    form.style.top = `-${formHeight / htmlFS}rem`;
    wrap.style.maxHeight = 0;
    this.firstElementChild.style.marginTop = 0;
  } else {
    showHide.state = !showHide.state;
    wrap.style.maxHeight = `${formHeight / htmlFS}rem`;
    setTimeout( () => {wrap.removeAttribute("style");}, 800);
    // wrap.removeAttribute("style");
    form.style.top = 0;
    this.firstElementChild.style.marginTop = `-${parseInt(getComputedStyle(this).height) / htmlFS}rem`;
  }
}
showHide.state = false;

function sendComment(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/message.php', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.responseText === 'false') console.log("Something goes wrong");
  }

  let data = JSON.stringify({
    time: Date.now(),
    autor: this.name.value || 'anonymus',
    text: this.message.value
  });
  
  xhr.send(data);
}

function showComments(commentsNum) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/comments.php', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  let data = JSON.stringify({
    amount: commentsNum,
    startPosition: showComments.current
  });
  
  showComments.current += commentsNum;

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    
    let data = JSON.parse(xhr.responseText);
    showComments.amount = data.amount[0];
    
    
    if (showComments.amount <= showComments.current) {
      document.querySelector('.comments__btn_prev').disabled = true;
    } else {
      document.querySelector('.comments__btn_prev').disabled = false;
    }
    if (showComments.current <= 10) {
      document.querySelector('.comments__btn_next').disabled = true;
    } else {
      document.querySelector('.comments__btn_next').disabled = false;
    }
    let comments = data.data;
    let commentsHTMLText = '';
    for (let comment of comments) {
      let date = new Date(+comment.time);
      let month = date.getMonth() + 1;
      let dateStr = `${fixDate(date.getHours())}:${fixDate(date.getMinutes())}:${fixDate(date.getSeconds())} ${fixDate(date.getDate())}-${fixDate(date.getMonth() + 1)}-${date.getFullYear()}`;
      commentsHTMLText += `
      <li class="comments__comment">
        <div class="comments__comment-text">${comment.text}</div>
        <div class="comments__comment-info comments__comment-info_even">
          <div class="comments__comment-time">${dateStr}</div>
          <div class="comments__comment-autor">${comment.autor}</div>
        </div>
      </li>`
    }
    document.querySelector('.comments__list').innerHTML = commentsHTMLText;
  }

  xhr.send(data);
}
showComments.current = 0;
showComments.amount = 0;

function fixDate(datePart) {
  if (datePart < 10) {
    return `0${datePart}`;
  } else {
    return datePart;
  }
}