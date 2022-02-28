const gameboard = ( () => {
  let board = Array(9).fill(null); 

  const resetBoard = () => {
    board = Array(9).fill(null);;
    getBoard();
  };
  
  // gets the current board array and applies the contents to the game board 
  const getBoard = () => {
    let fields = Array.from(document.querySelectorAll(".field"));
    for (i = 0; i < (board).length; i++) {
      fields[i].textContent = board[i];
      }
  };

  //get value from DOM (marker and position), set board array value
  const setCell = (marker, fieldPos) => {
    board[fieldPos] = marker;
  };

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const checkForWin = (turnCounter, marker) => {
    if (turnCounter === 9) {
      const tieMsg = document.createElement("p");
      tieMsg.textContent = "Tie Game!";
      const resetBtn = document.createElement("button");
      resetBtn.innerText = "RESET"
      resetBtn.addEventListener("click", resetBoard);
      document.querySelector(".gameControls").append(tieMsg, resetBtn);
    }
    else {
      winConditions.forEach((condition) => {
        if(board[condition[0]]=== marker && board[condition[1]] === marker && board[condition[2]] === marker)
        console.log("winner!");
      })
  }
}


  return {setCell, resetBoard, getBoard, setCell, checkForWin};
  
})();



// player needs to get marker assigned, depending which player plays, the marker is different..and that in turn will change the field..which should update the board array
const PlayerFactory = (name, marker) => {
    name;
    marker;
    return {name, marker}
};

let player1Name = "Will";
let player2Name = "Jen";

const Gameplay = ( () => {

  let player1 = PlayerFactory(player1Name, "x");
  let player2 = PlayerFactory(player2Name, "o");
  let turnCounter = 0

  let currentPlayer = player1;

  const makeMove = (field) => {
    if (field.textContent != "") {
      return;
    }
    let fieldPos = field.getAttribute("id");
    marker = currentPlayer.marker;
    turnCounter += 1;
    gameboard.setCell(marker, fieldPos);
    gameboard.getBoard();
    switchPlayers();
    gameboard.checkForWin(turnCounter, marker);
  }


  let fields = Array.from(document.querySelectorAll(".field"));
  fields.forEach(field => {
    field.addEventListener("click", () => {
      makeMove(field)
    })
  });


  //Stick this in win conditions after
 


    
   




  const switchPlayers = () => {
    if(currentPlayer===player1){
      currentPlayer=player2;
    } else {
      currentPlayer=player1;
    }
  }

function start() {
  const startBtn = document.querySelector(".startBtn");
  startBtn.addEventListener("click", () => {
    player1Name = document.querySelector(".player1Name").value;
    player2Name = document.querySelector(".player2Name").value;
    console.log(player1Name, player2Name);
    setPlayers(player1Name. player2Name);
  });
}

start();

  return {switchPlayers, start, makeMove, fields, turnCounter}
  })();

