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
  // // I - number (row & column size, & pieces)
  // // O - array of arrays (matrix)

  // // Make board
  var solution = new Board({n: n}); // [[0,0], [0,0]]
  var pieces = n;
  console.log('solution:', solution, 'pieces:', pieces);
  //loop through row and column
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      //place piece at each column and decrement n
      solution.togglePiece(i, j);
      pieces--;
      //if there is any conflict at either row or column we will pick the piece back up and re increment n
      if (solution.hasRowConflictAt(i) || solution.hasColConflictAt(j)) {
        solution.togglePiece(i, j);
        pieces++;
      }
    }
  }

  console.log(solution);
  //base case
  //if n is 0
  if (!pieces) {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  }
  // console.log('before piece: ', solution);

  // // Base Case
  // // When n is 0
  // if (n === 1) {
  //   // Iterate through the columns
  //   _.each(solution.get(n - 1), function(column, i) { // [0]
  //     // If no collisons
  //     if (!solution.hasRowConflictAt(n - 1) && !solution.hasColConflictAt(i)) {
  //       // Place Piece
  //       solution.togglePiece(n - 1, i);
  //     }
  //   });
  //   // Return board
  //   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //   console.log('after piece: ', solution);
  //   return solution;
  // }

  // // Recursive Case
  // // When n is not 0
  // //
  // // Recursively call findNRooksSolution on decremented n
  // return solution = findNRooksSolution(n - 1); // [0]



};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; // starts at 0

  // Create board
  var board = new Board({n: n});

  // If you hit the base case, you found a solution

  var helper = function (row) {
    // Base Case
    // If on last row
    if (row === n) {
      // Increment solution count
      solutionCount++;
      // exit out of recursive loop
      return;
    }
    // Recursive Case
    // Iterate through columns
    for (let col = 0; col < n; col++) {
      // Add a piece
      board.togglePiece(row, col);
      // If no conflicts, recursively call helper function on next row
      if (!board.hasAnyRooksConflicts()) { helper(row + 1); }
      // else remove piece if conflict
      board.togglePiece(row, col);
    }
  };
  helper(0);

  // return solution count
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
