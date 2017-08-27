import { Editor } from '../editor';
export declare abstract class Editable {
    protected elem: HTMLElement;
    protected editor: Editor;
    protected changed: boolean;
    constructor(elem: HTMLElement, editor: Editor);
    readonly element: HTMLElement;
    readonly hasChanged: boolean;
    readonly abstract value: string;
    abstract createField(): HTMLInputElement;
    abstract bindEvents(): void;
}
