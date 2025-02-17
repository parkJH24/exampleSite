document.addEventListener("DOMContentLoaded", function () {
    let swiper;
    const pauseBtn = document.querySelector('.visual-control .pause-btn');
    let isPlay = true;

    function initializeSwiper() {

        swiper = new Swiper(".swiper-container", {
            loop: true,
            speed: 1000,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            effect: "creative",
            creativeEffect: {
                prev: { translate: ["-100%", 0, 0] },
                next: { translate: ["50%", 0, -1] }
            },
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false
            // },
            on: {
                init: function () {
                    setupTextNodes();
                    updateTextNodes(this);
                },
                slideChangeTransitionStart: function () {
                    animateTextTransition();
                },
                slideChangeTransitionEnd: function () {
                    updateTextNodes(this);
                }
            }
        });
    }

    pauseBtn.addEventListener('click', function () {
        if (isPlay) {
            console.log(isPlay)
            swiper.autoplay.stop();//스와이퍼 자동 슬라이더 정지 메서드
            this.classList.add('on');
            isPlay = false;
        } else {
            swiper.autoplay.start();
            this.classList.remove('on');
            isPlay = true
        }
    })

    function setupTextNodes() {
        const textContainer = document.createElement("div");
        textContainer.classList.add("text-anim-container");
        document.querySelector(".visual-wrapper .swiper-container").appendChild(textContainer);

        // 텍스트 관련 요소 추가
        ["prev", "active", "next"].forEach((pos) => {
            let textNode = document.createElement("div");
            textNode.classList.add("text-nodes", `text-nodes-${pos}`);
            textContainer.appendChild(textNode);
        });

        // ✅ CTA 버튼 관련 요소 추가
        const ctaContainer = document.createElement("div");
        ctaContainer.classList.add("text-link");
        textContainer.appendChild(ctaContainer);
    }

    function updateTextNodes(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex]; 
        const prevSlide = swiper.slides[swiper.activeIndex - 1] || swiper.slides[swiper.slides.length - 1];
        const nextSlide = swiper.slides[swiper.activeIndex + 1] || swiper.slides[0];

        // ✅ `.ir` 클래스를 제외한 요소들만 복사
        function getFilteredHTML(element) {
            if (!element) return "";
            const clone = element.cloneNode(true);
            clone.querySelectorAll(".ir").forEach((irElement) => irElement.classList.remove("ir")); // ✅ 클래스만 제거하고 내용 유지
            return clone.innerHTML;
        }

        document.querySelector(".text-nodes-prev").innerHTML = getFilteredHTML(prevSlide.querySelector(".swiper-slide-text"));
        document.querySelector(".text-nodes-active").innerHTML = getFilteredHTML(activeSlide.querySelector(".swiper-slide-text"));
        document.querySelector(".text-nodes-next").innerHTML = getFilteredHTML(nextSlide.querySelector(".swiper-slide-text"));

        // ✅ CTA 버튼 업데이트 (`.ir` 제거)
        const ctaNodes = document.querySelector(".text-link");
        ctaNodes.innerHTML = getFilteredHTML(activeSlide.querySelector(".swiper-slide-link"));

        // ✅ CTA 버튼에서 tabindex="-1" 제거 (키보드 접근 가능하도록 설정)
        ctaNodes.querySelectorAll("a, button").forEach((btn) => {
            btn.removeAttribute("tabindex");
        });

        // ✅ 애니메이션 초기화
        gsap.set(".text-nodes-prev", { x: "-100%", opacity: 0 });
        gsap.set(".text-nodes-active", { x: "0%", opacity: 1 });
        gsap.set(".text-nodes-next", { x: "100%", opacity: 0 });

        gsap.set(".cta-nodes", { opacity: 1, y: 20 });
    }

    function animateTextTransition() {
        const prevText = document.querySelector(".text-nodes-prev");
        const activeText = document.querySelector(".text-nodes-active");
        const nextText = document.querySelector(".text-nodes-next");
        const ctaNodes = document.querySelector(".text-link"); // ✅ CTA도 애니메이션 적용

        gsap.to(activeText, { x: "100%", opacity: 0, duration: 0.6, delay: 0.3, ease: "power2.out" });
        gsap.fromTo(nextText, { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.6, delay: 0.1, ease: "power2.out" });

        // ✅ CTA 버튼도 동일한 애니메이션 적용
        // gsap.to(ctaNodes, { opacity: 0, y: 10, duration: 0.3, ease: "power2.out", onComplete: () => {
        //     gsap.to(ctaNodes, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        // }});
    }

    initializeSwiper();
});
