export declare type Options = {
    saveButton: boolean;
    selector: string;
};
export declare class Editor {
    private options;
    private editing;
    private elems;
    private selector;
    constructor(options: Options);
    handleOptions(): void;
    private createSaveButton();
    editionStarted(elem: HTMLElement, oldValue: string): boolean;
    editionEnded(elem: HTMLElement, oldValue: string, newValue: string): void;
}
