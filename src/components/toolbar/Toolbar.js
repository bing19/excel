import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {createToolbar} from './toolbar.template'
import {$} from '@core/Dom'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subcribe: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
           const value = JSON.parse($target.data.value)
           this.$emit('toolbar:applyStyle', value)
        //    const key = Object.keys(value)[0]
        //    this.setState({[key]: value[key]})
        }
    }
    
    get template() {
        return createToolbar(this.state)
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    toHTML() {
        return this.template
    }
}