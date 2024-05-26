export const parseCoords = (stringCoord) => {
    const parsedCoords = {
        lat: Number(stringCoord.split(',')[0].trim().slice(1)),
        long: Number(stringCoord.split(',')[1].trim().slice(0, -1))
    }

    return parsedCoords
}

export const parseDate = (strDate) => {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Дек']
    const date = new Date(strDate);

    const month = months[date.getMonth()];

    return `${date.getDate()} ${month}`
}