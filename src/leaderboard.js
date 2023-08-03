const leaderboard = document.getElementById('leaderboard');
const addBtn = document.getElementById('add-btn');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');

const scores = [
  {
    name: 'Albert',
    score: 1238,
  },
  {
    name: 'Carl',
    score: 2379,
  },
  {
    name: 'Robert',
    score: 829,
  },
];

const createNewRow = (name, score) => {
  const row = document.createElement('div');
  row.className = 'score';
  row.innerHTML = `<p>${name}: ${score}</p>`;
  return row;
};

const refreshBoard = () => {
  leaderboard.innerHTML = '';
  scores.forEach((data) => {
    leaderboard.appendChild(createNewRow(data.name, data.score));
  });
};

const addNewScore = (name, score) => {
  scores.push({
    name,
    score,
  });
};

const initiateLeaderboard = () => {
  refreshBoard();
  addBtn.addEventListener('click', () => {
    const name = nameInput.value;
    const score = scoreInput.value;

    if ((!name || !score) || (name === '' || score === '')) {
      return;
    }
    addNewScore(name, score);
    refreshBoard();
  });
};

export default initiateLeaderboard;