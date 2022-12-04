import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subcribe = options.subcribe || []
    this.prepare()

    this.store = options.store

    this.unsubs = []
    // this.storeSub = null
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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // $subcribe(fn) {
  //   this.storeSub = this.store.subcribe(fn)
  // }

  $getState() {
    return this.store.getState()
  }

  // Сюда приходят изминения на те поля на которые мы подписались
  storeChanged(changes) {
    console.log('Parent Change')
  }

  isWatching(key) {
    return this.subcribe.includes(key)
  }


  // Удаляем компонент
  // Удаляем слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach( unsub => unsub())
    // this.storeSub.unsubcribe()
  }
}