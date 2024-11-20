document.addEventListener("DOMContentLoaded", function() {
    // Toggle menu visibility
    document.getElementById("menu-icon").addEventListener("click", function() {
        const menu = document.getElementById("dropdown-menu");
        menu.classList.toggle("show");
    });

    // Study Mode Buttons
    document.getElementById("focus-mode").addEventListener("click", function() {
        document.body.style.backgroundColor = "#34495e"; // Changed background color
        document.body.style.color = "#ecf0f1";
        document.getElementById("study-info").innerHTML = `
            <div class="focus-visual" style="text-align: center;">
                <span id="focus-timer" style="font-size: 4em; color: #e74c3c;">00:00:00</span>
                <div style="margin-top: 20px;">
                    <input type="number" id="focus-hours-input" placeholder="Hours" style="font-size: 1.5em; padding: 10px; margin: 0 5px; border-radius: 5px; border: 2px solid #ccc;">
                    <input type="number" id="focus-minutes-input" placeholder="Minutes" style="font-size: 1.5em; padding: 10px; margin: 0 5px; border-radius: 5px; border: 2px solid #ccc;">
                    <input type="number" id="focus-seconds-input" placeholder="Seconds" style="font-size: 1.5em; padding: 10px; margin: 0 5px; border-radius: 5px; border: 2px solid #ccc;">
                </div>
                <div style="margin-top: 20px;">
                    <button id="start-focus-timer" style="font-size: 1.5em; padding: 15px 30px; background-color: #27ae60; color: white; border: none; border-radius: 5px; transition: background-color 0.3s;">Start</button>
                    <button id="reset-focus-timer" style="font-size: 1.5em; padding: 15px 30px; background-color: #c0392b; color: white; border: none; border-radius: 5px; transition: background-color 0.3s;">Reset</button>
                </div>
                <p style="margin-top: 20px; color: black;">All notifications have been turned off, and you cannot access any other tabs. Now get to work!</p>
            </div>
            <div style="margin-top: 20px;">
                <button id="exit-focus-mode" style="font-size: 1.5em; padding: 15px 30px; background-color: #2980b9; color: white; border: none; border-radius: 5px; transition: background-color 0.3s;">Exit Mode</button>
            </div>
        `;
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
        lockBrowser();
        document.getElementById("exit-focus-mode").addEventListener("click", function() {
            unlockBrowser();
            document.exitFullscreen();
            document.getElementById("study-info").innerHTML = "";
        });
        startFocusTimer();
    });

    document.getElementById("interval-mode").addEventListener("click", function() {
        document.body.style.backgroundColor = "";
        document.body.style.color = "";
        document.getElementById("study-info").innerHTML = `
            <h3>Interval Mode (Pomodoro)</h3>
            <div class="pomodoro-timer">
                <span id="timer">25:00</span>
                <button id="start-timer">Start</button>
                <button id="reset-timer">Reset</button>
            </div>
            <div style="margin-top: 20px;">
                <button id="exit-interval-mode" style="font-size: 1.5em; padding: 15px 30px; background-color: #2980b9; color: white; border: none; border-radius: 5px; transition: background-color 0.3s;">Exit Mode</button>
            </div>
        `;
        lockBrowser();
        document.getElementById("exit-interval-mode").addEventListener("click", function() {
            unlockBrowser();
            document.exitFullscreen();
            document.getElementById("study-info").innerHTML = "";
        });
        startPomodoroTimer();
    });

    document.getElementById("custom-mode").addEventListener("click", function() {
        document.body.style.backgroundColor = "";
        document.body.style.color = "";
        document.getElementById("study-info").innerHTML = `
            <h3>Custom Mode</h3>
            <p>Customize your study session settings.</p>
            <!-- Add custom settings form or options here -->
            <div style="margin-top: 20px;">
                <button id="exit-custom-mode" style="font-size: 1.5em; padding: 15px 30px; background-color: #2980b9; color: white; border: none; border-radius: 5px; transition: background-color 0.3s;">Exit Mode</button>
            </div>
        `;
        lockBrowser();
        document.getElementById("exit-custom-mode").addEventListener("click", function() {
            unlockBrowser();
            document.exitFullscreen();
            document.getElementById("study-info").innerHTML = "";
        });
    });

    function startPomodoroTimer() {
        let timer;
        let timeLeft = 25 * 60; // 25 minutes in seconds

        document.getElementById("start-timer").addEventListener("click", function() {
            if (timer) clearInterval(timer);
            timer = setInterval(function() {
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    document.getElementById("timer").textContent = "Time's up!";
                } else {
                    timeLeft--;
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                }
            }, 1000);
        });

        document.getElementById("reset-timer").addEventListener("click", function() {
            clearInterval(timer);
            timeLeft = 25 * 60;
            document.getElementById("timer").textContent = "25:00";
        });
    }

    function startFocusTimer() {
        let timer;
        let timeLeft;

        document.getElementById("start-focus-timer").addEventListener("click", function() {
            const inputHours = parseInt(document.getElementById("focus-hours-input").value) || 0;
            const inputMinutes = parseInt(document.getElementById("focus-minutes-input").value) || 0;
            const inputSeconds = parseInt(document.getElementById("focus-seconds-input").value) || 0;
            timeLeft = (inputHours * 3600) + (inputMinutes * 60) + inputSeconds; // Convert to seconds
            if (timer) clearInterval(timer);
            timer = setInterval(function() {
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    document.getElementById("focus-timer").textContent = "Time's up!";
                } else {
                    timeLeft--;
                    const hours = Math.floor(timeLeft / 3600);
                    const minutes = Math.floor((timeLeft % 3600) / 60);
                    const seconds = timeLeft % 60;
                    document.getElementById("focus-timer").textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                }
            }, 1000);
        });

        document.getElementById("reset-focus-timer").addEventListener("click", function() {
            clearInterval(timer);
            const inputHours = parseInt(document.getElementById("focus-hours-input").value) || 0;
            const inputMinutes = parseInt(document.getElementById("focus-minutes-input").value) || 0;
            const inputSeconds = parseInt(document.getElementById("focus-seconds-input").value) || 0;
            timeLeft = (inputHours * 3600) + (inputMinutes * 60) + inputSeconds;
            document.getElementById("focus-timer").textContent = `${inputHours}:${inputMinutes < 10 ? '0' : ''}${inputMinutes}:${inputSeconds < 10 ? '0' : ''}${inputSeconds}`;
        });

        // Add hover effect for buttons
        const buttons = document.querySelectorAll("#start-focus-timer, #reset-focus-timer");
        buttons.forEach(button => {
            button.addEventListener("mouseover", function() {
                this.style.backgroundColor = this.style.backgroundColor === "rgb(39, 174, 96)" ? "#1e8449" : "#a93226";
            });
            button.addEventListener("mouseout", function() {
                this.style.backgroundColor = this.style.backgroundColor === "rgb(30, 132, 73)" ? "#27ae60" : "#c0392b";
            });
        });
    }

    function lockBrowser() {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.onblur = function() {
            window.focus();
        };
    }

    function unlockBrowser() {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.onblur = null;
    }

    function handleVisibilityChange() {
        if (document.hidden) {
            window.focus();
        }
    }
});
