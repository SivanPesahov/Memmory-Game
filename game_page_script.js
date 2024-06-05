let playerName = localStorage.getItem('playerName');
let diffLevel = localStorage.getItem('diffLevel');
const elemHelloMessage = document.querySelector('#hello_playerName')
elemHelloMessage.innerText = `Hi ${playerName}, ready to play?`

//----------------------------------------------------------------------

let seconds = 0;
let intervalId;
const elemTime = document.querySelector('#time_counter')
let counting = true

function countSeconds() {
    seconds++; 
    if (counting == false) {
        clearInterval(intervalId); 
    }
    elemTime.innerText = `Time passed: ${seconds} seconds`
}

intervalId = setInterval(countSeconds, 1000);

//----------------------------------------------------------------------

let shownPics = 0
let points = 0
let picId1 = ''
let picId2 = ''
let picSRC1 = ''
let picSRC2 = ''
let arr = []
let historyArr = []


let picArr = [
    "Pictures/nat-0.jpg",
    "Pictures/nat-1.jpg",
    "Pictures/nat-2.jpg",
    "Pictures/nat-3.jpg",
    "Pictures/nat-4.jpg",
    "Pictures/nat-5.jpg",
    "Pictures/nat-6.jpg",
    "Pictures/nat-7.jpg",
    "Pictures/nat-8.jpg",
    "Pictures/nat-9.jpg"
]

let elemGridContainer = document.querySelector('#grid-container')

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

    let newArr = shuffleArray(picArr)
    
    for(let i = 0; i < diffLevel; i++){
        arr.push(newArr[i])
    }
    
    for(let i = 0; i < diffLevel; i++){
        elemGridContainer.innerHTML += `<img src="./Pictures/black.jpg" class = 'grid-item' id = "id${i}" width=100 height=100 onclick = "showPic(this)" style="background-image:url(./${arr[i]}) ;">`
    }
    let secondArr = shuffleArray(arr)
    for(let i = diffLevel; i < diffLevel*2; i++){
        elemGridContainer.innerHTML += `<img src="./Pictures/black.jpg" class = 'grid-item' id = "id${i}" width=100 height=100 onclick = "showPic(this)" style="background-image:url(./${secondArr[i-diffLevel]}) ;">`
    }

function showPic(x){
    shownPics ++;
    if(shownPics > 1){  
        
        let backgroundImageURL = getComputedStyle(x).backgroundImage; 
        x.src = backgroundImageURL.slice(4, -1).replace(/"/g, "");
        picId2 = x.id
        picSRC2 = x.src
        if(picSRC1 !== picSRC2){
            
            let elemNew = document.querySelector("#" + picId1);

            setTimeout(function() {
                x.src = "./Pictures/black.jpg"
                elemNew.src = "./Pictures/black.jpg";
                resetValues()
            }, 2000);
        }
        else{
            resetValues()
            points += 1
            checkForWin()
        } 
    }
    else{   
        let backgroundImageURL = getComputedStyle(x).backgroundImage; 
        x.src = backgroundImageURL.slice(4, -1).replace(/"/g, "");
        picSRC1 = x.src
        picId1 = x.id

    }
    
}

function resetValues(){
    picSRC1 = ''
    picSRC2 = ''
    picId1 = ''
    picId2 = ''
    shownPics = 0
}


//----------------------------------------------------------------------

elemWinMessage = document.querySelector('#winID')

function checkForWin(){
    if(points == diffLevel){
        elemWinMessage.innerText = 'You won!'
        counting = false
        // addToHistory()
        // showHistory()
    }
}

function restart(){
    
    location.reload();
}

function quit(){
    playerName = ''
    diffLevel = 0
    window.location.href = 'home_page.html';
}

//----------------------------------------------------------------------

const elemHistoryTable = document.querySelector('table')

function showHistory(){
    elemHistoryTable.innerHTML = "<tr><th>User name</th><th>Time</th></tr>"
    
    for (i of historyArr){
        const elemRowInTable = `<tr><td> ${i.playerName} </td><td> ${i.seconds} </td></tr>`
        elemHistoryTable.innerHTML += elemRowInTable
    }
}

function addToHistory(){
    let newOBJ = {playerName, seconds}
    historyArr.push(newOBJ)
    
}

// function addToHistory() {
//     let newOBJ = { playerName, seconds };
//     let historyArr = JSON.parse(localStorage.getItem('historyArr')) || [];
//     historyArr.push(newOBJ);
//     localStorage.setItem('historyArr', JSON.stringify(historyArr));
// }

// // Function to show history
// function showHistory() {
//     elemHistoryTable.innerHTML = "<tr><th>User name</th><th>Time</th></tr>";
//     let historyArr = JSON.parse(localStorage.getItem('historyArr')) || [];
//     for (let i of historyArr) {
//         const elemRowInTable = `<tr><td>${i.playerName}</td><td>${i.seconds}</td></tr>`;
//         elemHistoryTable.innerHTML += elemRowInTable;
//     }
// }











