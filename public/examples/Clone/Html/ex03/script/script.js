import { initLoader, fetchModels, allModels, fetchAwards } from "./loader.js";
import { initHeaderUi } from "./header.js";
import { visualSlider } from "./slider.js";
import { model } from "./model.js";
import { award } from "./award.js";

window.addEventListener("DOMContentLoaded", async () => {
    await initLoader();
    if (typeof gnb === 'function') gnb();
    await fetchModels();
    await fetchAwards()
    initHeaderUi()
    visualSlider()
    model()
    award()
   
});




// slider


// function model() {

//     const modelCategory = document.querySelectorAll('.category select');

//     init();////초기설정 바로 실행
//     resizeMenu();//리사이즈 이벤트 바로 실행
//     window.addEventListener('resize', resizeMenu)//사용자가 디스플레이의 크기를 변경

//     function init() {
//         modelCategory.forEach((el) => {
//             creativeCategory(el)
//         })
//         initMenu();//메뉴 초기화 
//     }

//     function resizeMenu() {
//         const category = document.querySelector('.category');
//         if (window.innerWidth <= 768) {
//             category.classList.add('mobile');
//         } else {
//             category.classList.remove('mobile')
//         }
//     }


//     function initMenu() {
//         const firstOpt = document.querySelector('.selectOpt li:first-of-type');
//         if (firstOpt) {
//             const styleSelect = firstOpt.closest('.select').querySelector('.selectStyle');
//             const selct = styleSelect.previousElementSibling;
//             listToggleMenu({ target: firstOpt }, styleSelect, selct)//첫번째 옵션을 토글로 설정
//         }
//     }
//     //카테고리 생성
//     function creativeCategory(el) {
//         const optNum = el.children.length;
//         // console.log(optNum)
//         el.classList.add('selectHide');
//         creativeWrapper(el);//select-style 감싸는 wrapper생성
//         const styleSelect = selectMenu(el);
//         const list = creatList(styleSelect, el, optNum)
//         //이벤트
//         styleSelect.addEventListener('click', (e) => toggleDropDown(e, styleSelect, list));
//         list.addEventListener('click', e => listToggleMenu(e, styleSelect, el))
//     }
//     //wrapper 생성
//     function creativeWrapper(el) {
//         const wrapper = document.createElement('div');
//         wrapper.className = 'select';//wrapper에 class생성
//         el.parentElement.insertBefore(wrapper, el);
//         wrapper.appendChild(el);
//         return wrapper
//     }

//     // styleSelect 생성
//     function selectMenu(el) {
//         const styleSelect = document.createElement('div');
//         styleSelect.className = 'selectStyle';
//         styleSelect.textContent = el.children[0].textContent
//         //첫번째 옵션의 텍스트를 전달해서select-style 의 내용으로 설정
//         el.after(styleSelect)
//         return styleSelect
//     }

//     //list생성
//     function creatList(styleSelect, el, optNum) {
//         const list = document.createElement('ul');
//         list.className = 'selectOpt';
//         styleSelect.after(list);

//         for (let i = 0; i < optNum; i++) {
//             let listItem = document.createElement('li');
//             listItem.innerHTML =`<span>${el.children[i].textContent}</span>` ;//select안에 option의 텍스트 가져오기
//             listItem.setAttribute('data-target', el.children[i].value);
//             list.appendChild(listItem);
//         }
//         return list

//     }
//     //dropdown

//     function toggleDropDown(e, styleSelect, list) {

//         list.style.display = list.style.display === 'block' ? 'none' : 'block';
//     }

//     function listToggleMenu(e, styleSelect, el) {
//         const target = e.target;
//         if (target.tagName.toLowerCase() === 'li') {
//             //타겟의 이름을 소문자로 변환
//             selectOpt(target, styleSelect, el)
//             contentTab(target)
//             initSwiper(target)
//         }
//     }
//     //li 선택 이벤트
//     function selectOpt(target, styleSelect, el) {
//         styleSelect.textContent = target.textContent;
//         el.value = target.getAttribute('data-target');
//         const list = document.querySelectorAll('.select-opt > li');
//         list.forEach(el => {
//             el.classList.remove('on')
//         })
//         target.classList.add('on');
//         target.parentElement.style.display = 'none';
//         console.log(el.value);
//     }
//     //li에 탭메뉴 활성
//     function contentTab(target) {
//         const activeTab = target.getAttribute('data-target');
//         const tabItem = document.querySelectorAll('.model-list-wrapper');
//         tabItem.forEach(el => {
//             el.style.display = el.classList.contains(activeTab) ? 'block' : 'none'
//         })
//         //탭메뉴로 메뉴를 새로 선택할때마다 스와이퍼를 초기화해서 실행

//         // initSwiper(activeTab)
//     }
//     function initSwiper(activeTab) {
//         const activeItemClass = activeTab.getAttribute('data-target');
//         const tabItem = document.querySelector(`.model-list-wrapper.${activeItemClass}`);
//         console.log(tabItem)
//         if (tabItem) {
//             const swiperContainer = tabItem.querySelector('.swiper-container');
//             if (!swiperContainer.classList.contains('swiper-initialized')) {
//                 new Swiper(swiperContainer, {
//                     slidesPerView: 1,
//                     initialSlide: 0,//시작 슬라이드 지정
//                     pagination: {
//                         el: '.swiper-pagination',
//                         clickable: true,
//                     },
//                     breakpoints: {
//                         768: {
//                             slidesPerView: 3,
//                             spaceBetween: 40,
//                         }
//                     },

//                 })

//             }
//         }
//     }




// }

  



