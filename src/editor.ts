import {Block} from './block'
import {Line} from './line'
import {Image} from './image'
import {Editable} from './editable'

export type Options = {
    saveButton: boolean,
    selector: string,
}

export class Editor {
    private editing: boolean
    private elems: Editable[]
    private selector: string = '.editable'

    constructor(private options: Options) {
        this.handleOptions()

        this.elems = []
        const elems: NodeListOf<Element> = document.querySelectorAll(this.selector)

        for (let i = 0; i < elems.length; ++i) {
            let elm: Editable

            if (elems[i].tagName === 'P') {
                elm = new Block(<HTMLElement>elems[i], this)
            } else if (elems[i].tagName === 'IMG') {
                elm = new Image(<HTMLElement>elems[i], this)
            } else {
                elm = new Line(<HTMLElement>elems[i], this)
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
}
