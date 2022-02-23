const Gameboard = (() => {
  let board = Array(9).fill(null); 
  let fields = document.querySelectorAll(".field");
  let field = [...fields];

  testArray = ["x", "x", "o", "x", null, "o", null, null, null];


  //set squares from board into array, and from array
  const setBoard = () => {
   
    for (i = 0; i < testArray.length; i++) {
    field[i].textContent = testArray[i];
    }
  }

  const resetBoard = () => {
    Gameboard.board = new Array(9).fill(null);
  }

  const getBoard = () => {

  }

  return {setBoard, resetBoard, getBoard};
  
})();

// player needs to get marker assigned, depending which player plays, the marker is different..and that in turn will change the field..which should update the board array
const PlayerFactory = () => {
  const marker;
  const name;

  const playMarker = () => {
  
  };
  const setName = () => {

  };

  return {playMarker, setName};
};

const Gameplay = (() => {

  const checkForWin = () => {

  };

  return {checkForWin}
})();