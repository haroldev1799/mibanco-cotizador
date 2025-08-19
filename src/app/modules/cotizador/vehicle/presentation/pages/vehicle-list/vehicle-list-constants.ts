import { TableModule } from 'primeng/table'
import { MenuModule } from 'primeng/menu'
import { DatePipe, PercentPipe, NgIf, NgClass } from '@angular/common'
import { ButtonComponent } from '@components/atoms/button/button.component'
import { InputComponent } from '@components/atoms/input/input.component'
import { TooltipComponent } from '@components/atoms/tooltip/tooltip.component'
import { DialogModule } from 'primeng/dialog'
import { InputNumberComponent } from '@components/atoms/input-number/input-number.component'
import { SelectComponent } from '@components/atoms/select/select.component'

export const VEHICLE_LIST_IMPORTS = [
    TableModule,
    DialogModule,
    SelectComponent,
    MenuModule,
    ButtonComponent,
    TooltipComponent,
    InputComponent,
    InputNumberComponent,
    DatePipe,
    PercentPipe,
    NgIf,
    NgClass,
];
