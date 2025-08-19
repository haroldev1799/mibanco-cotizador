import { NgClass } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { InputData } from '@shared/interfaces/input.dto'

@Component({
    selector: 'app-textarea',
    standalone: true,
    templateUrl: './textarea.component.html',
    styleUrl: './textarea.component.scss',
    imports: [NgClass],
})
export class TextareaComponent {
    @Input() data!: InputData
    @Input() error!: boolean

    @Output() emitValue = new EventEmitter<string>()
    @Output() emitFocus = new EventEmitter()

    handleChange(event: Event) {
        const { value } = event.target as HTMLInputElement
        this.emitValue.emit(value)
    }

    handleFocus() {
        this.emitFocus.emit()
    }
}
