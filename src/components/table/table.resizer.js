import {$} from '@core/Dom'

export function resizerHandler($root, event) {
    const $resizer = $(event.target)
    // Плохая реализация, связвность верстки и кода
    // const $parent = $resizer.$el.parentNode
    const type = $resizer.data.resize
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value
    
    $resizer.css({
        opacity: 1, 
        [sideProp]: '-5000px',
    })

    document.onmousemove = e => {
        if (type === 'col') {
            const delta = e.pageX - coords.right
            value = coords.width + delta
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
            $parent.css({'width': value + 'px'})
            $root.findAll(
                `[data-col="${$parent.data.col}"]`
                ).forEach(el => {
                // $(el).addClass('cell-resize')
                $(el).css({'width': value + 'px'})
            })
        } else {
            $parent.css({'height': value + 'px'})
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0,
        })
    }
}