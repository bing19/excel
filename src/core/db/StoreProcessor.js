import {debounce} from '@core/utils'

export class StoreProcessor {
    constructor(db, delay = 300) {
        this.db = db
        this.listen = debounce(this.listen.bind(this), delay)
    }
    listen(state) {
        this.db.save(state)
    }
    get() {
        return this.db.get()
    }
}