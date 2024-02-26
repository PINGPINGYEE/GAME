// 게임 설정
let gridSize = 10;
let totalMines = 10;
let currentGameMode = 'intermediate'; // 시작시 기본 모드 설정

const easyModeButton = document.getElementById('easy-mode');
const intermediateModeButton = document.getElementById('intermediate-mode');
const hardModeButton = document.getElementById('hard-mode');
const expertModeButton = document.getElementById('expert-mode');


let gameBoardState = [];
let userPosition = { x: 0, y: 0 };
let startTime = null;
let endTime;
let timerId = null;
let answerMode = false; // 정답 모드 활성화 여부
const body = document.querySelector('body');
const gameBoard = document.querySelector('.game-board');
const lightModeButton = document.getElementById('light-mode');
const darkModeButton = document.getElementById('dark-mode');
const modeIndicator = document.querySelector('.mode-indicator');
const button = document.getElementById('description-button');
const content = document.getElementById('description-content');


let messageVisible = true;

document.addEventListener('keydown', (event) => {
  if (event.key === 'B' || event.key === 'b') {
    messageVisible = !messageVisible;
    showMessage();
  }
});


function showMessage() {
  const messageElement = document.querySelector('.message');
  messageElement.textContent = messageVisible ? 'Game mode : Normal' : 'Game mode : Check';
}



function setGameMode(mode) {
  const title = document.querySelector('h2'); // 타이틀 요소를 찾습니다.
  switch (mode) {
    case 'easy':
      gridSize = 10;
      totalMines = 5;
      title.textContent = "지뢰 찾기 (Easy Mode)"; // 타이틀을 업데이트합니다.
      break;
    case 'intermediate':
      gridSize = 10;
      totalMines = 10;
      title.textContent = "지뢰 찾기 (Intermediate Mode)";
      break;
    case 'hard':
      gridSize = 10;
      totalMines = 20;
      title.textContent = "지뢰 찾기 (Hard Mode)";
      break;
    case 'expert':
      gridSize = 10;
      totalMines = 35;
      title.textContent = "지뢰 찾기 (Expert Mode)";
      break;
    default:
      gridSize = 10;
      totalMines = 10;
      title.textContent = "지뢰 찾기";
  }
  currentGameMode = mode; // 현재 게임 모드를 설정합니다.
  reStartGame(); // 게임 모드가 변경되면 게임 재시작
  updatePageTitle(); // 게임 모드 변경시 페이지 제목 업데이트
}

function updatePageTitle() {
  const pageTitle = document.querySelector('h1');
  pageTitle.textContent = `지뢰 찾기 (${currentGameMode} mode)`;
}

// 이벤트 리스너 등록
easyModeButton.addEventListener('click', () => setGameMode('easy'));
intermediateModeButton.addEventListener('click', () => setGameMode('intermediate'));
hardModeButton.addEventListener('click', () => setGameMode('hard'));
expertModeButton.addEventListener('click', () => setGameMode('expert'));

button.addEventListener('click', function () {
  content.classList.toggle('show');
});

document.getElementById('restart').addEventListener('click', reStartGame);

// 라이트모드
lightModeButton.addEventListener('click', () => {
  body.style.backgroundColor = '#FFFFFF'; // 배경
  body.style.color = '#000000'; // 글자
  gameBoard.style.borderColor = '#000000'; // 게임 보드 테두리 색상
});

// 다크모드
darkModeButton.addEventListener('click', () => {
  content.style.color = '#333333'; // description-content 색상
  body.style.backgroundColor = '#000000'; // 배경
  body.style.color = '#FFFFFF'; // 글자
  gameBoard.style.borderColor = '#FFFFFF'; // 게임 보드 테두리 색상
});


// 게임 초기화
function reStartGame() {
  userPosition = { x: 0, y: 0 };
  gameBoardState = createEmptyBoard();
  placeMines();
  // 첫 위치를 공개 상태로 설정
  gameBoardState[userPosition.y][userPosition.x].revealed = true;
  renderGame();
  document.addEventListener('keydown', userMovement);
  startTime = null; // 초기화를 위해 시간 설정
  startTimer(); // 새 게임이 시작될 때 타이머 시작
  messageVisible = true; // 메시지 표시 설정
  showMessage(); // 메시지 업데이트
  answerMode = false; // 정답 모드 비활성화
  modeIndicator.textContent = 'Mode: Normal'; // 모드 표시 업데이트
}

// 게임 모드 함수
function toggleAnswerMode() {
  answerMode = !answerMode;
  const gameMode = document.querySelector('.game-mode');
  gameMode.textContent = answerMode ? 'Mode: Answer' : 'Mode: Normal';
}



// 시간 측정 시작
function startTimer() {
  const timerElement = document.querySelector('.timer');
  if (startTime === null) {
    startTime = new Date();

    timerId = setInterval(() => {
      const now = new Date();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      timerElement.textContent = `Elapsed time: ${elapsedSeconds} seconds`;
    }, 1000);
  }
}

// 시간 측정 종료
function stopTimer() {
  clearInterval(timerId);
  const now = new Date();
  const elapsedSeconds = Math.floor((now - startTime) / 1000);

  alert(`Game finished in ${elapsedSeconds} seconds`);
  startTime = null; // 시간 초기화
}

// 빈 게임 보드 생성
function createEmptyBoard() {
  const board = [];
  for (let y = 0; y < gridSize; y++) {
    const row = [];
    for (let x = 0; x < gridSize; x++) {
      row.push({ revealed: false, hasMine: false, revealedInAnswerMode: false });
    }
    board.push(row);
  }
  return board;
}

// 지뢰 배치
function placeMines() {
  let minesToPlace = totalMines;
  while (minesToPlace > 0) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    if (!gameBoardState[y][x].hasMine && !(x === 0 && y === 0)) {
      gameBoardState[y][x].hasMine = true;
      minesToPlace--;
    }
  }
}

// 게임 보드 클릭 이벤트 핸들러
gameBoard.addEventListener('mousedown', (event) => {
  event.preventDefault();
});

// 사용자 움직임 처리
function userMovement(event) {
  if (answerMode && (event.key === 'B' || event.key === 'b')) {
    // 정답 모드에서 B를 누르면 일반 모드로 변경
    answerMode = false;
    modeIndicator.textContent = 'Mode: Normal'; // 모드 표시 업데이트
    renderGame();
    return;
  }

  if (startTime === null) {
    startTimer();
  }

  let newPosition = { ...userPosition };

  if (event.key === 'ArrowUp' && userPosition.y > 0) {
    newPosition.y -= 1;
  } else if (event.key === 'ArrowDown' && userPosition.y < gridSize - 1) {
    newPosition.y += 1;
  } else if (event.key === 'ArrowLeft' && userPosition.x > 0) {
    newPosition.x -= 1;
  } else if (event.key === 'ArrowRight' && userPosition.x < gridSize - 1) {
    newPosition.x += 1;
  } else if ((event.key === 'B' || event.key === 'b')&& !answerMode) {
    // 정답 모드로 변경
    answerMode = true;
    modeIndicator.textContent = 'Mode: Answer'; // 모드 표시 업데이트
  }

  if (answerMode) {
    const { hasMine } = gameBoardState[newPosition.y][newPosition.x];
    if (hasMine) {
      // 정답 모드에서 지뢰가 있는 곳에 도착하면 표시
      gameBoardState[newPosition.y][newPosition.x].revealed = true;
      // 지뢰가 있는 셀을 공개한 경우 추가
      gameBoardState[newPosition.y][newPosition.x].revealedInAnswerMode = true;
    } else {
      // 정답 모드에서 지뢰가 없는 곳에 도착하면 게임 오버
      gameOver();
      return;
    }
  }

  userPosition = newPosition;
  revealCell(newPosition.x, newPosition.y);
  checkGameStatus();
}

// 게임 진행 상태 확인
function checkGameStatus() {
  // 'answerMode'에서 공개되지 않은 셀에 지뢰가 있을 경우에만 게임 오버
  if (gameBoardState[userPosition.y][userPosition.x].hasMine && !gameBoardState[userPosition.y][userPosition.x].revealedInAnswerMode && !answerMode) {
    gameOver();
  } else if (isAllCellsRevealed()) {
    gameWin();
  }
}

// 셀 공개 처리
function revealCell(x, y) {
  if (!gameBoardState[y][x].revealed) {
    gameBoardState[y][x].revealed = true;
    // 지뢰가 있고 정답 모드에서 공개된 셀은 'revealedInAnswerMode'를 true로 설정합니다.
    if (gameBoardState[y][x].hasMine && answerMode) {
      gameBoardState[y][x].revealedInAnswerMode = true;
    }
    checkGameStatus();
  }
  renderGame();
}

// 모든 셀이 공개되었는지 확인
function isAllCellsRevealed() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (!gameBoardState[y][x].hasMine && !gameBoardState[y][x].revealed) {
        return false;
      }
    }
  }
  return true;
}

// 게임 승리 처리
function gameWin() {
  stopTimer();
  alert('모든 지뢰를 찾았습니다. 게임 종료!');
  document.removeEventListener('keydown', userMovement);
  renderGame(); // 변경된 스타일을 반영하기 위해 renderGame() 함수를 호출합니다.
  if (confirm('다시 시작하시겠습니까?')) {
    reStartGame();
  }
}

// 충돌 시 게임 오버 처리
function gameOver() {
  alert('게임 오버!');
  document.removeEventListener('keydown', userMovement);
  revealAllMines();
  renderGame(); // 변경된 스타일을 반영하기 위해 renderGame() 함수를 호출합니다.
  /*
  if (confirm('다시 시작하시겠습니까?')) {
    reStartGame();
  }
  */
}

// 지뢰 위치 공개
function revealAllMines() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (gameBoardState[y][x].hasMine) {
        gameBoardState[y][x].revealed = true;
      }
    }
  }
}

// 게임 보드 렌더링
function renderGame() {
  const gameBoard = document.querySelector('.game-board');
  gameBoard.innerHTML = '';

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      const { hasMine, revealed } = gameBoardState[y][x];

      cell.classList.remove('mine', 'revealed', 'hidden');

      if (revealed) {
        if (hasMine) {
          cell.textContent = 'X';
          cell.style.backgroundColor = 'green';
          cell.classList.add('mine');
        } else {
          const count = countNearbyMines(x, y);
          cell.textContent = count === 0 ? '' : count;
        }
        cell.classList.add('revealed');
      } else {
        cell.classList.add('hidden');
      }

      if (x === userPosition.x && y === userPosition.y) {
        cell.style.backgroundColor = answerMode ? 'blue' : 'red';
      }

      gameBoard.appendChild(cell);
    }
  }
}

// 인접한 지뢰 개수 계산
function countNearbyMines(x, y) {
  let count = 0;
  for (let offsetY = -1; offsetY <= 1; offsetY++) {
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      if (offsetX === 0 && offsetY === 0) continue;

      const posX = x + offsetX;
      const posY = y + offsetY;

      if (posX >= 0 && posX < gridSize && posY >= 0 && posY < gridSize) {
        if (gameBoardState[posY][posX].hasMine) {
          count++;
        }
      }
    }
  }
  return count;
}

// 초기화 및 게임 시작
reStartGame();

