// Copies text to the clipboard; false when the browser refused. Each caller
// decides what a refusal means (CopyEmail opens the mail app, the cart shows
// the order to copy by hand).
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // In-app browsers (Facebook, Instagram) often lack the clipboard API.
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    field.remove()
    return ok
  }
}
