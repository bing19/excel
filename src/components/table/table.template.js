const CODES = {
    A: 65,
    Z: 90
}

function createRow(content, numRow) {
    return `<div class="row">
                <div class="row-info">${numRow ?? '' }</div>
                <div class="row-data">${content}</div>
            </div>`
}

function toColumn(column) {
    return `<div class="column">${column}</div>`
}

function toCell(char, i) {
    return `<div class="cell" contenteditable></div>`
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

    for (let i = 1; i <= rowsCount; i++) {
        const cells = new Array(colsCout)
            .fill('')
            .map(toCell)
            // .map(toChar)
            // .map(char => toCell(char, i))
            .join('')

        rows.push(createRow(cells, i))
    }

    return rows.join('')
}