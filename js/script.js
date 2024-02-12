document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector(".grid");
    const size = 4;
    let board = [];
    let currentScore = 0;
    const currenteScoreElem = document.getElementById('current-score');

    let highScore = localStorage.getItem('2048-highScore') || 0;
    const highScoreElem = document.getElementById('high-score');
    highScoreElem.textContent = highScore;

    const gameOverElem = document.getElementById('game-over');

    function updateScore(value){
        currentScore += value;
        currenteScoreElem.textContent = currentScore;
        if (currentScore > highScore){
            highScore = currentScore;
            highScoreElem.textContent = highScore;
            localStorage.getItem('2048-highSocre', highScore);
        }
    }

    function restartGame(){
        currentScore = 0;
        currenteScoreElem.textContent = '0';
        gameOverElem.style.display = 'none';
        initializeGame();
    }   

    function initializeGame(){
        board = [...Array(size)].map(e => Array(size).fill(0));
        placeRandom();
        placeRandom();
        renderBoard();
    }

    function renderBoard(){
        for (let i = 0; i < size ; i++ ){
            const cell = document.querySelector(`[data-rows="${i}"][data-col="${j}"]`);
            const prevValue = cell.dataset.value;
            const currenteValue = board[i][j];
            if(currenteValue !== 0){
                cell.dataset.value = currenteValue;
                cell.textContent = currenteValue;

                if(currenteValue !== parseInt(prevValue) && !cell.classList.contains('new-tile')){
                    cell.classList.add('merged-tile');
                }
            }else{
                cell.textContent = '';
                delete cell.dataset.value;
                cell.classList.remove('merged-tile', 'new-tile');
            }
        }

        setTimeout(() => {
            const cells = document.querySelectorAll('grid-cell');
            cells.forEach(cell => {
                cell.classList.remove('marged-tile', 'new-tile');
            })
        }, 300);
    }

    
})