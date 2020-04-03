/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  //loop from 0-n
  for (var i = 0; i < n; i ++) {
     var row = []
     for (var j = 0; j < n; j ++) {
       row.push(0);
     }
     row[i] = 1;
     solution.push(row);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  for(i = 2; i <= n; i ++){
    solutionCount *= i;
  }
//  return solutionCount;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
 // var solution = [[0,1,0,0],[0,0,0,1],[1,0,0,0],[0,0,1,0]];
  var newBoard = new Board({n:n});
  //if(n === 0 || n === 2 || n === 3) {
    //return 0;}
  console.log("compare", newBoard);
  //}
  var boards = newBoard.iterMult(n);
  console.log("n = ", n, " and boards = ", boards);
  //console.log( "HEY THERE",boards);
  for (var m = 0; m < boards.length; m ++) {
     var solution = new Board(boards[m]);
//     newBoard = new Board({n:n});
//     for(let i = 0; i < n; i ++){
//       for(let j = 0; j < n; j ++){
//        newBoard.togglePiece(i,j);
//       }
//     }
     //console.log("HEY",solution);
     //console.log( "look at me" ,boards.length);
     if (solution.hasAnyQueensConflicts() === false) {
       break;
     }
  }

  //console.log('goodbye world',newBoard.get('n'));
  //console.log("HELLO", newBoard.rows());

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  console.log("LOOK FOR ME", solution.rows());
  return solution;
}

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var newBoard = new Board({n:n});
  if(n < 2) {
    return 1;
  }
  if(n < 4) {
    return 0;
  }
  // console.log("compare", newBoard);
  var boards = newBoard.iterMult(n);
  console.log("n = ", n, " and boards = ", boards);
  for (var m = 0; m < boards.length; m ++) {
     var solution = new Board(boards[m]);
     if (solution.hasAnyQueensConflicts() === false) {
       solutionCount ++;
     }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
