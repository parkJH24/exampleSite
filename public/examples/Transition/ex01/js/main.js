const btn = document.querySelector(".list");
const btns = btn.querySelectorAll("li");
const title = document.querySelector(".title");
const titles = title.querySelectorAll("li");
const pic = document.querySelector(".pic");
const pics = pic.querySelectorAll("li");

window.addEventListener("mousemove", e => {
    const img = document.querySelector(".pic li.on img");
    const deco2 = document.querySelector(".deco2 img");
    const deco3 = document.querySelector(".deco3 img");   
    
    moveImg(img, e, 30, true);
    moveImg(deco2, e, 40, false);
    moveImg(deco3, e, 15, false);
})

btns.forEach((el, index)=>{
    el.addEventListener("click", e => {
        e.preventDefault();
        // activation(btns, index);   
        // activation(pics, index);   
        // activation(titles, index);  
    })
});

function moveImg(el, evt, gravity, reverse){
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

function activation(list, index){
    for(let el of list){
        el.classList.remove("on");
    }
    list[index].classList.add("on");
}

/*
for(let item of picItem){
                item.classList.remove("on");
            }
            picItem[index].classList.add("on");

*/ 


