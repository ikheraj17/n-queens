var iterMult = function(n, base, display){
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

  console.log((display == 0) ? filteredArrArrs : (display == 1) ? filteredStrArrs : (display == 2) ? filteredBoardArrs:(display == 3) ? filteredBoardStrs : filteredSquareBoards);
}

iterMult(4, 16, 4);