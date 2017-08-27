export declare type Options = {
    saveButton: boolean;
    selector: string;
    bgSelector: string;
};
export declare class Editor {
    private options;
    private editing;
    private elems;
    private selector;
    private bgSelector;
    constructor(options: Options);
    handleOptions(): void;
    editionStarted(elem: HTMLElement, oldValue: string): boolean;
    editionEnded(elem: HTMLElement, oldValue: string, newValue: string): void;
    private createSaveButton();
}
