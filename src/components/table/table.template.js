const CODES = {
    A: 65,
    Z: 90
}

function createRow(content, index) {
    const resizer = (index) ? `<div class="row-resize" 
                                    data-resize="row"></div>` : ''
    return `<div class="row" data-type="resizable">
                <div class="row-info">
                    ${index ?? '' }
                    ${resizer}
                </div>
                <div class="row-data">${content}</div>
            </div>`
}

function toColumn(column, index) {
    return `<div class="column" data-type="resizable" data-col="${index}">
                ${column}
                <div class="col-resize" data-resize="col"></div>
            </div>`
}

// function toCell(char, i) {
//     return `<div class="cell" data-col="${i}" contenteditable></div>`
// }

function toCell(row) {
    return function(_, col) {
       return `<div class="cell" 
            data-id="${row}:${col}"
            data-col="${col}"
            data-type="cell"
            contenteditable></div>`
    }
}

const toChar = (_, i) => String.fromCharCode(CODES.A + i)

export function createTable(rowsCount = 30) {
    const colsCout = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCout)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(cols))

    for (let row = 0; row <= rowsCount; row++) {
        const cells = new Array(colsCout)
            .fill('')
            .map(toCell(row))
            // .map(toChar)
            // .map(char => toCell(char, i))
            .join('')

        rows.push(createRow(cells, row + 1))
    }

    return rows.join('')
}