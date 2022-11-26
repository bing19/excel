import {$} from '@/core/Dom'
import {Emitter} from '../../core/Emitter'

export class Excel {
  constructor(seletor, options) {
    this.$el = $(seletor)
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)

      const componentOptions = {emitter: this.emitter}

      const component = new Component($el, componentOptions)

      // DEBUG
      window['c' + component.name] = component
      // console.log('Raw', component)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(component => {
      component.init()
    })
  }

  destroy() {
    this.components.forEach(component => {
      component.destory()
    })
  }
}
