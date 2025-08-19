import { AbstractControl } from '@angular/forms';
import { VALIDATION_MESSAGES } from '@core/constants/label-errors';
import { ValidateKey } from '@core/enums/validators.enum';

export function getControlErrorMessage(control: AbstractControl | null, label: string | null = null): string | null {
	if (!control) return null;

	const errors = control.errors;
	const messages: string[] = [];
	const fieldName = label || 'Este campo';

	for (const key in errors) {
		const errorKey = key as ValidateKey;

		if (errorKey === ValidateKey.MIN_LENGTH_CUSTOM && errors[errorKey]?.requiredLength) {
			messages.push(`Debe tener al menos ${errors[errorKey].requiredLength} caracteres`);
		} else if (errorKey === ValidateKey.MAX_LENGTH_CUSTOM && errors[errorKey]?.requiredLength) {
			messages.push(`Debe tener como máximo ${errors[errorKey].requiredLength} caracteres`);
		} else if (errorKey === ValidateKey.PASSWORD_MISMATCH) {
			messages.push(VALIDATION_MESSAGES[errorKey]);
		} else if (VALIDATION_MESSAGES[errorKey]) {
			messages.push(`${fieldName} ${VALIDATION_MESSAGES[errorKey]}`);
		} else {
			messages.push(`${fieldName} es inválido`);
		}
	}

	return messages[0]; // solo el primer error
}
