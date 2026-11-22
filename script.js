let bounces = 0;
let newBallCost = 10;
let balls = [["red", "XS", 1]];
let numberOfBouncfinities = 0;
let βP = 0;
let βPperβ = 1;
let βPupgradecost = [1, 3, 5];
let βPbounceGain = 1;
let βPbounceSpeed = 1;
let βPchallenges = ["NS", "NS", "NS"]
let βPchallenge1 = 1;
let βPchallenge2 = false;
let βPchallenge3 = false;
let maxBalls = 10;
let brokenBouncfinity = false;
let davenBalls = [];
let davenBallCost = 100;
let achievements = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 0];
let timePlayed = [0, 0, 0, 0]
const numberOfAchievements = 28;
const maxDavenBalls = 10;
const sizeMap = {
    "XS": "25px",
    "S": "32px",
    "M": "40px",
    "L": "48px",
    "XL": "56px",
    "2XL": "64px",
    "3XL": "72px"
};
const davenImageMap = {
    "normal": "normaldaven.png",
    "bronze": "bronzedaven.png",
    "silver": "silverdaven.png",
    "gold": "goldendaven.png",
    "cosmic": "cosmicdaven.png",
    "shiny": "shinydaven.png",
    "royal": "royaldaven.png",
    "emperor": "royaldaven.png"
};
const container = document.getElementById("ball-display");

function addBounces() {
    let allBlack = true;
    let all3XLs = true;
    for (let ball of balls) {
        bounces += Math.floor(ball[2] * βPbounceGain);
        if (ball[0] !== "black") {
            allBlack = false;
        }
        if (ball[1] !== "3XL") {
            all3XLs = false;
        }
    }
    if (balls.length >= 10 && !achievements[1]) {
        achievements[1] = true;
        achievements[numberOfAchievements]++;
    }
    if (allBlack && balls.length >= 10 && !achievements[5]) {
        achievements[5] = true;
        achievements[numberOfAchievements]++;
    }
    if (all3XLs && allBlack && balls.length >= 10 && !achievements[9]) {
        achievements[9] = true;
        achievements[numberOfAchievements]++;
    }
    if (βPchallenge3) {
        bounces = bounces * 0.995;
    }
    updateUI();
    updateAchievements();
    saveGame();
}

function addBall() {
    if (newBallCost <= bounces && balls.length < maxBalls) {
        bounces -= newBallCost;
        balls.push(["red", "XS", 1]);
        newBallCost = Math.floor((newBallCost + 10) * 1.25);
    }
    updateUI();
    renderBalls();
    saveGame();
}

function loadGame() {
    if (localStorage.getItem('bounces') !== null) bounces = parseInt(localStorage.getItem('bounces'));
    if (localStorage.getItem('newBallCost') !== null) newBallCost = parseInt(localStorage.getItem('newBallCost'));
    if (localStorage.getItem('balls') !== null) balls = JSON.parse(localStorage.getItem('balls'));
    if (localStorage.getItem('numberOfBouncfinities') !== null) numberOfBouncfinities = parseInt(localStorage.getItem('numberOfBouncfinities'));
    if (localStorage.getItem('βP') !== null) βP = parseInt(localStorage.getItem('βP'));
    if (localStorage.getItem('βPperβ') !== null) βPperβ = parseInt(localStorage.getItem('βPperβ'));
    if (localStorage.getItem('βPupgradecost') !== null) βPupgradecost = JSON.parse(localStorage.getItem('βPupgradecost'));
    if (localStorage.getItem('βPbounceGain') !== null) βPbounceGain = parseFloat(localStorage.getItem('βPbounceGain'));
    if (localStorage.getItem('βPbounceSpeed') !== null) βPbounceSpeed = parseFloat(localStorage.getItem('βPbounceSpeed'));
    if (localStorage.getItem('βPchallenges') !== null) βPchallenges = JSON.parse(localStorage.getItem('βPchallenges'));
    if (localStorage.getItem('βPchallenge1') !== null) βPchallenge1 = parseInt(localStorage.getItem('βPchallenge1'));
    if (localStorage.getItem('βPchallenge2') !== null) βPchallenge2 = JSON.parse(localStorage.getItem('βPchallenge2'));
    if (localStorage.getItem('βPchallenge3') !== null) βPchallenge3 = JSON.parse(localStorage.getItem('βPchallenge3'));
    if (localStorage.getItem('maxBalls') !== null) maxBalls = parseInt(localStorage.getItem('maxBalls'));
    if (localStorage.getItem('brokenBouncfinity') !== null) brokenBouncfinity = JSON.parse(localStorage.getItem('brokenBouncfinity'));
    if (localStorage.getItem('davenBalls') !== null) davenBalls = JSON.parse(localStorage.getItem('davenBalls'));
    if (localStorage.getItem('davenBallCost') !== null) davenBallCost = parseInt(localStorage.getItem('davenBallCost'));
    if (localStorage.getItem('achievements') !== null) {
        achievements = JSON.parse(localStorage.getItem('achievements'));
        while (achievements.length <= numberOfAchievements) {
            achievements.push(false);
        }
    }
    if (localStorage.getItem('timePlayed') !== null) timePlayed = JSON.parse(localStorage.getItem('timePlayed'));
}

function saveGame() {
    localStorage.setItem('bounces', bounces);
    localStorage.setItem('newBallCost', newBallCost);
    localStorage.setItem('balls', JSON.stringify(balls));
    localStorage.setItem('numberOfBouncfinities', numberOfBouncfinities);
    localStorage.setItem('βP', βP);
    localStorage.setItem('βPperβ', βPperβ);
    localStorage.setItem('βPupgradecost', JSON.stringify(βPupgradecost));
    localStorage.setItem('βPbounceGain', βPbounceGain);
    localStorage.setItem('βPbounceSpeed', βPbounceSpeed);
    localStorage.setItem('βPchallenges', JSON.stringify(βPchallenges));
    localStorage.setItem('βPchallenge1', βPchallenge1);
    localStorage.setItem('βPchallenge2', βPchallenge2);
    localStorage.setItem('βPchallenge3', βPchallenge3);
    localStorage.setItem('maxBalls', maxBalls);
    localStorage.setItem('brokenBouncfinity', JSON.stringify(brokenBouncfinity));
    localStorage.setItem('davenBalls', JSON.stringify(davenBalls));
    localStorage.setItem('davenBallCost', JSON.stringify(davenBallCost));
    localStorage.setItem('maxDavenBalls', maxDavenBalls);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('timePlayed', JSON.stringify(timePlayed));
}

function updateUI() {
    const bouncesEl = document.getElementById("bounces");
    const ballsEl = document.getElementById("balls");
    const bouncfinitiesEl = document.getElementById("bouncfinities");
    const betaPEl = document.getElementById("βp");
    const newBallCostEl = document.getElementById("new-ball-cost");
    const davenBallCostEl = document.getElementById("daven-ball-cost");
    const upgradeCost0El = document.getElementById("upgrade-cost-0");
    const upgradeCost1El = document.getElementById("upgrade-cost-1");
    const upgradeCost2El = document.getElementById("upgrade-cost-2");
    if (bouncesEl) bouncesEl.innerText = bounces;
    if (ballsEl) ballsEl.innerText = balls.length;
    if (bouncfinitiesEl) bouncfinitiesEl.innerText = numberOfBouncfinities;
    if (betaPEl) betaPEl.innerText = βP;
    if (newBallCostEl) newBallCostEl.innerText = newBallCost;
    if (davenBallCostEl) davenBallCostEl.innerText = davenBallCost;
    if (upgradeCost0El) upgradeCost0El.innerText = βPupgradecost[0];
    if (upgradeCost1El) upgradeCost1El.innerText = βPupgradecost[1];
    if (upgradeCost2El) upgradeCost2El.innerText = βPupgradecost[2];
}

function upgradeBallColor() {
    let input = prompt(`Enter ball number to upgrade color (1 to ${balls.length}):`);
    if (input === null) return;
    let ballNum = parseInt(input) - 1;
    if (isNaN(ballNum) || ballNum < 0 || ballNum >= balls.length) {
        alert("Invalid ball number!");
        return;
    }
    let upgradeCost;
    let multiplier;
    let newColor;
    let ball = balls[ballNum];
    if (ball[0] == "red") {
        upgradeCost = 10;
        multiplier = 2;
        newColor = "orange";
    } else if (ball[0] == "orange") {
        upgradeCost = 100;
        multiplier = 3;
        newColor = "yellow";
    } else if (ball[0] == "yellow") {
        upgradeCost = 1000;
        multiplier = 5;
        newColor = "green";
    } else if (ball[0] == "green") {
        upgradeCost = 5000;
        multiplier = 7;
        newColor = "blue";
    } else if (ball[0] == "blue") {
        upgradeCost = 10000;
        multiplier = 10;
        newColor = "purple";
    } else if (ball[0] == "purple") {
        upgradeCost = 25000;
        multiplier = 15;
        newColor = "white";
    } else {
        upgradeCost = 50000;
        multiplier = 20;
        newColor = "black";
    }
    if (ball[0] != "black" && bounces >= upgradeCost && (!βPchallenge2 || !(ball[0] == "purple" || ball[0] == "white"))) {
        bounces -= upgradeCost;
        ball[0] = newColor;
        if (newColor == "yellow" && !achievements[0]) {
            achievements[0] = true;
            achievements[numberOfAchievements]++;
        } else if (newColor == "blue" && !achievements[2]) {
            achievements[2] = true;
            achievements[numberOfAchievements]++;
        } else if (newColor == "white" && !achievements[3]) {
            achievements[3] = true;
            achievements[numberOfAchievements]++;
        } else if (newColor == "black" && !achievements[4]) {
           achievements[4] = true;
           achievements[numberOfAchievements]++;
        }
        ball[2] = ball[2] * multiplier;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        renderBalls();
    }
    saveGame();
}

function upgradeBallSize() {
    let input = prompt(`Enter ball number to upgrade size (1 to ${balls.length}):`);
    if (input === null) return; 
    let ballNum = parseInt(input) - 1; 
    if (isNaN(ballNum) || ballNum < 0 || ballNum >= balls.length) {
        alert("Invalid ball number!");
        return;
    }
    let upgradeCost;
    let multiplier;
    let newSize;
    let ball = balls[ballNum];
    if (ball[1] == "XS") {
        upgradeCost = 100000;
        multiplier = 1.5;
        newSize = "S";
    } else if (ball[1] == "S") {
        upgradeCost = 300000;
        multiplier = 2;
        newSize = "M";
    } else if (ball[1] == "M") {
        upgradeCost = 900000;
        multiplier = 2.5;
        newSize = "L";
    } else if (ball[1] == "L") {
        upgradeCost = 2700000;
        multiplier = 3;
        newSize = "XL";
    } else if (ball[1] == "XL") {
        upgradeCost = 8100000;
        multiplier = 4;
        newSize = "2XL";
    } else if (ball[1] == "2XL") {
        upgradeCost = 24300000;
        multiplier = 5;
        newSize = "3XL";
    } 
    if (ball[1] != "3XL" && bounces >= upgradeCost && (!βPchallenge2 || !(ball[1] == "2XL"))) {
        bounces -= upgradeCost;
        ball[1] = newSize;
        ball[2] = ball[2] * multiplier;
        if (newSize == "L" && !achievements[6]) {
            achievements[6] = true;
            achievements[numberOfAchievements]++;
        } else if (newSize == "XL" && !achievements[7]) {
            achievements[7] = true;
            achievements[numberOfAchievements]++;
        } else if (newSize == "3XL" && !achievements[8]) {
            achievements[8] = true;
            achievements[numberOfAchievements]++;
        }
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        renderBalls();
    }
    saveGame();
}

function checkForBouncfinity() {
    breakBouncfinity();
    if (bounces >= 2 ** 37 && !brokenBouncfinity) {
        numberOfBouncfinities++;
        bounces = 0;
        balls = [["red", "XS", 1]];
        newBallCost = 10;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        renderBalls()
        βP += βPperβ;
        if (βPchallenges[0] == "IP") {
            βPchallenges[0] = "F";
            achievements[17] = true;
            achievements[numberOfAchievements]++;
        } else if (βPchallenges[1] == "IP") {
            βPchallenges[1] = "F";
            achievements[18] = true;
            achievements[numberOfAchievements]++;
        } else if (βPchallenges[2] == "IP") {
            βPchallenges[2] = "F";
            achievements[19] = true;
            achievements[numberOfAchievements]++;
        }
        if (!achievements[10]) {
            achievements[10] = true;
        }
    } else if (bounces >= 2 ** 37 && brokenBouncfinity) {
        numberOfBouncfinities++;
        let x = Math.floor(Math.log2(bounces) - 37);
        if (x < 0) {
            x = 0;
        }
        bounces = 0;
        balls = [["red", "XS", 1]];
        newBallCost = 10;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        renderBalls()
        βP += (βPperβ * (2**x));
        if (βPchallenges[0] == "IP") {
            βPchallenges[0] = "F";
            achievements[17] = true;
            achievements[numberOfAchievements]++;
        } else if (βPchallenges[1] == "IP") {
            βPchallenges[1] = "F";
            achievements[18] = true;
            achievements[numberOfAchievements]++;
        } else if (βPchallenges[2] == "IP") {
            βPchallenges[2] = "F";
            achievements[19] = true;
            achievements[numberOfAchievements]++;
        }
        if (!achievements[10]) {
            achievements[10] = true;
        }
    }
    if (βP >= 10 && !achievements[11]) {
        achievements[11] = true;
        achievements[numberOfAchievements]++;
    }
    if (βP >= 100 && !achievements[13]) {
        achievements[13] = true;
        achievements[numberOfAchievements]++;
    }
    if (βP >= 1000 && !achievements[15]) {
        achievements[15] = true;
        achievements[numberOfAchievements]++;
    }
    if (numberOfBouncfinities >= 10 && !achievements[12]) {
        achievements[12] = true;
        achievements[numberOfAchievements]++;
    }
    if (numberOfBouncfinities >= 100 && !achievements[14]) {
        achievements[14] = true;
        achievements[numberOfAchievements]++;
    }
    if (numberOfBouncfinities >= 1000 && !achievements[16]) {
        achievements[16] = true;
        achievements[numberOfAchievements]++;
    }
    updateUI();
    saveGame();
}

function βPupgrade(upgradeNum) {
    if (upgradeNum == 0 && βPupgradecost[0] <= βP) {
        βP -= βPupgradecost[0];
        βPbounceGain += 0.1;
        βPupgradecost[0] = (βPupgradecost[0] * 3) - 1;
    } else if (upgradeNum == 1 && βPupgradecost[1] <= βP) {
        βP -= βPupgradecost[1];
        βPbounceSpeed += 0.1;
        βPupgradecost[1] = (βPupgradecost[1] * 3) - 1;
    } else if (upgradeNum == 2 && βPupgradecost[2] <= βP) {
        βP -= βPupgradecost[2];
        βPperβ += 1;
        βPupgradecost[2] = (βPupgradecost[2] * 3) - 1;
    }
    saveGame();
}

function renderBalls() {
    const container = document.getElementById("ball-display");
    if (!container) return;
    container.innerHTML = "";
    balls.forEach((ball, index) => {
        const li = document.createElement("li");
        li.style.backgroundColor = ball[0];
        li.style.width = sizeMap[ball[1]];
        li.style.height = sizeMap[ball[1]];
        li.style.animationDelay = `${index * 0.2}s`;
        container.appendChild(li);
    });
}

function doβchallenge() {
    if (βPchallenges[0] == "NS" && numberOfBouncfinities > 0) {
        βPchallenge1 = 2;
        βPchallenges[0] = "IP";
    } else if (βPchallenges[1] == "NS" && βPchallenges[0] == "F") {
        βPchallenge2 = true;
        βPchallenges[1] = "IP";
    } else if (βPchallenges[2] == "NS" && βPchallenges[1] == "F") {
        βPchallenge3 = true;
        βPchallenges[2] = "IP";
    }
    saveGame();
}

function breakBouncfinity() {
    if (βP >= 1000000 && βPchallenges[0] === "F" && βPchallenges[1] === "F" && βPchallenges[2] === "F") {
        maxBalls = 12;
        brokenBouncfinity = true;
    }
    renderBalls();
}

function buyDavenBall() {
    let newDavenBall = ["normal", 1];
    if (βP >= davenBallCost && davenBalls.length < maxDavenBalls) {
        βP -= davenBallCost;
        davenBalls.push(newDavenBall); 
        davenBallCost = Math.floor(davenBallCost * 2.5);
        if (davenBalls.length >= 1 && !achievements[20]) {
            achievements[20] = true;
            achievements[numberOfAchievements]++;
        }
        if (davenBalls.length >= 5 && !achievements[21]) {
            achievements[21] = true;
            achievements[numberOfAchievements]++;
        }
        if (davenBalls.length >= 10 && !achievements[22]) {
            achievements[22] = true;
            achievements[numberOfAchievements]++;
        }
        updateUI();
        renderDavenBalls();
        saveGame();
    }
}

function passiveβP() {
    let allRoyals = true;
    let allEmperors = true;
    for (let daven of davenBalls) {
        βP += Math.floor(daven[1]);
        if (daven[0] !== "royal") {
            allRoyals = false;
        }
        if (daven[0] !== "emperor") {
            allEmperors = false;
        }
    }
    if (allRoyals && davenBalls.length >= 10 && !achievements[26]) {
        achievements[26] = true;
        achievements[numberOfAchievements]++;
    }
    if (allEmperors && davenBalls.length >= 10 && !achievements[28]) {
        achievements[28] = true;
        achievements[numberOfAchievements]++;
    }
    updateUI();
    saveGame();
}

function upgradeDavenRank() {
    let input = prompt(`Enter ball number to upgrade color (1 to ${davenBalls.length}):`);
    if (input === null) return;
    let ballNum = parseInt(input) - 1;
    if (isNaN(ballNum) || ballNum < 0 || ballNum >= davenBalls.length) {
        alert("Invalid ball number!");
        return;
    }
    let upgradeCost;
    let multipler;
    let newRank;
    let daven = davenBalls[ballNum];
    if (daven[0] == "normal") {
        upgradeCost = 250;
        multipler = 100;
        newRank = "bronze";
    } else  if (daven[0] == "bronze") {
        upgradeCost = 1000;
        multipler = 100;
        newRank = "silver";
    } else if (daven[0] == "silver") {
        upgradeCost = 25000;
        multipler = 10;
        newRank = "gold";
    } else if (daven[0] == "gold") {
        upgradeCost = 500000;
        multipler = 100;
        newRank = "cosmic";
    } else if (daven[0] == "cosmic") {
        upgradeCost = 10000000;
        multipler = 10;
        newRank = "shiny";
    } else if (daven[0] == "shiny") {
        upgradeCost = 250000000;
        multipler = 10;
        newRank = "royal";
    } else if (daven[0] == "royal") {
        upgradeCost = 5000000000;
        multipler = 1000;
        newRank = "emperor";
    }
    if (βP >= upgradeCost) {
        βP -= upgradeCost;
        daven[0] = newRank;
        daven[1] = daven[1] * multipler;
        if (newRank == "gold" && !achievements[23]) {
            achievements[23] = true;
            achievements[numberOfAchievements]++;
        }
        if (newRank == "shiny" && !achievements[24]) {
            achievements[24] = true;
            achievements[numberOfAchievements]++;
        }
        if (newRank == "royal" && !achievements[25]) {
            achievements[25] = true;
            achievements[numberOfAchievements]++;
        }
        if (newRank == "emperor" && !achievements[27]) {
            achievements[27] = true;
            achievements[numberOfAchievements]++;
        }
        updateUI();
    }
}

function renderDavenBalls() {
    const container = document.getElementById("daven-ball-display");
    const countEl = document.getElementById("daven-balls");
    if (countEl) countEl.innerText = davenBalls.length;
    if (!container) return;
    container.innerHTML = "";
    davenBalls.forEach((daven, index) => {
        const li = document.createElement("li");
        li.style.backgroundImage = `url('${davenImageMap[daven[0]]}')`;
        li.style.backgroundSize = "cover";
        li.style.backgroundPosition = "center";
        li.style.width = "50px";
        li.style.height = "50px";
        li.style.borderRadius = "50%";
        li.style.animationDelay = `${index * 0.2}s`;
        container.appendChild(li);
    });
}

function updateAchievements() {
    let unlockedCount = 0;
    for (let i = 0; i < numberOfAchievements; i++) {
        const el = document.getElementById(`achievement${i + 1}`);
        if (el && achievements[i]) {
            el.innerText = "✓";
        }
        if (achievements[i]) {
            unlockedCount++;
        }
    }
    const doneEl = document.getElementById("achievementsDone");
    if (doneEl) {
        doneEl.innerText = unlockedCount;
    }
    updateUI();
}

function resetProgress() {
    bounces = 0;
    newBallCost = 10;
    balls = [["red", "XS", 1]];
    numberOfBouncfinities = 0;
    βP = 0;
    βPperβ = 1;
    βPupgradecost = [1, 3, 5];
    βPbounceGain = 1;
    βPbounceSpeed = 1;
    βPchallenges = ["NS", "NS", "NS"]
    βPchallenge1 = 1;
    βPchallenge2 = false;
    βPchallenge3 = false;
    maxBalls = 10;
    brokenBouncfinity = false;
    davenBalls = [];
    davenBallCost = 100;
    achievements = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 0];
}

function updateTimePlayed() {
    timePlayed[3]++;
    if (timePlayed[3] >= 60) {
        timePlayed[3] -= 60;
        timePlayed[2]++;
    }
    if (timePlayed[2] >= 60) {
        timePlayed[2] -= 60;
        timePlayed[1]++;
    }
    if (timePlayed[1] >= 24) {
        timePlayed[1] -= 24;
        timePlayed[0]++;
    }
    document.getElementById("daysPlayed").innerText = timePlayed[0];
    document.getElementById("hoursPlayed").innerText = timePlayed[1];
    document.getElementById("minutesPlayed").innerText = timePlayed[2];
    document.getElementById("secondsPlayed").innerText = timePlayed[3];
    saveGame();
}

loadGame();
updateUI();
renderBalls();
renderDavenBalls();
addBounces();
setInterval(addBounces, 1000 * βPchallenge1 / βPbounceSpeed);
setInterval(passiveβP, 1000);
setInterval(updateTimePlayed, 1000);