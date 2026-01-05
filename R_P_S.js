let images = document.querySelectorAll(".img-items");
let cpuImages = document.querySelectorAll(".img-cpu-choosed");


let totalRounds = 0;
let currentRound = 0;
let gameActive = false;
let userName;

const translations = {
    en: {
        chooseWeapon: "Choose your weapon",
        cpuChoosed: "CPU choosed : ",
        points: "Points:",
        user: "",
        cpu: "CPU:",
        refresh: "Refresh",
        resultWin: "",
        resultLose: "CPU won!",
        resultDraw: "It's a draw!",
        userPrompt: "What is your name?",
        roundsPrompt: "How many rounds do you want to play?",
        items: ["Paper", "Rock", "Scissors"],
        close: "Close",
        langLabel: "Language / زبان:",
    },
    fa: {
        chooseWeapon: "سلاح خودت رو انتخاب کن",
        cpuChoosed: "انتخاب رایانه : ",
        points: "امتیازها:",
        user: "",
        cpu: "رایانه:",
        refresh: "راند بعد",
        resultWin: "",
        resultLose: "رایانه برنده شد!",
        resultDraw: "مساوی شد!",
        userPrompt: "اسمت چیه؟",
        roundsPrompt: "چند راند میخوای بازی کنی؟",
        items: ["کاغذ", "سنگ", "قیچی"],
        close: "بستن",
        langLabel: "Language / زبان:",
    },
};


let currentLang = "fa";

userName = prompt(translations[currentLang].userPrompt);
translations["fa"].user = `${userName}:`;
translations["en"].user = `${userName}:`;
translations["fa"].resultWin = `تبریک میگم ${userName}، برنده شدی!`;
translations["en"].resultWin = `${userName} won!`;

// set text considering languages(en or fa)
function setLanguage(lang) {
    currentLang = lang;
    let htmlTag = document.querySelector("html");
    if (currentLang == "fa") {
        htmlTag.setAttribute("dir", "rtl");
    } else {
        htmlTag.setAttribute("dir", "ltr");
    }

    document.querySelector(".items_box > h1").innerHTML =
        translations[lang].chooseWeapon;
    document.querySelector(".items_box > h3").innerHTML =
        translations[lang].cpuChoosed;
    document.querySelector(".result_box > h1").innerHTML =
        translations[lang].points;
    document.querySelector(".user-point-container > h2").innerHTML =
        translations[lang].user;
    document.querySelector(".cpu-point-container > h2").innerHTML =
        translations[lang].cpu;

    // buttons
    document.querySelector("#refresh").innerHTML = translations[lang].refresh;
    const closeBtn = document.querySelector("#closeBtn");
    if (closeBtn) closeBtn.innerHTML = translations[lang].close;

    // language selection labl
    const langLabel = document.querySelector('label[for="langSelect"]');
    if (langLabel) langLabel.innerHTML = translations[lang].langLabel;
}

// game result in resultBox
function showResult(message) {
    document.getElementById("resultText").textContent = message;
    document.getElementById("resultBox").classList.remove("hidden");
}

// close resultBox and start new game
function closeResult() {
    document.getElementById("resultBox").classList.add("hidden");
    refreshFunction();
    startGame();
}

// hide the other items after user selection
function hiddenSelect(i) {
    for (let j = 0; j < images.length; j++) {
        if (j !== i) {
            images[j].classList.add("hidden");
        }
    }
}

// ready for new selection
const refreshFunction = () => {
    document.querySelector(".items_box > h1").innerHTML =
        translations[currentLang].chooseWeapon;
    document.querySelector(".items_box > h3").innerHTML =
        translations[currentLang].cpuChoosed;

    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove("hidden");
        images[i].classList.remove("disabled");
        cpuImages[i].classList.add("hidden");
    }
};

// reset button
document.querySelector("#refresh").addEventListener("click", refreshFunction);

// reset by 'r' key on the keyboard
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r") {
        refreshFunction();
    }
});

// scoring logic
function gameLogic(user, cpu) {
    const userPoint = document.querySelector("#user-point");
    const cpuPoint = document.querySelector("#cpu-point");

    if (user === cpu) return; // if they choose the same item, there is no point for them

    // Paper > Rock, Rock > Scissors, Scissors > Paper
    const userWins =
        (user === 0 && cpu === 1) ||
        (user === 1 && cpu === 2) ||
        (user === 2 && cpu === 0);

    if (userWins) {
        userPoint.innerHTML = Number(userPoint.innerHTML) + 1;
    } else {
        cpuPoint.innerHTML = Number(cpuPoint.innerHTML) + 1;
    }
}

// selection item's name by language
function itemsName(i, tag, prefix) {
    document.querySelector(
        `.items_box > ${tag}`
    ).innerHTML = `${prefix}${translations[currentLang].items[i]}`;
}

function startGame() {
    let rounds;

    do {
        rounds = prompt(translations[currentLang].roundsPrompt);
    } while (!rounds || isNaN(rounds) || Number(rounds) <= 0);

    totalRounds = parseInt(rounds, 10);
    currentRound = 0;
    document.querySelector("#user-point").innerHTML = 0;
    document.querySelector("#cpu-point").innerHTML = 0;
    gameActive = true;

    refreshFunction();
}

// items click event
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", () => {
        if (!gameActive) return;

        hiddenSelect(i);
        itemsName(i, "h1", "");

        const randomCpu = Math.floor(Math.random() * 3);
        cpuImages[randomCpu].classList.remove("hidden");
        itemsName(randomCpu, "h3", translations[currentLang].cpuChoosed);

        gameLogic(i, randomCpu);
        images[i].classList.add("disabled");

        currentRound++;

        if (currentRound >= totalRounds) {
            gameActive = false;
            const userScore = Number(
                document.querySelector("#user-point").innerHTML
            );
            const cpuScore = Number(
                document.querySelector("#cpu-point").innerHTML
            );

            if (userScore > cpuScore) {
                showResult(translations[currentLang].resultWin);
            } else if (cpuScore > userScore) {
                showResult(translations[currentLang].resultLose);
            } else {
                showResult(translations[currentLang].resultDraw);
            }
        }
    });
}

// initial game start
(function init() {
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
        langSelect.value = currentLang;
    }

    setLanguage(currentLang);
    startGame();
})();
