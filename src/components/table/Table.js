import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizerHandler} from './table.resizer'
import {shouldResize} from './table.functions'
// import {$} from '@core/Dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'mousedown', 'mouseup']
        })
    }

    onClick() {
        console.log('click')
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizerHandler(this.$root, event)
        }
    }

    onMousemove() {
        console.log('mousemove')
    }

    onMouseup() {
        console.log('mouseup')
    }

    toHTML() {
        return createTable(25)
    }
}