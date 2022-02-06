export class StringTools {

	public static isNumber(value: string | number): boolean {
        return value != null &&
            value !== '' &&
            !isNaN(Number(value.toString()));
	}

	public static isNullOrEmpty(value: string): boolean {
		return value == null || value === '';
	}
}
