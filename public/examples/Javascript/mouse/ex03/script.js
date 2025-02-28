window.onload = ()=>{
    menu();
}

function menu(){
    const header = document.querySelector('.header');
    const mainMenu = document.querySelectorAll('.main-menu > li > a');
    const subMenu = document.querySelectorAll('.sub-menu');
    const subMenuLinks = document.querySelectorAll('.sub-menu a');
    const lastSubMenuItems = [...subMenu].map(menu => menu.lastElementChild.querySelector('a')); // 각 하위 메뉴의 마지막 항목
    console.log(lastSubMenuItems)
    const headerH = header.offsetHeight;
    console.log(headerH)

    mainMenu.forEach((el)=>{
        el.addEventListener('mouseenter', onMenu);
        el.addEventListener('focus', onMenu)
    })
    header.addEventListener('mouseleave', offMenu)

    // mainMenu.forEach((el) => {
    //     // 포커스 아웃 이벤트를 감지하고 처리
    //     el.addEventListener('focusout', function(event) {
    //         // 포커스가 메뉴 내부에서 다른 항목으로 이동하는지 확인
    //         const isFocusWithin = header.contains(event.relatedTarget);
    //         console.log(isFocusWithin)
    //         if (!isFocusWithin) {
    //             console.log(isFocusWithin)
    //             // 포커스가 메뉴 밖으로 이동하면 헤더의 높이를 초기 상태로 복원
    //             header.style.height = `${headerH}px`;
    //             header.classList.remove('on')
    //             // 모든 하위 메뉴의 'on' 클래스를 제거하여 비활성화
    //             subMenu.forEach((menu) => {
    //                 menu.classList.remove('on');
    //             });
    //         }
    //     });
    // });

    lastSubMenuItems.forEach(item => {
        console.log(lastSubMenuItems)
        if (item) {
            item.addEventListener('focusout', (event) => {
                const isFocusLeavingMenu = !header.contains(event.relatedTarget);
                if (isFocusLeavingMenu) {
                    // header.style.height = `${headerH}px`;
                    // header.classList.remove('on');
                    // subMenu.forEach(menu => {
                    //     menu.classList.remove('on');
                    // });
                    offMenu()
                }
            });
        }
    });

    

    subMenuLinks.forEach(link => {
        link.addEventListener('focus', function() {
            // 이전에 포커스된 모든 <a> 태그에서 'on' 클래스 제거
            subMenuLinks.forEach(subLink => {
                subLink.classList.remove('on');
            });
            // 현재 포커스된 <a> 태그에 'on' 클래스 추가
            this.classList.add('on');
        });

        link.addEventListener('blur', function() {
            // 포커스가 벗어났을 때 'on' 클래스 제거
            this.classList.remove('on');
        });
    });


    function onMenu(){
        //console.log(this)
        //const nextSibling = this.nextElementSibling;
        //모든 구조에 sub-menu가 있는 경우라면 nextElementSibling;가 더 안정적이나 
        //복잡한 구조 ex(sub-menu가 없는 경우)에는 closest을 사용하는 것이 더 안정적
        //console.log(nextSibling);
        subMenu.forEach((el)=>{
            el.classList.remove('on');
        })
        const parentLi = this.closest('li');
        header.classList.add('on')
        
        // 찾은 LI 요소 내에서 하위 메뉴(.sub-menu)를 찾습니다.
        const subMenuItem = parentLi.querySelector('.sub-menu');
        if(subMenuItem){
            subMenuItem.classList.add('on')
            const subMenuItems = subMenuItem.querySelectorAll('li');
            const subMenuSize = subMenuItems.length;
            
            if(subMenuSize > 0){
                const subMenuH = subMenuItems[0].offsetHeight;
                const gnbH = subMenuSize * subMenuH;
                header.style.height = `${headerH + gnbH}px`;
            }
        }else{
            // header.style.height = `${headerH}px`;
            offMenu()
        }
    }

    function offMenu(){
        subMenu.forEach((el)=>{
            el.classList.remove('on');
        })
        header.style.height = `${headerH}px`;
        header.classList.remove('on');
    }
}