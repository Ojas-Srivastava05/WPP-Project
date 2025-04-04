document.addEventListener("DOMContentLoaded", function () {
    let target = 10000;
    let visitorCounter = document.getElementById("visitor-counter");
    if (!visitorCounter) return;
    let digits = target.toString().length;

    // Create digit containers dynamically
    for (let i = 0; i < digits; i++) {
        let digitContainer = document.createElement("div");
        digitContainer.classList.add("digit-container");

        let digitSpan = document.createElement("div");
        digitSpan.classList.add("digit");
        digitSpan.innerText = "0";

        digitContainer.appendChild(digitSpan);
        visitorCounter.appendChild(digitContainer);
    }

    let digitElements = document.querySelectorAll(".digit");

    function updateCounter(value) {
        let digitsArray = value.toString().padStart(digits, "0").split("");
        digitsArray.forEach((num, index) => {
            let currentDigit = digitElements[index].innerText;
            if (currentDigit !== num) {
                digitElements[index].innerText = num;
            }
        });
        digitElements.forEach(digit => {
            digit.style.display = "inline-block"; 
            digit.style.opacity = "1"; 
            digit.style.visibility = "visible"; 
        });
    }

    function animateCounter() {
        let count = 0;
        let step = 1;
        let intervalTime = 300;

        function increaseCount() {
            count += Math.floor(Math.random() * step) + step;

            if (count > target) {
                count = target;
                updateCounter(count);
                return;
            }

            updateCounter(count);

            if (count < target * 0.2) { step = 60; intervalTime = 250; }
            else if (count < target * 0.4) { step = 70; intervalTime = 200; }
            else if (count < target * 0.6) { step = 80; intervalTime = 150; }
            else if (count < target * 0.8) { step = 100; intervalTime = 100; }
            else { step = 150; intervalTime = 60; }

            setTimeout(increaseCount, intervalTime);
        }

        increaseCount();
    }

    setTimeout(animateCounter, 1000);
});
document.getElementById("expbtn").addEventListener("click", function() {
    let audio = new Audio("cyberpunk_message.mp3"); 
    audio.play();
});
