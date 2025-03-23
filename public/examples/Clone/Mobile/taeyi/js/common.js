

// let cursor = document.getElementById("cursor");
// let close = document.getElementById("close");
// let body = document.body;
// let iframe = document.getElementById("pen");
// let penLink = document.getElementById("penlink");
// let links = document.getElementsByTagName("a");



// // Load iFrames on demand & remove after modal is closed to reduce weight & smooth out transitions


// // let cards = document.getElementsByClassName("inner");
// // for (let i = 0; i < cards.length; i++) {
// //     cards[i].addEventListener("mousemove", function (event) {
// //         cursor.classList.add("active");
// //     });
// //     cards[i].addEventListener("mouseover", function (event) {
// //         cursor.classList.add("active");
// //     });

// //     cards[i].addEventListener("mouseout", function (event) {
// //         cursor.classList.remove("active");
// //     });
//     // cards[i].addEventListener(
//     //     "click",
//     //     function (i) {
//     //         body.classList.add("active");
//     //         iframe.setAttribute("src", frames[i]);
//     //         let penDebug = frames[i];
//     //         let penFull = penDebug.replace("debug", "pen");
//     //         penLink.setAttribute("href", penFull);
//     //     }.bind(null, i)
//     // );
// // }

// // hover events for social links

// // for (link of links) {
// //     link.addEventListener("mouseover", function (event) {
// //         cursor.classList.add("linkhover");
// //     });
// //     link.addEventListener("mousemove", function (event) {
// //         cursor.classList.add("linkhover");
// //     });
// //     link.addEventListener("mouseout", function (event) {
// //         cursor.classList.remove("linkhover");
// //     });
// // }

// // Escape key option to exit active state

// document.onkeydown = function (evt) {
//     evt = evt || window.event;
//     let isEscape = false;
//     if ("key" in evt) {
//         isEscape = evt.key === "Escape" || evt.key === "Esc";
//     } else {
//         isEscape = evt.keyCode === 27;
//     }
//     if (isEscape) {
//         body.classList.remove("active");
//         setTimeout(() => {
//             iframe.setAttribute("src", "");
//         }, 2000);
//     }
// };

// // close.addEventListener("click", function (event) {
// //   body.classList.remove("active");
// //   setTimeout(() => {
// //     iframe.setAttribute("src", "");
// //   }, 2000);
// // });

// gsap.set("#cursor", { xPercent: -50, yPercent: -50 });
// const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
// const mouse = { x: pos.x, y: pos.y };
// const speed = 0.35;

// const xSet = gsap.quickSetter(cursor, "x", "px");
// const ySet = gsap.quickSetter(cursor, "y", "px");

// window.addEventListener("mousemove", (e) => {
//     mouse.x = e.x;
//     mouse.y = e.y;
// });

// gsap.ticker.add(() => {
//     const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

//     pos.x += (mouse.x - pos.x) * dt;
//     pos.y += (mouse.y - pos.y) * dt;
//     xSet(pos.x);
//     ySet(pos.y);
// });

// Splitting();

// // Individual section scroll progress

// gsap.utils.toArray(".panel").forEach((section, index) => {
//     gsap.to(this, {
//         scrollTrigger: {
//             trigger: section,
//             start: "top 100%",
//             end: "bottom 25%",
//             scrub: 0,
//             onUpdate: (self) => {
//                 section.style.setProperty("--progress", self.progress);
//             }
//         }
//     });
// });

// // Full page scroll progress

// gsap.to("body", {
//     scrollTrigger: {
//         trigger: "body",
//         start: "top 60%",
//         end: "50% 50%",
//         scrub: 0,
//         onUpdate: (self) => {
//             body.style.setProperty("--progress", self.progress);
//         }
//     }
// });

// // Pull out the preloader

// document.addEventListener("DOMContentLoaded", function () {
//     body.classList.add("loaded");
// });

// // Set a delay on Scrolltrigger recalculation to accommodate element transition times

// function refresh() {
//     setTimeout(() => {
//         ScrollTrigger.refresh();
//     }, 2500);
// }
// var footer_tl = gsap.timeline({ repeat: -1, ease: Linear.easeNone });

// footer_tl.set('.footer-img', { y: -16, delay: .5 })
//     .set('.footer-img', { y: 0, delay: .5 });

// window.addEventListener("resize", refresh);
// const year = 2025;
// const month = 4; // 3월로 설정
// const dday = 12;
// generateCalendar(year, month, dday);

// function generateCalendar(year, month, dday) { // ✅ year, month를 매개변수로 받음
//     const firstDay = new Date(year, month - 1, 1);
//     const lastDay = new Date(year, month, 0);
//     const firstWeekday = firstDay.getDay(); // 해당 월의 첫 번째 요일 (0: 일요일, 1: 월요일 ...)
//     const totalDays = lastDay.getDate(); // 해당 월의 총 날짜 수

//     // document.getElementById("calendarTitle").innerText = `${year}년 ${month}월`;

//     const tbody = document.querySelector("#calendarTable tbody");
//     tbody.innerHTML = ""; // 기존 달력 초기화

//     let row = document.createElement("tr");

//     // 첫 주 공백 채우기
//     for (let i = 0; i < firstWeekday; i++) {
//         row.appendChild(document.createElement("td"));
//     }

//     // 날짜 추가
//     for (let day = 1; day <= totalDays; day++) {
//         let cell = document.createElement("td");
//         cell.innerText = day;

//         // ✅ 특정 날짜 (highlightDay)에 포인트 효과 추가
//         if (day === dday) {
//             cell.classList.add("highlight-day");
//         }

//         row.appendChild(cell);

//         if ((firstWeekday + day) % 7 === 0 || day === totalDays) {
//             tbody.appendChild(row);
//             row = document.createElement("tr");
//         }
//     }
// }

// // 37.57600893768424, 126.8026139571082
// const container = document.getElementById('map');
// const options = {
//     center: new kakao.maps.LatLng(37.57600893768424, 126.8026139571082), // 서울 시청 예시
//     level: 3
// };

// const map = new kakao.maps.Map(container, options);

// // 마커 추가
// const markerPosition = new kakao.maps.LatLng(37.57600893768424, 126.8026139571082);
// const marker = new kakao.maps.Marker({
//     position: markerPosition
// });
// marker.setMap(map);

// // 인포윈도우 (간단한 설명)
// const iwContent = '<div style="padding:5px;">돌잔치 장소<br></div>';
// const infowindow = new kakao.maps.InfoWindow({
//     content: iwContent
// });
// infowindow.open(map, marker);

// window.onload = () => {
//     initCustomCursor();
//     // initEscapeKeyClose();
//     // initScrollAnimations();
//     // initPreloader();
//     // initCalendar(2025, 4, 12);
//     // initKakaoMap();
//     // initMapLockToggle();

//     // setTimeout(initMapLockToggle, 500);
// }
// function initCustomCursor() {
//     const cursor = document.getElementById("cursor");
//     if (!cursor) return;

//     const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
//     const mouse = { x: pos.x, y: pos.y };
//     const speed = 0.35;

//     const xSet = gsap.quickSetter(cursor, "x", "px");
//     const ySet = gsap.quickSetter(cursor, "y", "px");

//     gsap.set(cursor, { xPercent: -50, yPercent: -50 });

//     window.addEventListener("mousemove", (e) => {
//         mouse.x = e.x;
//         mouse.y = e.y;
//     });

//     gsap.ticker.add(() => {
//         const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
//         pos.x += (mouse.x - pos.x) * dt;
//         pos.y += (mouse.y - pos.y) * dt;
//         xSet(pos.x);
//         ySet(pos.y);
//     });
// }
// function initEscapeKeyClose() {
//     const body = document.body;
//     const iframe = document.getElementById("pen");
//     if (!iframe) return;

//     document.onkeydown = function (evt) {
//         const isEscape = evt.key === "Escape" || evt.key === "Esc" || evt.keyCode === 27;
//         if (isEscape) {
//             body.classList.remove("active");
//             setTimeout(() => {
//                 iframe.setAttribute("src", "");
//             }, 2000);
//         }
//     };
// }

// function initScrollAnimations() {
//     Splitting();

//     gsap.utils.toArray(".panel").forEach((section) => {
//         gsap.to(this, {
//             scrollTrigger: {
//                 trigger: section,
//                 start: "top 100%",
//                 end: "bottom 25%",
//                 scrub: 0,
//                 onUpdate: (self) => {
//                     section.style.setProperty("--progress", self.progress);
//                 }
//             }
//         });
//     });

//     gsap.to("body", {
//         scrollTrigger: {
//             trigger: "body",
//             start: "top 60%",
//             end: "50% 50%",
//             scrub: 0,
//             onUpdate: (self) => {
//                 document.body.style.setProperty("--progress", self.progress);
//             }
//         }
//     });

//     const footer_tl = gsap.timeline({ repeat: -1, ease: Linear.easeNone });
//     footer_tl.set('.footer-img', { y: -16, delay: .5 })
//         .set('.footer-img', { y: 0, delay: .5 });

//     window.addEventListener("resize", () => {
//         setTimeout(() => {
//             ScrollTrigger.refresh();
//         }, 2500);
//     });
// }

// function initPreloader() {
//     document.addEventListener("DOMContentLoaded", () => {
//         document.body.classList.add("loaded");
//     });
// }

// function initCalendar(year, month, dday) {
//     const firstDay = new Date(year, month - 1, 1);
//     const lastDay = new Date(year, month, 0);
//     const firstWeekday = firstDay.getDay();
//     const totalDays = lastDay.getDate();
//     const tbody = document.querySelector("#calendarTable tbody");

//     if (!tbody) return;

//     tbody.innerHTML = "";
//     let row = document.createElement("tr");

//     for (let i = 0; i < firstWeekday; i++) {
//         row.appendChild(document.createElement("td"));
//     }

//     for (let day = 1; day <= totalDays; day++) {
//         const cell = document.createElement("td");
//         cell.innerText = day;
//         if (day === dday) cell.classList.add("highlight-day");
//         row.appendChild(cell);

//         if ((firstWeekday + day) % 7 === 0 || day === totalDays) {
//             tbody.appendChild(row);
//             row = document.createElement("tr");
//         }
//     }
// }

// let map;

// function initKakaoMap() {
//     const container = document.getElementById("map");
//     if (!container || !kakao || !kakao.maps) return;

//     const center = new kakao.maps.LatLng(37.57600893768424, 126.8026139571082);
//     const options = { center, level: 3 };

//     map = new kakao.maps.Map(container, options);

//     const marker = new kakao.maps.Marker({ position: center });
//     marker.setMap(map);

//     const infowindow = new kakao.maps.InfoWindow({
//         content: '<div style="padding:5px;">돌잔치 장소<br></div>'
//     });
//     infowindow.open(map, marker);

//     // 초기 잠금
//     map.setDraggable(false);
//     map.setZoomable(false);
// }

// function initMapLockToggle() {
//     const btn = document.getElementById('toggleLockBtn');
//     if (!btn || !map) return;

//     let mapLocked = true;

//     btn.addEventListener('click', () => {
//         mapLocked = !mapLocked;
//         map.setDraggable(!mapLocked);
//         map.setZoomable(!mapLocked);
//         btn.textContent = mapLocked ? '🔒 지도 잠금' : '🔓 지도 이동 가능';
//     });
// }


// document.addEventListener('DOMContentLoaded', function () {
//     initCustomCursor();
//     initEscapeKeyClose();
//     initScrollAnimations();
//     initPreloader();
//     initCalendar(2025, 4, 12);
//     initKakaoMap();


// })

window.onload = () => {
    initCustomCursor();
    initEscapeKeyClose();
    initScrollAnimations();
    initPreloader();
    initCalendar(2025, 4, 12);
    initKakaoMap();
}

function initCustomCursor() {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.35;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
    });
}

function initEscapeKeyClose() {
    const body = document.body;
    const iframe = document.getElementById("pen");
    if (!iframe) return;

    document.onkeydown = function (evt) {
        const isEscape = evt.key === "Escape" || evt.key === "Esc" || evt.keyCode === 27;
        if (isEscape) {
            body.classList.remove("active");
            setTimeout(() => {
                iframe.setAttribute("src", "");
            }, 2000);
        }
    };
}

function initScrollAnimations() {
    Splitting();

    gsap.utils.toArray(".panel").forEach((section) => {
        if (section.classList.contains("section04")) return; // 지도 섹션 제외
        gsap.to(this, {
            scrollTrigger: {
                trigger: section,
                start: "top 100%",
                end: "bottom 25%",
                scrub: 0,
                onUpdate: (self) => {
                    section.style.setProperty("--progress", self.progress);
                }
            }
        });
    });

    gsap.to("body", {
        scrollTrigger: {
            trigger: "body",
            start: "top 60%",
            end: "50% 50%",
            scrub: 0,
            onUpdate: (self) => {
                document.body.style.setProperty("--progress", self.progress);
            }
        }
    });

    const footer_tl = gsap.timeline({ repeat: -1, ease: Linear.easeNone });
    footer_tl.set('.footer-img', { y: -16, delay: .5 })
        .set('.footer-img', { y: 0, delay: .5 });

    window.addEventListener("resize", () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 2500);
    });
}

function initPreloader() {
    document.body.classList.add("loaded");
}

function initCalendar(year, month, dday) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const firstWeekday = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const tbody = document.querySelector("#calendarTable tbody");

    if (!tbody) return;

    tbody.innerHTML = "";
    let row = document.createElement("tr");

    for (let i = 0; i < firstWeekday; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement("td");
        cell.innerText = day;
        if (day === dday) cell.classList.add("highlight-day");
        row.appendChild(cell);

        if ((firstWeekday + day) % 7 === 0 || day === totalDays) {
            tbody.appendChild(row);
            row = document.createElement("tr");
        }
    }
}

let map;

function initKakaoMap() {
    const container = document.getElementById("map");
    if (!container || !kakao || !kakao.maps) return;

    const center = new kakao.maps.LatLng(37.57600893768424, 126.8026139571082);

    const options = { center, level: 2 };

    map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({ position: center });
    marker.setMap(map);

    const infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">햇살맛집<br>강서구 개화동559-63</div>'
    });
    infowindow.open(map, marker);

    // 초기 잠금
    map.setDraggable(false);
    map.setZoomable(false);

    initMapLockToggle();
}


function initMapLockToggle() {
    const btn = document.querySelector('.toggle-btn > label');
    const text = document.querySelector('.toggle-text');

    if (!btn || !map) return;

    let mapLocked = true;

    btn.addEventListener('click', () => {
        mapLocked = !mapLocked;
        map.setDraggable(!mapLocked);
        map.setZoomable(!mapLocked);
        text.textContent = mapLocked ? '🔒 지도가 잠겨있어요.' : '🔓 지도 이동 가능해요';
    });
}
