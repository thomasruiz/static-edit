import { Editable } from "./editable";
export declare class Image extends Editable {
    elem: HTMLImageElement;
    createField(): HTMLInputElement;
    bindEvents(): void;
}
