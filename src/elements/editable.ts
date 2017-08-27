import {Editor} from '../editor'

export abstract class Editable {
    protected elem: HTMLElement
    protected editor: Editor
    protected changed: boolean

    constructor(elem: HTMLElement, editor: Editor) {
        this.elem = elem
        this.editor = editor
    }

    abstract createField(): HTMLInputElement
    abstract bindEvents(): void

    get element(): HTMLElement {
        return this.elem
    }

    get hasChanged(): boolean {
        return this.changed
    }
}
