const leaderboard = document.getElementById('leaderboard');
const addBtn = document.getElementById('add-btn');
const refreshBtn = document.getElementById('refresh-btn');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const gameID = 'wts0upGMh63kLvpHbnYm';
const alertMsg = document.getElementById('alert-msg');
let alertTimeout = null;

const createNewRow = (name, score) => {
  const row = document.createElement('div');
  row.className = 'score';
  row.innerHTML = `<p>${name}: ${score}</p>`;
  return row;
};

const refreshBoard = async (gameID) => {
  leaderboard.innerHTML = '';
  const getScores = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`);
  let scores = await getScores.json();

  if (scores.result.length > 0) {
    scores.result.forEach((item) => {
      leaderboard.appendChild(createNewRow(item.user, item.score));
    });
  }

  console.log(scores);
};

const addNewScore = async (name, score, gameID) => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`,
    {
      method: 'POST',
      body: JSON.stringify({
        user: name,
        score: Number(score)
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }
  );

  const result = await response.json();

  console.log(gameID);

  console.log(result);

};

const initiateLeaderboard = async () => {
  console.log(gameID);
  refreshBoard(gameID);
  addBtn.addEventListener('click', () => {
    const name = nameInput.value;
    const score = scoreInput.value;

    if ((!name || !score) || (name === '' || score === '')) {
      addNewScore(name, score, gameID);
      alertMsg.className = 'fail';
      alertMsg.textContent = 'All the fields must contain a value';
      clearTimeout(alertTimeout);

      alertTimeout = setTimeout(() => {
        alertMsg.textContent = '';
      }, 1000)
      return;
    }

    nameInput.value = '';
    scoreInput.value = '';
    
    addNewScore(name, score, gameID);
    alertMsg.className = 'success';
    alertMsg.textContent = 'A new score has been succesfully added to the leaderboard!';
    clearTimeout(alertTimeout);

    alertTimeout = setTimeout(() => {
      alertMsg.textContent = '';
    }, 1000)
  });

  refreshBtn.addEventListener('click', () => {
    refreshBoard(gameID);
  });
};

export default initiateLeaderboard;