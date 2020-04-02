var iterMult = function(n, base, display){
  let filteredArrArrs = [];
  let filteredStrArrs = [];
  let filteredBoardArrs = [];
  let filteredBoardStrs = [];
  for(let iperm = 0; iperm < base ** n; iperm ++){
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
    for(let place = 0; place < n; place ++){
      let digit = i % base;
      if(digit <= digitLast){
        success = false;
        break;
      }
      digitLast = digit;
      i -= digit;
      i /= base;
      subArray.unshift(digit);
      str = String(digit) + str;
      boardArr[digit] = 1;
      boardStr = boardStr.slice(0,digit) + "1" + boardStr.slice(digit +1);
    }
    if(success){
      filteredArrArrs.push(subArray);
      filteredStrArrs.push(str);
      filteredBoardArrs.push(boardArr);
      filteredBoardStrs.push(boardStr);
    }
  }
  console.log((display == 0)?filteredArrArrs:(display == 1)?filteredStrArrs:(display == 2)?filteredBoardArrs:filteredBoardStrs);
}

iterMult(3, 6, 3);