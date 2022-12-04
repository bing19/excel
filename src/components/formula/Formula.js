import {ExcelComponent} from '@core/ExcelComponent'
import {TableSelection} from '@components/table/TableSelection'
import {$} from '@core/Dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click', 'keydown'],
            subcribe: ['currentText'],
            ...options
        })
    }

    prepare() {
        this.selections = new TableSelection()
    }

    init() {
        super.init()

        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$formula.text($cell.data.value)
        })

        // this.$on('table:input', $cell => {
        //     this.$formula.text($cell.text())
        // })

        // Убираем подписку внутри компонента
        // this.$subcribe(state => {
        //     this.$formula.text(state.currentText)
        //     console.log('FormulaState', state.currentText)
        // })
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onClick() {
        console.log('Click', this)
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab' 
        ]

        const {key} = event
        
        if (keys.includes(key)) {
            event.preventDefault()
            
            this.$emit('formula:done')
        }
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    toHTML() {
        return `<div class="info">
             fx
        </div>
        <div id="formula" class="input" contenteditable="" spellcheck="false">

        </div>`
    }
}