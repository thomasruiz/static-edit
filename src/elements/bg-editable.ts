import {FileUpload} from "./file-upload";

export class BgEditable extends FileUpload {

    get value(): string {
        return this.elem.style.backgroundImage
    }

    protected changeValue(value, name): void {
        this.elem.dataset.fileName = name
        this.elem.style.backgroundImage = `url(${value})`
    }
}