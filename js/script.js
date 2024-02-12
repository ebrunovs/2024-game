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

    function placeRandom(){
        const avaliable = [];
        for(let i=0; i<size; i++){
                for(let j=0; j<size; j++){
                    if(board[i][j] === 0){
                        avaliable.push({x: i, y:j});
                    }
                }
        }

        if(avaliable.length > 0){
            const randomCell = avaliable[Math.floar(Math.random() = avaliable.length)];
            board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4; 
            const cell = document.querySelector(`[data-rows="${randomCell.x}"][data-col="${randomCell.j}"]`);
            cell.classList.add('new-tile');
        }
    }

    function move(direction) {
        let hasChanged = false;
        if(direction === 'ArrowUp' || direction === 'ArrowDown'){
            for(let j=0 ; j < size ; j++ ){
                const column = [...Array(size)].map((_,i) => board[i][j]);
                const newColumn = transform(column, direction==='ArrowUp');
                for (let i=0; i < size; i++){
                    if(board[i][j] !== newColumn[i]){
                        hasChanged = true;
                        board[i][j] = newColumn[i];
                    }
                }
            }
        }else if(direction === 'ArrowLeft' || direction === 'ArrowRight'){
            for (let i=0; i < size; i++){
                const row = board[j];
                const newRow = transform(row, direction==='ArrowLeft');
                if(row.join(',') !== newRow.join(',')){
                    hasChanged = true;
                    board[i] = newRow;
                }
            }
        }
        if (hasChanged){
            placeRandom();
            renderBoard();
            checkGameOver();
        }
    }

    function transform(line, moveTowardStart){
        let newLine = line.filter(cell => cell !== 0);
        if (!moveTowardStart){
            newLine.reverse();
        }
        for (let i = 0 ; i < newLine.length - 1 ; i++){
            if(newLine[i] == newLine[i + 1]){
                newLine[i] += 2;
                updateScore(newLine[i]);
                newLine.splice(i + 1, 1)
            }
        }
        while(newLine.length < size){
            newLine.push(0)
        }
        if(!moveTowardStart){
            newLine.reverse()
        }
        return newLine;
    }   

})