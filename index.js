let timerInterval;
let totalSeconds = false;
let timerState = 'ready';

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');

const dayInput = document.getElementById('days');
const hourInput = document.getElementById('hours');
const minuteInput = document.getElementById('minutes');
const secondInput = document.getElementById('seconds');



startButton.addEventListener('click', function(){
    switch (timerState) {
        case 'ready':
        case 'paused':
            startTimer();
            break;
        case 'running':
            pauseTimer();
            break;
        default:
          alert('Ein Fehler ist aufgetreten');
    }
})


function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    

    if(!totalSeconds){
        const days = parseInt(dayInput.value, 10);
        const hours = parseInt(hourInput.value, 10);
        const minutes = parseInt(minuteInput.value, 10);
        const seconds = parseInt(secondInput.value, 10);
        totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
        resetInputFields();
    }

    
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert('Bitte gib einen validen Input ein');
        return;
    }

    timerState = 'running';
    startButton.innerText = 'Timer pausieren';

    updateTimer();

    timerInterval = setInterval(updateTimer, 1000);
}



function stopTimer(){
    clearInterval(timerInterval);
    totalSeconds = 0;
    timerState = 'ready';
    document.getElementById('countdown').innerText = '00:00:00:00';
    alert("Timer wurde zurückgesetzt");
}



function pauseTimer(){
    clearInterval(timerInterval);
    timerState = 'paused';
    startButton.innerText = 'Timer starten';
}



function updateTimer() {
        
    if (totalSeconds <= 0) {
        endTimer();
        return;
    }

    totalSeconds--;

    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    document.getElementById('countdown').innerText = `${String(d).padStart(2, '0')}:${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}



function resetInputFields(){
    dayInput.value = 0;
    hourInput.value = 0;
    minuteInput.value = 0;
    secondInput.value = 0;
}

function endTimer(){
    clearInterval(timerInterval);
    document.getElementById('countdown').innerText = '00:00:00:00';
    timerState = 'ready';
    startButton.innerText = 'Timer starten';
    alert('Timer ist abgelaufen');
}



