import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
        throw new Error('No $root element in DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
       // Реализация addEventListener в Dom
       if (this[method] == undefined) {
        throw new Error(`В классе ${this.name} 
        необходимо реализовать метод ${method}`)
       }
      //  console.log(listener)
       this[method] = this[method].bind(this)
       this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}