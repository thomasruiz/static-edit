import {Text} from "./text";

export class Line extends Text {
    createField(): HTMLInputElement {
        return document.createElement('input')
    }
}
