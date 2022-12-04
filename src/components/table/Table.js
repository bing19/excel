import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizerHandler} from './table.resizer'
import {isCell, shouldResize, matrix, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'
import {$} from '@core/Dom'
import {parse} from '@core/parse'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
// import {storage} from '@core/utils'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            subcribe: ['currentText'],
            ...options
        })
    }

    async resizeTable(event) {
        try {
            const data = await resizerHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (err) { 
            console.warn('Resize Error', err.massage) 
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
    
            if (event.ctrlKey) {
                // this.selections.selectGroup($target)
                const $cells = matrix(this.selections.current, $target).map(
                    id => this.$root.find(`[data-id = "${id}"]`)
                )
                this.selections.selectGroup($cells)
            } else {
                this.selectCell($target)
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
            this.selections.current
            .attr('data-value', text)
            .text(parse(text))
            // this.selections.current.text(text)
            this.updateTextInStore(text)
        })

        this.$on('formula:done', () => {
            this.selections.current.focus()
        })

        this.$on('toolbar:applyStyle', value => {
            this.selections.applyStyle(value)
   
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selections.selectedIds
            }))
        })
        // this.$subcribe(state => {
        //     console.log('TableState', state)
        // })
    }

    selectCell($cell) {
        this.selections.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))

        if (this.selections.prev != null) {
            this.selections.prev.text(parse(this.selections.prev.text()))
        }
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

    updateTextInStore(value) {
        // this.$emit('table:input', $(event.target))
        this.$dispatch(actions.changeText({
            id: this.selections.current.id(),
            value
        }))
    }
    
    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }

    storeChanged(changes) {
        // console.log('CHANGES', changes)
        this.selections.current
        .attr('data-value', changes.currentText)
    }

    toHTML() {
        // const data = storage('excel-state')
        return createTable(25, this.store.getState())
    }
}