$(function () {
    setTimeout(() => {
        $(".alert").animate({
            transition : "3.3s",
            top : "-500px"
        })
    }, 2000);
    $("#zoom").elevateZoom();
    
});
var input = document.querySelector('.search_input')
var text_title = document.querySelectorAll('.text_title');
var big_div = document.querySelectorAll('.big_div');
input.addEventListener("input", function () {
    for (var i = 0; i < text_title.length; i++) {
        var links = text_title[i].innerHTML.toUpperCase()
        var input = this.value.toUpperCase();
        if (links.indexOf(input)) {
            big_div[i].classList.add("hide");
        } else {
            big_div[i].classList.remove("hide");
        }
    }
});