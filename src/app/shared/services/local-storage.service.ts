// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storageRegister = (storageKey: string, dataRegister: any) => {
	localStorage.setItem(storageKey, JSON.stringify(dataRegister));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storageGet = (storageKey: string): any | null => {
	const dataRegister = localStorage.getItem(storageKey) ?? null;
	if (!dataRegister) return null;
	else return JSON.parse(dataRegister);
};

export const removeStorage = (arrayStorageKey: string[]) => {
	arrayStorageKey.forEach((storageKey) => {
		localStorage.removeItem(storageKey);
	});
};

export const removeAllStorage = () => {
	localStorage.clear();
	sessionStorage.clear();
};
