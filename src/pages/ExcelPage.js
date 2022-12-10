import {Page} from '@core/Page'
import {Excel} from '@components/excel/Excel'
import {Header} from '@components/header/Header'
import {Toolbar} from '@components/toolbar/Toolbar'
import {Formula} from '@components/formula/Formula'
import {Table} from '@components/table/Table'
import {Store} from '@core/createStore'
import {rootReducer} from '@redux/rootReducer'
import {StoreProcessor} from '@core/db/StoreProcessor'
import {LocalStorageClient} from '@core/db/LocalStorageClient'

// import {initialState} from '@redux/initialState'
import {initialNormalizeState} from '../redux/initialState'

export class ExcelPage extends Page {
    constructor(params) {
        super(params)
        this.storeSub = null
        this.storeProcessor = new StoreProcessor(
            new LocalStorageClient(this.params)
        )
    }

    async getRoot() {
        // const params = this.params ? this.params : Date.now().toString()
        // const state = storage(storeName(params))
        const state = await this.storeProcessor.get()
        const normalizeInitialState = initialNormalizeState(state)
        const store = new Store(rootReducer, normalizeInitialState)
       
        // const stateListener = debounce(state => {
        //     console.log('App state', state)
        //     storage(storeName(this.params), state)
        // }, 300)

        // Подписываемся на обновление Store
        // Если состояние было изменено, тогда происходит сохранение изминений в Хранилище
        this.storeSub = store.subcribe(this.storeProcessor.listen)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
        this.storeSub.unsubcribe()
    }
}