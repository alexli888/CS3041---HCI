$(document).ready(function() {
    let timerInterval;
    let totalTime;

    $('#start-timer').on('click', function() {
        const hours = parseInt($('#study-hours').val()) || 0;
        const minutes = parseInt($('#study-minutes').val()) || 0;
        const seconds = parseInt($('#study-seconds').val()) || 0;

        // Calculate total time in seconds
        totalTime = (hours * 3600) + (minutes * 60) + seconds;

        if (totalTime > 0) {
            startCountdown();
        } else {
            $('#timer-display').text("Please set a time :(");
        }
    });

    $('#stop-timer').on('click', function() {
        clearInterval(timerInterval);
        $('#timer-display').text("00:00:00");
        $('#study-hours').val('');
        $('#study-minutes').val('');
        $('#study-seconds').val('');
    });

    function startCountdown() {
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            if (totalTime >= 0) {
                const display = formatTime(totalTime);
                $('#timer-display').text(display);
                totalTime--;
            } else {
                clearInterval(timerInterval);
                $('#timer-display').text("Time's up!");
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
});
