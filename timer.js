const circle = document.querySelector('.circle');
let interval;


interval = setInterval(function(){

    if(circle.style.strokeDashoffset <= 0){
        circle.style.strokeDashoffset = circle.style.strokeDashoffset - 5;
    }

}, 1000);