# K6 Performance Tests pour P10 Backend

Tests de performance utilisant k6 pour valider les SLO du backend P10.

## 📋 Tests disponibles

### 1. **main-slo-test.js** - Test SLO principal

- **Usage** : Validation des seuils SLO définis
- **Charge** : 20 utilisateurs virtuels pendant 2m20s
- **Routes testées** :
  - `/leagues` - SLO: p95 < 1.95s, Erreurs < 5%
  - `/users/all` - SLO: p95 < 4.8ms, Erreurs < 1%
  - `/pilots/all` - SLO: p95 < 975ms, Erreurs < 5%

```bash
k6 run k6/main-slo-test.js
# Avec URL custom:
BASE_URL=http://localhost:4500 k6 run k6/main-slo-test.js
```

### 2. **stress-test.js** - Test de charge élevée

- **Usage** : Identifier les limites du système
- **Charge** : Montée jusqu'à 200 utilisateurs virtuels sur 15 minutes
- **Détecte** : Points de rupture, fuites mémoire, dégradation des performances

```bash
k6 run k6/stress-test.js
```

### 3. **graphql-test.js** - Test des opérations GraphQL

- **Usage** : Valider les performances des mutations/queries GraphQL
- **Opérations testées** :
  - `GetAllLeagues`
  - `GetAllUsers`
  - `GetAllPilots`

```bash
k6 run k6/graphql-test.js
```

### 4. **quick-test.js** - Test rapide pour vérification

- **Usage** : Smoke test, vérification que le backend répond
- **Durée** : 30 secondes
- **Charge** : 5 utilisateurs virtuels

```bash
k6 run k6/quick-test.js
```

## 🚀 Installation de k6

### macOS (Homebrew)

```bash
brew install k6
```

### Autres OS

Voir : https://k6.io/docs/getting-started/installation/

## 📊 Générer un rapport HTML

```bash
k6 run --out html=k6-report.html k6/main-slo-test.js
```

## 🔗 Intégration avec Prometheus/Grafana

Pour envoyer les métriques k6 à Prometheus :

```bash
# Installer l'output Prometheus (optionnel)
k6 run --out prometheus k6/main-slo-test.js
```

Les données seront accessibles sur `http://localhost:6565/metrics`

## 🐳 Docker

Exécuter k6 dans Docker :

```bash
docker run -i grafana/k6:latest run - < k6/main-slo-test.js
```

Ou avec volume :

```bash
docker run -v $(pwd)/k6:/scripts -i grafana/k6:latest run /scripts/main-slo-test.js
```

## 📈 Variables d'environnement

| Variable   | Défaut           | Description            |
| ---------- | ---------------- | ---------------------- |
| `BASE_URL` | `http://p10appb` | URL de base du backend |

Exemple :

```bash
BASE_URL=https://my-api.com k6 run k6/main-slo-test.js
```

## ✅ Critères de succès SLO

### Latence p95

- ✅ `/leagues` : < 1950ms
- ✅ `/users/all` : < 4.8ms
- ✅ `/pilots/all` : < 975ms

### Taux d'erreurs 5xx

- ✅ `/leagues` : < 5%
- ✅ `/users/all` : < 1%
- ✅ `/pilots/all` : < 5%

## 🔍 Dépannage

### Erreur de connexion

```
Error: dial: connection refused
```

→ Vérifier que le backend est accessible sur `BASE_URL`

### Timeout GraphQL

```
Error: 408 Request timeout
```

→ Augmenter le délai d'expiration ou vérifier la charge serveur

## 📚 Documentation officielle

- https://k6.io/docs/
- https://k6.io/docs/using-k6/thresholds/
- https://k6.io/docs/using-k6/protocols/http/requests/
