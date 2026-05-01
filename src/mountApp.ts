import en from './locales/en.json'

export function mountApp(rootElement: HTMLDivElement): void {
  rootElement.innerHTML = `
    <main class="app-shell">
      <h1>${en.app.title}</h1>
      <p>${en.app.welcomeMessage}</p>
    </main>
  `
}
