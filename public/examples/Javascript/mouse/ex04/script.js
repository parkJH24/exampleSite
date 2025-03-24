

$(document).ready(function () {
    const panels = document.querySelectorAll(".workList > li");

    panels.forEach(panel => {
        panel.addEventListener("click", toggleOpen);
    });

    function toggleOpen() {
        if ([...this.classList].indexOf("on") >= 0) {
            this.classList.remove("on");
            return;
        }
        panels.forEach(panel => panel.classList.remove("on"));
        this.classList.toggle("on");
    }
})