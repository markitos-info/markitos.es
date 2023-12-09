class DateTools {
    static dateToString(date: Date): string {
        return (
            date.getFullYear() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            +date.getDate() +
            ' ' +
            +date.getHours() +
            ':' +
            +date.getMinutes() +
            ': ' +
            date.toLocaleString('en-us', { weekday: 'long' })
        );
    }
}

export default DateTools;
