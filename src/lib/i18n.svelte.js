// Reaktiv språk-state, delad mellan komponenter. 'sv' (default) | 'en'.
function createI18n() {
  function read() {
    try {
      const v = localStorage.getItem('lang')
      if (v === 'en' || v === 'sv') return v
    } catch (e) {}
    return 'sv'
  }

  const initial = read()
  if (typeof document !== 'undefined') {
    document.documentElement.lang = initial
  }

  let lang = $state(initial)

  return {
    get lang() {
      return lang
    },
    toggle() {
      lang = lang === 'sv' ? 'en' : 'sv'
      try { localStorage.setItem('lang', lang) } catch (e) {}
      if (typeof document !== 'undefined') document.documentElement.lang = lang
    },
  }
}

export const i18n = createI18n()
