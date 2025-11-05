// Content script pour récupérer le contenu HTML de la page
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getHTML') {
    sendResponse({html: document.documentElement.outerHTML});
  }
});
