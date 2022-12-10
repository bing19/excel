import {CHANGE_TEXT, TABLE_RESIZE, CHANGE_TITLE, CHANGE_STYLES, APPLY_STYLE, UPDATE_DATE} from '@/redux/types'

// Action Creator
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function changeTitle(title) {
    return {
        type: CHANGE_TITLE,
        title
    }
}

export function updateDate() {
    return {
        type: UPDATE_DATE,
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}