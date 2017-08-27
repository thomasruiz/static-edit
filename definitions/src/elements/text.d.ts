import { Editable } from "./editable";
export declare abstract class Text extends Editable {
    bindEvents(): void;
    readonly value: string;
}
