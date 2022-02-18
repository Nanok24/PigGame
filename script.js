'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //This is a bit faster
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions
// Initialize game state variables
const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  //All visual changes reset
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //Check if the dice is not hidden currently aka game has been resetted before completion
  if (!diceEl.classList.contains('hidden')) diceEl.classList.add('hidden');

  if (player0El.classList.contains('player--winner'))
    player0El.classList.remove('player--winner');
  else player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
};
init();

const playerActiveEl = document.querySelector(`.player--${activePlayer}`);

// Switch to the next player;
const switchPlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  // I could also do classList.toggle('player--active') two times
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2 . Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log('Dice value:', dice);

    //3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to the current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to total score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if the score is equal or higher than 100: if yes, current player wins
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //3. If not, switch players;
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
