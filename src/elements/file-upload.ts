import {Editable} from "./editable"

interface FileReaderEventTarget extends EventTarget {
    result: string
}

export abstract class FileUpload extends Editable {
    createField(): HTMLInputElement {
        const input = document.createElement('input')

        input.type = 'file'
        input.style.display = 'none'

        return input
    }

    bindEvents() {
        this.elem.addEventListener('click', (e) => {
            e.stopPropagation()
            e.preventDefault()

            const file = this.createField()
            file.addEventListener('change', () => {
                const uploadedFile = file.files[0]
                if (!!uploadedFile.type.match(/image.*/)) {
                    const reader = new FileReader()
                    reader.addEventListener('loadend', (e: ProgressEvent) => {
                        const newValue = (<FileReaderEventTarget>e.target).result
                        const oldValue = this.value

                        this.changeValue(newValue, uploadedFile.name)
                        this.changed = true

                        this.elem.parentNode.removeChild(file)

                        setTimeout(() => this.editor.editionEnded(this.elem, oldValue, newValue), 100)
                    })

                    reader.readAsDataURL(uploadedFile)
                }
            })

            this.elem.parentNode.appendChild(file)
            file.click()
        })
    }

    protected abstract changeValue(value, name): void
}
