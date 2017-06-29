export declare type Options = {
    saveButton: boolean;
};
export declare class Editor {
    private options;
    private editing;
    private elems;
    constructor(options: Options);
    handleOptions(): void;
    editionStarted(): boolean;
    editionEnded(elem: HTMLElement, oldValue: string, newValue: string): void;
}
