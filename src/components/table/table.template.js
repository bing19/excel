import {defaultStyles} from '@/constants'
import {toInlineStyles} from '@core/utils'
import {parse} from '@core/parse'

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getHeight(state, index) {
    if (!state) {
        return false
    }
    return (state[index] || DEFAULT_HEIGHT) + 'px;'
}

function getWidth(state, index) {
    if (!state.colState) {
        return false
    }
    return (state.colState[index] || DEFAULT_WIDTH) + 'px;'
}

function createRow(content, index, state) {
    const resizer = (index) ? `<div class="row-resize" data-resize="row"></div>` : ''
    const height = getHeight(state, index)
    return `<div class="row" data-type="resizable" ${(index >= 1) && `data-row="${index}"`} style="height: ${height}">
                <div class="row-info">
                    ${index ?? '' }
                    ${resizer}
                </div>
                <div class="row-data">${content}</div>
            </div>`
}
function withWidthFrom(state) {
    return function(col, index) {
        return {col, index, width: getWidth(state, index)}
    }
}


function toColumn({col, index, width}) {
    return `<div class="column" data-type="resizable" style="width: ${width}"
    data-col="${index}">
                ${col}
                <div class="col-resize" data-resize="col"></div>
            </div>`
}

// function toCell(char, i) {
//     return `<div class="cell" data-col="${i}" contenteditable></div>`
// }

function toCell(state, row) {
    return function(_, col) {
        const id = `${+row}:${+col}`
        const width = getWidth(state, col)
        const text = state.dataState[id] || ''
        const styles = toInlineStyles(state.stylesState[id]) || toInlineStyles(defaultStyles)
       return `<div class="cell" 
            data-id="${id}"
            data-col="${col}"
            ${state ? `style="${styles}; width: ${width}"` : ''} 
            data-type="cell"
            data-value="${text || ''}"
            contenteditable>${parse(text) || ''}</div>`
    }
}

const toChar = (_, i) => String.fromCharCode(CODES.A + i)

export function createTable(rowsCount = 30, state = {}) {
    const colsCout = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCout)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        // .map((col, index) => {
        //     const width = getWidth(state, index)
        //    return toColumn(col, index, width)
        // })
        .join('')

    rows.push(createRow(cols))

    for (let row = 0; row <= rowsCount; row++) {
        const cells = new Array(colsCout)
            .fill('')
            .map(toCell(state, row))
            // .map(toChar)
            // .map(char => toCell(char, i))
            .join('')

        rows.push(createRow(cells, row + 1, state.rowState))
    }

    return rows.join('')
}