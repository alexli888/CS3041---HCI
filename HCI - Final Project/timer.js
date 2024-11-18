let timerInterval;

function updateTimerDisplay(hours, minutes, seconds) {
    const display = document.getElementById("timer-display");
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById("start-timer").addEventListener("click", function () {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            return;
        }
        totalSeconds--;
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        updateTimerDisplay(hrs, mins, secs);
    }, 1000);
});

document.getElementById("stop-timer").addEventListener("click", function () {
    clearInterval(timerInterval);
});

document.getElementById("reset-timer").addEventListener("click", function () {
    clearInterval(timerInterval);
    updateTimerDisplay(0, 0, 0);
});
