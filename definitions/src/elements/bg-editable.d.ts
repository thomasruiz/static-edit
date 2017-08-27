import { FileUpload } from "./file-upload";
export declare class BgEditable extends FileUpload {
    readonly value: string;
    protected changeValue(value: any, name: any): void;
}
