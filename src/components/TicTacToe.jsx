import { useState } from "react";
import "./Tictactoe.css";

const Tictactoe = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill("")); // [0, 1, 2, 3, 4, 5, 6, 7, 8
  const [winner, setWinner] = useState();
  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    let filledCells = squares.filter((cell) => cell !== "");
    if (filledCells.length === 9) {
      setWinner("draw");
      return;
    }

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          // do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };
  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("already filled");
      return;
    }
    let squares = [...cells];
    if (turn === "X") {
      setTurn("O");
      squares[num] = "X";
    } else {
      setTurn("X");
      squares[num] = "O";
    }
    checkForWinner(squares);
    setCells(squares);
    console.log(squares);
  };
  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}> {cells[num]}</td>;
  };
  return (
    <div className="container">
      <table>
        turn : {turn}
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <div className="winner">
          {winner === "draw" ? (
            <h1> Berabere </h1>
          ) : (
            <h1> Kazanan:  {winner}</h1>
          )}
          <button id="button" onClick={() => setCells(Array(9).fill(""))}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Tictactoe;
