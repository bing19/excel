export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
        this.prev = null
    }

    select($el) {
        this.clear()
        this.group.push($el)
        this.prev = this.current
        this.current = $el
        $el.addClass('selected').focus()
    }

    clear() {
        this.group.forEach( $el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    // deselect($el) {
    //     const index = this.group.indexOf($el)
    //     this.group.splice(index)
    //     $el.removeClass('selected')
    // }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        $group.forEach($el => $el.addClass(TableSelection.className))
    }
    
    applyStyle(style) {
        this.group.forEach( $el => {
            $el.css(style)
        })
    }
}