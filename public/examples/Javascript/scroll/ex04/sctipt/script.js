

document.addEventListener('DOMContentLoaded', function(){
    gsap.set('.contentWrap', { y: 1200 });
    gsap.set('.contentWrap02', { y: 700, opacity: 0 });
    ScrollTrigger.create({
        trigger: ".section04",
        start: "top top",
        end: "+=1000%",
        // pin: true,
        scrub: true,
        id: "section04Trigger", // ID 명확히 설정
        onEnter: () => {
            gsap.set(".section04", { position: "fixed", top: 0, left: 0 });
        },
        onLeaveBack: () => {
            gsap.set(".section04", { position: "relative" });
            const trigger = ScrollTrigger.getById("section04Trigger");
            if (trigger) {
                trigger.kill(); // 해당 ID의 ScrollTrigger 해제
            }
        }
    });
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section04",
            start: "top top",
            end: "+=1000%",
            scrub: 1,
            pin: true
        }
    });
    tl.to('.contentWrap', { y: 200, duration: 2 })
        .to('.contentWrap', { scale: 7, duration: 1 }, "<")

        .to('.textWrap .textWrapImg', { opacity: 1, duration: 0.3 }, "-=1.3")
        .to('.contentWrap', { opacity: 0, duration: 0.2 })
        .to('.textWrap h2', { opacity: 1, duration: 0.5 }, "-=0.5")
        .to('.textWrap p', { opacity: 1, duration: 0.5 })
        .to('.contentWrap', { scale: 1, duration: 1 })                // 확대 후 축소 애니메이션
        .to('.contentWrap', { y: 0, duration: 1 })

        .to('.textWrap h2', { opacity: 0, duration: 0.5 })
        .to('.textWrap p', { opacity: 0, duration: 0.5 })
        .to('.textWrap .textWrapImg', { scale: 0.4, y: -230, clipPath: "inset(5% 29% round 7%)", duration: 1 }, "-=0.5")

        .to('.contentWrap02', { opacity: 1, duration: 0 }, "-=0.5")
        .to('.contentWrap02', { y: 0, duration: 1 }, "-=0.5")
        .to('.textWrap .textWrapImg', { opacity: 0, duration: 0.3 })
        .to('.content02List .item01 .itemWrap', { opacity: 0.7, duration: 0.3 }, "-=0.5")
        .to('.content02List .item', { y: -900, duration: 2 },)
})