import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/Dom'
import {defaultTitle} from '@/constants'
import * as actions from '@/redux/actions'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    onInput(event) {
        const title = $(event.target).text()
        this.$dispatch(actions.changeTitle(title))
    }

    toHTML() {
        const title = this.$getState().title || defaultTitle
        return `<input type="text" class="input" value="${title}">
        <div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>

            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>`
    }
}