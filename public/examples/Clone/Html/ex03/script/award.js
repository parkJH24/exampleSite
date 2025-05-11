import { allAwards } from "./loader.js";

export function award() {
    const container = document.querySelector(".awardList.swiper-wrapper");
    if (!container) return;

    container.innerHTML = "";

    allAwards.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
      <div class="awardImg">
        <img class="img" src="${item.image}" alt="${item.name}" />
        ${item.logo ? `<img class="logo" src="${item.logo.src}" alt="${item.logo.alt}" />` : ""}
      </div>
      <div class="awardTextBox">
        <p class="award-name">${item.name}</p>
        <h3 class="title">${item.title}</h3>
        <p class="text">${item.description}</p>
        <div class="award-text-bottom">
          ${item.link
                ? `<a href="${item.link.href}" title="페이지 바로가기" class="link-text-btn">
                  <span>${item.link.label}</span>
                  ${item.link.icon ? `<i class='bx bx-chevron-right'></i>` : ""}
                </a>`
                : ""
            }
        </div>
      </div>
    `;
        container.appendChild(slide);
    });

    awardSlide();
}

function awardSlide() {
    const animationTime = 3000;
    const swiper = new Swiper(".awardListWrapper", {
        slidesPerView: "auto",
        centeredSlides: true,
        speed: 1000,
        autoplay: {
            delay: animationTime,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        on: {
            init() {
                syncBackground();
                resetBullets(animationTime);
            },
            slideChangeTransitionStart() {
                resetBullets(animationTime);
            },
            slideChangeTransitionEnd() {
                syncBackground();
            },
        },
    });

    const pauseBtn = document.querySelector(".awardListWrapper .pause-btn");
    let isPlay = true;

    if (pauseBtn) {
        pauseBtn.addEventListener("click", function () {
            if (isPlay) {
                swiper.autoplay.stop();
                this.classList.add("on");
                isPlay = false;
                pauseAnimation();
            } else {
                swiper.autoplay.start();
                this.classList.remove("on");
                isPlay = true;
                resumeAnimation();
            }
        });
    }

    function syncBackground() {
        const currentImg = document.querySelector(".swiper-slide-active .awardImg .img");
        if (currentImg) {
            document.querySelector(".award-bg").style.backgroundImage = `url('${currentImg.src}')`;
        }
    }

    function resetBullets(duration) {
        const activeBullet = document.querySelector(".awardContainer .swiper-pagination-bullet-active");
        const others = document.querySelectorAll(".awardContainer .swiper-pagination-bullet");

        others.forEach(bullet => {
            bullet.classList.remove('pause');
        });
        activeBullet.classList.remove('pause');
        activeBullet.classList.remove('swiper-pagination-bullet-active'); // 잠깐 제거
        void activeBullet.offsetWidth; // reflow
        activeBullet.classList.add('swiper-pagination-bullet-active');
    }


}
