$(function() {
    $(".toggle").on("click", function() {
        if ($(".item").hasClass("active")) {
            $(".item").removeClass("active");
        } else {
            $(".item").addClass("active");
        }
    });
});

// lupa

// function lupa(){
//     let lupa = document.getElementById('lupa').style.display;
//     let lupaEscondida = "none";

// }
// console.log()