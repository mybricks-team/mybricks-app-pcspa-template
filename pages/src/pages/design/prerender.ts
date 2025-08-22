if (HTMLScriptElement.supports &&
    HTMLScriptElement.supports('speculationrules')) {
  const specScript = document.createElement('script');
  specScript.type = 'speculationrules';
  specScript.textContent = JSON.stringify({
    prerender: [
      {
        source: 'list',
        urls: ['/preview.html'],
      },
    ],
  });
  document.body.append(specScript);
}