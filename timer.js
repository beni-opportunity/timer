
let totalSeconds = 0;

const circles = document.querySelectorAll('.circle');

const dayInput = document.getElementById('day');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const secondInput = document.getElementById('second');

const timeMap = {
    days: 86400,
    hours: 3600,
    minutes: 60,
    seconds: 1,
}

function startTimer(){

    const days = parseInt(dayInput.value, 10);
    const hours = parseInt(hourInput.value, 10);
    const minutes = parseInt(minuteInput.value, 10);
    const seconds = parseInt(secondInput.value, 10);
    totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

    circles.forEach((circle) => {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        animateCircle(circle, circumference);
    });

}


function animateCircle(circle, circumference) {
    let offset = circumference;

    const previousKey = getPreviousKey(timeMap, circle.dataset.type);
    const operation = previousKey ? Math.floor((totalSeconds % timeMap[previousKey]) / timeMap[circle.dataset.type]) : Math.floor((totalSeconds / timeMap[circle.dataset.type]));
    const duration = !isNaN(operation) ? operation * timeMap[circle.dataset.type] * 1000 : 0;
    const startTime = performance.now();

    function update() {
        const elapsedTime = performance.now() - startTime;
        const progress = elapsedTime / duration;
        
        totalSeconds--;
        console.log(totalSeconds);
        
        offset = circumference * (1 - progress);
        circle.style.strokeDashoffset = offset;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            circle.style.strokeDashoffset = 0;
        }
    }

    requestAnimationFrame(update);
}



function getPreviousKey(obj, currentKey) {
    const keys = Object.keys(obj);
    const currentIndex = keys.indexOf(currentKey);
    
    if (currentIndex <= 0) {
        return null;
    }
    
    return keys[currentIndex - 1];
}

