const gameboard = ( () => {
  let board = Array(9).fill(null); 

  const resetBoard = () => {
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
    winConditions.forEach((condition) => {
      marker = currentPlayer.marker;
      if (board[condition[0]]=== marker && board[condition[1]] === marker && board[condition[2]] === marker) {
        message = currentPlayer.name + " wins the game!";
        Gameplay.displayResult(message);
      }
      else if (turnCounter === 9 && (board[condition[0]]=== marker && board[condition[1]] === marker && board[condition[2]] === marker)) {
        message = currentPlayer.name + " wins the game!";
        Gameplay.displayResult(message);
      }
      else if (turnCounter === 9 && (board[condition[0]]!== marker && board[condition[1]] !== marker && board[condition[2]] !== marker)) {
        message = "Tie Game!";
        Gameplay.displayResult(message);
      }
      else {
        return;
      }
    })
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
  let players = []
  let player1;
  let player2;
  let currentPlayer;

  const start = () => {
    player1Name = document.querySelector(".player1Name").value
    if (document.querySelector(".player1Name").value == "") {
      player1Name = "Player 1"
    }
    player2Name = document.querySelector(".player2Name").value
    if (document.querySelector(".player2Name").value == "") {
      player2Name = "Player 2"
    }
    players[0] = PlayerFactory(player1Name, "x");
    players[1] = PlayerFactory(player2Name, "o");
    fieldToggle();
    return players
  }

  player1 = players[0];
  player2 = players[1];

  let turnCounter = 0

  const makeMove = (field) => {
    player1 = players[0];
    player2 = players[1];
    currentPlayer = switchPlayers(player1, player2);
    if (field.textContent != "") {
      return;
    }
    let fieldPos = field.getAttribute("id");
    turnCounter += 1;
    gameboard.setCell(currentPlayer, fieldPos);
    console.log(currentPlayer)
    gameboard.getBoard();
    gameboard.checkForWin(turnCounter, currentPlayer);

    return {currentPlayer}
    
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
        gameboard.resetBoard()
        switchPlayers();
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

  const switchPlayers = (player1, player2) => {
    if(currentPlayer===player1){
      currentPlayer=player2;
    } else {
      currentPlayer=player1;
    }
    return currentPlayer;
  }
  
  fieldToggle();

  return {switchPlayers, makeMove, displayResult, fields, turnCounter,  fieldToggle, start, players, currentPlayer, player1, player2}

  })();


let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", Gameplay.start);

