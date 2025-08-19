
export enum ButtonType {
    DARK = 'dark',
    LIGHT = 'light',
    LIGHT_BLACK = 'light-black',
    CANCEL = 'cancel',
}

export enum ButtonTypeComponent {
    BUTTON = 'button',
    SUBMIT = 'submit',
}

export interface ButtonData {
    text?: string
    move?: boolean
    type: ButtonType
    style?: {
        width?: string
    }
}

export interface ButtonDownloadData {
    dialogKey?: string
    title: string
    text: string
    key: string
    link?: string
    openBrowser?:boolean
}

export enum FormOfDownloadComponent {
    BUTTON = 'button',
    SELECT = 'select',
}
