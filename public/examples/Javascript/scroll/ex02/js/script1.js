(() => {
    let yOffset = 0;//window.pageYoffset 대입 변수
    let prevScrollHeight = 0; //현재 스크롤 위치보다 이전 스크롤 섹션의 스크롤값\
    let currentSection = 0; //현재 활성화 된 섹션
    let newSection = false //새로운 섹션이 시작됨을 알려줌
    let acc = 0.3;
    let delayYOffset = 0;
    let rafId;
    let rafState;
    const video = document.querySelector('#scroll-section-1 video');
    const video2 = document.querySelector('#scroll-section-3 video');
    const video5 = document.querySelector('#scroll-section-5 video')

    const sectionInfo = [
        {
            type: 'sticky', // 화면에 보여질 방식
            heightNum: 3,//해당 섹션의 높이를 브라우저의 높이의 5배로 설정
            //이미지를 스크롤하기 위해서 여유 스크롤 영역을 만들기 위한 값
            scrollHeight: 0,//섹션의 실제 스크롤 높이(이벤트가 들어오면 계산)
            objs: {
                container: document.querySelector('#scroll-section-0'),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                title: document.querySelector('.section-0-title'),
                title_text: document.querySelector('.section-0-title .title'),
                text: document.querySelector('.section-0-text'),
                videoImages: [] //이미지를 저장할 배열
            },
            values: {
                videoImageCount: 64,//사용될 이미지의 갯수
                imgSequence: [0, 64],//이미지 시퀀스(첫프레임과 끝 프레임)
                canvas_opacity: [1, 0, { start: 0.0, end: 0.5 }],//캔버스의 투명도 조절
                //1,0은 불투명도를 나타내며, start 0.9와 end : 1은 스크롤 비율을 나타낸다.
                //스크롤 전체의 90%가 되면 투명해지기 시작하고 스크롤이 100%가 되면 완전 투명
                title_opacity_default: [0, 1, { start: 0.0, end: 0. }],
                title_scale_default: [1, 1.3, { start: 0, end: 0.5 }],
                title_opacity: [1, 0, { start: 0.1, end: 0.55 }],
                title_scale: [1, 1.3, { start: 0.1, end: 0.65 }],



                text_opacity_in: [0, 1, { start: 0.7, end: 0.9 }],
                text_scale_in: [0.8, 1, { start: 0.7, end: 0.9 }],

                text_opacity_out: [1, 0, { start: 0.91, end: 0.95 }],
                // text_scale_out: [1, 0.8,{start : 0.8, end : 0.95}],

            }
        },
        {
            type: 'sticky', // 화면에 보여질 방식
            heightNum: 1.5,//해당 섹션의 높이를 브라우저의 높이의 5배로 설정
            //이미지를 스크롤하기 위해서 여유 스크롤 영역을 만들기 위한 값
            scrollHeight: 0,//섹션의 실제 스크롤 높이(이벤트가 들어오면 계산)
            objs: {
                container: document.querySelector('.scroll-1-text'),
                video: document.querySelector('#scroll-section-1 video'),
                words: [],
            },
            values: {
                video_opaty_in: [0, 1, { start: 0.1, end: 0.25 }],
                opaicty_in: [0.5, 1, { start: 0, end: 1 }],

                video_opaty_out: [1, 0, { start: 0.7, end: 1 }],
            }
        },
        {
            // 1
            type: 'text',
            heightNum: 0, // type normal에서는 필요 없음
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
                content: document.querySelector('#scroll-section-2 .section-2-text'),
                // videoImages: [] //이미지를 저장할 배열
            },

        },
        {
            type: 'sticky',
            heightNum: 4, // type normal에서는 필요 없음
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                content: document.querySelector('#scroll-section-3 .content'),
                canvas: document.querySelector('#video-canvas-1'),
                context: document.querySelector('#video-canvas-1').getContext('2d'),
                text1: document.querySelector('#scroll-section-3 .text-1'),
                text2: document.querySelector('#scroll-section-3 .text-2'),
                text3: document.querySelector('#scroll-section-3 .text-3'),
                video2: document.querySelector('#scroll-section-3 video'),

                videoImages: [] //이미지를 저장할 배열
            },
            values: {
                videoImageCount: 3,
                imgSequence: [0, 3],

                // 첫 번째 이미지 in/out
                canvas_opacity_in_1: [1, 1, { start: 0.3, end: 0.5 }],  // 첫 번째 이미지는 ratio 0.6까지 계속 보임
                canvas_scale_in_1: [1, 0.85, { start: 0.3, end: 0.45 }],
                canvas_opacity_out_1: [1, 0, { start: 0.45, end: 0.5 }],  // 첫 번째 이미지가 서서히 사라짐 (ratio 0.6부터)

                // 두 번째 이미지 in/out
                canvas_opacity_in_2: [0, 1, { start: 0.5, end: 0.75 }],  // 두 번째 이미지가 나타남 (ratio 0.65부터)
                canvas_scale_in_2: [1, 0.85, { start: 0.5, end: 0.75 }],

                // 세 번째 이미지 in/out
                canvas_opacity_in_3: [0, 1, { start: 0.75, end: 0.85 }],   // 세 번째 이미지가 나타남
                canvas_scale_in_3: [1, 0.85, { start: 0.75, end: 0.95 }],
                canvas_opacity_out_3: [1, 0, { start: 0.9, end: 1 }],  // 세 번째 이미지가 점차 사라짐

                // 텍스트
                text1_opacity_in: [0, 1, { start: 0.25, end: 0.4 }],  // 첫 번째 텍스트 등장
                text2_opacity_in: [0, 1, { start: 0.45, end: 0.55 }], // 두 번째 텍스트 등장
                text3_opacity_in: [0, 1, { start: 0.7, end: 0.85 }], // 세 번째 텍스트 등장

                text1_translateY_in: [500, 0, { start: 0.3, end: 0.5 }],
                text2_translateY_in: [500, 0, { start: 0.5, end: 0.7 }],
                text3_translateY_in: [500, 0, { start: 0.7, end: 0.9 }],

                text1_opacity_out: [1, 0, { start: 0.4, end: 0.6 }],
                text2_opacity_out: [1, 0, { start: 0.75, end: 0.8 }],
                text3_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

                video2_opaty_in: [0, 1, { start: 0.85, end: 0.9 }], // 비디오 등장
                video2_opaty_out: [1, 0, { start: 0.9, end: 1 }], // 비디오 등장
            }
        },
        {
            // 1
            type: 'text',
            heightNum: 0, // type normal에서는 필요 없음
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-4'),
                content: document.querySelector('#scroll-section-4 .content'),
                // videoImages: [] //이미지를 저장할 배열
            },

        },
        {
            type: 'sticky',
            heightNum: 4, // type normal에서는 필요 없음
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-5'),
                video5: document.querySelector('#scroll-section-5 video'),
            },
            values: {
                video_opaty_in: [0, 1, { start: 0.0, end: 0.1 }],
                video_opaty_out: [1, 0, { start: 0.7, end: 1 }],
            }
        }



    ]//sectioninfo
    function setWords() {
        const splitWords = sectionInfo[1].objs.container;
        const content = splitWords.innerText;
        const words = content.split(/\. /);
        splitWords.innerHTML = '';
        words.forEach((el, idx) => {
            const text = document.createElement('span');
            text.innerHTML = `${el.trim()}. `;
            text.classList.add('word');
            sectionInfo[1].objs.words.push(text);
            splitWords.appendChild(text);
        });
    }



    function setCanvasImage() {
        //캔버스에 보여줄 이미지를 로드하는 함수
        let imgItem;
        for (let i = 0; i < sectionInfo[0].values.videoImageCount; i++) {
            imgItem = new Image();
            imgItem.src = `./images/section01/00${i + 1}.png`;//이미지 경로 설정
            sectionInfo[0].objs.videoImages.push(imgItem)
            // console.log(imgItem.src)
            // console.log(imgItem)
        }

        // 섹션 2 이미지 로드
        for (let i = 0; i < sectionInfo[3].values.videoImageCount; i++) {
            imgItem = new Image();
            imgItem.src = `./images/section02/00${i + 1}.jpg`; // 섹션 2 이미지 경로
            sectionInfo[3].objs.videoImages.push(imgItem);
            console.log(imgItem)
        }



    }//setCanvasImage()

    function setLayOut() {

        // for (let i = 0; i < sectionInfo.length; i++) {
        //     if (sectionInfo[i].type === 'sticky' || sectionInfo[i].type === 'text') {
        //         sectionInfo[i].scrollHeight = (sectionInfo[i].heightNum * window.innerHeight)
        //     }
        //     sectionInfo[i].objs.container.style.height = `${sectionInfo[i].scrollHeight}px`
        //     // console.log(sectionInfo[i].scrollHeight)

        // }
        for (let i = 0; i < sectionInfo.length; i++) {
            if (sectionInfo[i].type === 'sticky') {
                sectionInfo[i].scrollHeight = sectionInfo[i].heightNum * window.innerHeight;
            } else if (sectionInfo[i].type === 'text' && sectionInfo[i].objs.content) {
                sectionInfo[i].scrollHeight = sectionInfo[i].objs.content.offsetHeight;
            }
            sectionInfo[i].objs.container.style.height = `${sectionInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;

        for (let i = 0; i < sectionInfo.length; i++) {
            totalScrollHeight += sectionInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentSection = i;
                break
            }
        }
        document.body.setAttribute('id', `show-section-${currentSection}`)



    }

    // function scrollLoop() {
    //     newSection = false;
    //     prevScrollHeight = 0;

    //     for (let i = 0; i < currentSection; i++) {
    //         prevScrollHeight += sectionInfo[i].scrollHeight;
    //     }

    //     const currentScrollHeight = sectionInfo[currentSection].scrollHeight;
    //     // const triggerPoint = window.innerHeight * 0.8; // 전환 트리거를 80%로 설정

    //     // 다음 섹션으로 전환
    //     if (yOffset > prevScrollHeight + currentScrollHeight) {
    //         if (currentSection < sectionInfo.length - 1) {
    //             newSection = true;
    //             currentSection++; // 다음 섹션으로 이동

    //         }
    //         document.body.setAttribute('id', `show-section-${currentSection}`);
    //     }

    //     // 이전 섹션으로 전환되는 조건 (스크롤이 위로 올라가는 경우)
    //     else if (yOffset < prevScrollHeight) {
    //         if (currentSection > 0) {
    //             newSection = true;
    //             currentSection--; // 이전 섹션으로 이동
    //             document.body.setAttribute('id', `show-section-${currentSection}`);
    //         } else {
    //             currentSection = 0;
    //         }
    //     }

    //     // currentSection이 변경된 후 prevScrollHeight를 재계산
    //     prevScrollHeight = 0;
    //     for (let i = 0; i < currentSection; i++) {
    //         prevScrollHeight += sectionInfo[i].scrollHeight;
    //     }


    //     if (newSection) return; // 새로운 섹션이 있을 때는 애니메이션을 실행하지 않음
    //     playAnimation(); // 애니메이션 실행
    // }
    function scrollLoop() {
        newSection = false;
        prevScrollHeight = 0;

        for (let i = 0; i < currentSection; i++) {
            prevScrollHeight += sectionInfo[i].scrollHeight;
        }

        const currentScrollHeight = sectionInfo[currentSection].scrollHeight;

        // 다음 섹션으로 전환
        if (yOffset > prevScrollHeight + currentScrollHeight) {
            if (currentSection < sectionInfo.length - 1) {
                newSection = true;
                currentSection++;
            }
            document.body.setAttribute('id', `show-section-${currentSection}`);
        }

        // 이전 섹션으로 전환
        else if (yOffset < prevScrollHeight) {
            if (currentSection > 0) {
                newSection = true;
                currentSection--;
            } else {
                currentSection = 0;
            }
            document.body.setAttribute('id', `show-section-${currentSection}`);
        }

        // currentSection이 변경된 후 prevScrollHeight를 재계산
        prevScrollHeight = 0;
        for (let i = 0; i < currentSection; i++) {
            prevScrollHeight += sectionInfo[i].scrollHeight;
        }

        if (newSection) return; // 새로운 섹션이 있을 때는 애니메이션을 실행하지 않음

        playAnimation(); // 현재 섹션에 애니메이션 적용
    }








    function loop() {
        //requestAnimationFrame을 사용해서 화면을 갱신할때마다 부드럽게 애니메이션 실행
        delayYOffset = delayYOffset + (yOffset - delayYOffset) * acc

        //새ㅑ로운 섹션에 진입되지 않았다면 애니메이션 효과 적용
        if (!newSection) {
            if (currentSection === 0) {
                const currentYOffset = delayYOffset - prevScrollHeight;
                const objs = sectionInfo[currentSection].objs//현재 섹션의 객체
                const values = sectionInfo[currentSection].values //현재 섹션의 효과값 찾기
                objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
                let sequence = Math.round(calcValue(values.imgSequence, currentYOffset));

                if (objs.videoImages[sequence]) {
                    objs.context.drawImage(objs.videoImages[sequence], 0, 0)
                }
            }

        }

        if (delayYOffset < 1) {
            scrollLoop();
            //스크롤 상태 업데이트 시 섹션 전환 처리
            // sectionInfo[0].objs.canvas.style.opacity = 1;
            // sectionInfo[0].objs.context.drawImage(sectionInfo[0].objs.videoImages[0], 0, 0);


        }
        rafId = requestAnimationFrame(loop);
        //스크롤 위치가 지연된 스크롤 위치와 차이가 없으면 애니메이션 중단
        if (Math.abs(yOffset - delayYOffset) < 1) {
            cancelAnimationFrame(rafId)
            rafState = false //애니메이션 실행중이지 않음 체크
        }

    }//loop
    function calcValue(val, currentY) {
        let resultValue; //최종적으로 반환할 계산된 값이 들어올 변수
        const scrollH = sectionInfo[currentSection].scrollHeight;//현재 섹션의 전체 스크롤 길이
        const scrollRatio = currentY / scrollH; //현재 섹션에서 스크롤된 비율
        // console.log(scrollRatio)

        //val의 배열 길이가 3이면 애니메이션의 시작과 끝 범위가 정의된 경우
        if (val.length === 3) {
            const scrollStart = val[2].start * scrollH; //애니메이션이 시작할 위치(스크롤의 높이 기준)
            const scrollEnd = val[2].end * scrollH; // 애니메이션이 끝나는 위치(스크롤 높이 기준)
            const scrollRealH = scrollEnd - scrollStart;//애니메이션이 진행되는 구간의 스크롤 높이

            //현재 스크롤의 위치가 애니메이션 진행 영역 내에 있는 경우
            if (currentY >= scrollStart && currentY <= scrollEnd) {
                resultValue = ((currentY - scrollStart) / scrollRealH) * (val[1] - val[0]) + val[0]
                //애니메이션의 진행 비율을 계산하고 값으로 반환
            } else if (currentY < scrollStart) {
                //스크ㅜ롤이 애니메이션 범위보다 위에 있으면 시작값으로 지정
                resultValue = val[0]
            } else if (currentY > scrollEnd) {
                //스크롤이 애니메이션 범위보다 아래 있을 경우 종료값으로 지정
                resultValue = val[1]
            }
        } else {
            //배열의 길이가 2일 경우 애니메이션 섹션 전체에서 발생
            //스크롤 비율에 따라 값을 계산
            resultValue = scrollRatio * (val[1] - val[0]) + val[0]
        }
        return resultValue
    }

    function playAnimation() {
        const objs = sectionInfo[currentSection].objs; //현재 섹션의 객체
        const values = sectionInfo[currentSection].values; //현재 섹션의 설정값
        let currentYOffset = yOffset - prevScrollHeight; // 섹션내에서 스크롤 위치
        const scrollH = sectionInfo[currentSection].scrollHeight; //현재 센셕의 스크롤 높이
        let scrollRatio = currentYOffset / scrollH; // 현재 섹션에서 스크롤된 비율(0~1)
        // 이전 섹션으로 넘어가는 경우, currentYOffset이 음수가 될 수 있으므로 0으로 고정
        if (currentYOffset < 0) {
            currentYOffset = 0;
            scrollRatio = 0;
        }

        // 섹션을 끝까지 스크롤한 경우, scrollRatio가 1을 초과하지 않도록 고정
        if (scrollRatio > 1) {
            scrollRatio = 1;
        }

        // 이전 섹션에서의 scrollRatio가 갑자기 0으로 내려가는 현상 해결
        if (yOffset > prevScrollHeight + scrollH) {
            scrollRatio = 1;  // 섹션 끝으로 고정
        } else if (yOffset < prevScrollHeight) {
            scrollRatio = 0;  // 섹션 시작으로 고정
        }

        switch (currentSection) {
            //섹션의 인덱스마다 다른 애니메이션이 적용되기 때문에 for문보다 switch 문으로 작성
            case 0:

                if (scrollRatio <= 0.6) {

                    objs.title.style.opacity = calcValue(values.title_opacity, currentYOffset);
                    objs.title.style.transform = `translate(-50%,-50%) scale(${calcValue(values.title_scale, currentYOffset)})`;
                }

                //text
                if (scrollRatio <= 0.9) {
                    objs.text.style.opacity = calcValue(values.text_opacity_in, currentYOffset);
                    objs.text.style.transform = `translate(-50%,-50%) scale(${calcValue(values.text_scale_in, currentYOffset)})`

                } else {
                    objs.text.style.opacity = calcValue(values.text_opacity_out, currentYOffset);
                }

                break

            case 1:
                if (scrollRatio <= 0.8) {
                    video.play()
                    objs.video.style.opacity = calcValue(values.video_opaty_in, currentYOffset);
                } else {
                    objs.video.style.opacity = calcValue(values.video_opaty_out, currentYOffset);
                }
                const triggerPoint = window.innerHeight / 1.5; // 뷰포트의 중간 지점

                let activeIndex = -1;

                objs.words.forEach((el, idx) => {
                    const rect = el.getBoundingClientRect();
                    const elementMiddle = rect.top + rect.height / 2;

                    if (elementMiddle < triggerPoint) {
                        activeIndex = idx;
                    }
                });

                objs.words.forEach((el, idx) => {
                    if (idx === activeIndex) {
                        el.style.opacity = 1;
                    } else {
                        el.style.opacity = 0.5;
                    }
                });
                console.log(scrollRatio)

                break;


            case 3:
                objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
                console.log(scrollRatio);

                objs.text1.style.opacity = 0;
                objs.text2.style.opacity = 0;
                objs.text3.style.opacity = 0;

                if (scrollRatio < 0.5) {
                    if (objs.videoImages[0]) {
                        objs.context.drawImage(objs.videoImages[0], 0, 0);
                    }
                    objs.canvas.style.opacity = calcValue(values.canvas_opacity_in_1, currentYOffset);
                    objs.canvas.style.transform = `translate(-50%,-50%) scale(${calcValue(values.canvas_scale_in_1, currentYOffset)})`;

                    // 텍스트 1 애니메이션 처리
                    if (scrollRatio > 0.4) {
                        objs.text1.style.opacity = calcValue(values.text1_opacity_in, currentYOffset);
                        objs.text1.style.transform = `translate3d(0, ${calcValue(values.text1_translateY_in, currentYOffset)}%, 0)`;
                    }
                    objs.content.style.position = 'sticky';
                } else if (scrollRatio >= 0.5 && scrollRatio < 0.75) {
                    if (objs.videoImages[1]) {
                        objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height); // 기존 이미지 지우기
                        objs.context.drawImage(objs.videoImages[1], 0, 0);
                        objs.canvas.style.opacity = calcValue(values.canvas_opacity_in_2, currentYOffset);
                        objs.canvas.style.transform = `translate(-50%,-50%) scale(${calcValue(values.canvas_scale_in_2, currentYOffset)})`;
                    }
                    // 텍스트 2 애니메이션 처리
                    if (scrollRatio > 0.55) {
                        objs.text2.style.opacity = calcValue(values.text2_opacity_in, currentYOffset);
                        objs.text2.style.transform = `translate3d(0, ${calcValue(values.text2_translateY_in, currentYOffset)}%, 0)`;
                    }
                } else if (scrollRatio >= 0.75 && scrollRatio <= 0.9) {
                    if (objs.videoImages[2]) {
                        objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height); // 기존 이미지 지우기
                        objs.context.drawImage(objs.videoImages[2], 0, 0);
                        objs.canvas.style.opacity = calcValue(values.canvas_opacity_in_3, currentYOffset);
                        objs.canvas.style.transform = `translate(-50%,-50%) scale(${calcValue(values.canvas_scale_in_3, currentYOffset)})`;
                    }
                    // 텍스트 3 애니메이션 처리
                    if (scrollRatio > 0.7 && scrollRatio <= 0.9) {
                        objs.text3.style.opacity = calcValue(values.text3_opacity_in, currentYOffset);
                        objs.text3.style.transform = `translate3d(0, ${calcValue(values.text3_translateY_in, currentYOffset)}%, 0)`;
                    } else if (scrollRatio > 0.9) {
                        objs.text3.style.opacity = calcValue(values.text3_opacity_out, currentYOffset);
                    }
                    video2.play();
                    objs.video2.style.opacity = calcValue(values.video2_opaty_in, currentYOffset);
                    objs.content.style.position = 'fixed';
                } else if (scrollRatio > 0.9) {
                    // 마지막 비디오 애니메이션 처리
                    objs.canvas.style.opacity = calcValue(values.canvas_opacity_out_3, currentYOffset);
                    objs.video2.style.opacity = calcValue(values.video2_opaty_out, currentYOffset);
                }
                break


                case 5:
    const video4 = objs.video5; // case 4's video
    let scrollTimeout; // Variable for the scroll timeout

    if (video4) {
        // Play the video when scrolling
        video4.play();
        
        // If a scrollTimeout exists, clear it to reset the delay
        clearTimeout(scrollTimeout);

        // Set a new timeout to pause the video when scrolling stops
        scrollTimeout = setTimeout(() => {
            video4.pause(); // Pause the video when scrolling stops
        }, 300); // 300ms delay after scroll stops (adjust as needed)

        // Control the video opacity based on scroll ratio
        if (scrollRatio >= 0.1) {
            video4.style.opacity = calcValue(values.video_opaty_in, currentYOffset);
        } else if (scrollRatio > 0.7) {
            video4.style.opacity = calcValue(values.video_opaty_out, currentYOffset);
        }
    } else {
        console.warn("Video4 is undefined - check the selector or load timing.");
    }
    break;

                

















        }
    }



    window.addEventListener('load', () => {
        setLayOut()

        video.pause()
        video2.pause()
        video5.pause()
        // const firstImage = sectionInfo[0].objs.videoImages[0];  // 첫 번째 이미지 선택
        // sectionInfo[0].objs.context.drawImage(firstImage, 0, 0);  // 첫 번째 이미지를 캔버스에 그리기

        sectionInfo[0].objs.context.drawImage(sectionInfo[0].objs.videoImages[0], 0, 0);
        document.querySelector('.fixed-el-canvas').classList.add('active');
        document.querySelector('.section-0-title').classList.add('active')



    })
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop()
        playAnimation()
        // observeWords();
        if (!rafState) {
            rafId = requestAnimationFrame(loop);
            rafState = true
        }
    })
    setCanvasImage()
    setWords()


})()