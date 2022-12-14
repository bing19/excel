import {getCurrentDate} from '@core/utils'
import {defaultTitle, defaultStyles} from '@/constants'


const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    stylesState: {},
    dataState: {}, // {'0:1': 'text'}
    currentText: '',
    currentStyles: defaultStyles,
    createAt: getCurrentDate()
}

const normalize = state => {
    return {
        ...state,
        currentStyles: defaultStyles,
        currentText: ''
    }
}

// export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState

export function initialNormalizeState( state) {
    return state ? normalize(state) : JSON.parse(JSON.stringify(defaultState))
} 