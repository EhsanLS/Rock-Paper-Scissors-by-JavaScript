let images = document.querySelectorAll(".img-items");
let cpuImages = document.querySelectorAll(".img-cpu-choosed");

function hiddenSelect(i) {
    for (let j = 0; j < images.length; j++) {
        if (j !== i) {
            images[j].classList.add("hidden");
        }
    }
}

// function cpuChoice(cpuImages) {
//     let ranCpu = Math.floor(Math.random() * 3);
//     for (let i = 0; i < cpuImages.length; i++) {
//         if (i == ranCpu) {
//             cpuImages[i].classList.toggle("hidden");
//             break
//         }
//     }
// }

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

document.querySelector("button").addEventListener("click", refreshFunction);

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
        document.querySelector(`.items_box > ${h}`).innerHTML = `${inner}Scissors`;
    }
}

for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", () => {
        hiddenSelect(i);
        itemsName(i, 'h1', '');
        // cpuChoice(cpuImages);
        let randomCpu = Math.floor(Math.random() * 3);
        cpuImages[randomCpu].classList.remove("hidden");
        itemsName(randomCpu, 'h3', 'cpu choosed : ');
        gameLogic(i, randomCpu);
        images[i].classList.add("disabled");
    });
}
