import { Editor } from '../editor';
export declare abstract class Editable {
    protected elem: HTMLElement;
    protected editor: Editor;
    protected changed: boolean;
    constructor(elem: HTMLElement, editor: Editor);
    abstract createField(): HTMLInputElement;
    abstract bindEvents(): void;
    readonly element: HTMLElement;
    readonly hasChanged: boolean;
}
