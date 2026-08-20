---
draft: false
title: "Ce que j'expose dans l'app Maison, et ce que je garde dans Home Assistant"
description: "Home Assistant peut tout envoyer vers l'app Maison d'Apple. C'est précisément le problème. Voici le tri que j'ai fini par faire, et la règle qui le guide."
pubDate: 2026-08-20
category: "Le pont HomeKit"
etat: "tourne"
etatLabel: "Tourne chez moi"
tags: ["homekit", "ios", "pont", "apple", "organisation"]
---

## Le problème

Le pont HomeKit est installé. Tout fonctionne. Et là, la tentation est immense : tout exposer.

Après tout, pourquoi se priver ? Home Assistant sait envoyer vers l'app Maison à peu près n'importe quelle entité. Les lampes, les volets, mais aussi le niveau de batterie de chaque capteur, l'état du lave-vaisselle, la position du robot tondeuse, l'autonomie de la voiture.

C'est exactement ce qu'il ne faut pas faire.

Une app Maison qui contient deux cents accessoires n'est pas une app riche. C'est une app que plus personne n'ouvre.

Et le jour où ma femme ne l'ouvre plus, mon installation entière ne sert plus à rien. Peu importe la qualité des automatisations derrière : si l'interface est illisible, le système est mort.

## La règle, formulée après coup

Je n'avais pas de règle au départ. Je l'ai découverte en faisant du ménage, plusieurs fois.

La voici : **est-ce un truc utile du quotidien ?**

Pas « est-ce que c'est exposable ». Pas « est-ce que c'est intéressant ». Est-ce que quelqu'un, dans cette maison, va vouloir l'utiliser aujourd'hui.

Formulée autrement, et c'est la version qui m'a débloqué :

> **Est-ce qu'on l'actionne, ou est-ce qu'on le consulte ?**

Ce qu'on actionne va dans l'app Maison. Ce qu'on consulte reste dans Home Assistant.

Cette distinction règle 90 % des cas.

## Ce que j'expose

**Les lumières**, une par usage réel : salon, évier et hotte dans la cuisine, chevet, buanderie, entrée, bureau, couloir, garage, terrasse.

![Onglet Lumières de l'app Maison, une tuile par pièce](/images/app-maison-lumieres.png)

Rien de superflu. Chaque tuile correspond à un interrupteur que quelqu'un actionne dans une journée normale.

**Les volets et le chauffage**, regroupés par pièce.

![Onglet Climat de l'app Maison avec les volets et la climatisation](/images/app-maison-climat.png)

C'est l'onglet le plus utilisé de la maison. Huit stores, la climatisation par zone, les sèche-serviettes. Et deux raccourcis en haut — « Fermer volets » et « Ouvrir volets » — parce que personne ne veut ouvrir huit tuiles une par une.

Ces deux boutons sont sans doute le meilleur rapport effort/usage de toute mon installation.

**L'eau**, avec la vanne d'arrosage du jardin et la coupure générale du garage.

![Onglet Eau de l'app Maison avec les deux vannes](/images/app-maison-eau.png)

La coupure générale ne sert presque jamais. Mais le jour où un détecteur de fuite se déclenche, on est content de pouvoir fermer l'arrivée d'eau depuis son téléphone.

**Les capteurs d'ouverture** : fenêtres des chambres, salle de bain, toilettes, porte de la buanderie. On ne les actionne pas, mais on les consulte au moment de partir — c'est le seul cas où consulter suffit à justifier l'exposition.

**L'alarme**, armable et désarmable directement.

Le point commun de cette liste : chaque élément correspond à un geste que quelqu'un fait dans une journée normale.

## Ce que je garde dans Home Assistant

### Les capteurs de batterie et de diagnostic

C'est le plus gros volume, et de loin.

Chaque capteur Zigbee remonte son niveau de batterie, sa qualité de signal, sa température interne. Multiplié par le nombre d'appareils, ça fait des dizaines d'entités.

Elles sont utiles — j'ai une automatisation qui me prévient quand une pile faiblit. Mais elles s'adressent à **l'administrateur du système**, pas aux habitants de la maison. Personne n'ouvre l'app Maison pour vérifier une tension de pile.

C'est de la surveillance, pas de l'usage.

### L'électroménager

Le four et le lave-vaisselle Bosch, le lave-linge LG. Ils sont intégrés à Home Assistant, ils remontent leur état, leur programme, leur temps restant.

Aucun n'est dans l'app Maison.

Raison simple : **ils ont déjà leur propre application**, souvent meilleure. Home Connect gère le four mieux qu'une tuile Apple ne le fera jamais. Dupliquer une interface qui existe déjà, c'est ajouter du bruit sans rien apporter.

Et surtout : on ne lance pas un lave-vaisselle depuis son téléphone. On le remplit, on appuie sur le bouton, on part.

### Le robot tondeuse

Même logique. Il a son application dédiée, qui affiche la carte du jardin et les zones tondues. Une tuile « on/off » dans l'app Maison serait une régression.

### La voiture et la consommation d'énergie

La voiture connectée remonte son autonomie, sa charge, sa localisation. La consommation d'eau et d'électricité aussi.

Ce sont des données que je regarde — parfois avec intérêt, souvent par curiosité. Mais je les regarde dans Home Assistant, sur un tableau de bord fait pour ça.

Les mettre dans l'app Maison, ce serait transformer une télécommande en tableau de bord. Deux objets différents.

## Le piège qui m'a coûté du ménage

Il y a une catégorie d'entités qu'on n'expose jamais volontairement, et qui arrive quand même : **les entités de diagnostic générées automatiquement.**

Chaque appareil Aqara crée un bouton « Identifier », dont la seule fonction est de faire clignoter sa LED pour le retrouver dans un placard. Utile une fois, à l'installation. Jamais ensuite.

Si tu inclus le domaine `button` en entier, ils partent tous chez Apple.

C'est le genre de chose qu'on ne voit pas venir, parce qu'on raisonne en domaines alors qu'il faudrait raisonner en usages.

## Ce que j'ai retiré après coup

J'ai fait ce ménage plusieurs fois. Ce n'est pas un aveu d'échec : c'est la seule méthode qui marche.

On n'anticipe pas ce qui va encombrer. On le découvre en ouvrant l'app trois semaines plus tard et en constatant qu'on scrolle pour trouver le volet du salon.

<!-- À COMPLÉTER : deux ou trois exemples concrets de choses retirées, et pourquoi -->

## Comment faire le tri chez toi

Une méthode en quatre questions, à poser pour chaque entité :

1. **Est-ce que quelqu'un d'autre que moi va l'utiliser ?** Si non, ça reste dans Home Assistant.
2. **Est-ce qu'on l'actionne ou est-ce qu'on le consulte ?** Consulter, c'est Home Assistant. Sauf pour les ouvertures, qu'on vérifie en partant.
3. **Est-ce qu'une meilleure application existe déjà ?** Si oui, ne duplique pas.
4. **Est-ce que ça sert aujourd'hui, ou une fois par an ?** Une fois par an, c'est Home Assistant.

Et une méthode encore plus simple, que je recommande : **fais ouvrir l'app Maison à quelqu'un qui vit chez toi, et regarde-le chercher.** Ce qu'il ne trouve pas est mal nommé. Ce qu'il dépasse sans le voir n'a rien à faire là.

## Les limites, ce qui casse encore

- **Le ménage n'est jamais fini.** Chaque nouvel appareil ajoute ses entités, et certaines passent le filtre sans qu'on le veuille.
- **Retirer une entité peut la faire réapparaître** si un filtre de domaine se retrouve vide — le comportement décrit dans l'article précédent.

## Le matériel et les versions

- Home Assistant : 2026.8.2
- Intégration : HomeKit Bridge (native)
- Côté Apple : iPhone sous iOS 26

---

## La suite

Le tri fait, l'app Maison devient utilisable. Reste la question de la fiabilité : que se passe-t-il quand un capteur se déclenche sans raison ?

Chez moi, la réponse s'appelait le chat. C'est le sujet du prochain article.
