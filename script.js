const gameboard = ( () => {
  let board = Array(9).fill(null); 

  const resetBoard = () => {
    gameboard.board = new Array(9).fill(null);
  };
  
  // gets the current board array and applies the contents to the playing board 
  const getBoard = () => {
    let fields = Array.from(document.querySelectorAll(".field"));

    for (i = 0; i < board.length; i++) {
      fields[i].textContent = board[i];
      }
      console.log(board);
  };

  //get value from DOM (marker and position), set board array value
  const setCell = (marker, fieldPos) => {
    board[fieldPos] = marker;
    console.log(board);
  };

  const checkForWin = () => {
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
  }

  return {setCell, resetBoard, getBoard, setCell, checkForWin};
  
})();



// player needs to get marker assigned, depending which player plays, the marker is different..and that in turn will change the field..which should update the board array
const PlayerFactory = (name, marker) => {
    marker;
    name;
    return(name, marker)
};

player1Name = "Will";
player2Name = "Jen";

const Gameplay = ( () => {
  let player1 = PlayerFactory(player1Name, "x");
  let player2 = PlayerFactory(player2Name, "o");
  let currentPlayer = player1;
  
  let fields = Array.from(document.querySelectorAll(".field"));

    for (let i = 0; i < fields.length; i++) {
      let fieldPos = fields[i].getAttribute("id");
      fields[i].addEventListener("click", () => {
        marker = currentPlayer;
        gameboard.setCell(marker, fieldPos);
        gameboard.getBoard();
        switchPlayers();
      })
    }
  

  const makeMove = () => {
    // let marker = currentPlayer
    let fields = Array.from(document.querySelectorAll(".field"));

    fields.addEventListener("click", () =>{
      for (field in fields)
      field.value = marker;
      setCell(marker, field)
    })
  }

  const switchPlayers = () => {
    if(currentPlayer===player1){
      currentPlayer=player2;
    } else {
      currentPlayer=player1;
    }
    console.log(currentPlayer);
  }



  return {switchPlayers, makeMove}
})();

// player1Name = document.querySelector(".player1Name").value;
// player2Name = document.querySelector(".player2Name").value; 
// console.log(player1Name, player2Name);
// const startBtn = document.querySelector(".startBtn");
//   startBtn.addEventListener("click", () => {
//     Gameplay(player1Name, player2Name)
//   });