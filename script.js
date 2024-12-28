// let btn = document.querySelector("#btn");
// let content = document.querySelector("#content");
// let voice = document.querySelector("#voice");

// function speak(text) {
//     let text_speak = new SpeechSynthesisUtterance(text);
//     text_speak.rate = 1;
//     text_speak.pitch = 1;
//     text_speak.volume = 1;
//     text_speak.lang = "en-US";
//     window.speechSynthesis.speak(text_speak);
// }

// function wishMe() {
//     let day = new Date();
//     let hours = day.getHours();
//     if (hours >= 0 && hours < 12) {
//         speak("Good Morning, Sir.");
//     } else if (hours >= 12 && hours < 16) {
//         speak("Good Afternoon, Sir.");
//     } else {
//         speak("Good Evening, Sir.");
//     }
// }

// let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition = new speechRecognition();

// recognition.onresult = (event) => {
//     let transcript = event.results[event.resultIndex][0].transcript;
//     content.innerText = transcript;
//     takeCommand(transcript.toLowerCase());
// };

// btn.addEventListener("click", () => {
//     recognition.start();
//     voice.style.display = "block";
//     btn.style.display = "none";
//     setTimeout(() => {
//         voice.style.display = "none";
//         btn.style.display = "flex";
//     }, 3000);
// });

// function takeCommand(message) {
//     if (message.includes("hello") || message.includes("hey")) {
//         speak("Hello sir, what can I do for you?");
//     } else if (message.includes("who are you")) {
//         speak("I am your virtual assistant, created by you!");
//     } else if (message.includes("open youtube")) {
//         speak("Opening YouTube...");
//         window.open("https://youtube.com/", "_blank");
//     } else if (message.includes("time")) {
//         let time = new Date().toLocaleTimeString();
//         speak("The time is " + time);
//     } else if (message.includes("date")) {
//         let date = new Date().toDateString();
//         speak("Today is " + date);
//     } else {
//         speak("Searching for " + message);
//         window.open(`https://www.google.com/search?q=${message}`, "_blank");
//     }
// }









let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning, Sir.");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon, Sir.");
    } else {
        speak("Good Evening, Sir.");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.continuous = true; // Enable continuous listening
recognition.interimResults = true; // Enable partial transcription

recognition.onresult = (event) => {
    let interimTranscript = ""; // For ongoing speech (partial results)
    let finalTranscript = "";   // For final processed speech

    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript; // Final speech
        } else {
            interimTranscript += event.results[i][0].transcript; // Partial speech
        }
    }

    content.innerText = finalTranscript || interimTranscript; // Display both

    if (finalTranscript) {
        takeCommand(finalTranscript.toLowerCase()); // Process only the final transcript
    }
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
    setTimeout(() => {
        voice.style.display = "none";
        btn.style.display = "flex";
    }, 3000);
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I do for you?");
    } else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by you!");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak("The time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toDateString();
        speak("Today is " + date);
    } else {
        speak("Searching for " + message);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}
