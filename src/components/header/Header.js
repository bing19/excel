import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/Dom'
import {defaultTitle} from '@/constants'
import * as actions from '@/redux/actions'
import {ActiveRoute} from '../../core/routes/ActiveRoute'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    onInput(event) {
        const title = $(event.target).text()
        this.$dispatch(actions.changeTitle(title))
    }

    onClick(event) {
        const target = $(event.target)

        if (target.data.id === 'exit') {
            ActiveRoute.navigate('')
        } else if (target.data.id === 'del') {
            const aprove = confirm('Вы уверены что хотите удалить?')

            if (aprove) {
                localStorage.removeItem(`Excel:${ActiveRoute.params}`)
                ActiveRoute.navigate('')
            }
        }
    }

    toHTML() {
        const title = this.$getState().title || defaultTitle
        return `<input type="text" class="input" value="${title}">
        <div>
            <div class="button" data-id="del">
                <i class="material-icons" data-id="del">delete</i>
            </div>

            <div class="button" data-id="exit">
                <i class="material-icons" data-id="exit">exit_to_app</i>
            </div>
        </div>`
    }
}