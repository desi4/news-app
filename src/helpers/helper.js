export default class Helper {
    static cutText(text) {
        if (text === undefined || text === null) {
            return '';
        }
        if (text.length <= 80) {
            return text;
        }
        return `${text.substr(0, 80)}...`;
    }
}