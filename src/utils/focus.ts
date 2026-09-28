// Moves focus to an element that is not focusable by itself (a page's H1, a
// hash section, main, the empty cart's heading). A tabindex added just for
// this is removed again on blur: left in place, any later click inside the
// element would make it the focus start again, and the next Tab would jump
// back to its top.
export function focusTarget(target: HTMLElement, options?: FocusOptions) {
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1')
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
  target.focus(options)
}
