import { Tooltip } from "./tooltip.dto"

export interface InputData {
    label: string
    name: string
    type: string
    value?: string
    placeholder: string
    required?: boolean
    clear?: boolean
    tooltip?: Tooltip
}
