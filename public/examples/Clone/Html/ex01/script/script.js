
window.onload = () => {
    gnbMenu();
    search();
    // sitemapPc();
    // sitemapMo()
    sitemap();
    visualSlide();
    model();
    contentEffect();
    awardSlide();
    snsBtn();
    topBtn();
    footerNoticeSlide();
    if(window.innerWidth <= 768){
        console.log(window.innerWidth)
        eventScroll();
    }
}

function gnbMenu() {
    /*
    1. 메인메뉴 이벤트
    2. 서뷰메뉴내에 있는 탭메뉴 이벤트
    3. 탭메뉴 내부에 있는 스와이퍼 이벤트
    */

    const mainMenu = document.querySelectorAll('.gnb > li > a');//메인메뉴
    const subMenu = document.querySelectorAll('.submenu-wrapper');

    const tabMenu = document.querySelectorAll('.submenu-left a');
    const tabContent = document.querySelectorAll('.submenu-right-item');

    let currentOpenIndex = -1;
    //현재 열려있는 서브메뉴의 인덱스를 추적하기 위한 변수
    //-1은 아무것도 열려있지 않음을 의미

    //메인메뉴 이벤트
    mainMenu.forEach((menuItem, idx) => {
        menuItem.addEventListener('click', (e) => {
            e.preventDefault();
            const thisIdx = currentOpenIndex !== idx;//다른 메뉴가 클릭되었음을 의미
            const isOpen = currentOpenIndex !== -1; //현재 메뉴가 열려있는지 판단

            //모든 서브메뉴 숨기기
            subMenu.forEach((subItem) => {
                // document.body.classList.add('no-scroll')
                if (subItem.classList.contains('open')) {
                    subItem.classList.remove('open');
                    //다른 메뉴로 전환할때에는 transition값을 적용하지 않고 즉시 적용
                    if (thisIdx) {
                        subItem.style.transition = 'none';
                    }
                }
            })

            //새 메뉴를 열거나 현재 열린 메뉴를 닫음
            if (!isOpen || thisIdx) {
                subMenu[idx].classList.add('open');
                if (isOpen) {
                    subMenu[idx].style.transition = 'none';
                } else {
                    subMenu[idx].style.transition = '';//기본 transition이 적용
                }
                currentOpenIndex = idx;
            } else {
                currentOpenIndex = -1;
            }
            if (currentOpenIndex !== -1) {
                document.body.classList.add('no-scroll')
            } else {
                requestAnimationFrame(() => {
                    document.body.classList.remove('no-scroll')
                })
            }
            //다음 이벤트에서 모든 서브메뉴의 transition을 기본값으로 복원
            requestAnimationFrame(() => {
                subMenu.forEach((subItem) => {
                    subItem.style.transition = '';
                })
            })


        })
    })

    //탭메뉴 이벤트
    tabMenu.forEach((tab, idx) => {

        if (idx === 0) {
            console.log(tabContent[0])
            tab.classList.add('on');
            displayTab(tabContent[0]);
        }

        tab.addEventListener('click', e => {
            e.preventDefault();
            activeTab(tab);
        })
    })
    function activeTab(tab) {
        const target = tab.getAttribute('data-target');
        console.log(target)

        tabContent.forEach((content) => {
            content.style.display = 'none';
        })
        tabMenu.forEach(menu => {
            menu.classList.remove('on');
        })
        tab.classList.add('on')
        const activeTabContent = document.querySelector(`.submenu-right-item.${target}`);
        if (activeTabContent) {
            //activeTabContent.style.display = 'block'
            displayTab(activeTabContent)
        }
    }
    function displayTab(activeTabContent) {
        activeTabContent.style.display = 'block';
        //탭메뉴가 활성한 메뉴에서만 스와이프 실행
        initSwiper(activeTabContent)
    }

    function initSwiper(activeTab) {
        const swiperContainer = activeTab.querySelector('.swiper-container');
        if (swiperContainer && !swiperContainer.classList.contains('swiper-initialized')) {
            new Swiper(swiperContainer, {
                navigation: {
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                },
                allowTouchMove: false,
                speed: 0,
                pagination: {
                    el: '.swiper-pagination',
                    clickabel: true,
                }
            })
        }


    }

}

function search() {
    const searchBtn = document.querySelector('.search-wrapper .search-btn');
    const searchItem = document.querySelector('.search-wrapper');
    const inputItem = searchItem.querySelector('input');
    const header = document.querySelector('header');


    searchBtn.addEventListener('click', (e) => {
        //console.log('11')

        toggleSearch(true);
        e.stopPropagation()//버블링 제어
    })

    function toggleSearch(show) {
        if (show) {
            searchItem.classList.add('on');
            inputItem.focus()//인풋 요소에 포커싱
        } else {
            searchItem.classList.remove('on');
            inputItem.value = '';//인풋 내용 초기화
        }
    }
    searchItem.addEventListener('click', (e) => {
        e.stopPropagation()//버블링 제어
        //이벤트가 인풋으로 전달되기 때문에 인풋을 클릭하면 닫히는 현상이 생기므로
        //버블링을 막아서 이벤트 전달을 막아야 한다.
    })

    header.addEventListener('click', () => {
        toggleSearch(false)
    })

}

// function sitemapPc() {
//     const btn = document.querySelector('.ham-btn');
//     const sitemap = document.querySelector('.pc-sitemap-wrapper');

//     let isOpen = true;

//     btn.addEventListener('click', function (e) {
//         e.preventDefault();
//         if (isOpen) {
//             toggleSitemap('open', sitemap);
//         } else {
//             toggleSitemap('close', sitemap);
//         }
//         isOpen = !isOpen;
//     })

//     function toggleSitemap(action, item) {
//         btn.classList.toggle('on', action === 'open');
//         item.classList.toggle('on', action === 'open');
//         document.body.classList.toggle('no-scroll', action === 'open');
//     }
// }
// function sitemapMo(){
//     const btn = document.querySelector('.ham-btn');
//     const sitemap = document.querySelector('.mo-sitemap-wrapper');
//     const depth1Menu = document.querySelectorAll('.depth1 a');
//     const depth2Container = document.querySelector('.depth2');
//     const backBtn = depth2Container.querySelectorAll('.back-btn');
//     let isOpen = true;

//     btn.addEventListener('click', function (e) {
//         e.preventDefault();
//         if (isOpen) {
//             toggleSitemap('open', sitemap);
//         } else {
//             toggleSitemap('close', sitemap);
//         }
//         isOpen = !isOpen;
//     })

//     function toggleSitemap(action, item) {
//         btn.classList.toggle('on', action === 'open');
//         item.classList.toggle('on', action === 'open')
//     }

//     //2뎁스
//     depth1Menu.forEach((depth1)=>{
//         depth1.addEventListener('click',function(e){
//             // e.preventDefault();
//             const targetId = depth1.getAttribute('data-target');
//             const targetItem = depth2Container.querySelector(`#${targetId}`)
//             //console.log(targetId)
//             // console.log(targetItem)
//             if(targetId !== 'myPage'){
//                 e.preventDefault();
//             }

//             depth2Container.classList.add('on');

//             if(targetItem){
//                 targetItem.classList.add('on')
//             }   
//         })
//     })
//     backBtn.forEach((btn)=>{
//         btn.addEventListener('click',function(){
//             this.parentElement.classList.remove('on');//li에 초기화
//             depth2Container.classList.remove('on');//depth2초기화
//         })
//     })

// }

function sitemap() {
    const btn = document.querySelector('.ham-btn');
    const pcSitemap = document.querySelector('.pc-sitemap-wrapper');
    const moSitemap = document.querySelector('.mo-sitemap-wrapper');
    const depth1Menu = document.querySelectorAll('.depth1 a');
    const depth2Container = document.querySelector('.depth2');
    const backBtn = depth2Container.querySelectorAll('.back-btn');

    let isOpen = false;
    const mobileMediaQuery = window.matchMedia('(max-width : 1024px)') //브라우저 사이즈 감지

    //모든 메뉴와 서브메뉴를 닫는 로직
    function closeMenu() {
        const allDepth2Menu = depth2Container.querySelectorAll('.on');
        depth2Container.classList.remove('on')
        //메뉴가 열려있을때 on을 감지해야 하기 때문에 미리 선언할 수 없다.
        allDepth2Menu.forEach((menu) => {
            menu.classList.remove('on');
        })
        document.body.classList.remove('no-scroll');
        pcSitemap.classList.remove('on');
        moSitemap.classList.remove('on');
        btn.classList.remove('on');

        isOpen = false;//강제적으로 닫을때에는 변수값이 변경되지 않으므로 강제적으로 변경
    }
    //화면크기 감지
    mobileMediaQuery.addEventListener('change', mediaQueryChange);

    function mediaQueryChange() {
        if (isOpen) {
            closeMenu();
        }
    }
    //햄버거 메뉴 이벤트
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isMobile = mobileMediaQuery.matches;//mobileMediaQuery의 값이 맞는지 아닌지 체크
        const tartgetSitemap = isMobile ? moSitemap : pcSitemap;
        //isMobile 조건에 따라 대상자가 moSitemap거나  pcSitemap가 되도록 설정
        const action = isOpen ? 'close' : 'open';
        toggleMenu(action, tartgetSitemap);
    })

    function toggleMenu(action, sitemap) {
        btn.classList.toggle('on', action === 'open');
        sitemap.classList.toggle('on', action === 'open');
        document.body.classList.toggle('no-scroll', action === 'open');
        isOpen = action === 'open'

        //2뎁스 초기화
        if (action === 'close') {
            const allDepth2Menu = depth2Container.querySelectorAll('.on');
            console.log(isOpen, action)
            console.log(allDepth2Menu)
            allDepth2Menu.forEach((menu) => {
                menu.classList.remove('on');
                depth2Container.classList.remove('on')

            })
        }
    }

    //2뎁스 이벤트
    depth1Menu.forEach((depth1) => {
        depth1.addEventListener('click', function (e) {
            const targetId = this.getAttribute('data-target');
            // console.log(targetId)
            if (targetId !== 'myPage') {
                e.preventDefault();
                const targetContainer = depth2Container.querySelector(`#${targetId}`);
                if (targetContainer) {
                    depth2Container.classList.add('on');
                    targetContainer.classList.add('on');
                }
            }
        })
    })//2뎁스 이벤트

    backBtn.forEach((back) => {
        back.addEventListener('click', function () {
            this.parentElement.classList.remove('on');
            depth2Container.classList.remove('on')
        })
    })

};//sitemap

function visualSlide() {
    let swiper;
    const pauseBtn = document.querySelector('.visual-control .pause-btn');
    
    let isPlay = true;

    function initializeSwiper() {
        swiper = new Swiper(".visual-wrapper .swiper-container", {
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
            clone.querySelectorAll(".blind").forEach((irElement) => irElement.classList.remove("blind"));
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


}//visual

function model() {

    const modelCategory = document.querySelectorAll('.category select');

    init();////초기설정 바로 실행
    resizeMenu();//리사이즈 이벤트 바로 실행
    window.addEventListener('resize', resizeMenu)//사용자가 디스플레이의 크기를 변경

    function init() {
        modelCategory.forEach((el) => {
            creativeCategory(el)
        })
        initMenu();//메뉴 초기화 
    }

    function resizeMenu() {
        const category = document.querySelector('.category');
        if (window.innerWidth <= 768) {
            category.classList.add('mobile');
        } else {
            category.classList.remove('mobile')
        }
    }


    function initMenu() {
        const firstOpt = document.querySelector('.select-opt li:first-of-type');
        if (firstOpt) {
            const styleSelect = firstOpt.closest('.select').querySelector('.select-style');
            const selct = styleSelect.previousElementSibling;
            listToggleMenu({ target: firstOpt }, styleSelect, selct)//첫번째 옵션을 토글로 설정
        }
    }
    //카테고리 생성
    function creativeCategory(el) {
        const optNum = el.children.length;
        // console.log(optNum)
        el.classList.add('select-hide');
        creativeWrapper(el);//select-style 감싸는 wrapper생성
        const styleSelect = selectMenu(el);
        const list = creatList(styleSelect, el, optNum)
        //이벤트
        styleSelect.addEventListener('click', (e) => toggleDropDown(e, styleSelect, list));
        list.addEventListener('click', e => listToggleMenu(e, styleSelect, el))
    }
    //wrapper 생성
    function creativeWrapper(el) {
        const wrapper = document.createElement('div');
        wrapper.className = 'select';//wrapper에 class생성
        el.parentElement.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        return wrapper
    }

    // styleSelect 생성
    function selectMenu(el) {
        const styleSelect = document.createElement('div');
        styleSelect.className = 'select-style';
        styleSelect.textContent = el.children[0].textContent
        //첫번째 옵션의 텍스트를 전달해서select-style 의 내용으로 설정
        el.after(styleSelect)
        return styleSelect
    }

    //list생성
    function creatList(styleSelect, el, optNum) {
        const list = document.createElement('ul');
        list.className = 'select-opt';
        styleSelect.after(list);

        for (let i = 0; i < optNum; i++) {
            let listItem = document.createElement('li');
            listItem.textContent = el.children[i].textContent;//select안에 option의 텍스트 가져오기
            listItem.setAttribute('data-target', el.children[i].value);
            list.appendChild(listItem);
        }
        return list

    }
    //dropdown

    function toggleDropDown(e, styleSelect, list) {

        list.style.display = list.style.display === 'block' ? 'none' : 'block';
    }

    function listToggleMenu(e, styleSelect, el) {
        const target = e.target;
        if (target.tagName.toLowerCase() === 'li') {
            //타겟의 이름을 소문자로 변환
            selectOpt(target, styleSelect, el)
            contentTab(target)
            initSwiper(target)
        }
    }
    //li 선택 이벤트
    function selectOpt(target, styleSelect, el) {
        styleSelect.textContent = target.textContent;
        el.value = target.getAttribute('data-target');
        const list = document.querySelectorAll('.select-opt > li');
        list.forEach(el => {
            el.classList.remove('on')
        })
        target.classList.add('on');
        target.parentElement.style.display = 'none';
        console.log(el.value);
    }
    //li에 탭메뉴 활성
    function contentTab(target) {
        const activeTab = target.getAttribute('data-target');
        const tabItem = document.querySelectorAll('.model-list-wrapper');
        tabItem.forEach(el => {
            el.style.display = el.classList.contains(activeTab) ? 'block' : 'none'
        })
        //탭메뉴로 메뉴를 새로 선택할때마다 스와이퍼를 초기화해서 실행

        // initSwiper(activeTab)
    }
    function initSwiper(activeTab) {
        const activeItemClass = activeTab.getAttribute('data-target');
        const tabItem = document.querySelector(`.model-list-wrapper.${activeItemClass}`);
        console.log(tabItem)
        if (tabItem) {
            const swiperContainer = tabItem.querySelector('.swiper-container');
            if (!swiperContainer.classList.contains('swiper-initialized')) {
                new Swiper(swiperContainer, {
                    slidesPerView: 1,
                    initialSlide: 0,//시작 슬라이드 지정
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        }
                    },

                })

            }
        }
    }




}

function contentEffect() {
    const section = document.querySelectorAll('section');
    let posArr = [];//빈 배열 생성
    const basePos = window.innerHeight * 0.8;
    console.log(window.innerHeight)



    posArr = Array.from(section).map(section => section.offsetTop);
    console.log(posArr)

    window.addEventListener('scroll', onScroll)

    function onScroll() {
        const scrollTop = document.documentElement.scrollTop;
        // console.log(scrollTop)

        section.forEach((section, idx) => {
            if (scrollTop >= posArr[idx] - basePos) {
                section.classList.add('on');
            }
        })
    }
}

function awardSlide() {
    const animationTime = 3000;
    const swiper = new Swiper('.award-wrapper .swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true, //현재 슬라이드 가운데
        navigation: {
            prevEl: '.prev-btn',
            nextEl: '.next-btn',
        },
        pagination: {
            el: '.award-dot-list .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: animationTime,
        },
        speed: 1000,
        on: {
            //스와이프가 실행될때 잡아주는 콜백함수
            init: function () {
                //init 스와이프 실행 초기값
                let initBg = document.querySelector('.swiper-slide-active .award-img img').src;
                //console.log(initBg)
                document.querySelector('.award-bg').style.backgroundImage = `url('${initBg}')`;
            },
            slideChange: function () {
                //slideChange 슬라이드가 변경될때의 콜백함수
                let realIndex = this.realIndex;//realIndex 현재 active되고 있는 slide의 인덱스
                //console.log(realIndex)
                let currentImgSrc = this.slides[realIndex].querySelector('.award-img img').src;
                document.querySelector('.award-bg').style.backgroundImage = `url('${currentImgSrc}')`;

                // document.querySelectorAll('.swiper-pagination-bullet-active').forEach(el=>{
                //     el.style.animationDuration = '0'
                //     setTimeout(()=>{
                //         el.style.animationDuration = `${animationTime}ms`
                //     })
                // })
            }
        }
    })
    const pauseBtn = document.querySelector('.award-wrapper .pause-btn');
    let isPlay = true;

    pauseBtn.addEventListener('click', function () {
        if (isPlay) {
            swiper.autoplay.stop();
            this.classList.add('on');
            isPlay = false;
            document.querySelectorAll('.swiper-pagination-bullet-active').forEach(el => {
                el.classList.add('pause')
            })
        } else {
            swiper.autoplay.start();
            this.classList.remove('on');
            isPlay = true;
        }
    })
}

function snsBtn() {
    const snsWrap = document.querySelector('.mo-f-sns');
    const btn = document.querySelector('.f-sns-btn');
    let isOpen = true;
    btn.addEventListener('click', function () {
        if (isOpen) {
            snsWrap.style.display = 'flex';
            isOpen = false
        } else {
            snsWrap.style.display = 'none';
            isOpen = true
        }
    })
}


function topBtn() {
    const btn = document.querySelector('.f-top-btn');
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    /*
    scrollTo(x,y)
    scrollTo(x,y, behavior);
    behavior :이동 속성 기본값auto(애니메이션 없이 바로 이동), smooth(자연스럽게 이동)
    
    */
}

function footerNoticeSlide() {
    const swiper = new Swiper('.f-notice-item.swiper-container', {
        direction: 'vertical',
        autoHeight: true,
        loop: true,
        autoplay: {
            delay: 2000,
        },
        speed: 1000,
        // navigation : {
        //     prevEl : '.f-notice-control .prev-btn',
        //     nextEl : '.f-notice-control .next-btn',
        // },
    })
    const pauseBtn = document.querySelector('.f-notice-control .pause-btn');
    let isPlay = true;

    pauseBtn.addEventListener('click', function () {
        if (isPlay) {
            swiper.autoplay.stop();
            this.classList.add('on');
            isPlay = false;
        } else {
            swiper.autoplay.start();
            this.classList.remove('on');
            isPlay = true;

        }
    })

    document.querySelector('.f-notice-control .prev-btn').addEventListener('click', function () {
        //let prevIndex = swiper.realIndex - 1;
        // swiper.slideTo(prevIndex,500)
        swiper.slidePrev(300)
    })
    document.querySelector('.f-notice-control .next-btn').addEventListener('click', function () {
        //let nextIndex = swiper.realIndex + 1;
        swiper.slideNext(300)
    })


}

function eventScroll() {
    const eventWrapper = document.querySelector('.event-wrapper');
    const eventInner = document.querySelector('.event-inner');
    const eventImg = document.querySelector('.event-img-wrapper')
    const textBox = document.querySelector('.text-box-wrapper');
    const header = document.querySelector('#header');

    const wrapperTop = eventWrapper.offsetTop;//wrapperTop의 위치
    const wrapperHeight = eventWrapper.offsetHeight;//eventWrapper의 높이값 잡기
    const headerHeight = header.offsetHeight;

    //기본 세팅값
    //영역의 크기보다 더 크게 해서 자연스럽게 넘기기 위함
    window.addEventListener('scroll', onScroll);

    function removeEventScroll(){
        window.removeEventListener('scroll',onScroll)
    }
    return{removeEventScroll}
    

    function onScroll() {
     
        const scrollTop = document.documentElement.scrollTop;
        textBox.style.height = `${wrapperHeight}px`;
        const scrollPercent = Math.max(0, Math.min(1, (scrollTop - wrapperTop + headerHeight) / textBox.offsetHeight))
        const translateYValue = 100 - (scrollPercent * 100);
        const textBoxTop = Math.min(wrapperHeight / 2, Math.max(0, scrollTop - wrapperTop + headerHeight))
        textBox.style.transform = `translateY(${translateYValue}%)`
        eventInner.style.height = `${wrapperHeight}px`;
        if (scrollTop > wrapperTop - headerHeight && scrollTop < wrapperTop + wrapperHeight) {
            eventImg.style.position = 'fixed';
            eventInner.style.paddingTop = `${wrapperHeight * 0.9}px`;
        } else if(scrollTop < wrapperTop || textBoxTop >= wrapperHeight){
            eventImg.style.position = 'relative'
            eventInner.style.paddingTop = `0px`;
        }

        if(translateYValue <= 0){
            eventImg.style.position = 'relative'
        }
    }
}

let eventScrollHandler;

function resizeEvent(){
    if(window.innerWidth <=768){
        if(!eventScrollHandler){
            eventScrollHandler = eventScroll()
        }else{
            if(eventScrollHandler){
                eventScrollHandler.removeEventScroll();
                eventScrollHandler = null
            }
        }
    }
}

window.addEventListener('resize', resizeEvent)
resizeEvent()