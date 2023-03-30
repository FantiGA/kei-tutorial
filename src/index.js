/*
 * @Author: fantiga
 * @Date: 2023-03-29 12:01:21
 * @LastEditTime: 2023-03-30 22:51:23
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/src/index.js
 */

import "./styles.css";

/** 棋盘尺寸 */
const boardSize = 19;
/** 初始化游戏对象数组 */
const board = [];
/** 获取棋盘DOM */
// TODO: { Challenge 1 } 获取棋盘DOM

/**
 * @name: 绘制棋盘
 * @return {void}
 */
const createBoard = () => {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      let _div = document.createElement("div");
      _div.className = "chess-line";

      _div.id = "location-" + i + "-" + j;
      /** 增加单元格 */
      // TODO: { Challenge 2 } 增加单元格

      if (i === 0) {
        _div.className += " top";
      }
      if (i === boardSize - 1) {
        _div.className += " bottom";
      }
      if (j === 0) {
        _div.className += " left";
      }
      if (j === boardSize - 1) {
        _div.className += " right";
      }
    }
  }
};

createBoard();
