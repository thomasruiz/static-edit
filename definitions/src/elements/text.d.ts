import { Editable } from "./editable";
export declare abstract class Text extends Editable {
    readonly value: string;
    bindEvents(): void;
}
