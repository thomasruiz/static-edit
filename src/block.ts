import {Editable} from './editable'

export class Block extends Editable {
    createField(): HTMLInputElement {
        return <any>document.createElement('textarea')
    }
}
