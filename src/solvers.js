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
  let solution = new Board({n: n});
  let rooks = n;
  //loop through row and column
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      //place piece at each column and decrement n
      solution.togglePiece(row, col);
      rooks--;
      //if there is any conflict at either row or column we will pick the piece back up
      //and re increment n
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(row, col);
        rooks++;
      }
    }
  }
  //base case
  //if n is 0
  if (rooks === 0) {
    solution = solution.rows();
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  }
  // // Create helper function which takes in a row
  // var helper = function (row) {
  //   // Base Case, if on last row
  //   if (row === n) {
  //     console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //     return solution;
  //   }

  //   // Recursive Case,
  //   for (let col = 0; col < n; col++) {
  //     solution.togglePiece(row, col);
  //     if (!solution.hasAnyRooksConflicts()) { helper(row++); }
  //     solution.togglePiece(row, col);
  //   }
  // };
  // return helper(0);
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
  console.log('n', n);
  // Make board
  if (n === 0) { return {n: 0}; }
  var solution = new Board({n: n});
  // make helper function
  var helper = function (row) {
  // Base Case
  // if n equals # of rows, return board
    if (n === row) {

      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      // console.log(JSON.parse(JSON.stringify(solution.rows())));
      console.log(JSON.parse(JSON.stringify(solution.rows())));
      return solution.rows();
    }
    // Recursive Case
    // Iterate through columns
    else {
      for (let col = 0; col < n; col++) {
        // add piece
        solution.togglePiece(row, col);
        // if no conflict, recursively call helper func
        if (!solution.hasAnyQueensConflicts()) {
          let variable = helper(row + 1);
          if (variable) { return variable; }
          //return helper(row + 1);
        }
        console.log(solution.rows());
        // else, remove piece
        solution.togglePiece(row, col);

      }
    }
  };
  // call helper func with arg 0
  let thing = helper(0) || solution.rows();
  return thing;
  // return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //set counter to 0
  var solutionCount = 0;

  //create new board
  const queenSolutions = new Board({n: n});
  //declare helper func
  let helperFunc = function(row) {
    //base case
    //if row is equal to 0
    if (row === n) {
      //increment solution count
      solutionCount++;
      //return
      return;
    }
    //recursiven case
    //iterate through columns
    for (let col = 0; col < n; col++) {
      //add a piece
      queenSolutions.togglePiece(row, col);
      //if no conflicts, call helper func on row + 1
      if (!queenSolutions.hasAnyQueensConflicts ()) { helperFunc(row + 1); }
      //otherwise
      //take piece off board due to conflict
      queenSolutions.togglePiece(row, col);
    }
  };
  //call helper func with n
  helperFunc(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};