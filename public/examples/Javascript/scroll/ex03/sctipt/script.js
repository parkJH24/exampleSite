

document.addEventListener('DOMContentLoaded', function(){
    gsap.set('.section01 .textWrap', { y: -100 });
    gsap.set('.section01 .videoWrap', { y: 500, scale: 0.6 });
    

    ScrollTrigger.create({
        trigger: ".section01",
        start: 'top top',
        end: '+=200%',
        onEnter: () => {
            gsap.set(".section01", { position: "fixed", top: 0, left: 0 });
        },
        onLeaveBack: () => {
            gsap.set(".section01", { position: "relative" });
        }
    })
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section01",
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                const video = document.querySelector('.section01 .videoWrap video');
                if (self.progress === 1) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        }
    });
    tl.to('.section01 .textWrap', { y: 0, width: '800px' })
        .to('.section01 .videoWrap', { y: 0, scale: 1 }, '<')
        .to('.section01 .overlayWrap', { y: 0 }, '<');
})