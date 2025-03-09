window.onload = ()=>{

    let swiper;
    const pauseBtn = document.querySelector('.visual-control .pause-btn');
    let isPlay = true;

    function initializeSwiper() {
        swiper = new Swiper(".swiper-container", {
            loop: true,
            speed: 1000,
            autoplay : {
                delay : 5000,
                desableOnInteraction : true,  
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            effect: "creative",
            creativeEffect: {
                prev: { translate: ["-100%", 0, 0] },
                next: { translate: ["50%", 0, -1] }
            },
            on: {
                init: function () {
                    setupTextNodes();
                    updateTextNodes(this);
                },
                slideChangeTransitionStart: function () {
                    moveText(this);
                },
                slideChangeTransitionEnd: function () {
                    updateTextNodes(this);
                }
            },
            observer : true,
            observerParents : true,
            resizeObserver : true
        });
    }

    pauseBtn.addEventListener('click', function () {
        console.log(swiper)
        if (isPlay) {
            swiper.autoplay.stop();
            this.classList.add('on');
            isPlay = false;
        } else {
            swiper.autoplay.start();
            this.classList.remove('on');
            isPlay = true;
        }
    });

    function setupTextNodes() {
        const textContainer = document.createElement("div");
        textContainer.classList.add("text-anim-container");
        document.querySelector(".visual-wrapper .swiper-container").appendChild(textContainer);

        ["prev", "active", "next"].forEach((pos) => {
            let textNode = document.createElement("div");
            textNode.classList.add("text-nodes", `text-nodes-${pos}`);
            textContainer.appendChild(textNode);
        });

        const ctaContainer = document.createElement("div");
        ctaContainer.classList.add("text-link");
        textContainer.appendChild(ctaContainer);
    }

    function updateTextNodes(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const prevSlide = swiper.slides[(swiper.activeIndex - 1 + swiper.slides.length) % swiper.slides.length];
        const nextSlide = swiper.slides[(swiper.activeIndex + 1) % swiper.slides.length];

        function getFilteredHTML(element) {
            if (!element) return "";
            const clone = element.cloneNode(true);
            clone.querySelectorAll(".ir").forEach((irElement) => irElement.classList.remove("ir"));
            return clone.innerHTML;
        }

        document.querySelector(".text-nodes-prev").innerHTML = getFilteredHTML(prevSlide.querySelector(".swiper-slide-text"));
        document.querySelector(".text-nodes-active").innerHTML = getFilteredHTML(activeSlide.querySelector(".swiper-slide-text"));
        document.querySelector(".text-nodes-next").innerHTML = getFilteredHTML(nextSlide.querySelector(".swiper-slide-text"));

        const ctaNodes = document.querySelector(".text-link");
        ctaNodes.innerHTML = getFilteredHTML(activeSlide.querySelector(".swiper-slide-link"));

        ctaNodes.querySelectorAll("a, button").forEach((btn) => {
            btn.removeAttribute("tabindex");
        });

        gsap.set(".text-nodes-prev", { x: "-100%", opacity: 0 });
        gsap.set(".text-nodes-active", { x: "0%", opacity: 1 });
        gsap.set(".text-nodes-next", { x: "100%", opacity: 0 });

        // gsap.set(".cta-nodes", { opacity: 1, y: 20 });
    }

    function moveText(swiper) {
        const prevText = document.querySelector(".text-nodes-prev");
        const activeText = document.querySelector(".text-nodes-active");
        const nextText = document.querySelector(".text-nodes-next");

        // const gsapDuration = (animationDuration * 0.6) / 1000;

        if (swiper.previousIndex > swiper.activeIndex) {
            // 🔥 Prev 방향 (이전 슬라이드로 이동할 때)
            gsap.set(prevText, { x: "-100%", opacity: 0 });
            gsap.to(activeText, { x: "100%", opacity: 0, duration: 0.6, ease: "power2.out" });
            gsap.fromTo(prevText, { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" });
        } else {
            // 🔥 Next 방향 (다음 슬라이드로 이동할 때)
            gsap.to(activeText, { x: "100%", opacity: 0, duration: 0.6, ease: "power2.out" });
            gsap.fromTo(nextText, { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" });
        }
    }

    initializeSwiper();
}
