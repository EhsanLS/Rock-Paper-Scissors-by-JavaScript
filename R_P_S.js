let images = document.querySelectorAll(".img-items");
let cpuImages = document.querySelectorAll(".img-cpu-choosed");

let totalRounds = 0;
let currentRound = 0;
let gameActive = false;

function hiddenSelect(i) {
    for (let j = 0; j < images.length; j++) {
        if (j !== i) {
            images[j].classList.add("hidden");
        }
    }
}

const refreshFunction = () => {
    for (let i = 0; i < images.length; i++) {
        document.querySelector(".items_box > h1").innerHTML =
            "Choose your weapon";
        document.querySelector(".items_box > h3").innerHTML = "cpu choosed : ";
        images[i].classList.remove("hidden");
        images[i].classList.remove("disabled");
        cpuImages[i].classList.add("hidden");
    }
};

document.querySelector("#refresh").addEventListener("click", refreshFunction);

document.addEventListener("keydown", (e) => {
    if (e.key == "r") {
        refreshFunction();
    }
});

function gameLogic(user, cpu) {
    const userPoint = document.querySelector("#user-point");
    const cpuPoint = document.querySelector("#cpu-point");
    if (user !== cpu) {
        if (user == 0) {
            if (cpu == 1) {
                userPoint.innerHTML = Number(userPoint.innerHTML) + 1;
            } else {
                cpuPoint.innerHTML = Number(cpuPoint.innerHTML) + 1;
            }
        }
        if (user == 1) {
            if (cpu == 0) {
                cpuPoint.innerHTML = Number(cpuPoint.innerHTML) + 1;
            } else {
                userPoint.innerHTML = Number(userPoint.innerHTML) + 1;
            }
        }
        if (user == 2) {
            if (cpu == 0) {
                userPoint.innerHTML = Number(userPoint.innerHTML) + 1;
            } else {
                cpuPoint.innerHTML = Number(cpuPoint.innerHTML) + 1;
            }
        }
    }
}

function itemsName(i, h, inner) {
    if (i == 0) {
        document.querySelector(`.items_box > ${h}`).innerHTML = `${inner}Paper`;
    } else if (i == 1) {
        document.querySelector(`.items_box > ${h}`).innerHTML = `${inner}Rock`;
    } else {
        document.querySelector(
            `.items_box > ${h}`
        ).innerHTML = `${inner}Scissors`;
    }
}

function startGame() {
    let rounds;
    // making sure the user insert number of rounds
    do {
        rounds = prompt("How many rounds do you want to play?");
    } while (!rounds || isNaN(rounds) || rounds <= 0);

    totalRounds = parseInt(rounds, 10);
    currentRound = 0;
    document.querySelector("#user-point").innerHTML = 0;
    document.querySelector("#cpu-point").innerHTML = 0;
    gameActive = true;
}

function showResult(message) {
    document.getElementById("resultText").textContent = message;
    document.getElementById("resultBox").classList.remove("hidden");
}

function closeResult() {
    document.getElementById("resultBox").classList.add("hidden");
    refreshFunction(); // reset the page
    startGame(); // start the game again
}

for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", () => {
        if (!gameActive) return;

        hiddenSelect(i);
        itemsName(i, "h1", "");
        let randomCpu = Math.floor(Math.random() * 3);
        cpuImages[randomCpu].classList.remove("hidden");
        itemsName(randomCpu, "h3", "cpu choosed : ");
        gameLogic(i, randomCpu);
        images[i].classList.add("disabled");

        currentRound++;

        if (currentRound >= totalRounds) {
            gameActive = false;
            let userScore = Number(
                document.querySelector("#user-point").innerHTML
            );
            let cpuScore = Number(
                document.querySelector("#cpu-point").innerHTML
            );

            if (userScore > cpuScore) {
                showResult("User win !");
            } else if (cpuScore > userScore) {
                showResult("CPU win !");
            } else {
                showResult("Draw !");
            }
        }
    });
}

startGame();
