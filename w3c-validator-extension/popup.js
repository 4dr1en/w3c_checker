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
      
      addDebug('Étape 2: Récupération du HTML avec executeScript');
      const results = await browser.tabs.executeScript(tabId, {
        code: 'document.documentElement.outerHTML'
      });
      addDebug('Résultats reçus: ' + (results ? results.length + ' éléments' : 'null'));
      
      if (!results || !results[0]) {
        throw new Error('HTML non reçu');
      }
      
      const htmlContent = results[0];
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
        
        resultDiv.innerHTML = `
          <p>⚠️ <strong>${errorCount} erreur(s)</strong> trouvée(s)</p>
          <p>ℹ️ ${warningCount} avertissement(s)</p>
          <p><a href="https://validator.w3.org/nu/?doc=${encodeURIComponent(currentUrl)}" target="_blank">Voir le rapport complet</a></p>
        `;
        resultDiv.className = 'invalid';
      } else {
        resultDiv.innerHTML = '✅ La page est valide selon les normes W3C !';
        resultDiv.className = 'valid';
      }
      
      resultDiv.style.display = 'block';
      addDebug('✅ Succès!');
    } catch (error) {
      addDebug('❌ ERREUR: ' + error.message);
      
      loadingDiv.style.display = 'none';
      resultDiv.innerHTML = `<p style="color: red;">❌ ${error.message}</p>`;
      resultDiv.className = 'invalid';
      resultDiv.style.display = 'block';
    }
  });
} else {
  addDebug('❌ Bouton non trouvé!');
}
