import { Editable } from "./editable";
export declare abstract class FileUpload extends Editable {
    createField(): HTMLInputElement;
    bindEvents(): void;
    protected abstract changeValue(value: any, name: any): void;
}
