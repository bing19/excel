import {$} from '@/core/Dom'

export class Excel {
  constructor(seletor, options) {
    this.$el = $(seletor)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
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
}
