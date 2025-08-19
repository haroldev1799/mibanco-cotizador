import { Component, Input } from '@angular/core'
import { Tooltip } from '@shared/interfaces/tooltip.dto'
import { TooltipModule } from 'primeng/tooltip'

@Component({
    selector: 'app-tooltip',
    standalone: true,
    templateUrl: './tooltip.component.html',
    styleUrl: './tooltip.component.scss',
    imports: [TooltipModule],
})
export class TooltipComponent {
    @Input({ required: true }) data!: Tooltip
    @Input() iconWidth: string = '0.875rem'
    @Input() iconHeight: string = '0.875rem'
}
