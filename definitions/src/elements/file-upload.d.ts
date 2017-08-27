import { Editable } from "./editable";
export declare abstract class FileUpload extends Editable {
    readonly abstract value: string;
    protected abstract changeValue(value: any, name: any): void;
    createField(): HTMLInputElement;
    bindEvents(): void;
}
