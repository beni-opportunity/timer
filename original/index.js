let timerInterval;
let totalSeconds = false;
let timerState = 'ready';

// Buttons
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

// Input Felder
const dayInput = document.getElementById('days');
const hourInput = document.getElementById('hours');
const minuteInput = document.getElementById('minutes');
const secondInput = document.getElementById('seconds');

// Timer Element
const timer = document.getElementById('countdown');



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
    clearInterval(timerInterval);
    

    // First Start?
    if(!totalSeconds){
        const days = parseInt(dayInput.value, 10);
        const hours = parseInt(hourInput.value, 10);
        const minutes = parseInt(minuteInput.value, 10);
        const seconds = parseInt(secondInput.value, 10);
        totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
        resetInputFields();
    }

    // Validation
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert('Bitte gib einen validen Input ein');
        return;
    }

    timerState = 'running';
    startButton.innerText = 'Timer pausieren';

    updateTimer();

    timerInterval = setInterval(updateTimer, 1000);
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

    timer.innerText = `${String(d).padStart(2, '0')}:${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}


function resetInputFields(){
    dayInput.value = 0;
    hourInput.value = 0;
    minuteInput.value = 0;
    secondInput.value = 0;
}


function endTimer(reset = false){
    clearInterval(timerInterval);
    timer.innerText = '00:00:00:00';
    timerState = 'ready';
    totalSeconds = 0;
    startButton.innerText = 'Timer starten';
    reset ? alert('Timer wurde zurückgesetzt') : alert('Timer ist abgelaufen');
}




