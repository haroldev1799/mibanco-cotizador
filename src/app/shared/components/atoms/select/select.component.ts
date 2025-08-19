import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelErrorComponent } from '@components/atoms/labels/label-error/label-error.component';
import { LabelComponent } from '@components/atoms/labels/label/label.component';
import { getControlErrorMessage } from '@shared/utils/get-errors-label';
import { DropdownModule } from 'primeng/dropdown';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { IOptionSelect } from './select.component.interface';

@Component({
	selector: 'app-select',
	imports: [DropdownModule, ReactiveFormsModule, LabelComponent, LabelErrorComponent, FormsModule],
	standalone: true,
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit, OnDestroy {
	private static uniqueId = 0;
	private _cdr = inject(ChangeDetectorRef);

	@Input() placeholder = 'Seleccione';
	@Input() label: string | null = null;
	@Input() subLabel: string | null = null;
	@Input() labelAlternative: string | null = null;
	@Input() required = false;
	@Input() autocomplete = 'off';
	@Input() isClear = false;
	@Input() isSearch = false;
	@Input() isLoading = false;
	@Input() options: IOptionSelect[] = [];
	@Input() default: string | null = null;
	@Input() keyValue = 'value';
	@Input() keyName = 'name';
	@Input() checkmark = false; //checked icon option

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() control: any = new FormControl();
	@Input() timeChange = 200;

	@Output() changeValue = new EventEmitter();

	readonly inputId = `app-select-${SelectComponent.uniqueId++}`;
	private destroy$ = new Subject<void>();

	labelError: string | null = null;

	ngOnInit(): void {
		if (this.control) {
			this.control.valueChanges.pipe(debounceTime(this.timeChange), takeUntil(this.destroy$)).subscribe(() => {
				this.updateError();
			});
		}

		if (this.default) {
			this.control.setValue(this.default);
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
