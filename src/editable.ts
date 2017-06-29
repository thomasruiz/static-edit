import { Editor } from './editor'

export abstract class Editable {
    protected elem: HTMLElement
    protected editor: Editor
    private changed: boolean

    constructor(elem: HTMLElement, editor: Editor) {
        this.elem = elem
        this.editor = editor
    }

    bindEvents() {
        this.elem.addEventListener('click', (e) => {
            e.stopPropagation()
            e.preventDefault()

            if (!this.editor.editionStarted()) {
                return false
            }

            const input = this.createField()
            input.value = this.elem.innerText

            input.addEventListener('blur', () => {
                const oldValue = this.elem.innerText
                const newValue = input.value
                this.elem.innerText = newValue
                this.changed = true
                input.parentNode.replaceChild(this.elem, input)

                // Make sure that no one triggers a new click on an editable while this is running
                setTimeout(() => this.editor.editionEnded(this.elem, oldValue, newValue), 100)
            })

            input.addEventListener('click', (e) => {
                e.stopPropagation()
                e.preventDefault()
            })

            let resize = () => {
                input.style.height = 'auto'
                input.style.height = input.scrollHeight + 'px'
            }

            // Workaround for cut, paste, drop and keydown
            let delayedResize = () => window.setTimeout(resize, 0)

            input.addEventListener('change', resize)
            input.addEventListener('cut', delayedResize)
            input.addEventListener('paste', delayedResize)
            input.addEventListener('drop', delayedResize)
            input.addEventListener('keydown', delayedResize)

            input.style.width = 'auto'
            input.style.height = this.elem.offsetHeight + 'px'
            input.style.overflowY = "hidden"
            input.style.fontSize = window.getComputedStyle(this.elem).fontSize

            this.elem.parentNode.replaceChild(input, this.elem)
            input.focus()
            resize()
        }, true)
    }

    abstract createField(): HTMLInputElement

    get value(): string {
        return this.elem.textContent
    }

    get element(): HTMLElement {
        return this.elem
    }

    get hasChanged(): boolean {
        return this.changed
    }
}
