import {Editable} from './editable'

export class Line extends Editable {
    createField(): HTMLInputElement {
        return document.createElement('input')
    }
}
