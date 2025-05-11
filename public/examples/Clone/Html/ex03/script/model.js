import { allModels } from './loader.js';
export function model() {
    const modelCategory = document.querySelectorAll('.category select');
    
    init(); // 초기 실행
    resizeMenu();
    window.addEventListener('resize', resizeMenu);

    function init() {
        modelCategory.forEach(el => {
            creativeCategory(el);
        });
        initMenu();
    }

    function resizeMenu() {
        const category = document.querySelector('.category');
        if (window.innerWidth <= 768) {
            category.classList.add('mobile');
        } else {
            category.classList.remove('mobile');
        }
    }

    function initMenu() {
        const firstOpt = document.querySelector('.selectOpt li:first-of-type');
        if (firstOpt) {
            const styleSelect = firstOpt.closest('.select').querySelector('.selectStyle');
            const selct = styleSelect.previousElementSibling;
            listToggleMenu({ target: firstOpt }, styleSelect, selct)
        }
    }

    function creativeCategory(el) {
        const optNum = el.children.length;
        el.classList.add('selectHide');
        creativeWrapper(el);
        const styleSelect = selectMenu(el);
        const list = creatList(styleSelect, el, optNum);

        styleSelect.addEventListener('click', (e) => toggleDropDown(e, styleSelect, list));
        list.addEventListener('click', (e) => listToggleMenu(e, styleSelect, el));
    }

    function creativeWrapper(el) {
        const wrapper = document.createElement('div');
        wrapper.className = 'select';
        el.parentElement.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        return wrapper;
    }

    function selectMenu(el) {
        const styleSelect = document.createElement('div');
        styleSelect.className = 'selectStyle';
        styleSelect.textContent = el.children[0].textContent;
        el.after(styleSelect);
        return styleSelect;
    }

    function creatList(styleSelect, el, optNum) {
        const list = document.createElement('ul');
        list.className = 'selectOpt';
        styleSelect.after(list);
        for (let i = 0; i < optNum; i++) {
            let listItem = document.createElement('li');
            listItem.innerHTML = `<span>${el.children[i].textContent}</span>`;
            listItem.setAttribute('data-target', el.children[i].value);
            list.appendChild(listItem);
        }
        return list;
    }

    function toggleDropDown(e, styleSelect, list) {
        list.style.display = list.style.display === 'block' ? 'none' : 'block';
    }

    function listToggleMenu(e, styleSelect, el) {
        const target = e.target.closest('li');
        if (!target) return;
        selectOpt(target, styleSelect, el);
        contentTab(target);
        // initSwiper(target.getAttribute('data-target'));
    }

    function selectOpt(target, styleSelect, el) {
        styleSelect.textContent = target.textContent;
        el.value = target.getAttribute('data-target');
        const list = document.querySelectorAll('.selectOpt > li');
        list.forEach(el => el.classList.remove('on'));
        target.classList.add('on');
        target.parentElement.style.display = 'none';
    }

    function contentTab(target) {
        const activeTab = target.getAttribute('data-target');
        renderModelList(activeTab); // ✅ 여기서 데이터 렌더링 함수 호출
    }

    
}
function renderModelList(category) {
    const container = document.querySelector('.model-list-wrapper');
    const dotContainer = document.querySelector('.model-dot-wrapper'); // 👈 여기!
    
    container.innerHTML = ""; // 초기화
    dotContainer.innerHTML = "";

    

    const filtered = allModels.filter(model => model.categories.includes(category));

    if (filtered.length === 0) {
        container.innerHTML = "<p>해당 카테고리에 모델이 없습니다.</p>";
        return;
    }

    // Swiper 구조 만들기
    const swiperContainer = document.createElement('div');
    swiperContainer.className = 'swiper-container';

    const swiperWrapper = document.createElement('div');
    swiperWrapper.className = 'swiper-wrapper';

    filtered.forEach(model => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="modelCard">
                <div class="modelText">
                    <strong>${model.title}</strong>
                </div>
                <img src="${model.image}" alt="${model.alt}" />
                
                <a href="#" class="dic-btn">자세히 보기</a>
            </div>

            
        </div>
        `;
        swiperWrapper.appendChild(slide);
    });

    swiperContainer.appendChild(swiperWrapper);

    // pagination 추가
    const pagination = document.createElement('div');
    pagination.className = 'swiper-pagination';
    dotContainer.appendChild(pagination);

    container.appendChild(swiperContainer);

    // Swiper 초기화
    new Swiper(swiperContainer, {
        slidesPerView: 1,
        initialSlide: 0,
        pagination: {
            el: pagination,
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            }
        }
    });
}