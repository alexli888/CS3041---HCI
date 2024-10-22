$(document).ready(function () {
    let timerInterval;
    let totalTime;
    const $timerDisplay = $('#timer-display');
    const $startButton = $('#start-timer');
    const $stopButton = $('#stop-timer');
    const alarmSound = document.getElementById('alarm-sound');

    $startButton.on('click', function () {
        const hours = parseInt($('#study-hours').val()) || 0;
        const minutes = parseInt($('#study-minutes').val()) || 0;
        const seconds = parseInt($('#study-seconds').val()) || 0;

        // Calculate total time in seconds
        totalTime = (hours * 3600) + (minutes * 60) + seconds;

        if (totalTime > 0) {
            startCountdown();
            $stopButton.removeClass('hidden');  // Show stop/reset button
        } else {
            $timerDisplay.text("Please set a time.");
        }
    });

    $stopButton.on('click', function () {
        clearInterval(timerInterval);  // Stop the countdown
        alarmSound.pause();  // Stop the sound
        alarmSound.currentTime = 0;  // Reset sound to the beginning
        resetTimerDisplay();
        $stopButton.addClass('hidden');  // Hide stop/reset button
    });

    function startCountdown() {
        clearInterval(timerInterval);  // Clear any existing interval
        timerInterval = setInterval(() => {
            if (totalTime > 0) {
                const display = formatTime(totalTime);
                $timerDisplay.text(display);
                totalTime--;
            } else {
                clearInterval(timerInterval);
                $timerDisplay.text("Time's up!");
                alarmSound.play();  // Play the sound when time is up
            }
        }, 1000);
    }

    function resetTimerDisplay() {
        $timerDisplay.text("00:00:00");
        $('#study-hours').val('');
        $('#study-minutes').val('');
        $('#study-seconds').val('');
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
});
