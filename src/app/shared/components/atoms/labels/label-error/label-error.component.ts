import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-label-error',
	standalone: true,
	imports: [],
	templateUrl: './label-error.component.html',
	styleUrl: './label-error.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelErrorComponent {
	@Input() labelError = '';
	@Input() isCustom = false;
}
