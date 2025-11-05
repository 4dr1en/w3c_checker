# 🌐 W3C Validator Checker

Une extension Firefox élégante et puissante pour valider la conformité W3C de vos pages web en un seul clic.

## ✨ Fonctionnalités

- **Validation instantanée** : Vérifiez la validité W3C de n'importe quelle page web
- **Résultats détaillés** : Affiche le nombre d'erreurs et d'avertissements
- **Lien vers le rapport complet** : Accédez au rapport détaillé sur validator.w3.org
- **Interface intuitive** : Design simple et épuré pour une meilleure expérience utilisateur
- **Débogage intégré** : Logs détaillés pour suivre chaque étape de la validation
- **Sécurisée** : Aucune collecte de données personnelles

## 🚀 Installation

### Via Firefox Add-ons (recommandé)
1. Visitez [Firefox Add-ons](https://addons.mozilla.org)
2. Recherchez "W3C Validator Checker"
3. Cliquez sur "Ajouter à Firefox"

### Installation locale (développement)
1. Téléchargez le fichier `w3c-validator.xpi`
2. Ouvrez Firefox et allez à `about:addons`
3. Cliquez sur l'icône engrenage → "Installer un module complémentaire à partir d'un fichier"
4. Sélectionnez le fichier `.xpi`

### Installation temporaire (développement)
1. Ouvrez Firefox et allez à `about:debugging`
2. Cliquez sur "Ce Firefox"
3. Cliquez sur "Charger une extension temporaire"
4. Sélectionnez le fichier `manifest.json` du projet

## 🔨 Utilisation à partir d'un clone du projet

### Prérequis
- Firefox installé sur votre machine
- Git (optionnel, pour cloner le projet)

### Étapes

#### 1. Cloner ou télécharger le projet
```bash
git clone https://github.com/votre-username/windsurf-project.git
cd windsurf-project/w3cValidator
```

Ou téléchargez le ZIP et décompressez-le.

#### 2. Charger l'extension dans Firefox (mode développement)

**Option A : Chargement temporaire (recommandé pour tester)**
1. Ouvrez Firefox
2. Tapez `about:debugging` dans la barre d'adresse
3. Cliquez sur "Ce Firefox" (à gauche)
4. Cliquez sur "Charger une extension temporaire"
5. Naviguez jusqu'au dossier `w3cValidator`
6. Sélectionnez le fichier `manifest.json`
7. L'extension apparaît dans la liste avec un bouton "Recharger"

**Option B : Installation permanente (mode développement)**
1. Ouvrez Firefox
2. Allez à `about:config`
3. Cherchez `xpinstall.signatures.required` et mettez-le à `false`
4. Allez à `about:addons`
5. Cliquez sur l'icône engrenage → "Installer un module complémentaire à partir d'un fichier"
6. Sélectionnez le fichier `w3c-validator.xpi` (ou créez-le avec `zip`)

#### 3. Créer le fichier `.xpi` (optionnel)
Si vous voulez créer un fichier d'installation :
```bash
cd w3cValidator
zip -r w3c-validator.xpi manifest.json popup.html popup.js content.js styles.css
```

#### 4. Tester l'extension
1. Ouvrez n'importe quelle page web dans Firefox
2. Cliquez sur l'icône de l'extension dans la barre d'outils
3. Cliquez sur "Vérifier cette page"
4. Consultez les résultats

#### 5. Développement et modifications
- Modifiez les fichiers (`.js`, `.html`, `.css`)
- Cliquez sur le bouton "Recharger" dans `about:debugging` pour appliquer les changements
- Consultez les logs dans la console du navigateur (F12)

## 📖 Utilisation

1. **Ouvrez une page web** dans Firefox
2. **Cliquez sur l'icône de l'extension** dans la barre d'outils
3. **Cliquez sur "Vérifier cette page"**
4. **Consultez les résultats** :
   - ✅ **Valide** : La page respecte les normes W3C
   - ⚠️ **Erreurs** : Nombre d'erreurs trouvées
   - ℹ️ **Avertissements** : Nombre d'avertissements

## 🏗️ Architecture

```
w3cValidator/
├── manifest.json      # Configuration de l'extension
├── popup.html         # Interface utilisateur
├── popup.js           # Logique principale
├── content.js         # Script de contenu pour accéder au DOM
├── styles.css         # Styles CSS
└── w3c-validator.xpi  # Fichier d'installation
```

### Fichiers clés

- **manifest.json** : Configuration Manifest V3 avec permissions et paramètres Firefox
- **popup.html** : Interface avec bouton de validation et affichage des résultats
- **popup.js** : Logique de validation, communication avec l'API W3C
- **content.js** : Récupère le contenu HTML de la page active

## 🔧 Technologie

- **Manifest V3** : Standard moderne pour les extensions Firefox
- **API W3C Validator** : `https://validator.w3.org/nu/?out=json`
- **Browser API** : `browser.tabs`, `browser.runtime`
- **Fetch API** : Pour les requêtes HTTP

## 📋 Flux de fonctionnement

```
1. Utilisateur clique sur le bouton "Vérifier cette page"
   ↓
2. Extension récupère l'URL de la page active
   ↓
3. Content script extrait le HTML complet de la page
   ↓
4. HTML est envoyé à l'API W3C Validator (POST)
   ↓
5. Résultats JSON reçus et traités
   ↓
6. Affichage des erreurs/avertissements dans la popup
   ↓
7. Lien vers le rapport complet disponible
```

## 🔐 Confidentialité

- ✅ Aucune collecte de données personnelles
- ✅ Aucun suivi utilisateur
- ✅ Les validations sont envoyées uniquement à validator.w3.org
- ✅ Conforme aux politiques Firefox Add-ons

## 🐛 Débogage

L'extension inclut un système de débogage intégré qui affiche :
- Étapes de récupération des onglets
- Taille du HTML traité
- Statut HTTP de la réponse
- Nombre de messages reçus
- Erreurs détaillées

Les logs sont visibles dans la section "Debug" de la popup.

## 📝 Licence

MIT

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 📧 Support

Pour toute question ou problème, veuillez consulter la documentation W3C :
- [W3C Validator Documentation](https://validator.w3.org/docs/api.html)
- [Firefox Extension Documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/)

---

**Faites valider vos pages web ! ✨**
