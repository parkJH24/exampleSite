class Motion {
    constructor(opt){
        this.init(opt);
        this.bindingEvent();
    }

    init(opt){
        this.btn = document.querySelector(opt.btn);
        this.btns = this.btn.querySelectorAll("li");
        this.title = document.querySelector(opt.title);
        this.titles = this.title.querySelectorAll("li");
        this.pic = document.querySelector(opt.pic);
        this.pics = this.pic.querySelectorAll("li");
    }

    bindingEvent(){

        window.addEventListener("mousemove", e => {
            const img = document.querySelector(".pic li.on img");
            const deco2 = document.querySelector(".deco2 img");
            const deco3 = document.querySelector(".deco3 img");   
            
            this.moveImg(img, e, 30, true);
            this.moveImg(deco2, e, 40, false);
            this.moveImg(deco3, e, 15, false);
        })


        this.btns.forEach((el, index)=>{
            el.addEventListener("click", e => {
                e.preventDefault();                          
                this.activation(this.btns, index);   
                this.activation(this.pics, index);   
                this.activation(this.titles, index); 
            })
        });
    }

    moveImg(el, evt, gravity, reverse){
        let x,y;
        if(reverse){
            x = -evt.pageX;
            y = -evt.pageY;
        }else{
            x = evt.pageX;
            y = evt.pageY; 
        }    

        el.style.left = x/gravity+"px";
        el.style.top = y/gravity+"px";
    }

    activation(list, index){
        for(let el of list){
            el.classList.remove("on");
        }
        list[index].classList.add("on");
    }
}
