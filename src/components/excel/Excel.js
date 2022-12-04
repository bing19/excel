import {$} from '@/core/Dom'
import {Emitter} from '../../core/Emitter'
import {StoreSubcriber} from '@core/StoreSubcriber'

export class Excel {
  constructor(seletor, options) {
    this.$el = $(seletor)
    this.components = options.components || []
    this.emitter = new Emitter()
    this.store = options.store
    this.subcriber = new StoreSubcriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const componentOptions = {emitter: this.emitter, store: this.store}
      const component = new Component($el, componentOptions)

      // DEBUG
      window['c' + component.name] = component

      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.subcriber.subcribeComponents(this.components)
    this.components.forEach(component => {
      component.init()
    })
  }

  destroy() {
    this.subcriber.unsubcribeStoreAll()
    this.components.forEach(component => {
      component.destory()
    })
  }
}
