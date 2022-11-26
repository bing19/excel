import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizerHandler} from './table.resizer'
import {isCell, shouldResize, matrix, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'
import {$} from '@core/Dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'mousedown', 'mouseup', 'keydown', 'input'],
            ...options
        })
    }
    onClick() {}

    onMousedown(event) {
        if (shouldResize(event)) {
            resizerHandler(this.$root, event)
        }

        if (isCell(event)) {
            const $target = $(event.target)

            if (event.ctrlKey) {
                // this.selections.selectGroup($target)
                const $cells = matrix(this.selections.current, $target).map(
                    id => this.$root.find(`[data-id = "${id}"]`)
                )
                
                this.selections.selectGroup($cells)
            } else {
                this.selections.select($target)
            }
            // this.selections.deselect(this.$cell)
            // const cell = event.target.dataset.id
            // this.$cell = this.$root.find(`[data-id = "${cell}"]`)
        }
    }

    prepare() {
        this.selections = new TableSelection()
    }

    init() {
        super.init()
        this.$cell = this.$root.find('[data-id = "0:0"]')
        
        this.selectCell(this.$cell)

        this.$on('formula:input', text => {
            this.selections.current.text(text)
        })

        this.$on('formula:done', () => {
            this.selections.current.focus()
        })
    }

    selectCell($cell) {
        this.selections.select($cell)
        this.$emit('table:select', $cell)
    }

    onMousemove() {
        console.log('mousemove')
    }

    onMouseup() {
        console.log('mouseup')
    }

    onKeydown(event) {
        const keys = [
            'Enter', 
            'Tab', 
            'ArrowUp', 
            'ArrowDown', 
            'ArrowLeft', 
            'ArrowRight'
        ]

        const {key} = event
        
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()

            const id = this.selections.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))

            this.selectCell($next)
        }
    }
    
    onInput(event) {
        this.$emit('table:input', $(event.target))
    }

    toHTML() {
        return createTable(25)
    }
}