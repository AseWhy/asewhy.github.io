/** Дата рождения */
export const REF_BIRTH_DATE = new Date(2002, 5, 21);
/** Дата начала работы */
export const REF_WORK_START_DATE = new Date(2021, 0, 21);

/**
 * Получить разницу в годах с текущей датой
 * @param date дата с которой получаем разницу
 * @returns остаток лет
 */
export function calcYearRest(date: Date): number {
    return ((new Date().getTime() - date.getTime()) / (24 * 3600 * 365.25 * 1000)) | 0;
}

/**
 * Произвести склонение числительного
 * @param format строка для форматирования
 * @param value  значение числительного
 * @param words  варианты склонения
 * @returns вариант склонения
 */
export function numWord(format: string, value: number, words: [ string, string, string ]){  
	value = Math.abs(value) % 100;
	const num = value % 10;
    let variant;
	if(value > 10 && value < 20) {
        variant = words[2];
    } else if(num > 1 && num < 5) {
        variant = words[1];
    } else if(num == 1) {
        variant = words[0];
    } else {
        variant = words[2];
    }
    return format.replace("${value}", value.toString()).replace("${variant}", variant)
}