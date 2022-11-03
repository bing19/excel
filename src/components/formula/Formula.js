import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        })
    }

    onInput(event) {
        console.log('Formula event', event.target.innerText)
        console.log(this.$root)
    }

    onClick() {
        console.log('Click', this)
    }

    toHTML() {
        return `<div class="info">
        fx
    </div>
    <div class="input" contenteditable="" spellcheck="false">

    </div>`
    }
}