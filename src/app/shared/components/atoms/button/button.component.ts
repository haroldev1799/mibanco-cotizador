import { NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ButtonData, ButtonType, ButtonTypeComponent } from '@shared/interfaces/button.dto'

@Component({
    selector: 'app-button',
    standalone: true,
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    imports: [NgClass],
})
export class ButtonComponent {
    @Input() data!: ButtonData
    @Input() type: string = ButtonTypeComponent.BUTTON
    @Input() reverse: boolean = false
    @Input() disabled?: boolean
    @Input() loading?: boolean

    readonly BUTTON_TYPE = ButtonType
}
