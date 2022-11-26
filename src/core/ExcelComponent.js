import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.prepare()

    this.unsubs = []
  }

  // Настраивает компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Инициализируем компонент
  // Добавляем слушателей
  init() {
    this.initDOMListeners()
  }

  $on(event, listener) {
    const unsub = this.emitter.subcribe(event, listener)
    this.unsubs.push(unsub)
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Удаляем компонент
  // Удаляем слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach( unsub => unsub())
  }
}