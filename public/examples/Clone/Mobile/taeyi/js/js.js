

window.onload = () => {
    introPage();
    generateCalendar()
    // 특정 연도와 월을 지정하여 달력 생성
    const year = 2025;
    const month = 4; // 3월로 설정
    const dday = 12;
    generateCalendar(year, month, dday);
    


}

function introPage() {
    gsap.registerPlugin();

    const tl = gsap.timeline();

    tl.fromTo(".intro-bg svg path",
        { strokeDashoffset: 1517 },
        { strokeDashoffset: 0, duration: 3, ease: "power2.inOut" }
    )
        .to(".intro-bg svg", {
            y: 100,
            scale: 1.2,
            duration: 1.2,
            ease: "power2.out"
        })
        .to(".intro-bg", {
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "power2.out",
            onComplete: () => document.querySelector('.intro-bg').remove() // 애니메이션 완료 후 제거
        });
}

function generateCalendar(year, month,dday) { // ✅ year, month를 매개변수로 받음
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const firstWeekday = firstDay.getDay(); // 해당 월의 첫 번째 요일 (0: 일요일, 1: 월요일 ...)
    const totalDays = lastDay.getDate(); // 해당 월의 총 날짜 수

    // document.getElementById("calendarTitle").innerText = `${year}년 ${month}월`;

    const tbody = document.querySelector("#calendarTable tbody");
    tbody.innerHTML = ""; // 기존 달력 초기화

    let row = document.createElement("tr");

    // 첫 주 공백 채우기
    for (let i = 0; i < firstWeekday; i++) {
        row.appendChild(document.createElement("td"));
    }

    // 날짜 추가
    for (let day = 1; day <= totalDays; day++) {
        let cell = document.createElement("td");
        cell.innerText = day;

        // ✅ 특정 날짜 (highlightDay)에 포인트 효과 추가
        if (day === dday) {
            cell.classList.add("highlight-day"); 
        }

        row.appendChild(cell);

        if ((firstWeekday + day) % 7 === 0 || day === totalDays) {
            tbody.appendChild(row);
            row = document.createElement("tr");
        }
    }
}