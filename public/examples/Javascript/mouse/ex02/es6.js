document.addEventListener('DOMContentLoaded', () => {
    const clickEvent = () => {
      const img = document.createElement('div');
      img.id = 'click-img';
      document.body.addEventListener('click', onImgShow);
  
      function onImgShow(e) {
        const { pageX: positionX, pageY: positionY } = e;
        const randomNumber = Math.floor(Math.random() * 4) + 1;
        console.log(positionX);
        console.log(positionY);
        console.log(randomNumber);
  
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
        img.className = '';
        document.body.appendChild(img);
  
        img.classList.add('active', `bg0${randomNumber}`);
        img.style.top = `${positionY}px`;
        img.style.left = `${positionX}px`;
  
        clearTimeout(timer);
        timer = setTimeout(onImgOut, 1500);
      }
  
      function onImgOut() {
        clearTimeout(timer);
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
        img.className = '';
      }
    };
  
    clickEvent();
  });
  