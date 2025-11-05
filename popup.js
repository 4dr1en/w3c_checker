// Système de debug
const debugContent = document.getElementById('debugContent');
const debugDiv = document.getElementById('debug');

function addDebug(msg) {
  console.log(msg);
  const line = document.createElement('div');
  line.className = 'debug-line';
  line.textContent = msg;
  debugContent.appendChild(line);
  debugDiv.style.display = 'block';
}

addDebug('popup.js chargé');

const checkPageButton = document.getElementById('checkPage');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');

addDebug('Éléments trouvés: button=' + !!checkPageButton + ', result=' + !!resultDiv + ', loading=' + !!loadingDiv);

if (checkPageButton) {
  checkPageButton.addEventListener('click', async function() {
    addDebug('--- Bouton cliqué ---');
    
    loadingDiv.style.display = 'block';
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';
    debugContent.innerHTML = '';
    
    try {
      addDebug('Étape 1: Récupération des tabs');
      const tabs = await browser.tabs.query({active: true, currentWindow: true});
      addDebug('Tabs trouvés: ' + tabs.length);
      
      if (!tabs || tabs.length === 0) {
        throw new Error('Aucun onglet trouvé');
      }
      
      const currentUrl = tabs[0].url;
      const tabId = tabs[0].id;
      
      addDebug('URL: ' + currentUrl);
      addDebug('TabID: ' + tabId);
      
      if (!currentUrl.startsWith('http://') && !currentUrl.startsWith('https://')) {
        throw new Error('URL non valide: ' + currentUrl);
      }
      
      addDebug('Étape 2: Récupération du HTML via content script');
      const response_html = await browser.tabs.sendMessage(tabId, {action: 'getHTML'});
      addDebug('Réponse reçue: ' + (response_html ? 'oui' : 'non'));
      
      if (!response_html || !response_html.html) {
        throw new Error('HTML non reçu');
      }
      
      const htmlContent = response_html.html;
      addDebug('Taille HTML: ' + htmlContent.length + ' caractères');
      
      addDebug('Étape 3: Envoi au validateur W3C');
      const response = await fetch('https://validator.w3.org/nu/?out=json', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        },
        body: htmlContent
      });
      
      addDebug('Status: ' + response.status + ' ' + response.statusText);
      
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      
      const data = await response.json();
      addDebug('Données reçues: ' + (data.messages ? data.messages.length + ' messages' : 'aucun message'));
      
      loadingDiv.style.display = 'none';
      
      if (data.messages && data.messages.length > 0) {
        const errorCount = data.messages.filter(msg => msg.type === 'error').length;
        const warningCount = data.messages.filter(msg => msg.type === 'info' || msg.type === 'warning').length;
        
        resultDiv.textContent = '';
        
        const p1 = document.createElement('p');
        p1.textContent = '⚠️ ';
        const strong = document.createElement('strong');
        strong.textContent = errorCount + ' erreur(s)';
        p1.appendChild(strong);
        p1.appendChild(document.createTextNode(' trouvée(s)'));
        resultDiv.appendChild(p1);
        
        const p2 = document.createElement('p');
        p2.textContent = 'ℹ️ ' + warningCount + ' avertissement(s)';
        resultDiv.appendChild(p2);
        
        const p3 = document.createElement('p');
        const link = document.createElement('a');
        link.href = 'https://validator.w3.org/nu/?doc=' + encodeURIComponent(currentUrl);
        link.target = '_blank';
        link.textContent = 'Voir le rapport complet';
        p3.appendChild(link);
        resultDiv.appendChild(p3);
        
        resultDiv.className = 'invalid';
      } else {
        resultDiv.textContent = '✅ La page est valide selon les normes W3C !';
        resultDiv.className = 'valid';
      }
      
      resultDiv.style.display = 'block';
      addDebug('✅ Succès!');
    } catch (error) {
      addDebug('❌ ERREUR: ' + error.message);
      
      loadingDiv.style.display = 'none';
      resultDiv.textContent = '';
      const p = document.createElement('p');
      p.style.color = 'red';
      p.textContent = '❌ ' + error.message;
      resultDiv.appendChild(p);
      resultDiv.className = 'invalid';
      resultDiv.style.display = 'block';
    }
  });
} else {
  addDebug('❌ Bouton non trouvé!');
}
