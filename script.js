'use strict';

const dice = document.querySelector('.dice');
const roll = document.querySelector('.roll');
const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');
const cs1el = document.querySelector('.currScore1');
const cs2el = document.querySelector('.currScore2');
const score = [0, 0];
let currPlayer = 0, currScore = 0;
let playing = true;

const closehtp = function () {
    document.querySelector('.howToPlay').classList.toggle('hidden');
    document.querySelector('.overlay').classList.toggle('hidden');
};

const init = function () {
    currPlayer = 0, currScore = 0;
    playing = true;
    score1.textContent = 0;
    score2.textContent = 0;
    // Hiding dice
    dice.classList.add('hidden');
    score[0] = 0;
    score[1] = 0;
    const temp = function (cp) {
        document.querySelector(`.player${cp + 1}`).classList.remove('activePlayer');
        document.querySelector(`.player${cp + 1}`).classList.remove('winnerPlayer');
        document.querySelector(`.currScore${cp + 1}`).textContent = "0";
        document.querySelector(`.currText${cp + 1}`).textContent = "CURRENT";
        document.querySelector(`.currScore${(cp ^ 1) + 1}`).textContent = "0";
        document.querySelector(`.currText${(cp ^ 1) + 1}`).textContent = "CURRENT";
        document.querySelector(`.player${(cp ^ 1) + 1}`).classList.remove('inactivePlayer');
        document.querySelector(`.player${(cp ^ 1) + 1}`).classList.remove('loserPlayer');
    }
    temp(1);
    temp(0);
    document.querySelector('.player1').classList.add('activePlayer');
    document.querySelector('.player2').classList.add('inactivePlayer');
    document.querySelector('.currBox1').classList.add('activeCurrBox');
    document.querySelector('.currBox2').classList.add('inactiveCurrBox');
};

init();

const swt = function (cp) {
    document.querySelector(`.player${cp + 1}`).classList.add('activePlayer');
    document.querySelector(`.player${(cp ^ 1) + 1}`).classList.add('inactivePlayer');
    document.querySelector(`.player${cp + 1}`).classList.remove('inactivePlayer');
    document.querySelector(`.player${(cp ^ 1) + 1}`).classList.remove('activePlayer');
    document.querySelector(`.currBox${cp + 1}`).classList.add('activeCurrBox');
    document.querySelector(`.currBox${(cp ^ 1) + 1}`).classList.add('inactiveCurrBox');
    document.querySelector(`.currBox${cp + 1}`).classList.remove('inactiveCurrBox');
    document.querySelector(`.currBox${(cp ^ 1) + 1}`).classList.remove('activeCurrBox');
}

roll.addEventListener('click', function () {
    // Rolling dice
    if (playing) {
        const d = Math.trunc(Math.random() * 6) + 1;

        // Dice picture
        dice.classList.remove('hidden');
        dice.src = `d${d}.png`;
        console.log(`d${d}.png`);

        // Active Player
        if (d !== 1) {
            currScore += d;
            document.querySelector(`.currScore${currPlayer + 1}`).textContent = currScore;
        }
        else {
            document.querySelector(`.currScore${currPlayer + 1}`).textContent = 0;
            currPlayer ^= 1;
            currScore = 0;
            swt(currPlayer);
        }
    }
});

document.querySelector('.hold').addEventListener('click', function () {
    // Adding current score to active player
    if (playing) {
        score[currPlayer] += currScore;
        score1.textContent = score[0];
        score2.textContent = score[1];

        // If user reaches 100
        if (score[currPlayer] >= 100) {
            playing = false;
            document.querySelector(`.player${currPlayer + 1}`).classList.remove('activePlayer');
            document.querySelector(`.player${currPlayer + 1}`).classList.add('winnerPlayer');
            document.querySelector(`.currScore${currPlayer + 1}`).textContent = "🎉";
            document.querySelector(`.currText${currPlayer + 1}`).textContent = "WIN";
            document.querySelector(`.currScore${(currPlayer ^ 1) + 1}`).textContent = "☠️";
            document.querySelector(`.currText${(currPlayer ^ 1) + 1}`).textContent = "LOSE";
            document.querySelector(`.player${(currPlayer ^ 1) + 1}`).classList.remove('inactivePlayer');
            document.querySelector(`.player${(currPlayer ^ 1) + 1}`).classList.add('loserPlayer');
            dice.classList.add('hidden');
        }

        // Switching active player
        else {
            document.querySelector(`.currScore${currPlayer + 1}`).textContent = 0;
            currPlayer ^= 1;
            currScore = 0;
            swt(currPlayer);
        }
    }
});

//Resetting the game
document.querySelector('.newGame').addEventListener('click', init);

// How to play
document.querySelector('.htp').addEventListener('click', closehtp);

// Close Button
document.querySelector('.close').addEventListener('click', closehtp);

// Okay Button
document.querySelector('.okay').addEventListener('click', closehtp);

//overlay close
document.querySelector('.overlay').addEventListener('click', closehtp);