document.addEventListener("DOMContentLoaded", function() {

    let progressBar;
    let imgList;
    let totalNum;
    let scrollTop;
    let documentHeight;
    let windowHeight;
  
    init();
    inEvent();
    resizeWrap();
  
    function init() {
      progressBar = document.querySelector('.progressBar');
      imgList = document.querySelectorAll('.parallax_image');
      totalNum = imgList.length;
      scrollTop = 0;
    }
  
    function inEvent() {
      window.addEventListener('scroll', onScroll);
      window.addEventListener('resize', resizeWrap);
    }
  
    function onScroll() {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const percent = Math.ceil(scrollTop / (documentHeight - windowHeight) * 100);
      progressBar.style.width = percent + '%';
  
      imgList.forEach(function(img, index) {
        const translateZ = scrollTop / (totalNum * (totalNum - index));
        img.style.transform = `perspective(400px) translateZ(${translateZ}px)`;
      });
    }
  
    function resizeWrap() {
      documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
  
  });
  