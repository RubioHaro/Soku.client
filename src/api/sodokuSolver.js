
export const validation = function (value) {
    return (!isNaN(value) && (String(value).length < 2) && value)
}

// Considering that the sudoku is valid and is not complete

export const getRestantOption = function (board) {
    let stack = []
    board.map((item, index) => {
        board[index].map((subitem, k) => {
            if (subitem !== "-" && validation(subitem)) {
                stack.add(subitem)
            }
        })
    });
    return stack
}

export const checkBoard = function (board) {
    const SUM = 15
    if (board.length !== 3) return false
    // console.log("console to check board")

    for (let row = 0; row < board.length; row++) {
        if ((parseInt(board[row][0]) + parseInt(board[row][1]) + parseInt(board[row][2])) !== SUM) {
            // console.log("suma row")
            return false
        }
        else if ((parseInt(board[0][row]) + parseInt(board[1][row]) + parseInt(board[2][row])) !== SUM) {
            // console.log("suma col")
            return false
        }
        else if ((parseInt(board[0][0]) + parseInt(board[1][1]) + parseInt(board[2][2])) !== SUM) {
            // console.log("suma dia1")
            return false
        }
        else if ((parseInt(board[0][2]) + parseInt(board[1][1]) + parseInt(board[2][0])) !== SUM) {
            // console.log("suma dia2")
            return false
        }
        else {
            // console.log("validating number")

            for (let subitem = 0; subitem < board[row].length; subitem++) {
                if (board[row][subitem] === "-" || !validation(board[row][subitem])) {
                    // console.log("invalid number: " + board[row][subitem])
                    // console.log("invalid number: " + (board[row][subitem] == "-"));

                    return false
                }
            }
        }
    }

    return true;
}

export const getSolution = function (matrix) {
    // console.log("getting SOLUTION")
    if (solveGrid(matrix)) {
        // console.log("new board")
        console.log(matrix)
    } 
    // console.log("GOD")
    return matrix;
}


var _pj;

function _pj_snippets(container) {
    function in_es6(left, right) {
        if (right instanceof Array || typeof right === "string") {
            return right.indexOf(left) > -1;
        } else {
            if (right instanceof Map || right instanceof Set || right instanceof WeakMap || right instanceof WeakSet) {
                return right.has(left);
            } else {
                return left in right;
            }
        }
    }

    container["in_es6"] = in_es6;
    return container;
}

_pj = {};

_pj_snippets(_pj);

function solveGrid(grid) {
    var col, row;

    for (var i = 0, _pj_a = 9; i < _pj_a; i += 1) {
        row = Number.parseInt(i / 3);
        col = i % 3;

        if (grid[row][col] === 0 || grid[row][col] === '-') {
            for (var value = 1, _pj_b = 10; value < _pj_b; value += 1) {
                if (!(_pj.in_es6(value, grid[0]) || _pj.in_es6(value, grid[1]) || _pj.in_es6(value, grid[2]))) {
                    grid[row][col] = value;

                    if (checkBoard(grid)) {
                        // console.log("Grid Complete and Checked");
                        return true;
                    } else {
                        if (solveGrid(grid)) {
                            return true;
                        }
                    }
                }
            }

            break;
        }
    }
    // console.log("Backtrack");
    grid[row][col] = 0;
}

// export const getSolutionRec = function (board) {
//     //A backtracking/recursive to check all possible combinations until get sol
//     // get next empty cell
//     console.log("size: " + board.length * board.length)
//     console.log(board)
//     for (let index = 0; index < board.length * board.length; index++) {
//         let row = parseInt(index / 3)
//         let col = index % 3

//         if (board[row][col] === "-") {
//             console.log(`operating in position [${row}][${col}]:` + board[row][col])

//             for (let sub_index = 1; sub_index < (board.length * board.length) + 1; sub_index++) {
//                 if (!(board[0].includes(sub_index) || board[1].includes(sub_index) || board[2].includes(sub_index))) {
//                     console.log("subidex " + sub_index + " is not in board rows")
//                     console.log(`new value founded[${row}][${col}]:` + board[row][col])
//                     console.log(`setting new value in board[${row}][${col}]: ${sub_index}`)
//                     board[row][col] = sub_index


//                     if (checkBoard(board)) {
//                         console.log("Grid Complete and Checked")
//                         return true
//                     }
//                     else if (getSolutionRec(board))
//                         return true
//                 }
//             }
//             break
//         }
//         console.log("Backtraking...")
//         board[row][col] = "-"

//     }
// }