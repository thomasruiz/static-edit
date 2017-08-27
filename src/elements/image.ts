import {FileUpload} from "./file-upload";

export class Image extends FileUpload {
    elem: HTMLImageElement

    get value(): string {
        return this.elem.src
    }

    changeValue(value, name): void {
        this.elem.src = value
        this.elem.dataset.fileName = name
    }
}
