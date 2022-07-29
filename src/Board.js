// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // I - rowIndex (number)
      // O - boolean
      // C -
      // E -
      // [0,0,0,0]
      // [1,0,1,0]
      // [0,0,0,0]
      // [0,0,0,0]

      // Sum the row to see if multiple pieces exists
      let count = _.reduce(this.get(rowIndex), (acc, space) => acc += space, 0);

      return (count > 1) ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      // I -
      // O - boolean

      // _.each(this.rows(), (row) => rows.hasRowConflictAt(row));
      // Iterate through each row of board
      for (let i = 0; i < this.get('n'); i++) {
        // Call hasRowConflictAt, if true
        if (this.hasRowConflictAt(i)) {
          // return true
          return true;
        }
      }
      // return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // I - number
      // O - boolean

      // create count var
      let count = 0;
      // Iterate through each row
      for (let i = 0; i < this.get('n'); i++) {
        let row = this.get(i);
        // if index at colInd is 1
        if (row[colIndex]) {
          // increment count
          count++;
        }
        // if count > 1
        if (count > 1) {
          // return true
          return true;
        }
      }

      // return false
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // Iterate through rows
      for (let i = 0; i < this.get('n'); i++) {
        // call hasCOlConflictAt
        if (this.hasColConflictAt(i)) {
          // if true
          return true;
        }
      }
      //otherwise return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // I - (number) Column Index in first row
      // O - boolean

      //create count variable
      let column = majorDiagonalColumnIndexAtFirstRow;
      let count = 0; // this.get(0)[majorDiagonalColumnIndexAtFirstRow];
      // iterate through rows (1 below current row)
      for (let i = 0; i < this.get('n'); i++) {
        let row = this.get(i);
        // if nextColInd
        if (row[column]) {
        // increment count
          count++;
        }
        // if count > 1
        if (count > 1) {
          // return true
          return true;
        }
        //increment nextColInd
        column += 1;
      }
      // otherwise return false
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //iterate through rows
      for (let i = 1 - this.get('n'); i < this.get('n'); i++) {
      //call hasMajorDiagonalConflictAt on current row
        if (this.hasMajorDiagonalConflictAt(i)) {
          //return true
          return true;
        }
      }
      //otherwise
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // I - (number) Column Index in first row
      // O - boolean

      // [0,0,0,0]
      // [1,0,1,0]
      // [0,0,0,0]
      // [0,0,0,0]

      //create count variable
      let column = minorDiagonalColumnIndexAtFirstRow;
      let count = 0;
      // iterate through rows (1 below current row)
      for (let i = 0; i < this.get('n'); i++) {
        let row = this.get(i);
        // if nextColInd
        if (row[column]) {
        // increment count
          count++;
        }
        // if count > 1
        if (count > 1) {
          // return true
          return true;
        }
        //decrement nextColInd
        column--;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //iterate through rows
      for (let i = 0; i < (this.get('n') * 2); i++) {
        //call hasMinorDiagonalConflictAt on current row
        if (this.hasMinorDiagonalConflictAt(i)) {
          //return true
          return true;
        }
      }
      //otherwise
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
