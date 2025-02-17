$(document).ready(function(){

    var $progressBar;
    var $imgList;
    var $totalNum;
    var $scrollTop;
    var $documentHeight;
    var $windowHeight;
    

    
    init();
    inEvent();
    resizeWrap();
    function init(){
        $progressBar = $('.progressBar');
        $imgList = $('.parallax_image');
        $totalNum = $imgList.size();
        $scrollTop = 0;
        //$currentY = 0;
        console.log($totalNum)
        
        

    }

    function inEvent(){
        $(window).on('scroll', onScroll);
        $(window).on('resize', resizeWrap)
    }

    function onScroll(){
        $scrollTop = $(window).scrollTop();
        var $percent = Math.ceil($scrollTop / ($documentHeight - $windowHeight)*100);
        //console.log($percent)
        $progressBar.css({'width':$percent + '%'})
        //console.log($scrollTop)

        $imgList.each(function(index){
            
            $imgList.eq(index).css({'transform':'perspective(400px) translateZ('+$scrollTop/($totalNum*($totalNum-index)) +'px'});
            console.log($imgList)
        })
        

        
        
    }

    function resizeWrap(){
        $documentHeight = $(document).outerHeight();
        $windowHeight = $(window).outerHeight();
        console.log($documentHeight);
        console.log($windowHeight);
        
    }

    


})