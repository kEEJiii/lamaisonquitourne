---
layout: ../layouts/Page.astro
title: "À propos"
description: "Qui je suis, à quoi ressemble ma maison, et ce qui tourne dedans. Le contexte pour savoir si ce que j'écris s'applique à votre cas."
---

# La maison, et celui qui la bricole

## Bonjour

Je m'appelle Alex. Je travaille dans l'informatique depuis une douzaine d'années, côté conseil et gestion de projets. Ce n'est pas mon métier de faire de la domotique. C'est ce que je fais le soir, une fois les enfants couchés.

Je vis au nord de Lyon, dans le Beaujolais, avec Marie, nos deux enfants et un chat nommé Khalee 🐈

Ce blog raconte une installation Home Assistant qui tourne dans une maison habitée. Pas dans un labo. La différence est importante : quand une automatisation rate ici, quelqu'un se réveille, râle, ou reste dans le noir 😅

## À quoi ressemble la maison

C'est le contexte qui vous dira si mes articles s'appliquent à votre situation.

| | |
|---|---|
| Type | Maison individuelle, construction récente |
| Surface | XX m² sur deux niveaux |
| Année | XXXX |
| Région | Beaujolais, au nord de Lyon |
| Chauffage | Pompe à chaleur air/eau, gestion multi-zones |
| Volets | Volets roulants motorisés sur toutes les pièces |
| Extérieur | Terrasse, jardin, garage, arrosage automatique |

Deux choses en découlent, et elles reviennent souvent dans mes articles.

**La construction récente** veut dire une isolation correcte, mais aussi une maison qui chauffe vite en été. D'où mon obsession pour la gestion thermique des volets ☀️

**La pompe à chaleur multi-zones** est une contrainte lourde. Elle ne se pilote pas comme un radiateur électrique, et beaucoup de tutoriels ne s'appliquent pas 🤷

## Qui s'en sert

C'est le point que je considère comme le plus déterminant, et le plus souvent négligé.

Marie a un iPhone. Elle n'ouvre jamais Home Assistant. Les enfants non plus. Ils utilisent l'app Maison d'Apple, un interrupteur mural, ou ils demandent à voix haute.

Donc chaque automatisation que j'écris doit passer un test : **est-ce que ça marche si je ne suis pas là ?**

Une installation domotique qui dépend de son administrateur n'est pas une installation. C'est un hobby déguisé. J'ai mis un moment à l'admettre 😬

## Ce qui tourne

### Le cerveau

| Élément | Détail |
|---|---|
| Home Assistant | Sur Raspberry Pi |
| Accès distant | Nabu Casa |
| Extensions | HACS |
| Sauvegardes | Automatiques |

### Les protocoles

| Protocole | Matériel |
|---|---|
| Zigbee | Clé Sonoff Zigbee 3.0 USB Dongle Plus V2, via ZHA |
| Matter / Thread | Actifs |
| MQTT | Broker local |
| HomeKit | Trois ponts vers l'app Maison d'Apple |
| Bluetooth | Intégré au Raspberry Pi |

### Les gros morceaux

| Domaine | Ce qui est branché |
|---|---|
| Chauffage | Pompe à chaleur, via Overkiz |
| Volets | Motorisation, via Overkiz |
| Alarme | Alarmo, entièrement local |
| Ouvertures | Capteurs Aqara sur portes et fenêtres |
| Caméras | Aqara, via HomeKit Controller |
| Jardin | Robot tondeuse Navimow, vanne d'arrosage connectée |
| Électroménager | Bosch, LG |
| Eau | Relevé de consommation |
| Voiture | Renault connectée |
| Voix | Assistant Google, et Siri via HomeKit |

Environ soixante intégrations actives au total. Toutes ne servent pas tous les jours 🙂

## Ce que je n'ai pas

Autant l'annoncer, ça évitera des déceptions.

- **Pas de panneaux solaires.** Donc pas d'optimisation d'autoconsommation.
- **Pas de piscine.**
- **Pas de KNX ni de câblage domotique dédié.** Tout est sans fil, sur une maison déjà construite.
- **Pas de serveur ni de baie.** Un Raspberry Pi dans un placard.
- **Pas de budget illimité.** Chaque achat est arbitré 💸

## Pourquoi ce blog

Parce que j'ai cherché.

Sur la plupart des sujets que je traite ici, j'ai passé des soirées entières à fouiller des forums anglophones, des fils Reddit et des vidéos de trente minutes pour trouver une réponse de deux lignes. En français, il n'y avait rien, ou du contenu générique qui ne descendait jamais au niveau où ça coince vraiment.

Alors j'écris ce que j'aurais voulu lire ✍️

Chaque article suit la même structure : le problème concret, ce que j'ai essayé et qui n'a pas marché, la solution qui tourne, et ce qui casse encore. Cette deuxième partie est celle qui me prend le plus de temps à écrire. C'est aussi celle qui vous fera gagner le vôtre.

Rien ici n'est théorique. Si c'est publié, c'est que ça tourne chez moi ✅

## Comment ça marche, côté honnêteté

- **Rien n'est sponsorisé.** J'achète mon matériel.
- **Je publie les échecs.** Certains articles sont marqués « abandonné » : je raconte pourquoi.
- **Je date et je corrige.** Home Assistant sort une version par mois. Ce qui marchait en janvier peut casser en mars.
- **Je ne prétends pas être expert.** Je suis un utilisateur avancé qui documente ce qu'il fait.

## Me contacter

Une question, une correction, un truc qui ne marche pas chez vous ?

**XXX@lamaisonquitourne.fr**

Je réponds quand je peux. Comptez quelques jours — j'ai un travail, deux enfants et un jardin 🌿