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
        } else if (command.includes("open github")) {
            speak("Opening GitHub...");
            window.open("https://www.github.com", "_blank");

        } else {
            // Use DuckDuckGo Instant Answer API
            fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(command)}&format=json&no_redirect=1&skip_disambig=1`)
                .then(response => response.json())
                .then(data => {
                    if (data.AbstractText) {
                        speak(data.AbstractText);
                    } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
                        speak(data.RelatedTopics[0].Text);
                    } else {
                        speak("I couldn't find an answer. Let me search it for you on Google.");
                        window.open(`https://www.google.com/search?q=${command}`, "_blank");
                    }
                })
                .catch(error => {
                    console.error("API Error:", error);
                    speak("Something went wrong. Searching on Google.");
                    window.open(`https://www.google.com/search?q=${command}`, "_blank");
                });
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
