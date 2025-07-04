const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
    function speak(text) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }

    function handleCommands(command) {
        if (command.includes("open youtube")) {
            speak("Opening YouTube...");
            window.open("https://www.youtube.com", "_blank");
        } else if (command.includes("open facebook")) {
            speak("Opening Facebook...");
            window.open("https://www.facebook.com", "_blank");
        } else if (command.includes("open instagram")) {
            speak("Opening Instagram...");
            window.open("https://www.instagram.com", "_blank");
        } else if (command.includes("open whatsapp")) {
            speak("Opening whatsapp...");
            window.open("https://www.whatsapp.com", "_blank");
        } else {
            speak("Searching on Google...");
            window.open(`https://www.google.com/search?q=${command}`, "_blank");
        }
    }

    speak("Hello, how can I help you?");
    btn.innerHTML = "Listening...";

    setTimeout(() => {
        recognition.start();
    }, 1500);

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleCommands(command);
    };

    recognition.onend = () => {
        btn.innerHTML = "Click";
    };
});
