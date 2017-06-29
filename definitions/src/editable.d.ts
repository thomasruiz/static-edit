import { Editor } from './editor';
export declare abstract class Editable {
    protected elem: HTMLElement;
    protected editor: Editor;
    private changed;
    constructor(elem: HTMLElement, editor: Editor);
    bindEvents(): void;
    abstract createField(): HTMLInputElement;
    readonly value: string;
    readonly element: HTMLElement;
    readonly hasChanged: boolean;
}
