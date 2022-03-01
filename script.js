const gameboard = ( () => {
  let board = Array(9).fill(null); 

  const resetBoard = (result, resetBtn) => {
    board = Array(9).fill(null);;
    getBoard();
    (document.querySelector(".gameControls")).lastChild.remove();
    (document.querySelector(".gameControls")).lastChild.remove();
  };
  
  // gets the current board array and applies the contents to the game board 
  const getBoard = () => {
    let fields = Array.from(document.querySelectorAll(".field"));
    for (i = 0; i < (board).length; i++) {
      fields[i].textContent = board[i];
      }
      fields.forEach(field => {
        field.disabled = false;
        })
  };

  //get value from DOM (marker and position), set board array value
  const setCell = (currentPlayer, fieldPos) => {
    board[fieldPos] = currentPlayer.marker;
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
  const checkForWin = (turnCounter, currentPlayer) => {
    if (turnCounter === 9) {
      message = "Tie Game!";
      Gameplay.displayResult(message);
    }
    else {
      winConditions.forEach((condition) => {
        marker = currentPlayer.marker;
        if (board[condition[0]]=== marker && board[condition[1]] === marker && board[condition[2]] === marker) {
        message = Gameplay.currentPlayer.name + " wins the game!";
        Gameplay.displayResult(message);
        }
        else {
          return;
        }
        
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

const Gameplay = ( () => {
  let player1Name = document.querySelector(".player1Name").value;
  let player2Name = document.querySelector(".player2Name").value;
  let player1 = PlayerFactory(player1Name, "x");
  let player2 = PlayerFactory(player2Name, "o");

  let turnCounter = 0

  let currentPlayer = player1;

  const makeMove = (field) => {
    if (field.textContent != "") {
      return;
    }
    let fieldPos = field.getAttribute("id");
    turnCounter += 1;
    gameboard.setCell(currentPlayer, fieldPos);
    gameboard.getBoard();
    gameboard.checkForWin(turnCounter, currentPlayer);
    switchPlayers();
    
  }

  let fields = Array.from(document.querySelectorAll(".field"))
  fields.forEach(field => {
    field.addEventListener("click", () => {
      makeMove(field);
    })
  });

  const displayResult = (message) => {
    const result = document.createElement("p");
      result.textContent = message;
      const resetBtn = document.createElement("button");
      resetBtn.innerText = "RESET"
      resetBtn.addEventListener("click", () => {
        gameboard.resetBoard(result, resetBtn)
      });
      document.querySelector(".gameControls").append(result, resetBtn);
      fieldToggle();
      turnCounter = 0;

  } 
  
  const fieldToggle = () => {
    fields.forEach(field => {
      if (field.disabled) {
        field.disabled = false;
      }
      else {
        field.disabled = true;
      }
    })
  }

  const switchPlayers = () => {
    if(currentPlayer===player1){
      currentPlayer=player2;
    } else {
      currentPlayer=player1;
    }
  }

  const start = () => {
    player1Name = document.querySelector(".player1Name").value;
    player2Name = document.querySelector(".player2Name").value;
    fieldToggle();

  let startBtn = document.querySelector(".startBtn");
  console.log(startBtn);
  startBtn.addEventListener("click", start);
  
  fieldToggle();
 
  }

  return {switchPlayers, start, makeMove, displayResult, fields, turnCounter, currentPlayer,fieldToggle}

  })();

