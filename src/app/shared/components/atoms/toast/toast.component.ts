import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { AlertType } from '@core/enums/alert.enum'
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-toast',
    standalone: true,
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
    imports: [ToastModule, NgIf],
})
export class ToastComponent {
    AlertType = AlertType
}
