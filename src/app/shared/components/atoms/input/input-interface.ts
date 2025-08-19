export type InputSize = 'small' | 'large' | null;
export type InputType = EnumInputType.TEXT | EnumInputType.PASSWORD;
export enum EnumInputType {
	PASSWORD = 'password',
	TEXT = 'text',
	SEARCH = 'search',
}
