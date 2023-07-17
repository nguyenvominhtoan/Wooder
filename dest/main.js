//changeHeader
function changeHeader() {
  const header = document.querySelector(".header");
  document.addEventListener("scroll", function () {
    let scrolY = window.scrollY;
    if (scrolY > 500) {
      header.classList.add("--bg-header");
    } else {
      header.classList.remove("--bg-header");
    }
  });
}
changeHeader();

//toTop
const btn = document.querySelector(".backtotop");
function clickToTop() {
  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
clickToTop();

//menu
function handleLang() {
  const lang = document.querySelector(".lang");
  const langItems = document.querySelectorAll(
    ".lang .lang__option .lang__option-item"
  );
  const langCurrent = document.querySelector(".lang .lang__current span");

  lang.addEventListener("click", () => {
    lang.classList.toggle("active");
  });
  langItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      let langText = item.textContent;
      let langCurrentPrev = langCurrent.textContent;
      langCurrent.innerHTML = langText;
      item.innerHTML = langCurrentPrev;
    });
  });
}
handleLang();

//loading
function hideLoading() {
  const loading = document.querySelector(".loading");
  loading.classList.add("--hide");
}
window.addEventListener("load", hideLoading);

//Progress
const progressBar = () => {
  let progress = document.querySelector(".progress");
  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let percent =
      (scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;
    progress.style.width = `${percent}%`;
  });
};
window.addEventListener("load", progressBar());

//menu mobile
function menuMobile() {
  const btnmenu = document.querySelector(".btnmenu");
  const nav = document.querySelector(".nav");

  btnmenu.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.classList.toggle("--disbale-scroll");
  });
  //hide nav
  function hideNav() {
    btnmenu.classList.remove("active");
    nav.classList.remove("active");
  }
  //resize window
  window.addEventListener("resize", function () {
    let window = this.window.innerWidth;
    if (window > 992) {
      hideNav();
    }
  });
}
menuMobile();

// accordion
function accordion() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}
accordion();

//slider hero
function handleSliderHero() {
  var slider = document.querySelector(".slider__item-wrap");
  var flkty = new Flickity(slider, {
    // options
    cellAlign: "left",
    contain: true,
    prevNextButtons: false,
    wrapAround: true,

    on: {
      ready: function () {
        console.log("Flickity is ready");
        handleDotsSlider();
      },
      change: function (index) {
        console.log("Slide changed to" + index);
        handlePaging(index);
      },
    },
  });

  //control
  let btnPre = document.querySelector(".slider__bottom-control .prev");
  let btnNext = document.querySelector(".slider__bottom-control .next");

  btnPre.addEventListener("click", function () {
    flkty.previous(true);
  });
  btnNext.addEventListener("click", function () {
    flkty.next(true);
  });

  //Dots
  function handleDotsSlider() {
    let dotsSlider = document.querySelector(".flickity-page-dots"),
      dotsSliderBottom = document.querySelector(".slider__bottom-paging");
    dotsSliderBottom.appendChild(dotsSlider);
  }

  function handlePaging(index) {
    let number = document.querySelector(".slider__bottom-paging .number");
    number.innerHTML = (index + 1).toString().padStart(2, "0") + "/03";
  }
}
handleSliderHero();

//Slider Photo
function sliderPhoto() {
  var slider = document.querySelector(".sccarousel");
  var flkty = new Flickity(slider, {
    // options
    cellAlign: "left",
    contain: true,
    prevNextButtons: false,
    wrapAround: true,
    freeScoll: true,
    imagesLoaded: true,
    lazyLoad: 3,
  });
}
sliderPhoto();

//popup videp
function popupVideo() {
  let videos = document.querySelectorAll(
    ".video .video__item .video__item-img"
  );
  moadalVideo = document.querySelector(".popupvideo");
  iframeModalVideo = document.querySelector(
    ".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe"
  );
  btnclose = document.querySelector(
    ".popupvideo .popupvideo__inner .popupvideo__inner-close"
  );

  videos.forEach(function (video) {
    //show model
    video.addEventListener("click", function () {
      moadalVideo.classList.add("active");
      //get id
      let dataID = video.getAttribute("data-video-src");

      //set iframe
      iframeModalVideo.setAttribute(
        "src",
        `https://www.youtube.com/embed/${dataID}?autoplay=1`
      );
      document.body.classList.add("--disbale-scroll");
    });
  });
  function closeModal() {
    //hide modal
    moadalVideo.classList.remove("active");
    //empty iframe
    iframeModalVideo.setAttribute("src", "");
    document.body.classList.remove("--disbale-scroll");
  }
  btnclose.addEventListener("click", function () {
    closeModal();
  });
}
popupVideo();

//scroll to section
function scrollToSection() {
  let menus = document.querySelectorAll(".header .header__menu a");
  let heightHeader = document.querySelector("header").offsetHeight;
  let sections = [];

  function removeActive() {
    menus.forEach(function (menu_element, menu_index) {
      menu_element.classList.remove("active");
    });
  }

  menus.forEach(function (element, index) {
    let className = element.getAttribute("href").replace("#", "");
    let section = document.querySelector("." + className);
    sections.push(section);

    element.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: section.offsetTop - heightHeader,
        behavior: "smooth",
      });
      removeActive();
      element.classList.add("active");
    });
  });
  window.addEventListener("scroll", function (e) {
    e.preventDefault();
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
      if (positionScroll > section.offsetTop) {
        removeActive();
        menus[index].classList.add("active");
      } else {
        menus[index].classList.remove("active");
      }
    });
  });
}
scrollToSection();

//tabs
function handleTabs() {
  let tabs = document.querySelectorAll(".news__tabs-item"),
    listNews = document.querySelectorAll(".news__list");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      //remove
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });

      //add active
      this.classList.add("active");

      //hide all list
      listNews.forEach(function (newslist) {
        newslist.classList.remove("active");
      });

      //get data-tab
      let id = this.dataset.tab;

      //add class active to list
      document.querySelector(".news__list-" + id).classList.add("active");
    });
  });
}
handleTabs();

Fancybox.bind("[data-fancybox]", {
  // KeyboardEvent: {
  //     escape: "close",
  // },
  // on: {
  //     done: (fancybox, slide) => {
  //         if (fancybox.isCurrentSlide(slide)) {
  //             console.log(`The main slide #${slide.index} has finished revealing`);
  //         } else {
  //             console.log(
  //                 `Slide #${slide.index} is preloaded and the content is revealed`
  //             );
  //         }
  //     },
  // },
});
