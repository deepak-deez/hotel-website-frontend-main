import '../scss/app.scss';
import 'bootstrap/scss/bootstrap.scss';

/* Your JS Code goes here */

const service = document.querySelectorAll(".services div");
const checkBtn = document.querySelector(".check-btn");
const dateCheckIn = document.querySelector(".check-in-btn");
const dateCheckOut = document.querySelector(".check-out-btn");
const adultNum = document.querySelector(".adult-value");
const childrenNum = document.querySelector(".children-value");
const swiperImg = document.querySelectorAll(".swiper-wrapper img");
const roomData = document.querySelectorAll(".room-details");
const swiperNext = document.querySelector(".swiper-button-next");
const swiperPrev = document.querySelector(".swiper-button-prev");
const menuBtn = document.querySelector(".menu-button");
const menuList = document.querySelector(".menu-list");
const otherOptions = document.querySelector(".other-options");


menuBtn.addEventListener('click', () => {
  menuList.classList.toggle('d-none');
  otherOptions.classList.toggle('d-none');
});

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

swiperNext.addEventListener("click", () => {
  changeCarousel(1);
});
swiperPrev.addEventListener("click", () => {
  changeCarousel(0);
});

async function getServiceData() {
  const response = await fetch("http://127.0.0.1:8081/services").then(
    (data) => {
      return data.json();
    }
  );
  for (let i = 0; i < response.obj.length; i++) {
    service[i]
      .querySelector(".service-image")
      .setAttribute("src", `${response.obj[i].imageUrl}`);
    service[i].querySelector(
      ".service-subtitle"
    ).textContent = `${response.obj[i].subTitle}`;
    service[i].querySelector(
      ".service-title"
    ).textContent = `${response.obj[i].heading}`;
    service[i].querySelector(
      ".content"
    ).textContent = `${response.obj[i].content}`;
  }
}

getServiceData();

async function getBannerData() {
  const bannerData = await fetch("http://127.0.0.1:8081/banner").then(
    (data) => {
      return data.json();
    }
  );
  document.querySelector(
    ".banner"
  ).style.backgroundImage = `url(${bannerData.bannerObj.imageUrl})`;
  document.querySelector(
    ".banner-title"
  ).textContent = `${bannerData.bannerObj.bannerHeading}`;
  document.querySelector(
    ".banner-subtitle"
  ).textContent = `${bannerData.bannerObj.bannerContent}`;
}

getBannerData();

async function getCarouselData() {
  const carouselData = await fetch("http://127.0.0.1:8081/carousel").then(
    (data) => {
      return data.json();
    }
  );

  for (let i = 0; i < carouselData.carouselObj.length; i++) {
    console.log(carouselData.carouselObj[i].bed);

    swiperImg[i].setAttribute("src", carouselData.carouselObj[i].imageUrl);
    roomData[i].querySelector(".room-sub-heading").textContent =
      carouselData.carouselObj[i].subHeading;
    roomData[i].querySelector(".room-heading").textContent =
      carouselData.carouselObj[i].heading;
    roomData[i].querySelector(".room-rate").textContent =
      carouselData.carouselObj[i].rate;
    roomData[i].querySelector(".room-description").textContent =
      carouselData.carouselObj[i].description;
    roomData[i].querySelector(".room-bed").textContent =
      carouselData.carouselObj[i].bed;
    roomData[i].querySelector(".room-capacity").textContent =
      carouselData.carouselObj[i].capacity;
    roomData[i].querySelector(".room-size").textContent =
      carouselData.carouselObj[i].size;
    roomData[i].querySelector(".room-view").textContent =
      carouselData.carouselObj[i].view;
  }
}

getCarouselData();

function changeCarousel(data) {
  let activeSlide = document.querySelector(".swiper-slide-active");
  let num = Number(activeSlide.dataset.number);

  if (data === 1) {
    roomData[num].classList.remove("hide");
    roomData[num - 1].classList.add("hide");
  } else {
    roomData[num + 1].classList.add("hide");
    roomData[num].classList.remove("hide");
  }
}

async function postFormData(data) {
  const response = await fetch("http://127.0.0.1:8081/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

checkBtn.addEventListener('click', (e) => {
  e.preventDefault();

  let formObj = {
    checkInDate: dateCheckIn.value,
    checkOutDate: dateCheckOut.value,
    adult: adultNum.options[adultNum.selectedIndex].text,
    children: childrenNum.options[childrenNum.selectedIndex].text,
  };

  postFormData(formObj).then((data) => {
    console.log(data);
  });
}
);