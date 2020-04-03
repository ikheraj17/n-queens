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





    iterMult : function(n) {
      let display = 4;
      let base = n * n;
      let filteredArrArrs = [];
      let filteredStrArrs = [];
      let filteredBoardArrs = [];
      let filteredBoardStrs = [];
      let filteredSquareBoards = [];
      for(let iperm = 0; iperm < base ** n; iperm ++){
        //example for when iperm is 126
        //we are set
        //i is a number which starts as iperm will lose
        //one digit at a time during the loop over "place"
        let i = iperm;
        let subArray = [];
        let str = '';
        let boardArr = [];
        let boardStr = '';
        for(let j = 0; j < base; j ++){
          boardArr.push(0);
          boardStr = boardStr += '0';
        }
        let digitLast = -Infinity;
        let success = true;
        // This loop is over the "places" of the number, starting at the 1's place, then to the base's place, etc
        for(let place = 0; place < n; place ++){
          // This is the 1's digit. in example below, we are using iperm = 621.
          let digit = i % base; // ---> for 621, digit equals 1
          // This logic ensures that this
          if(digit <= digitLast){
            success = false;
            break;
          }
          digitLast = digit; // --- for 621, digit last is now equal to 1
          i -= digit; // i = 621 - digit of 1, answer is 620, for next inner loop, we use
          //the value of i that we get from our first inner loop, which is 62. Result
          //of running line 32 on second inner loop is that i is now 60.
          i /= base;// then, 62, for second inner loop, i is now 6.
          subArray.unshift(digit); //puts our digit 1 to the front of an array
          str = String(digit) + str; //add digit to empty string
          boardArr[digit] = 1;
          boardStr = boardStr.slice(0,digit) + "1" + boardStr.slice(digit + 1);
        }
        if(success){
          filteredArrArrs.push(subArray);
          filteredStrArrs.push(str);
          filteredBoardArrs.push(boardArr);
          filteredBoardStrs.push(boardStr);

          var filteredSquareBoard = [];
          for (let i = 0; i < n; i ++) {
            let boardRow = [];
            for (let j = 0; j < n; j ++) {
             let index = n * i + j;
              boardRow.push(boardArr[index]);
            }
            filteredSquareBoard.push(boardRow);
          }
          filteredSquareBoards.push(filteredSquareBoard);
        }

      }
      return filteredSquareBoards;
/*
      console.log((display == 0) ? filteredArrArrs : (display == 1) ? filteredStrArrs : (display == 2) ? filteredBoardArrs:(display == 3) ? filteredBoardStrs : filteredSquareBoards);
*/
    },




   hasRowConflictAt : function(rowIndex) {
      var selectedRow = this.get(rowIndex);
      var count = 0;
      for( var i = 0 ; i < selectedRow.length; i ++) {
        // increment count if you find a chess piece
        //count += (selectedRow[i] === 1) ? 1 : 0;
        if(selectedRow[i] === 1) {
          count ++;
        }
      }
      return count  > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
  //    console.log("this.get =", this.get(0));
      var n = this.get('n');
      for (var i = 0; i < n; i ++) {
        if(this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //grab zeroth row, in order to determine n
      //get n directly, actually
      var count = 0;
      var size = this.get('n');
      //loop over rows, & check element at colIndex in each one
      for (var i = 0 ; i < size; i++) {
        var row = this.get(i);
        if(row[colIndex] === 1) {
          count ++;
          if(count > 1) {
            return true
          }
        }
      }
      return false;
      //count all instances which exceed 1
      //return (inside loop) if this ever exceeds 1
      // return false outside of the loop

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var size = this.get('n');
      for(var i = 0; i < size; i ++) {
        if(this.hasColConflictAt(i)) {

          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //getting size of board
      var size = this.get('n');
      //count variable to track conflicts
      var count = 0;
      //iterating over rows
      for(var i = 0; i < size; i ++) {

        var column = i + majorDiagonalColumnIndexAtFirstRow;
        if (column >= 0 && column < size) {
          var row = this.get(i);
          if (row[column] === 1) {
            count ++;
            if(count > 1) {
              return true;
            }
          }
        }
      }
       return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n');
      for (var d = 1 - size; d < size; d ++) {
        if(this.hasMajorDiagonalConflictAt(d)){
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
       //getting size of board
       var size = this.get('n');
       //count variable to track conflicts
       var count = 0;
       //iterating over rows
       for(var i = 0; i < size; i ++) {

         var column = -i + minorDiagonalColumnIndexAtFirstRow;
         if (column >= 0 && column < size) {
           var row = this.get(i);
           if (row[column] === 1) {
             count ++;
             if(count > 1) {
               return true;
             }
           }
         }
       }
        return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var size = this.get('n');
      for (var d = 0; d < (2 * size - 1); d ++) {
        if(this.hasMinorDiagonalConflictAt(d)){
          return true;
        }
      }
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
