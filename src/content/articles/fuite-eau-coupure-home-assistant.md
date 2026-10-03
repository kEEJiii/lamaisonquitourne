---
title: "Fuite d’eau : ma maison peut couper l’arrivée avant que je rentre"
description: "Détecteurs Aqara, coupure d’eau et Home Assistant : mon installation pour réagir à une fuite, ses garde-fous et les limites à connaître."
pubDate: 2026-10-03
category: "Automatisations du quotidien"
etat: "tourne"
etatLabel: "Installé chez moi — tests à refaire régulièrement"
tags: ["fuite-eau", "aqara", "home-assistant", "coupure-eau", "automatisation"]
draft: false
---

## Une notification ne ferme pas un robinet

Un flexible qui lâche pendant qu’on est au travail. Une fuite derrière un appareil. On peut avoir le téléphone dans la poche et découvrir le problème trop tard.

Dans ma maison, j’ai des détecteurs de fuite Aqara. Ils sont reliés à Home Assistant, qui peut commander la coupure de l’arrivée d’eau.

L’idée tient en une phrase : **si de l’eau est détectée, lancer la fermeture sans attendre que je voie le message.**

Je ne vais pas raconter que cette installation m’a sauvé d’un dégât des eaux. Ce que je partage ici, c’est le système installé chez moi, sa logique et les points à vérifier pour pouvoir compter dessus.

## Trois briques, chacune avec son rôle

Pas besoin d’un écran mural ou d’un tableau de bord compliqué.

| Brique | Son rôle | Chez moi |
|---|---|---|
| Un détecteur | Signaler la présence d’eau à son emplacement | Trois détecteurs Aqara, plus un signal de fuite remonté par l’arrosage |
| Une commande de coupure | Agir sur l’arrivée d’eau | Un module motorisé, piloté dans Home Assistant |
| Une automatisation | Relier la détection, la fermeture et l’alerte | Home Assistant |

La différence avec un détecteur qui sonne seul est là : **la détection peut déclencher une action**, même quand personne n’est à côté.

Mais un capteur de fuite ne surveille pas toute la plomberie. Il détecte de l’eau à un endroit précis. Une fuite qui coule ailleurs peut lui échapper.

## Le placement compte autant que le matériel

Avant de multiplier les capteurs, je regarderais les endroits où une fuite risque de rester invisible : près d’un raccord de lave-linge, sous un évier ou à proximité d’un équipement alimenté en eau.

Ce sont des exemples de placement, pas la liste des emplacements de mes capteurs.

Le bon endroit dépend surtout du chemin que prendrait l’eau. Un détecteur posé trop loin du raccord, ou sur un point plus haut que le reste du sol, peut rester sec pendant que l’eau s’accumule ailleurs.

Il faut aussi pouvoir le récupérer pour vérifier sa pile et le tester. Caché au fond d’un meuble inaccessible, on finit par l’oublier.

## Ce qui se passe chez moi en cas de détection

Mon automatisation est active. Lorsqu’un des quatre signaux surveillés passe à l’état « fuite », elle :

1. Envoie immédiatement la commande de coupure.
2. Mémorise qu’une fuite a été détectée.
3. Attend cinq secondes.
4. Vérifie l’état remonté par le module.
5. Envoie un message adapté au résultat.

Si le module remonte l’état attendu, je reçois : **« 💧 Fuite d’eau — Eau coupée suite à fuite. »**

Si la fermeture n’est pas confirmée, une alerte critique est prévue sur nos deux iPhone : il faut vérifier manuellement.

Cette distinction me paraît essentielle. Envoyer une commande ne signifie pas qu’elle a été exécutée.

Et même l’état remonté a une limite : **ce n’est pas une mesure du débit d’eau.** Le module peut afficher l’état attendu sans prouver que la vanne ferme correctement. Cette partie se vérifie physiquement.

## Le détail important : ne pas rouvrir parce que le capteur est sec

Une fois l’eau coupée, le détecteur peut finir par sécher. Cela ne veut pas dire que le flexible ou le raccord est réparé.

J’ai donc une mémoire « Fuite d’eau active ». La détection l’active ; le retour du capteur à l’état sec ne l’efface pas.

Cette mémoire bloque la réouverture automatique prévue dans mon installation. **La remise en service après une fuite doit passer par une vérification et une intervention manuelles.**

C’est moins spectaculaire qu’une notification sur le téléphone. Mais c’est probablement le point le plus important de toute la logique.

## Le cas auquel on pense moins : la coupure de courant

La configuration de mon installation documente un comportement gênant du module : il peut revenir fermé après une coupure de courant.

Une seconde automatisation est prévue pour rétablir l’eau après son retour en ligne ou un redémarrage de Home Assistant. Elle attend que les appareils remontent leurs états, puis vérifie deux choses :

- Aucune fuite n’est mémorisée.
- Tous les signaux de fuite surveillés sont explicitement à l’état normal.

Un capteur indisponible ne remplit pas cette deuxième condition.

Ce fonctionnement reste propre à mon matériel. Avant de reproduire une règle de réouverture, il faut comprendre ce que fait sa vanne après une perte d’alimentation. Et tester ce comportement, pas seulement lire son état dans l’application.

## Ce que je testerais avant de partir tranquille

Le bouton « Exécuter » de Home Assistant ne suffit pas : il lance les actions sans vérifier que le détecteur déclenche réellement la règle.

Je testerais toute la chaîne, à un moment où couper l’eau ne gêne personne, avec la méthode de test prévue par le fabricant du capteur.

| Test | Ce qu’il faut vérifier |
|---|---|
| Déclencher le détecteur | Home Assistant voit bien la fuite et lance l’automatisation |
| Commander la fermeture | Le mécanisme bouge et l’arrivée est réellement coupée |
| Vérifier le téléphone | Le message arrive sur le bon appareil |
| Remettre le capteur au sec | La mémoire de fuite reste active |
| Redémarrer Home Assistant avec cette mémoire active | La règle de réouverture ne rétablit pas l’eau |
| Terminer le test | L’eau est remise en service volontairement et les capteurs sont secs |

Ce tableau décrit les vérifications à faire. Je ne le présente pas comme une campagne de tests déjà réalisée chez moi.

Pour les alertes critiques sur iPhone, il faut aussi autoriser cette fonction dans les réglages de l’application. Une configuration dans Home Assistant ne dispense pas de vérifier la réception sur le téléphone.

## Les limites que je garde en tête

Si le capteur n’est pas au bon endroit, il ne verra rien. Si sa pile est vide ou si la liaison radio ne fonctionne plus, l’information peut ne pas arriver.

Home Assistant et le mécanisme de coupure doivent également être alimentés et disponibles. Une panne du système peut empêcher la fermeture.

Enfin, couper l’arrivée ne fait pas disparaître l’eau déjà présente dans les tuyaux ou les équipements. L’objectif est de limiter l’apport d’eau supplémentaire.

Je garde donc l’accès à la coupure manuelle. Et pour choisir ou monter un mécanisme sur l’arrivée générale, la compatibilité avec la vanne existante compte davantage que le logo « connecté » sur la boîte. Si le montage demande une intervention sur la plomberie, je passerais par un professionnel.

## Par où commencer

Si tu as déjà Home Assistant, commence par un détecteur à un endroit pertinent et une notification que tu as réellement testée.

La coupure automatique vient ensuite, avec un matériel adapté et une règle claire pour remettre l’eau.

Je n’annoncerais pas « une maison protégée pour trente euros ». Le module n’est qu’une partie de l’installation : il faut compter les détecteurs, leur connexion à Home Assistant et, selon le montage, la pose.

**C’est une automatisation discrète. Elle ne sert pas tous les jours, et c’est très bien comme ça.** Son intérêt est de pouvoir agir pendant qu’on est occupé ailleurs.

Pour voir les équipements que j’utilise, la page [Mon matériel](/materiel/) rassemble mon installation. Et pour commencer par une alerte plus simple, j’ai détaillé les [notifications de fin de lavage](/articles/notifications-fin-lavage-home-assistant/).

### Documentation utile

- [Déclencheurs d’automatisation Home Assistant](https://www.home-assistant.io/docs/automation/trigger/).
- [Alertes critiques de l’application Companion](https://companion.home-assistant.io/docs/notifications/critical-notifications/).

*Aucun lien de cet article n’est affilié.*
