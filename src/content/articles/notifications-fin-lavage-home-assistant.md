---
title: "Lave-linge, lave-vaisselle : une notification quand le cycle est terminé"
description: "Recevoir un message utile sur l’iPhone quand le lavage se termine : choisir le bon état, éviter les doublons et vérifier toute la chaîne dans Home Assistant."
pubDate: 2026-09-30
category: "Automatisations du quotidien"
etat: "bricole"
etatLabel: "À valider sur plusieurs cycles"
tags: ["notifications", "lave-linge", "lave-vaisselle", "iphone", "automatisation"]
draft: false
---

## Le besoin : ne plus oublier ce qui a fini de tourner

Le lave-linge termine son cycle. On est occupé ailleurs. Deux heures plus tard, le linge est toujours dans le tambour.

Même chose pour le lave-vaisselle : savoir qu’il a terminé permet de le vider au bon moment. Pas besoin d’un tableau de bord supplémentaire. Un message court sur le téléphone suffit.

J’ai voulu ajouter ces deux notifications à la maison. Les premiers essais ont surtout montré une chose : **une automatisation enregistrée n’est pas encore une notification fiable.** Il faut vérifier l’état de l’appareil, le déclenchement, puis la réception sur le téléphone.

Voici la méthode pour construire et vérifier cette chaîne. Les exemples ci-dessous sont à adapter ; ils ne reproduisent pas les identifiants de mon installation.

## Un message qui dit quoi faire

Deux exemples de messages :

- 🧺 Le linge est prêt à être étendu.
- 🍽️ Le lave-vaisselle a terminé. Pense à le vider.

Un emoji pour reconnaître le sujet, une phrase pour comprendre, une action claire. Le téléphone n’a pas besoin de raconter le programme, sa durée et toute la vie de la machine.

Je réserve les alertes insistantes aux événements qui le justifient, comme une fuite ou une alarme. Une fin de lavage reste une information du quotidien.

## Avant l’automatisation, tester le téléphone

Installe l’application **Home Assistant Companion** sur le téléphone et connecte-la à ton instance. Autorise les notifications dans les réglages du téléphone.

Dans **Outils de développement → Actions**, cherche l’action de notification correspondant à ton appareil. Elle porte un nom de la forme `notify.mobile_app_mon_iphone`.

Teste ce message, en remplaçant le nom de l’action :

```yaml
action: notify.mobile_app_mon_iphone
data:
  message: "🧺 Test : la notification arrive bien."
```

Si rien n’arrive, inutile de modifier la logique du lave-linge. Vérifie d’abord le bon destinataire, les permissions de notification et les modes de concentration de l’iPhone.

## Le meilleur signal : l’état du cycle

Si l’intégration de ton appareil remonte un état de programme, commence par celui-ci. Dans **Outils de développement → États**, repère l’entité et observe ses valeurs pendant un cycle complet.

Attention : un libellé affiché comme « Terminé » peut correspondre à une valeur interne différente. Le YAML doit utiliser la **valeur exacte** remontée par l’entité.

Le signal recherché est une transition : **un cycle actif passe à terminé**. Un appareil simplement à l’arrêt ne prouve pas qu’un lavage vient de finir.

### Exemple à adapter

Dans l’éditeur YAML d’une nouvelle automatisation, cet exemple suppose que le capteur passe de `running` à `finished` :

```yaml
alias: "Lave-linge — notification de fin"
triggers:
  - trigger: state
    entity_id: sensor.lave_linge_etat
    from: "running"
    to: "finished"
actions:
  - action: notify.mobile_app_mon_iphone
    data:
      message: "🧺 Le linge est prêt à être étendu."
      data:
        tag: "maison-lave-linge-fin"
mode: single
```

Trois éléments sont à remplacer : l’entité, les deux valeurs d’état et l’action du téléphone. **Si ton appareil passe par un état intermédiaire**, comme l’essorage ou le séchage, `running` peut ne pas être l’état juste avant la fin. Observe l’historique et adapte le déclencheur au vrai parcours.

Pour le lave-vaisselle, crée une seconde automatisation avec son entité, son message et un tag distinct, par exemple `maison-lave-vaisselle-fin`.

Le `tag` permet de remplacer une notification précédente portant le même tag. Il évite l’accumulation sur le téléphone ; il ne corrige pas un déclencheur qui se lance trop souvent. De même, `mode: single` bloque les exécutions simultanées, pas tous les doublons successifs.

## Sans état de cycle : observer la consommation

Une prise avec mesure de puissance peut aider lorsqu’aucun état de programme n’est disponible. Il faut alors distinguer **une pause dans le cycle** d’une vraie fin.

Le principe :

1. Repérer une consommation qui confirme que le programme a commencé.
2. Mémoriser ce démarrage dans une aide de type interrupteur, par exemple « Lavage en cours ».
3. Attendre une puissance basse suffisamment longtemps.
4. Envoyer le message seulement si un cycle avait bien été mémorisé.
5. Réinitialiser l’aide pour attendre le prochain cycle.

Ne copie pas un seuil universel. Observe plusieurs cycles, y compris les programmes économiques : certains comportent de longues pauses. Une valeur basse pendant une minute peut très bien être normale en plein lavage.

Vérifie aussi que la prise est adaptée à la puissance et à l’usage de l’appareil. Ici, elle sert à mesurer ; il n’est pas nécessaire de couper l’alimentation.

## Le piège des temporisations

Un déclencheur avec `for:` peut attendre qu’un état dure un certain temps. C’est utile pour filtrer un changement trop bref, mais cette attente **ne survit pas à un redémarrage de Home Assistant ni au rechargement des automatisations**.

Avec une détection par puissance, cela peut expliquer une notification manquante. Pour une logique qui doit traverser les redémarrages, il faut mémoriser une échéance, puis vérifier l’état à cette échéance et au redémarrage. C’est plus de travail ; commence par vérifier si ton appareil fournit déjà un état de fin exploitable.

## Vérifier un vrai cycle, étape par étape

Le test manuel de l’action confirme seulement que le téléphone peut recevoir le message. Il ne teste pas le déclencheur.

Après un vrai lavage :

| Vérification | Ce qu’elle permet de comprendre |
|---|---|
| Historique de l’entité | La transition attendue a-t-elle réellement eu lieu ? |
| Trace de l’automatisation | Le déclencheur s’est-il lancé ? Une condition a-t-elle bloqué ? |
| Action de notification | Le bon téléphone a-t-il été ciblé ? Une erreur est-elle visible ? |
| Réception sur le téléphone | Le message est-il arrivé, visible et compréhensible ? |

Teste ensuite plusieurs cycles, un arrêt manuel et, si possible, une interruption de connexion. Un retour depuis `unavailable` ne doit pas être pris automatiquement pour une fin de lavage.

## Commencer petit

Mon conseil : un appareil, un téléphone, un message. Valide quelques cycles avant d’ajouter un second destinataire ou un rappel.

L’objectif est simple : **recevoir la bonne information au bon moment, puis ne plus avoir à y penser.**

Pour garder une interface familière pour le reste de la maison, voici comment [exposer Home Assistant dans l’app Maison d’Apple](/articles/exposer-home-assistant-app-maison-apple/). Et pour retrouver la documentation et la communauté, direction les [ressources du blog](/ressources/).

### Documentation utilisée

- [Notifications de l’application Companion](https://companion.home-assistant.io/docs/notifications/notifications-basic/) : action du téléphone et remplacement par tag.
- [Déclencheurs d’automatisation Home Assistant](https://www.home-assistant.io/docs/automation/trigger/) : transitions d’état et limites de `for:`.
