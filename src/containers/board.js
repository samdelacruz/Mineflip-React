import React, { Component } from 'react';
import { connect } from 'react-redux';
import { revealTile } from '../actions';
import Cell from '../components/cell';
import Hint from '../components/hint';

export const COLOR_RED = "#FF4136";
export const COLOR_GREEN = "#2ECC40";
export const COLOR_YELLOW = "#FFDC00";
export const COLOR_BLUE = "#0074D9";
export const COLOR_PURPLE = "#B10DC9";

class Board extends Component {
  renderBoard() {
    return (
      <svg className="board" viewBox="0 0 700 720">
        <g className="box">
          {this.renderLines()}
          {this.renderCells()}
        </g>
      </svg>
    );
  }

  renderLines() {
    return (
      <g className="lines" transform="translate(0, -5)" strokeWidth="10">
        <line x1="0" y1="70" x2="610" y2="70" stroke={COLOR_RED} />
        <line x1="0" y1="190" x2="610" y2="190" stroke={COLOR_GREEN} />
        <line x1="0" y1="310" x2="610" y2="310" stroke={COLOR_YELLOW} />
        <line x1="0" y1="430" x2="610" y2="430" stroke={COLOR_BLUE} />
        <line x1="0" y1="550" x2="610" y2="550" stroke={COLOR_PURPLE} />
        <line x1="50" y1="40" x2="50" y2="640" stroke={COLOR_RED} />
        <line x1="170" y1="40" x2="170" y2="640" stroke={COLOR_GREEN} />
        <line x1="290" y1="40" x2="290" y2="640" stroke={COLOR_YELLOW} />
        <line x1="410" y1="40" x2="410" y2="640" stroke={COLOR_BLUE} />
        <line x1="530" y1="40" x2="530" y2="640" stroke={COLOR_PURPLE} />
      </g>
    );
  }

  renderCells() {
    return (
      <g className="cells">
        {this.props.board.map((row, rowIdx) => {
          return (
            <g key={`row-${rowIdx}`} className="row" transform={`translate(0,${10 + 120 * rowIdx})`}>
              {row.map((cell, colIdx) => {
                return this.renderCell(rowIdx, colIdx);
              })}
              <g className="cell" transform="translate(600, 0)">
                <Hint idx={rowIdx} />
              </g>
            </g>
          );
        })}
        {this.renderHints()}
      </g>
    );
  }

  cellOnClick(x, y) {
    this.props.revealTile(this.props.gameId, x, y);
  }

  renderCell(rowIdx, colIdx) {
    let props = {
      rowIdx, colIdx,
      onClickCB: this.cellOnClick.bind(this, colIdx, rowIdx)
    }
    return (
      <Cell key={`cell-${rowIdx},${colIdx}`} {...props}>
        {this.props.board[rowIdx][colIdx]}
      </Cell>
    );
  }

  renderHints() {
    return (
      <g className="row" transform="translate(0, 610)">
        {this.props.board[0].map((_, colIdx) => {
          return (
            <g key={`hint-5,${colIdx}`} className="cell" transform={`translate(${colIdx * 120}, 0)`}>
              <Hint idx={colIdx} />
            </g>
          )
        })}
      </g>
    );
  }

  render() {
    return (
      <div className="card board">
        <div className="card-block">
          {this.renderBoard()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { board: state.game.board, gameId: state.game.id }
}

function mapDispatchToProps(dispatch) {
  return {
    revealTile: (gameId, x, y) => dispatch(revealTile(gameId, x, y))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
