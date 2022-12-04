import {CHANGE_TEXT, TABLE_RESIZE, CHANGE_TITLE, CHANGE_STYLES, APPLY_STYLE} from '@/redux/types'

export function rootReducer(state, action) {
    let field
    let prevState

    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, field, action)} // id, width
        case CHANGE_TEXT:
            field = 'dataState'
            return {...state, currentText: action.data.value, [field]: value(state, field, action)}
        case CHANGE_TITLE:
            return {...state, title: action.title}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            field = 'stylesState'
            prevState = state[field] || {}

            action.data.ids.map((id) => {
                prevState[id] = {...prevState[id], ...action.data.value}
            })

            return {...state, 
                [field]: prevState,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        default:
            return state
    }
}

function value(state, field, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val
}