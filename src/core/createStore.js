// TODO - Переписать на класс

import {rootReducer} from '@/redux/rootReducer'

export class Store {
    constructor(rootReducer, initialState = {}) {
        this.state = rootReducer({...initialState}, {type: '__INIT__'})
        this.listeners = []
    }

    subcribe(fn) {
        this.listeners.push(fn)
        return {
            unsubcribe() {
                this.listeners = this.listeners
                .filter(listener => listener !== fn)
            }
        }
    }

    dispatch(action) {
        this.state = rootReducer(this.state, action)
        console.log('Dispatch', this.state)
        this.listeners.forEach(listener => listener(this.state))
    }

    getState() {
        return JSON.parse(JSON.stringify(this.state))
    }
}


// export function createStore(rootReducer, initialState = {}) {
//     let state = rootReducer({...initialState}, {type: '__INIT__'})
//     let listeners = []

//     return {
//         subcribe(fn) {
//             listeners.push(fn)
//             return {
//                 unsubcribe() {
//                     listeners = listeners.filter(listener => listener !== fn)
//                 }
//             }
//         },
//         dispatch(action) {
//             state = rootReducer(state, action)
//             listeners.forEach(listener => listener(state))
//         },
//         getState() {
//             return state
//         },
//     }
// }