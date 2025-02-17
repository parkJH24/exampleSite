document.addEventListener("DOMContentLoaded", function() {

    var progressBar;
    var imgList;
    var totalNum;
    var scrollTop;
    var documentHeight;
    var windowHeight;
  
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
      var percent = Math.ceil(scrollTop / (documentHeight - windowHeight) * 100);
      progressBar.style.width = percent + '%';
  
      Array.from(imgList).forEach(function(img, index) {
        var translateZ = scrollTop / (totalNum * (totalNum - index));
        img.style.transform = 'perspective(400px) translateZ(' + translateZ + 'px)';
      });
    }
  
    function resizeWrap() {
      documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
  
  });
  