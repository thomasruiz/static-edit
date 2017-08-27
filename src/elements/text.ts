import {Editable} from "./editable";

export abstract class Text extends Editable {
    get value(): string {
        return this.elem.textContent
    }

    bindEvents() {
        this.elem.addEventListener('click', (e) => {
            e.stopPropagation()
            e.preventDefault()
            e.cancelBubble = true

            if (!this.editor.editionStarted(this.elem, this.elem.innerText)) {
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
                input.style.height = `${input.scrollHeight}px`
            }

            // Workaround for cut, paste, drop and keydown
            let delayedResize = () => window.setTimeout(resize, 0)

            input.addEventListener('change', resize)
            input.addEventListener('cut', delayedResize)
            input.addEventListener('paste', delayedResize)
            input.addEventListener('drop', delayedResize)
            input.addEventListener('keydown', delayedResize)

            input.style.width = 'auto'
            input.style.height = `${this.elem.offsetHeight}px`
            input.style.overflowY = "hidden"
            input.style.fontSize = window.getComputedStyle(this.elem).fontSize

            this.elem.parentNode.replaceChild(input, this.elem)
            input.focus()
            resize()
        }, true)
    }
}