import { Container } from "reactstrap";
import Board from "./Board";

function Game() {
    let author = "Rodrigo Rubio"
    let year = 2022

    return (
        <Container>
            <Board />
            <div className="info">
                <p>
                    by: {author} {year}
                </p>
                <p>
                    Analisis de Algoritmos. Sodoku 3x3
                </p>
            </div>
        </Container>
    );
}

export default Game;
