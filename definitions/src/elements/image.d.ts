import { FileUpload } from "./file-upload";
export declare class Image extends FileUpload {
    elem: HTMLImageElement;
    readonly value: string;
    changeValue(value: any, name: any): void;
}
