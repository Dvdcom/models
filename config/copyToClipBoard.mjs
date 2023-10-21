// see https://stackoverflow.com/a/46858939/6799546
// see https://gist.github.com/rproenca/64781c6a1329b48a455b645d361a9aa3
// see https://stackoverflow.com/questions/52274735/cannot-save-formatted-data-text-html-in-the-clipboard-in-safari
/**
 * @param {HTMLElement} element
 * @returns {Promise<void>}
 */
export const copyToClipBoard = element => {
    if (!element) return Promise.reject(new Error('No element passed'))
    if (typeof window === 'undefined')
        return Promise.reject(new Error('Not in a browser environment'))
    if (!(element instanceof HTMLElement)) {
        throw new Error('this is not an HTMLElement')
    }
    const isCopySupported = () => {
        return document.queryCommandSupported('copy')
    }
    if (!isCopySupported) {
        return Promise.reject(new Error('execCommand not supported'))
    }
    // By spec it has to be the selected text
    const selectElementContents = el => {
        const range = document.createRange()
        range.selectNodeContents(el)
        const sel = window.getSelection()
        sel && sel.removeAllRanges()
        sel && sel.addRange(range)
    }
    const removeWindowSelections = () => {
        const selection = window.getSelection()
        selection && selection.removeAllRanges()
        document.body.focus()
    }

    // execCommand is only available in designMode
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/designMode
    const oldContentEditable = element.contentEditable
    // @ts-ignore
    const oldReadonly = element.readOnly
    const makeElementEditable = () => {
        element.contentEditable = 'true'
        // @ts-ignore
        element.readOnly = 'false'
    }
    const turnElementBackToOldEditMode = () => {
        element.contentEditable = oldContentEditable
        // @ts-ignore
        element.readOnly = oldReadonly
    }

    const copy = () => {
        /**
         * @param {ClipboardEvent} event
         */
        function listener(event) {
            event.clipboardData &&
                event.clipboardData.setData(
                    'text/plain',
                    element.innerText || /** @type {HTMLTextAreaElement} */ (element).value
                )
            event.clipboardData &&
                event.clipboardData.setData('text/html', element.innerHTML)
            // https://w3c.github.io/clipboard-apis/#override-copy
            event.preventDefault()
        }
        document.addEventListener('copy', listener)
        document.execCommand('copy')
        document.removeEventListener('copy', listener)
    }

    /**
     * @type {Promise<void>}
     */
    const promise = new Promise(() => {
        makeElementEditable()
        selectElementContents(element)
        copy()
        turnElementBackToOldEditMode()
        removeWindowSelections()
    })
    return promise
}