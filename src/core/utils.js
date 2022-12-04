// Pure Function
export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }

    return string.charAt(0).toUpperCase() + string.substring(1)
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if ( typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelCaseToDash( myStr ) {
    return myStr.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles) {
    if (styles === undefined) {
        return
    }
    return Object.keys(styles).map(key => `${camelCaseToDash(key)}: ${styles[key]}`)
            .join('; ')
}

export function debounce(fn, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            // eslint-disable-next-line
            fn.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}