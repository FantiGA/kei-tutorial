import Head from "@/components/Head";
import { Button, Grid } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


// 定义IBoardElements的形式
interface IBoardElements {
  x: number;
  y: number;
  row: number;
  col: number;
  stone: number;
}


const tempData = [
  [4, 3, true], // 下标是 0，对应着第 n+1 步落子的坐标和颜色。true为白色，false为黑色
  [4, 4, false], // 下标是 1
  [3, 4, true], // 下标是 2
  [3, 3, false], // 下标是 3
];


const tempData2 = [
  [4, 3, true], // 下标是 0，对应着第 n+1 步落子的坐标和颜色。true为白色，false为黑色
];


// Declare the boardState to keep track of the stones on the board
const initialBoardState: number[][] = [
  [0, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 0, 0, 0, 0, 0, 0],
  [2, 2, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const boardSize = 9;
const intersectionSize = 30;
const boardWidth = boardSize * intersectionSize;

const Game: FC = () => {
  const [boardState, setBoardState] = useState<number[][]>(initialBoardState);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [boardElements, setBoardElements] = useState<IBoardElements[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkAnswer = useCallback((row: number, col: number) => {
    if (row === 1 && col === 0) {
      setTimeout(() => {
        alert("Correct!");
      }, 1000);
    } else {
      setTimeout(() => {
        alert("Incorrect!");
      }, 1000);
    }
  }, []);

  // <Stack sx={{ width: '100%' }} spacing={2}>
  //   <Alert severity="error">
  //     <AlertTitle>Error</AlertTitle>
  //     不正解 — <strong>check it out!</strong>
  //   </Alert>
  //   <Alert severity="success">
  //       <AlertTitle>Success</AlertTitle>
  //       This is a success alert — <strong>check it out!</strong>
  //     </Alert>
  //   </Stack>
  /**
   * 放棋子的方程
   *
   * @param row
   * @param col
   */
  const placeStone = useCallback((row: number, col: number) => {
    if (boardState[row][col] === 0) {
      const newBoardState = [...boardState];
      newBoardState[row][col] = currentPlayer;
      setBoardState(newBoardState);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setIsCorrect(isCorrect);
      checkAnswer(row, col);
    }
    console.log(row, col);
  }, [boardState, currentPlayer]);

  

  // const checkAnswer = (row: number, col: number) => {
  //   if (row === 1 && col === 0) {
  //     alert("Correct!");
  //   } else {
  //     alert("Incorrect!");
  //   }
  // };
  // checkAnswer(row,col);

  // const checkAnswer = () => {
  // Check if the clicked place is correct
  // const isCorrectPlace = true; // Replace this with your logic to check if the place is correct

  // if (isCorrectPlace) {
  // If the place is correct, show an alert
  // alert("Correct!");
  // Then navigate to the "/Game" page
  // } else {
  //   alert("Uncorrect!");
  // If the place is incorrect, do something else (optional)
  // }
  // };

  /**
   * Function to render the intersections and stones based on the boardState
   *
   * @returns {IBoardElements[]}
   */
  // const renderBoard = (): IBoardElements[] => {
  //   const elements: IBoardElements[] = [];

  //   for (let row = 0; row < boardSize; row++) {
  //     for (let col = 0; col < boardSize; col++) {
  //       const x = col * intersectionSize + 5;
  //       const y = row * intersectionSize; 5;
  //       const stone = boardState[row][col];

  //       elements.push({
  //         x,
  //         y,
  //         row,
  //         col,
  //         stone,
  //       });
  //     }
  //   }

  //   return elements;
  // };

  // 在最初的棋盘上画横线和竖线
  useEffect(() => {
    const board = document.getElementById("board");
    if (board) {
      for (let i = 0; i < boardSize; i++) {
        const verticalLine = document.createElement("div");
        verticalLine.className = "line vertical-line";
        verticalLine.style.left = `${i * intersectionSize}px`;
        board.appendChild(verticalLine);
        board.appendChild(verticalLine);


        const horizontalLine = document.createElement("div");
        horizontalLine.className = "line horizontal-line";
        horizontalLine.style.top = `${i * intersectionSize}px`;
        board.appendChild(horizontalLine);

      }
    }
  }, [boardSize]);

  useEffect(() => {
    const elements: IBoardElements[] = [];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const x = col * intersectionSize + 5;
        const y = row * intersectionSize + 5;
        const stone = boardState[row][col];

        elements.push({
          x,
          y,
          row,
          col,
          stone,
        });
      }
    }
    // console.log(elements);
    setBoardElements(elements);

  }, [boardState, currentPlayer]);

  // useEffect(() => {
  //   isCorrect !== null && alert(isCorrect ? "Correct!" : "Incorrect!");
  // }, [isCorrect]);
  //   <Stack sx={{ width: '100%' }} spacing={2}>
  //     <Alert severity={isCorrect ? "success" : "error"}>
  //       <AlertTitle>{isCorrect ? "Success" : "Error"}</AlertTitle>
  //       {isCorrect ? "This is a success alert" : "正解"} — <strong>check it out!</strong>
  //     </Alert>
  //   </Stack>
  
  
  

  return (
    <>
      {/* 把棋盘显示在页面上 */}
      <Head />
      <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
        <Grid item>
          <div
            id="board"
            style={{
              position: "relative",
              width: `${boardWidth}px`,
              height: `${boardWidth}px`,
              border: "1px solid #000",
            }}
          >
            {boardElements.map((item, index) => (
              <div
                key={`intersection-${item.row}-${item.col}-${index}`}
                className="intersection"
                style={{ left: `${item.x}px`, top: `${item.y}px`, }}
                onClick={() => placeStone(item.row, item.col)}

              >
                {item.stone === 1 && <div className="stone black" />}
                {item.stone === 2 && <div className="stone white" />}
              </div>

            ))}
          </div>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px", marginTop: "6px" }}>
            <Grid item>
              <Button variant="contained">NEXT</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
    // checkAnswer();
  );
};

export default Game;
