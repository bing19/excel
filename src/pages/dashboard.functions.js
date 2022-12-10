function toHTML(key) {
    const table = JSON.parse(localStorage.getItem(key))
    const link = key.split(':').join('/')
    return `<li class="db__record">
    <a href="#${link.toLowerCase()}">${table.title}</a>
    <strong>${table.createAt}</strong>
    </li>`
}

function getAllKeys() {
    const keys = []

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)

        if (!key.includes('Excel')) {
            continue
        }

        keys.push(key)
    }

    return keys
}

export function getAllRecords() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `Вы пока не создали ни одной таблицы`
    }

    return `<div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>
    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>`
}