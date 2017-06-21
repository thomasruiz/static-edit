import { Block } from './block'
import { Line } from './line'
import { Editable } from './editable'

export class Editor {
    private editing: boolean

    constructor() {
        const elems: HTMLCollectionOf<Element> = document.getElementsByClassName('editable')

        for (let i = 0; i < elems.length; ++i) {
            let elm: Editable

            if (elems[i].tagName === 'P') {
                elm = new Block(<HTMLElement>elems[i], this)
            } else {
                elm = new Line(<HTMLElement>elems[i], this)
            }

            elm.bindEvents()
        }
    }

    editionStarted() {
        if (this.editing) {
            return false
        }

        this.editing = true

        return true
    }

    editionEnded(elem: HTMLElement, oldValue: string, newValue: string) {
        this.editing = false

        let editionEnded = new CustomEvent('edition_ended', {detail: {elem, oldValue, newValue}})
        window.dispatchEvent(editionEnded)
    }
}
