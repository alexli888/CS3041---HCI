document.addEventListener("DOMContentLoaded", function () {
    const studyInfo = document.getElementById("study-info");

    document.getElementById("focus-mode").addEventListener("click", function () {
        studyInfo.innerHTML = `
            <h3>Focus Mode</h3>
            <p>Focus Mode minimizes distractions by blocking notifications and enabling a timer for uninterrupted work.</p>
        `;
    });

    document.getElementById("interval-mode").addEventListener("click", function () {
        studyInfo.innerHTML = `
            <h3>Interval Mode</h3>
            <p>Interval Mode uses the Pomodoro technique: 25 minutes of focus followed by a 5-minute break.</p>
        `;
    });

    document.getElementById("custom-mode").addEventListener("click", function () {
        studyInfo.innerHTML = `
            <h3>Custom Mode</h3>
            <p>Customize your study session with flexible timers and personalized break reminders.</p>
        `;
    });
});
