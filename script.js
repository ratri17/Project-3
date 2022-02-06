'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const swtichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currenctScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currenctScore, activePlayer, playing;
// Start conditions
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currenctScore = 0;
  activePlayer = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--active');
  playing = true;
};
init();
//Roll dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for the rolled number is 1, if so, change player
    if (dice !== 1) {
      // Add dice to current score
      currenctScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currenctScore;
    } else {
      // Switch player

      swtichPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //Add current score to active player
  if (playing) {
    scores[activePlayer] += currenctScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Winner of game if over 100
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      //Switch to the next player
      swtichPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
