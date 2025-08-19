import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
	selector: 'app-label',
	standalone: true,
	imports: [CommonModule, TooltipModule],
	templateUrl: './label.component.html',
	styleUrl: './label.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
	@Input() name = '';
	@Input() label = '';
	@Input() disabled = false;
	@Input() required = false;
	@Input() tooltip: string | null = null;
}
