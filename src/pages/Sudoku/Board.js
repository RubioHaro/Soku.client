// import React from 'react';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import { useState } from 'react';
import { getSolution, validation } from './../../api/sodokuSolver'
import { checkBoard } from "../../api/sodokuSolver";

function Board() {
    const elements = [[8, '-', '-'], ['-', '-', 7], ['-', 9, '-']];
    const [board, setBoard] = useState(elements)
    const [modified, setModified] = useState(false)
    const [loading, setLoading] = useState(false)
    const [checking, setChecking] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Nada parece funcionar :c")
    const stack = []

    for (let index = 0; index < elements.length; index++) {
        for (let subindex = 0; subindex < elements[index].length; subindex++) {
            let value = elements[index][subindex]
            if (validation(value))
                stack.push(value)
        }
    }


    const clickHandler = (event) => {
        event.target.select();
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }


    // let props = elements

    function call_getSolution() {
        setLoading(true)
        if (modified) {
            setError(true)
            setErrorMessage("Ha modificado el cuadro, de momento get solution solo funciona sin haber ingreso valores,intenta refrescar la pagina")
        } else {
            try {
                setModified(true)
                setBoard(getSolution(board))
                clickHandler()

            } catch (error) {
                setError()
                setErrorMessage(error)
            }
            call_checkBoard(false)
        }
        delay(1000).then(() => setLoading(false));
        // console.log("Inicializando sodokuSolver")
        // console.log("sodokusolver ended")
    }

    function call_checkBoard(withBool = true) {
        setChecking(true && withBool)

        if (checkBoard(board)) {
            setError(true)
            setErrorMessage("Se ha resuelto el sudoku!")
            // alert("Funciona!!!!")
        } else {
            setError(true)
            setErrorMessage("Te has equivocado, revisa de nuevo")
        }
        delay(1000).then(() => setChecking(false));
    }

    const call_validation = (value) => {
        // console.log(" confirming of stack " + stack.includes(value) + " " + value)
        if (stack.includes(value)) {
            return validation(value)
        }
        return false
    }

    const updateBoard = (new_value, index, subindex) => {
        setModified(true)
        if (validation(new_value)) {
            // console.log(`Trying to update the board; data: ${new_value}, ${index}, ${subindex}`)
            setBoard(old_board => {
                const board = old_board.map((item, j) => {
                    // console.log("mapping board: " + j)
                    if (j === index) {
                        const linelist = old_board[index].map((subitem, k) => {
                            // console.log("mapping sub-board[" + j + "]: " + k)
                            if (k === subindex) {
                                return new_value
                            } else {
                                return subitem
                            }
                        })
                        return linelist
                    } else {
                        return item;
                    }
                });
                // console.log("returning board")
                // console.log(board)
                return board;
            });
            document.getElementById(`board-input-${index}-${subindex}`).classList.remove("board-error")
            setError(false)
        } else {
            if (new_value !== "-") {
                // console.log("ingresa un numero por favor")
                // console.log(`board-input-${index}-${subindex}`)
                document.getElementById(`board-input-${index}-${subindex}`).classList.add("board-error")
                setError(true)
                setErrorMessage("Seguró sos español")
            }
        }
        document.getElementById(`board-input-${index}-${subindex}`).blur()
    };

    return (
        <>
            <Container>
                <div className='error-panel'>
                    {(error && errorMessage) &&
                        <h2>
                            Buluc: {errorMessage}.
                        </h2>
                    }
                </div>

                {/* <Table borderless> */}
                {/* <tbody className='puzzleBoard'> */}
                <div>

                    {board.map((subboard, index) => {
                        return (
                            <Row key={index}>
                                {subboard.map((value, subindex) => {

                                    if (call_validation(value))
                                        return (
                                            <Col key={subindex} scope="row">
                                                <input type="text" disabled id={`board-input-${index}-${subindex}`} className='board-input fixed-inp' onClick={clickHandler} onChange={e => updateBoard(e.target.value, index, subindex)} required value={value} ></input>
                                            </Col>
                                        )
                                    else
                                        return (
                                            <Col key={subindex} scope="row">
                                                <input type="text" id={`board-input-${index}-${subindex}`} className='board-input' onClick={clickHandler} onChange={e => updateBoard(e.target.value, index, subindex)} required value={value} ></input>
                                            </Col>
                                        )
                                })}
                            </Row>
                        )
                    })}

                </div>
                {/* </tbody> */}
                {/* </Table> */}


                <Button onClick={call_getSolution} className="game-bnt">Get Solution&nbsp;
                    {loading && <Spinner
                        color="white"
                        size="sm"
                    >
                        Loading...
                    </Spinner>}
                </Button>
                <Button onClick={call_checkBoard} className="game-bnt">Check game &nbsp;
                    {checking && <Spinner
                        color="white"
                        size="sm"
                    >
                        Loading...
                    </Spinner>}
                </Button>
            </Container>
        </>
    );
}

export default Board;
