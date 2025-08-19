import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelErrorComponent } from '@components/atoms/labels/label-error/label-error.component';
import { LabelComponent } from '@components/atoms/labels/label/label.component';
import { InputSize } from '../input/input-interface';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { getControlErrorMessage } from '@shared/utils/get-errors-label';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
	selector: 'app-input-number',
	standalone: true,
	imports: [NgClass, InputNumberModule, ReactiveFormsModule, LabelComponent, LabelErrorComponent, FormsModule],
	templateUrl: './input-number.component.html',
	styleUrl: './input-number.component.scss',
})
export class InputNumberComponent implements OnInit, OnDestroy {
	private static uniqueId = 0;
	private _cdr = inject(ChangeDetectorRef);

	@Input() size: InputSize | string = 'small';
	@Input() placeholder = '';
	@Input() label: string | null = null;
	@Input() labelAlternative: string | null = null;
	@Input() required = false;
	@Input() maxLength = 12;
	@Input() max: number | null = null;
	@Input() min: number | null = 0;
	@Input() decimal = false;
	@Input() minFractionDigits = 0;
	@Input() maxFractionDigits = 0;
	@Input() useGrouping = false; //show groups with commas
	@Input() tooltip: string | null = null;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() control: any = new FormControl();
	@Input() timeChange = 200; // tiempo en milisegundos para el debounce

	readonly inputId = `app-input-number-${InputNumberComponent.uniqueId++}`;
	private destroy$ = new Subject<void>();

	labelError: string | null = null;

	ngOnInit(): void {
		if (this.control) {
			this.control.valueChanges.pipe(debounceTime(this.timeChange), takeUntil(this.destroy$)).subscribe(() => {
				this.updateError();
			});
		}
	}

	updateError(): void {
		if (this.control && this.control.errors && (this.control.touched || this.control.dirty)) {
			const label = this.label ?? this.labelAlternative;
			this.labelError = getControlErrorMessage(this.control, label);
		} else {
			this.labelError = null;
		}
		this._cdr.detectChanges();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
