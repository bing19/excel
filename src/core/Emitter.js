export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // dispatch, fire, trigger
    // Уведомляем слушателей
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }

        this.listeners[event].forEach( listener => listener(...args))
    }

    // on, listen
    // Подписываемся на события
    subcribe(event, callback) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(callback)

        return () => {
            this.listeners[event] = this.listeners[event].filter( listener => {
                return listener !== callback
            })
        }
    }
}

