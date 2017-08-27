import {Text} from "./text";

export class Block extends Text {
    createField(): HTMLInputElement {
        return <any>document.createElement('textarea')
    }
}
