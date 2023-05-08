import React, { useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import options from './data/options.json';
import Cell from './Cell';
import { createAnswerMap, createGrid, checkMapForWin } from './utils';
import { SIZE } from './constants';

import './Field.css';

function Field() {
    const [gameOver, setGameOver] = useLocalStorageState('isGameOver', { defaultValue: false });
    const [answerMap, setAnswerMap] = useLocalStorageState('answerMap', { defaultValue: createAnswerMap(SIZE) });
    const [grid, setGrid] = useLocalStorageState('grid', { defaultValue: createGrid(options, SIZE) })
    const rows = grid.map(createRow);
    const resetGame = useCallback(() => {
        setGrid(createGrid(options, SIZE));
        setAnswerMap(createAnswerMap(SIZE));
        setGameOver(false);
    }, [setGrid, setAnswerMap, setGameOver])

    function createRow(rowArray = [], rowIndex = 0) {
        return <div className='Row' key={`[${rowIndex}]`}>
            {rowArray.map((text, columnIndex) => {
                const isSelected = answerMap[rowIndex][columnIndex];
                return (<Cell key={`[${rowIndex},${columnIndex}]`}
                              text={text}
                              onClick={() => {(!isSelected && !gameOver) && selectAnswer(rowIndex, columnIndex)}}
                              onRemoveClick={() => {(isSelected && !gameOver) && deselectAnswer(rowIndex, columnIndex) }}
                              isSelected={isSelected} />)
            })}
        </div>
    };

    function selectAnswer(row = 0, column = 0) {
        const newAnswerMap = [...answerMap]

        newAnswerMap[row][column] = true;

        setAnswerMap(newAnswerMap);
    }

    function deselectAnswer(row = 0, column = 0) {
        const newAnswerMap = [...answerMap]

        newAnswerMap[row][column] = false;

        setAnswerMap(newAnswerMap);
    }

    React.useEffect(() => {
        if (checkMapForWin(answerMap)) {
            setGameOver(true);

            if(window.confirm('Bingo! Do you want to play again?')) {
                resetGame()
            }
        }
    }, [answerMap, setGameOver, resetGame])

    React.useEffect(() => {
        if (gameOver) {
            resetGame()
        }
    }, [gameOver, resetGame])

    return <>
        <button className="ResetGameButton" onClick={() => { resetGame() }}>🔃 refresh bingo table</button>

        <main className='Field'>
            {rows}
        </main>
    </>
}

export default Field;