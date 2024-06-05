let playerName = ''
let diffLevel = 0
const elemPlayerName = document.querySelector('#nameInputID')

// -----------------------------------------------------------------------

function saveName()
{
    playerName = elemPlayerName.value
    localStorage.setItem('playerName', playerName);
}

function saveDiff(n){
    diffLevel = n
    localStorage.setItem('diffLevel', diffLevel);
}

function continueToGame(){
    window.location.href = 'game_page.html';
}