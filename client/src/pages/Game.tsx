/*
 * @Author: fantiga
 * @Date: 2023-07-15 11:48:30
 * @LastEditTime: 2023-07-15 17:49:44
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Game.tsx
 */

import Head from "@/components/Head";
import { Grid } from "@mui/material";
import { FC } from "react";

const Game: FC = () => {
  // 囲碁のボードのサイズ（9x9）
  const boardSize = 9;

  // ボード上の交差点の座標
  const intersectionPoints: any[] = [];
  let boardLeft = 0;
  let boardTop = 0;

  // 交差点の座標を計算
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const x = (i * 30) + 15;
      const y = (j * 30) + 15;
      intersectionPoints.push({ x, y });
    }
  }

  // 石を置く関数
  function placeStone(event: { clientX: number; clientY: number; }) {
    const x = event.clientX - boardLeft;
    const y = event.clientY - boardTop;
    // console.log(boardLeft, boardTop, x, y);

    // 最も近い交差点を見つける
    let nearestPoint = null;
    let shortestDistance = Infinity;
    for (let i = 0; i < intersectionPoints.length; i++) {
      const point = intersectionPoints[i];
      const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestPoint = point;
      }
    }

    // 石を置く
    const stone = document.createElement("div");
    stone.className = "stone";
    stone.style.left = nearestPoint.x + "px";
    stone.style.top = nearestPoint.y + "px";
    stone.classList.add(currentPlayer === 1 ? "black" : "white");
    document.getElementById("board")?.appendChild(stone);

    currentPlayer = (currentPlayer === 1) ? 2 : 1; // プレイヤーを交互に切り替える
  }

  // クリックイベントリスナーを追加
  document.getElementById("board")?.addEventListener("click", placeStone);

  // 黒石か白石かを保持する変数
  let currentPlayer = 1; // 1: 黒石, 2: 白石

  // 交差線を表示する関数
  function drawLines() {
    const board = document.getElementById("board")!;
    // Get left, top offset of the element
    boardLeft = board?.offsetLeft;
    boardTop = board?.offsetTop;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const intersection = document.createElement("div");
        intersection.className = "intersection";
        intersection.style.left = (i * 30) + "px";
        intersection.style.top = (j * 30) + "px";
        board?.appendChild(intersection);
      }
    }

    for (let i = 0; i < boardSize; i++) {
      const verticalLine = document.createElement("div");
      verticalLine.className = "line vertical-line";
      verticalLine.style.left = (i * 30 + 15) + "px";
      board?.appendChild(verticalLine);

      const horizontalLine = document.createElement("div");
      horizontalLine.className = "line horizontal-line";
      horizontalLine.style.top = (i * 30 + 15) + "px";
      board?.appendChild(horizontalLine);
    }
  }

  // 交差線を描画
  drawLines();


  return (
    <>
      <Head />
      <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
        <Grid item>
          <div id="board">
            Game
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Game;
