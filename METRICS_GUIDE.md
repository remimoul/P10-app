# 🚀 Guide Rapide - Métriques Ligues

## ✅ Installation terminée !

Les métriques pour les ligues sont maintenant configurées et opérationnelles.

## 📊 Métriques disponibles

### 1. **leagues_created_total** (Counter)

Nombre total de ligues créées avec distinction public/privé

- Label `type`: `public` ou `private`

### 2. **league_joins_total** (Counter)

Nombre total de jointures de ligues

### 3. **league_deletions_total** (Counter)

Nombre total de ligues supprimées

### 4. **active_leagues_total** (Gauge)

Nombre actuel de ligues actives (public/privé)

- Label `type`: `public` ou `private`

## 🔍 Accès aux métriques

### Backend (métriques brutes)

```bash
curl http://localhost:4500/metrics
```

### Prometheus

Ouvrez votre navigateur : http://localhost:9090

Exemples de requêtes :

```promql
# Total des ligues actives
sum(active_leagues_total)

# Ligues créées dans les dernières 24h
increase(leagues_created_total[24h])

# Taux de création par minute
rate(leagues_created_total[5m])
```

### Grafana

Ouvrez votre navigateur : http://localhost:3001

## 📈 Importer le dashboard dans Grafana

1. **Accédez à Grafana** : http://localhost:3001
2. Cliquez sur **"+"** → **"Import dashboard"**
3. Cliquez sur **"Upload JSON file"**
4. Sélectionnez le fichier : `docker/grafana/dashboards/leagues-dashboard.json`
5. Sélectionnez **Prometheus** comme source de données
6. Cliquez sur **"Import"**

## 🎯 Exemple d'utilisation

### Créer une ligue (pour tester les métriques)

```graphql
mutation {
  createLeague(createLeagueInput: { name: "Test League", private: false }) {
    id
    name
  }
}
```

Après cette requête :

- `leagues_created_total{type="public"}` augmente de 1
- `active_leagues_total{type="public"}` augmente de 1

### Rejoindre une ligue

```graphql
mutation {
  joinLeague(joinLeagueInput: { leagueId: "league-uuid" }) {
    id
    name
  }
}
```

Après cette requête :

- `league_joins_total` augmente de 1

## 🔧 Architecture

```
┌─────────────┐
│   Backend   │ expose les métriques sur /metrics
│  (NestJS)   │
└──────┬──────┘
       │
       │ scrape toutes les 5s
       ▼
┌─────────────┐
│ Prometheus  │ collecte et stocke les métriques
│             │
└──────┬──────┘
       │
       │ requêtes PromQL
       ▼
┌─────────────┐
│   Grafana   │ visualise les métriques
│             │
└─────────────┘
```

## 📝 Métriques par module

| Module | Fichier                 | Métriques                       |
| ------ | ----------------------- | ------------------------------- |
| League | `league.service.ts`     | 4 métriques (counters + gauges) |
| User   | `prometheus.service.ts` | 1 métrique (gauge)              |

## 🔜 Prochaines étapes

Pour ajouter des métriques à d'autres modules (Bet, GrandPrix, etc.) :

1. Ajoutez les providers dans le module :

   ```typescript
   makeCounterProvider({
     name: "bets_created_total",
     help: "Total number of bets created",
   });
   ```

2. Injectez la métrique dans le service :

   ```typescript
   @InjectMetric('bets_created_total')
   private betsCounter: Counter<string>
   ```

3. Utilisez la métrique :
   ```typescript
   this.betsCounter.inc();
   ```

## 📚 Documentation complète

Consultez `back/METRICS.md` pour la documentation complète avec tous les exemples PromQL.

## 🐛 Dépannage

**Les métriques ne s'affichent pas ?**

- Vérifiez que le backend est démarré : `docker ps`
- Vérifiez l'endpoint : `curl http://localhost:4500/metrics`
- Vérifiez les logs : `docker logs backend_P10_int`

**Grafana ne trouve pas Prometheus ?**

- Vérifiez que Prometheus est configuré comme source de données
- URL : `http://prometheus:9090` (dans Docker) ou `http://localhost:9090` (local)

---

🎉 **C'est prêt !** Vos métriques sont opérationnelles.
