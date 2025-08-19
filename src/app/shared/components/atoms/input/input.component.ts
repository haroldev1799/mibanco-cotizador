import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelErrorComponent } from '@components/atoms/labels/label-error/label-error.component';
import { LabelComponent } from '@components/atoms/labels/label/label.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputSize, InputType, EnumInputType } from './input-interface';

import { getControlErrorMessage } from '@shared/utils/get-errors-label';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-input',
    standalone: true,
	imports: [
		NgClass,
		InputTextModule,
		ReactiveFormsModule,
		LabelComponent,
		LabelErrorComponent,
		FormsModule,
	],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit, OnDestroy {
	private static uniqueId = 0;
	private _cdr = inject(ChangeDetectorRef);

	@Input() size: InputSize | string = 'small';
	@Input() placeholder = '';
	@Input() label: string | null = null;
	@Input() subLabel: string | null = null;
	@Input() labelAlternative: string | null = null;
	@Input() name = '';
	@Input() required = false;
	@Input() iconRight: string | null = null;
	@Input() iconLeft: string | null = null;
	@Input() isIconSVG = false;
	@Input() maxLength = 100;
	@Input() isDNI = false;
	@Input() isPassword = false;
	@Input() autocomplete = 'off';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() control: any = new FormControl();
	@Input() tooltip: string | null = null;
	@Input() classes = '';
	@Input() timeChange = 200; // tiempo en milisegundos para el debounce
	@Input() type: InputType | string = EnumInputType.TEXT;

	@Output() keyEnter = new EventEmitter();

	readonly inputId = `app-input-${InputComponent.uniqueId++}`;
	private destroy$ = new Subject<void>();

	labelError: string | null = null;

	ngOnInit(): void {
		if (this.isPassword) {
			this.iconRight = 'pi pi-eye';
		}

		if (this.control) {
			this.control.valueChanges.pipe(debounceTime(this.timeChange), takeUntil(this.destroy$)).subscribe(() => {
				this.updateError();
			});
		}
	}

	clickIconRight() {
		if (this.isPassword) {
			this.iconRight = this.iconRight === 'pi pi-eye' ? 'pi pi-eye-slash' : 'pi pi-eye';
			this.type = this.type === EnumInputType.PASSWORD ? EnumInputType.TEXT : EnumInputType.PASSWORD;
		}
	}

	enterInput() {
		this.keyEnter.emit(this.control.value);
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
