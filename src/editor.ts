import { Block } from './block'
import { Line } from './line'
import { Editable } from './editable'

export type Options = {
    saveButton: boolean
}

export class Editor {
    private editing: boolean
    private elems: Editable[]

    constructor(private options: Options) {
        this.elems = []
        const elems: HTMLCollectionOf<Element> = document.getElementsByClassName('editable')

        for (let i = 0; i < elems.length; ++i) {
            let elm: Editable

            if (elems[i].tagName === 'P') {
                elm = new Block(<HTMLElement>elems[i], this)
            } else {
                elm = new Line(<HTMLElement>elems[i], this)
            }

            elm.bindEvents()
            this.elems.push(elm)
        }

        this.handleOptions()
    }

    handleOptions() {
        if (this.options.saveButton === true) {
            const button = document.createElement('button')
            button.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation()
                let saving = new CustomEvent('static_edit.saving', {detail: {changed: this.elems.filter((e) => e.hasChanged)}})
                window.dispatchEvent(saving)
            })

            button.textContent = 'Save'
            button.style.position = 'absolute'
            button.style.top = '20px'
            button.style.left = '20px'
            document.body.appendChild(button)
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

        let editionEnded = new CustomEvent('static_edit.edited', {detail: {elem, oldValue, newValue}})
        window.dispatchEvent(editionEnded)
    }
}
