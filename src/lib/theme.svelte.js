// Reaktiv tema-state delad mellan komponenter.
// plain = true → ren professionell vy (inget spelspråk).
function createTheme() {
  let plain = $state(
    typeof document !== 'undefined' &&
      document.documentElement.classList.contains('plain')
  )

  if (typeof window !== 'undefined') {
    window.addEventListener('theme:change', (e) => {
      plain = e.detail
    })
  }

  return {
    get plain() {
      return plain
    },
  }
}

export const theme = createTheme()
