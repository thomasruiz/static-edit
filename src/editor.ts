import {Block} from './elements/block'
import {Line} from './elements/line'
import {Image} from './elements/image'
import {Editable} from './elements/editable'
import {BgEditable} from "./elements/bg-editable";

export type Options = {
    saveButton: boolean,
    selector: string,
    bgSelector: string,
}

export class Editor {
    private editing: boolean
    private elems: Editable[]
    private selector: string = '.editable'
    private bgSelector: string = '.bg-editable'

    constructor(private options: Options) {
        this.handleOptions()

        this.elems = []

        let elems: Array<Element> = Array.from(document.querySelectorAll(this.selector))
        elems = elems.concat(Array.from(document.querySelectorAll(this.bgSelector)))

        for (let i = 0; i < elems.length; ++i) {
            let elm: Editable
            let htmlElement: HTMLElement = <HTMLElement>elems[i];

            if (htmlElement.matches(this.bgSelector)) {
                elm = new BgEditable(htmlElement, this)
            } else if (elems[i].tagName === 'P') {
                elm = new Block(htmlElement, this)
            } else if (elems[i].tagName === 'IMG') {
                elm = new Image(htmlElement, this)
            } else {
                elm = new Line(htmlElement, this)
            }

            elm.bindEvents()
            this.elems.push(elm)
        }
    }

    handleOptions() {
        if (this.options.saveButton === true) {
            this.createSaveButton()
        }

        if (this.options.selector !== undefined) {
            this.selector = this.options.selector
        }
    }

    editionStarted(elem: HTMLElement, oldValue: string) {
        if (this.editing) {
            return false
        }

        this.editing = true

        window.dispatchEvent(new CustomEvent('static_edit.editing', {detail: {elem, oldValue}}))

        return true
    }

    editionEnded(elem: HTMLElement, oldValue: string, newValue: string) {
        this.editing = false

        window.dispatchEvent(new CustomEvent('static_edit.edited', {detail: {elem, oldValue, newValue}}))
    }

    private createSaveButton() {
        const button = document.createElement('button')
        button.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()

            window.dispatchEvent(
                new CustomEvent('static_edit.saving', {detail: {changed: this.elems.filter((e) => e.hasChanged)}})
            )
        })

        button.textContent = 'Save'
        button.style.position = 'absolute'
        button.style.top = '20px'
        button.style.left = '20px'
        document.body.appendChild(button)
    }
}
