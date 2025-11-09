# Métriques Prometheus - Backend P10

## Accès aux métriques

Les métriques sont exposées sur l'endpoint : `http://localhost:4500/metrics`

## Métriques personnalisées

### Ligues (Leagues)

#### `leagues_created_total{type="public|private"}`

- **Type** : Counter
- **Description** : Nombre total de ligues créées
- **Labels** :
  - `type` : Type de ligue (`public` ou `private`)
- **Exemple PromQL** :

  ```promql
  # Total des ligues créées
  leagues_created_total

  # Taux de création de ligues par minute
  rate(leagues_created_total[5m])

  # Ligues publiques créées
  leagues_created_total{type="public"}
  ```

#### `league_joins_total`

- **Type** : Counter
- **Description** : Nombre total de jointures de ligues
- **Exemple PromQL** :

  ```promql
  # Total des jointures
  league_joins_total

  # Taux de jointures par minute
  rate(league_joins_total[5m])
  ```

#### `league_deletions_total`

- **Type** : Counter
- **Description** : Nombre total de ligues supprimées
- **Exemple PromQL** :

  ```promql
  # Total des suppressions
  league_deletions_total

  # Taux de suppressions par heure
  rate(league_deletions_total[1h])
  ```

#### `active_leagues_total{type="public|private"}`

- **Type** : Gauge
- **Description** : Nombre actuel de ligues actives
- **Labels** :
  - `type` : Type de ligue (`public` ou `private`)
- **Exemple PromQL** :

  ```promql
  # Ligues actives totales
  sum(active_leagues_total)

  # Ligues publiques actives
  active_leagues_total{type="public"}

  # Ligues privées actives
  active_leagues_total{type="private"}
  ```

### Utilisateurs

#### `users_total`

- **Type** : Gauge
- **Description** : Nombre total d'utilisateurs dans la base de données

## Métriques système (par défaut)

Ces métriques sont collectées automatiquement par Prometheus :

### Performance Node.js

- `process_cpu_seconds_total` : Temps CPU utilisé
- `process_resident_memory_bytes` : Mémoire résidente
- `process_heap_bytes` : Mémoire heap
- `nodejs_eventloop_lag_seconds` : Latence de la boucle d'événements
- `nodejs_active_handles_total` : Nombre de handles actifs
- `nodejs_active_requests_total` : Nombre de requêtes actives

### Performance HTTP

- `http_requests_total` : Nombre total de requêtes HTTP
- `http_request_duration_seconds` : Durée des requêtes HTTP

## Configuration Grafana

### Dashboard recommandé pour les ligues

1. **Panel 1 : Ligues actives par type**

   - Type : Stat ou Gauge
   - Query : `active_leagues_total`
   - Affichage : Separate series

2. **Panel 2 : Taux de création de ligues**

   - Type : Graph
   - Query : `rate(leagues_created_total[5m])`

3. **Panel 3 : Activité des ligues (24h)**

   - Type : Stat
   - Queries :
     - Créations : `increase(leagues_created_total[24h])`
     - Jointures : `increase(league_joins_total[24h])`
     - Suppressions : `increase(league_deletions_total[24h])`

4. **Panel 4 : Répartition public/privé**
   - Type : Pie chart
   - Query : `active_leagues_total`

## Exemples de requêtes PromQL avancées

```promql
# Ratio ligues publiques/privées
active_leagues_total{type="public"} / sum(active_leagues_total)

# Taux de croissance des ligues (24h)
(active_leagues_total - active_leagues_total offset 24h) / active_leagues_total offset 24h * 100

# Moyenne de jointures par ligue créée
rate(league_joins_total[1h]) / rate(leagues_created_total[1h])
```

## Déploiement

Les métriques sont automatiquement scrapées par Prometheus configuré dans `docker-compose-integration.yml` toutes les 5 secondes.

Configuration Prometheus : `docker/prometheus/prometheus.yml`
