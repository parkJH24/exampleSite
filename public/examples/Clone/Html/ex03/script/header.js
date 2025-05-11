import { allModels } from './loader.js';

export function initHeaderUi(){
    gnb()
    observeModelListAndRender("all");
    setupTabFiltering()
    renderDropDownModel(); // 모델 생성 끝난 뒤에
    sitemap();

}

function gnb() {

    const mainMenu = document.querySelectorAll('.gnbList > li>a');//메인메뉴
    const subMenu = document.querySelectorAll('.subMenuWrapper');

    const tabMenu = document.querySelectorAll('.submenuLeft a');

    let currentOpenIndex = -1;
    //현재 열려있는 서브메뉴의 인덱스를 추적하기 위한 변수
    //-1은 아무것도 열려있지 않음을 의미

    mainMenu.forEach((menu, idx) => {

        menu.addEventListener('click', (e) => {

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
}

function renderModels(category = "all") {
    const container = document.querySelector('.modelList');
    console.log(container);
    if (!container) {
        console.warn('.modelList를 찾을 수 없습니다.');
        return;
    }

    container.innerHTML = "";

    const filterModels = allModels
        .filter(model => model && model.categories && model.categories.includes(category));

    console.log("allModels", allModels);
    console.log("필터된 모델:", filterModels);

    filterModels.forEach(model => {
        const li = document.createElement('li');

        const links = model.links.map(link => `
        <a href="${link.href}" class="link-text-btn">
          <span>${link.label}</span>
          ${link.icon ? "<i class='bx bx-chevron-right'></i>" : ""}
        </a>
      `).join("");

        li.innerHTML = `
        <div class="modelCard">
            <div class="modelText">
            <p>${model.description || ""}</p>
            <strong>${model.title}</strong>
            </div>
            <img src="${model.image}" alt="${model.alt}">
            <a href="#" class="dic-btn">자세히 보기</a>
            <div class="modelLink">
            ${links}
            </div>
        </div>
      `;

        container.appendChild(li);
    });
}
// 🔥 핵심 추가: modelList가 뜨는 걸 감시하는 함수
function observeModelListAndRender(category = "all") {
    const target = document.querySelector('.modelList');
    if (target) {
        renderModels(category);
        return;
    }

    const observer = new MutationObserver((mutations, obs) => {
        const modelList = document.querySelector('.modelList');
        if (modelList) {
            obs.disconnect();
            renderModels(category);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
function renderDropDownModel() {
    const container = document.querySelector('.dropdownContainer');
    if (!container) {
        console.warn('dropdownContainer를 찾을 수 없습니다.');
        return;
    }

    container.innerHTML = "";

    const categoryList = ["black", "sedan", "suv", "concept"];

    categoryList.forEach(cat => {
        const li = document.createElement('li');

        // 1. a 태그 생성
        const aTag = document.createElement('a');
        aTag.href = "#";
        aTag.dataset.behavior = "dropdown";
        aTag.innerHTML = `<span>${cat.toUpperCase()}</span><i class='bx bx-chevron-right'>`;

        li.appendChild(aTag);

        // 2. 해당 카테고리 모델 가져오기
        const filteredModels = allModels.filter(model =>
            model.categories.includes(cat)
        );

        // 3. 모델이 있으면 dropdownInner 생성
        if (filteredModels.length > 0) {
            const dropdownInner = document.createElement('div');
            dropdownInner.className = "dropdownInner";

            const dropdownList = document.createElement('ul');
            dropdownList.className = "dropdownList";

            filteredModels.forEach(model => {
                const modelLi = document.createElement('li');
                modelLi.innerHTML = `
                    <a href="#">
                        <div class="dropdownTitle">${model.title}</div>
                        <div class="dropdownImg">
                            <img src="${model.image}" alt="${model.alt}">
                        </div>
                    </a>
                `;
                dropdownList.appendChild(modelLi);
            });

            dropdownInner.appendChild(dropdownList);
            li.appendChild(dropdownInner);
        }

        container.appendChild(li);
    });
}


function setupTabFiltering() {
    const tabMenu = document.querySelectorAll('.subMenuLeft a');

    if (!tabMenu.length) {
        console.warn('탭 메뉴를 찾을 수 없습니다.');
        return;
    }

    tabMenu.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // 기존 on 클래스 제거
            tabMenu.forEach(item => item.classList.remove('on'));

            // 클릭된 탭에 on 클래스 추가
            tab.classList.add('on');

            // 클릭한 탭의 data-target 가져오기
            const category = tab.dataset.target;
            console.log("선택된 카테고리:", category);

            // 해당 카테고리에 맞춰 모델 다시 그리기
            renderModels(category);
        });
    });
}

function sitemap() {
    const btn = document.querySelector('.sitemapWrapper .btn');
    const pcSitemap = document.querySelector('.sitemapWrapperPc');
    const mobileSitemap = document.querySelector('.sitemapWrapperMobile');
    const depth1Menu = document.querySelectorAll('.depth1List > li > a');
    const depth2Menu = document.querySelectorAll('.depth2List > li > ul >li > a');
    const dropdownMenu = document.querySelectorAll('.dropdownContainer > li');   // dropdown용
    const depth2Container = document.querySelector('.depth2');
    const depth3Container = document.querySelector('.depth3');
    const backBtn = mobileSitemap.querySelectorAll('.backBtn');
    console.log(dropdownMenu)

    let isOpen = false;
    const mobileMediaQuery = window.matchMedia('(max-width : 1024px)') //브라우저 사이즈 감지
    console.log(mobileMediaQuery)

    function closeMenu() {
        const allDepth2Menu = depth2Container.querySelectorAll('.on');
        depth2Container.classList.remove('on')
        allDepth2Menu.forEach((menu) => {
            menu.classList.remove('on');
        })
        document.body.classList.remove('no-scroll');
        pcSitemap.classList.remove('on');
        mobileSitemap.classList.remove('on');
        btn.classList.remove('on');

        isOpen = false;//강제적으로 닫을때에는 변수값이 변경되지 않으므로 강제적으로 변경

    }
    mobileMediaQuery.addEventListener('change', mediaQueryChange);

    function mediaQueryChange() {
        if (isOpen) {
            closeMenu();
        }
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isMobile = mobileMediaQuery.matches;
        const tartgetSitemap = isMobile ? mobileSitemap : pcSitemap;
        const action = isOpen ? 'close' : 'open';
        toggleMenu(action, tartgetSitemap);
        // isOpen = !isOpen
    })

    function toggleMenu(action, sitemap) {
        btn.classList.toggle('on', action === 'open');
        sitemap.classList.toggle('on', action === 'open');
        document.body.classList.toggle('no-scroll', action === 'open');
        isOpen = (action === 'open')

        if (action === 'close') {
            const allDepth2Menu = depth2Container.querySelectorAll('.on');
            allDepth2Menu.forEach((menu) => {
                menu.classList.remove('on');
                depth2Container.classList.remove('on')

            })
        }
    }/*toggleMenu */
    // 2뎁스
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

    depth2Menu.forEach((depth2) => {

        depth2.addEventListener('click', function (e) {
            const behavior = this.getAttribute('data-behavior');
            const targetId = this.getAttribute('data-target'); // move 타입일 때 필요


            if (behavior === 'move') {

                e.preventDefault();
                console.log('Move 동작');
                openDepth3(targetId); // 3뎁스 열기 함수
            }
            else if (behavior === 'link') {
                console.log('Link 이동');
                // 아무것도 안 막으면 그대로 이동
            }
        })
    })
    // 드롭다운 메뉴
    dropdownMenu.forEach((dropdownItem) => {
        dropdownItem.addEventListener('click', function (e) {
          e.preventDefault();
          const dropdown = this.querySelector('.dropdownInner');
      
          if (!dropdown) return;
      
          const isOpen = dropdown.classList.contains('on');
      
          // 1. 다른 li들의 on, dropdownInner 초기화
          dropdownMenu.forEach(item => {
            if (item !== this) {
              item.classList.remove('on'); // li의 on 제거
              const otherDropdown = item.querySelector('.dropdownInner');
              if (otherDropdown) {
                otherDropdown.classList.remove('on');
                otherDropdown.style.height = '0px';
              }
            }
          });
      
          if (isOpen) {
            // 2. 현재 닫기
            dropdown.style.height = dropdown.scrollHeight + 'px';
            requestAnimationFrame(() => {
              dropdown.style.height = '0px';
            });
            dropdown.classList.remove('on');
            this.classList.remove('on'); // li의 on도 제거
            mobileSitemap.style.overflowY = 'hidden';
          } else {
            // 3. 현재 열기
            dropdown.style.height = '0px';
            dropdown.classList.add('on');
            this.classList.add('on'); // 클릭한 li에 on 추가
            requestAnimationFrame(() => {
              dropdown.style.height = dropdown.scrollHeight + 'px';
            });
            mobileSitemap.style.overflowY = 'auto';
          }
        });
      });
      
    function openDepth3(targetId) {
        const depth3Container = document.querySelector('.depth3');
        const allDepth3Items = document.querySelectorAll('.depth3List > li');
        const target = document.getElementById(targetId);

        if (!target) return;

        // 먼저 모든 depth3 li를 닫기
        allDepth3Items.forEach(item => item.classList.remove('on'));

        // 열 대상 열기
        target.classList.add('on');

        // depth3 컨테이너 열기
        depth3Container.classList.add('on');
    }

    backBtn.forEach((back) => {
        back.addEventListener('click', function () {
            const li = this.closest('li'); // 제일 가까운 li 찾기
            if (li) {
                li.classList.remove('on'); // li에 붙어있는 on 클래스 제거
            }

            const isDepth3 = this.closest('.depth3'); // 3뎁스 안에 있는지 체크

            if (isDepth3) {
                depth3Container.classList.remove('on'); // 3뎁스 컨테이너 닫기
            } else {
                depth2Container.classList.remove('on'); // 2뎁스 컨테이너 닫기
            }
        });
    });



}