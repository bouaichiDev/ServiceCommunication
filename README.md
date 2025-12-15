# Communication Admin

Application d'administration pour la gestion des communications et alertes automatisées.

## Description

Cette application permet aux gestionnaires de :

- **Gérer les Communications** : Créer, visualiser et gérer des campagnes de communication (email, SMS, WhatsApp)
- **Créer des Campagnes** : Assistant de création de campagnes avec sélection de destinataires, canaux, filtres, planification et modèles
- **Configurer des Règles Automatiques** : Définir des règles qui déclenchent automatiquement l'envoi de communications lors d'événements système (création/modification d'enregistrements dans les tables OT, PLANS, etc.)

## Fonctionnalités

### Communications
- Liste des communications avec filtres et pagination
- Détails de campagne avec métriques de performance
- Gestion des destinataires et canaux

### Campaign Builder (Assistant de Création)
- Sélection de la cible (tenant, client, personnel)
- Configuration des canaux (email, SMS, WhatsApp, notifications)
- Filtres avancés (région, statut, dates)
- Planification (immédiat, programmé, récurrent)
- Configuration des modèles de message
- Aperçu et validation

### Règles Automatiques
- Déclencheurs basés sur les tables système (OT, OTDetail, OT_Packages, PLANS)
- Conditions de déclenchement (création, modification, changement de champ)
- Liaison avec des communications existantes
- Planification flexible (immédiat, différé, cron)

## Stack Technique

- **Framework** : Next.js 15 (React 19)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Architecture** : Feature-based folder structure

## Structure du Projet

```
app/
├── communications/          # Liste et gestion des communications
├── campaign-builder/        # Assistant de création de campagnes
├── campaign-details/[id]/   # Détails d'une campagne
├── automatic-rules/         # Règles automatiques
│   ├── new/                 # Création de règle
│   └── [id]/                # Détails et édition de règle
└── components/              # Composants partagés (Layout, UI)
```

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Langue

L'interface est entièrement en **français**.
