---
draft: true
title: "Mon alarme se déclenchait la nuit sans raison : filtrer les faux positifs d'un capteur de vibration"
description: "Sirènes à trois heures du matin, sans intrusion. Baisser la sensibilité n'a rien changé. Voici le filtre qui a réglé le problème, et pourquoi il fonctionne."
pubDate: 2026-08-20
category: "Sécurité & présence"
etat: "tourne"
etatLabel: "Tourne chez moi"
tags: ["alarme", "alarmo", "aqara", "vibration", "faux-positifs"]
---

## Le problème

L'alarme se déclenchait la nuit. Pour de bon. Sirène intérieure, sirène extérieure, tout le dispositif.

Sans intrusion. Sans rien.

Un capteur de vibration Aqara remontait une détection, Alarmo faisait son travail, et la maison entière hurlait à trois heures du matin.

C'est le genre de panne qui ne pardonne pas. Une alarme qui se déclenche pour rien, c'est une alarme qu'on finit par désactiver — et une alarme désactivée ne protège de rien.

Voici les deux choses que j'ai essayées et qui n'ont pas marché, puis celle qui a réglé le problème.

## Ce que j'ai essayé, et qui n'a pas marché

### Baisser la sensibilité du capteur

Le réflexe évident. Les capteurs de vibration Aqara offrent trois niveaux de sensibilité. J'ai baissé.

Ça n'a rien changé.

La raison, comprise plus tard : **le problème ne venait pas d'un excès de sensibilité.** Le capteur ne réagissait pas à une vraie vibration trop faible, il remontait des détections parasites. Réduire le seuil d'un signal qui n'existe pas ne sert à rien.

C'est un piège classique du diagnostic : on ajuste le réglage le plus visible, sans avoir identifié la cause.

### Retirer le capteur d'Alarmo

La solution de renoncement. Plus de faux positifs, forcément — mais plus de détection non plus.

Ça a rendu la nuit calme et l'alarme incomplète. Ce n'est pas une solution, c'est un abandon déguisé.

J'aurais pu m'en contenter. Beaucoup s'en contentent, et c'est comme ça qu'une installation se vide de sa substance : un capteur retiré ici, une automatisation désactivée là, et il ne reste plus qu'une coquille.

## Le principe qui a tout débloqué

En réfléchissant à ce qui distingue un vrai événement d'un faux, la réponse est apparue :

> **Un faux positif est isolé. Une intrusion ne l'est pas.**

Quelqu'un qui force une fenêtre ne produit pas une secousse unique. Il en produit plusieurs, rapprochées, pendant qu'il travaille sur l'ouverture.

Une remontée parasite, elle, arrive seule.

D'où la règle : **ne jamais déclencher sur un événement isolé. Exiger une confirmation.**

Ce n'est pas une question de sensibilité, c'est une question de motif temporel. Et ça, aucun réglage du capteur ne sait le faire — il faut le construire dans Home Assistant.

## La solution

Trois briques. Le capteur physique ne parle plus jamais directement à l'alarme.

### Brique 1 — Un helper pour mémoriser

Un `input_datetime` par capteur, qui stocke l'horodatage de la **fin** de la dernière détection.

**Paramètres** → **Appareils et services** → **Assistants** → **Créer un assistant** → **Date et heure**, avec date et heure activées.

### Brique 2 — Une automatisation qui enregistre

Elle se déclenche quand le capteur repasse de `on` à `off`, et écrit l'heure courante dans le helper.

```yaml
alias: "[ALARME] Vibration - mémoriser fin de détection"
description: >
  Enregistre l'heure de fin de chaque détection des capteurs de vibration.
  Ces horodatages alimentent les capteurs « Vibration confirmée ».
mode: queued
max: 10
triggers:
  - trigger: state
    entity_id: binary_sensor.capteur_vibration_salon
    from: "on"
    to: "off"
    id: salon
actions:
  - choose:
      - conditions:
          - condition: trigger
            id: salon
        sequence:
          - action: input_datetime.set_datetime
            target:
              entity_id: input_datetime.vibration_salon_fin_precedente
            data:
              datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
```

Le mode `queued` compte : si deux capteurs se déclenchent en même temps, aucun enregistrement n'est perdu.

### Brique 3 — Le capteur virtuel « confirmé »

Un capteur template qui ne passe à `on` que si **deux conditions** sont réunies : une vibration est en cours, **et** la précédente s'est terminée il y a moins de 90 secondes.

**Paramètres** → **Assistants** → **Créer un assistant** → **Template** → **Capteur binaire template**.

```jinja
{{ is_state('binary_sensor.capteur_vibration_salon','on')
   and (as_timestamp(now())
        - as_timestamp(states('input_datetime.vibration_salon_fin_precedente'), 0)) < 90 }}
```

Classe d'appareil : `vibration`.

### Et dans Alarmo

C'est le point décisif : dans la configuration des zones d'Alarmo, on sélectionne **le capteur virtuel**, jamais le capteur physique.

Le capteur Aqara devient une source de données brutes. La décision est prise ailleurs.

## Pourquoi 90 secondes

C'est la fenêtre que j'ai retenue. Elle est assez longue pour couvrir quelqu'un qui s'acharne sur une ouverture, assez courte pour qu'un second parasite indépendant ait peu de chances de tomber dedans.

<!-- À COMPLÉTER : comment j'ai choisi cette valeur ? testée, calculée, au feeling ? Est-ce que j'ai essayé d'autres durées avant ? -->

Si tu reprends ce montage, cette valeur est le seul réglage à ajuster.

## Le résultat

Plus de déclenchement nocturne.

<!-- À COMPLÉTER : depuis combien de temps ça tourne sans incident ? Est-ce qu'il y a eu un faux positif résiduel depuis ? -->

Et surtout : le capteur est toujours actif. Je n'ai rien retiré, rien désactivé. Une vraie intrusion déclencherait toujours l'alarme.

C'est la différence entre régler un problème et le contourner.

## Ce que ça coûte en réactivité

Il faut être honnête sur le compromis.

Ce filtre introduit un délai. Une intrusion réelle ne déclenchera pas à la première vibration, mais à la seconde. Quelques secondes de retard.

Pour une alarme domestique, ce délai est sans conséquence : personne ne pénètre dans une maison en trois secondes. Mais si tu transposes ce montage à un usage où la réaction immédiate compte, sache que tu échanges de la rapidité contre de la fiabilité.

## Transposable à d'autres capteurs

Le principe dépasse largement les capteurs de vibration.

Il s'applique à tout capteur qui produit des faux positifs isolés : détecteurs de mouvement capricieux, capteurs d'ouverture mal alignés, détecteurs de présence en limite de portée.

La question à se poser est toujours la même : **est-ce qu'un vrai événement produirait une seule détection, ou plusieurs ?**

Si la réponse est « plusieurs », le filtre de confirmation s'applique.

## Les limites, ce qui casse encore

- **Le filtre ne corrige pas la cause.** Le capteur continue de remonter des parasites, ils sont simplement ignorés. Si les remontées deviennent fréquentes au point que deux tombent dans la même fenêtre de 90 secondes, le faux positif passe.
- **Un helper par capteur.** Ça ne se met pas à l'échelle élégamment sur vingt capteurs.
- **Une intrusion très brève et unique ne déclencherait pas.** Assumé.

## Le matériel et les versions

- Capteurs de vibration Aqara
- Alarmo, via HACS
- Home Assistant : 2026.8.2

---

## La suite

Une alarme fiable qui se déclenche au bon moment ne sert toujours à rien si personne ne l'entend.

Le prochain article traite des **alertes critiques iOS** : faire sonner un iPhone en mode silencieux et en mode Concentration.
