---
draft: true
title: "Alarme maison sans abonnement : j'ai remplacé un devis à 5 000 € par Home Assistant"
description: "Verisure me proposait 2 000 € d'installation et 50 € par mois. Ce qu'on voulait, c'était être prévenus — pas une intervention. Voici l'alarme que j'ai montée avec Alarmo, et ce qu'elle ne fait pas."
pubDate: 2026-08-20
category: "Sécurité & présence"
etat: "tourne"
etatLabel: "Tourne chez moi"
tags: ["alarme", "alarmo", "securite", "verisure", "sans-abonnement"]
---

## Le problème

Ma femme voulait une alarme.

Pas une lubie de bricoleur, une vraie demande : se sentir tranquille quand on part, et savoir si quelque chose s'ouvre pendant la nuit.

J'ai fait ce que tout le monde fait. J'ai demandé un devis à Verisure.

**2 000 € d'installation, puis 50 € par mois.** Sans négocier, et c'est un devis réel, pour ma maison, en 2024.

Sur cinq ans, ça fait **5 000 €**.

Je n'ai pas dit non par principe. J'ai dit non parce que j'avais déjà Home Assistant qui tournait, et que je voulais comprendre ce que ces 5 000 € achetaient exactement avant de les dépenser.

Cet article est ce que j'aurais voulu lire à ce moment-là. Parce que quand j'ai cherché « alarme Home Assistant » en français, je n'ai rien trouvé qui parte du début.

## La question que je ne m'étais pas posée

Avant de comparer des devis, j'aurais dû me demander ce que j'attendais réellement d'une alarme.

Je croyais que c'était « empêcher un cambriolage ». C'est ce que vend le marché, et c'est une promesse confortable.

Sauf qu'elle ne tient pas complètement. Des gens équipés d'un système professionnel se font cambrioler. Une alarme dissuade, ralentit, complique — elle n'empêche pas.

En posant les choses à plat avec elle, notre vrai besoin était ailleurs :

**Savoir.** Ne pas rentrer de trois jours d'absence et découvrir. Être prévenu au moment où ça arrive, pas en poussant la porte.

**Dormir tranquille.** Savoir que si une porte s'ouvre à trois heures du matin, quelque chose nous réveillera.

C'est tout. Ni intervention, ni opérateur, ni contrat.

Et une fois ce besoin formulé, la question du prix devient limpide : est-ce que ça vaut 5 000 € sur cinq ans d'être prévenu quand une fenêtre s'ouvre ?

Pour nous, non.

## Ce qu'est une alarme, vraiment

C'est le point que personne n'explique, et c'est celui qui débloque tout.

Une alarme, ce sont **quatre briques** :

| Brique | Rôle | Chez moi |
|---|---|---|
| **Des capteurs** | Détecter une ouverture, un mouvement | Capteurs Aqara sur portes et fenêtres |
| **Un cerveau** | Décider si c'est une intrusion ou toi qui rentres | Alarmo, dans Home Assistant |
| **Du bruit** | Faire fuir, alerter les voisins | Deux sirènes, une intérieure, une extérieure |
| **Une alerte** | Te prévenir, où que tu sois | Notification sur iPhone |

Une offre commerciale vend les quatre d'un bloc, plus un service. Rien ne t'empêche de les assembler toi-même.

La partie qui semblait la plus compliquée — le cerveau — est en réalité celle qui coûte le moins cher. Elle est gratuite.

## Alarmo, et ce que ce n'est pas

**Alarmo** est une extension gratuite pour Home Assistant. Elle ajoute ce qui lui manque pour faire une alarme : les modes d'armement, les zones, les délais d'entrée et de sortie, un code de désarmement, un journal des événements.

Tout est local. Aucun compte, aucun cloud, aucun abonnement.

**Ce n'est pas de la télésurveillance.** Personne ne regarde. Personne n'appelle la police. Personne ne se déplace. Ta maison fait du bruit et ton téléphone sonne — c'est tout, et il faut le savoir avant de commencer.

## L'installation

Alarmo passe par HACS, le magasin d'extensions communautaires de Home Assistant.

1. HACS → **Intégrations** → chercher **Alarmo** → installer
2. Redémarrer Home Assistant
3. **Paramètres** → **Appareils et services** → **Ajouter une intégration** → **Alarmo**

Une entrée « Alarmo » apparaît dans le menu latéral. Toute la configuration se fait là, en interface graphique. Aucun YAML.

<!-- CAPTURE 1 : l'écran principal d'Alarmo -->

## Les trois décisions qui structurent tout

### 1. Les modes

Alarmo distingue plusieurs états d'armement. Les deux qui comptent :

- **Away** — personne à la maison. Tout est surveillé.
- **Home** — on est là, on dort. Seul le périmètre est surveillé : portes et fenêtres, mais pas les mouvements intérieurs.

Le mode Home est celui qui rend une alarme utilisable au quotidien. Sans lui, tu ne l'armes jamais la nuit, et une alarme qu'on n'arme pas ne sert à rien.

### 2. Les zones

Chaque capteur est rattaché à un ou plusieurs modes. La porte d'entrée déclenche dans tous les cas. Une fenêtre à l'étage, seulement en Away si tu dors la fenêtre ouverte.

C'est là que tu passeras le plus de temps, et c'est normal : c'est la traduction de ta vie réelle en règles.

### 3. Les délais

- **Délai de sortie** : le temps de sortir après l'armement sans déclencher.
- **Délai d'entrée** : le temps de désarmer en rentrant.

Trop court, tu déclenches ta propre alarme. Trop long, un intrus a le temps de faire son affaire.

Je ne publie pas mes valeurs — ce serait offrir la moitié du travail à quelqu'un de mal intentionné. Réfléchis simplement au temps qu'il te faut réellement, chronomètre en main.

<!-- CAPTURE 2 : l'écran de configuration des zones -->

## Armer sans téléphone

C'est le point qui décide si ton alarme sera utilisée ou oubliée.

Si armer suppose de sortir son téléphone, déverrouiller, ouvrir une app et appuyer — personne ne le fera. Surtout pas quelqu'un qui n'a pas installé le système.

Chez moi, deux **télécommandes Zigbee** à une dizaine d'euros. Un bouton pour armer, un pour désarmer. Collées près des portes.

Et un retour visuel : **la lumière de l'entrée clignote** pour confirmer l'armement. Sans ça, tu doutes toujours de savoir si c'est bien parti.

Cette histoire de confirmation paraît anecdotique. C'est en réalité ce qui a fait qu'elle utilise l'alarme sans me demander.

<!-- CAPTURE 3 : la télécommande en place -->

## Être prévenu pour de vrai

Une notification classique ne réveille personne. Elle passe en silencieux, elle est bloquée par le mode Concentration, elle arrive au milieu de trente autres.

iOS a une réponse à ça : les **alertes critiques**. Elles sonnent même en silencieux, même en Concentration, même la nuit.

C'est le seul type de notification qui convient à une alarme. Ça demande une configuration spécifique — j'y consacre un article dédié.

<!-- LIEN À AJOUTER vers l'article sur les alertes critiques iOS -->

## Ce que je perds par rapport à Verisure

Cette section est la plus importante de l'article. Si tu ne lis qu'une chose, lis celle-ci.

**Pas de télésurveillance.** Personne ne vérifie, personne n'appelle. Si l'alarme se déclenche et que tu es en réunion, il ne se passe rien de plus que du bruit chez toi.

**Pas de levée de doute.** Un opérateur qui écoute et regarde avant d'alerter, ça n'existe pas ici. Chaque déclenchement, c'est toi qui décides.

**Pas d'intervention.** Aucun agent ne se déplace.

**Une dépendance à mon installation.** Coupure de courant, box en panne, Raspberry Pi mort : plus d'alarme. Un système commercial embarque une batterie de secours et une carte SIM. C'est une vraie différence.

**Aucune garantie ni assurance.** Si ça rate, c'est mon problème. Certains assureurs accordent une réduction pour un système certifié — pas pour celui-ci.

**Et tout le travail est le mien.** L'installation, la maintenance, les mises à jour. Ce n'est pas gratuit, c'est payé en soirées.

Ces manques sont réels. Mais aucun ne correspondait à ce qu'on cherchait.

Nous voulions être prévenus et dormir tranquilles. Ces deux choses-là, mon installation les fait aussi bien qu'un système à 5 000 €, et sur certains points mieux : je reçois une alerte critique sur mon téléphone en quelques secondes, et je vois l'état de chaque ouverture à distance, sans passer par un opérateur.

**La bonne question n'est donc pas « Home Assistant ou Verisure ». C'est : qu'est-ce que tu attends d'une alarme ?**

Si tu veux qu'un agent se déplace pendant que tu es en réunion, paye l'abonnement. Aucune installation maison ne remplacera un opérateur, et ce serait malhonnête de prétendre le contraire.

Si tu veux savoir, être prévenu et dormir tranquille — tu n'as pas besoin de payer 50 € par mois pour ça.

## Le seul verdict qui compte

L'alarme, ce n'est pas mon projet. C'est celui de ma femme.

Elle l'utilise. Elle l'arme et la désarme seule, avec la télécommande. Elle ne m'a jamais demandé comment ça marchait, et elle n'a jamais eu besoin d'ouvrir Home Assistant.

Elle en est satisfaite.

C'est le seul indicateur que je regarde. Une alarme que le reste du foyer n'utilise pas est une alarme qui n'existe pas — peu importe la qualité des automatisations derrière.

Si j'avais un conseil à retenir de tout cet article : ne demande pas si ton installation est bien faite. Demande à la personne qui vit avec toi si elle s'en sert.

## Le budget, sans arrondir en ma faveur

| | Verisure (devis 2024) | Chez moi |
|---|---|---|
| Installation | 2 000 € | — |
| Matériel | inclus | ~900 € |
| Logiciel | inclus | 0 € (Alarmo) |
| **Abonnement** | **50 €/mois** | **0 €** |
| **Total sur 5 ans** | **5 000 €** | **~900 €** |

Neuf cents euros, ce n'est pas rien. Je préfère l'écrire clairement plutôt que d'annoncer un chiffre flatteur qui ne tiendrait pas.

Ce montant couvre l'ensemble de mon écosystème Aqara : les hubs M2 et M3, les caméras, les capteurs d'ouverture, les détecteurs de fuite d'eau. Auquel s'ajoutent les sirènes Zigbee et les télécommandes.

Deux précisions honnêtes.

**Une partie de ce budget dépasse l'alarme.** Les détecteurs de fuite et les caméras servent au quotidien, pas seulement en cas d'intrusion. Une alarme seule reviendrait nettement moins cher — compte 200 à 300 € pour des capteurs d'ouverture, deux sirènes et une télécommande.

**Je ne compte pas Home Assistant**, qui tournait déjà chez moi. Si tu pars de zéro, ajoute 100 à 150 €.

Il reste que l'écart est net : **900 € une fois contre 5 000 € sur cinq ans.** Et à la sixième année, l'écart continue de se creuser de 600 € par an.

## Par où commencer

1. **Deux capteurs**, sur la porte d'entrée et la fenêtre la plus accessible. Rien d'autre.
2. **Alarmo installé**, un seul mode Away, sans sirène. Regarde ce qui se déclenche pendant une semaine.
3. **Ajoute la sirène** une fois que tu as confiance dans les détections.
4. **Ajoute le mode Home**, celui que tu utiliseras le plus.
5. **Ajoute la télécommande**, pour que quelqu'un d'autre que toi puisse s'en servir.
6. **Étends** aux autres ouvertures.

Ne branche pas la sirène le premier jour. Tu vas avoir des faux positifs — tout le monde en a — et une sirène qui hurle à trois heures du matin sans raison, c'est le meilleur moyen de tout débrancher définitivement.

## Les limites, ce qui casse encore

- **Les faux positifs existent.** J'en ai eu, à cause de mon chat. J'ai fini par les régler, mais ça m'a pris du temps — un article y est consacré.
- **Aucune batterie de secours.** <!-- À COMPLÉTER : est-ce que j'ai mis un onduleur depuis ? -->
- **Alarmo est une extension communautaire.** Elle est excellente et bien maintenue, mais elle ne dépend pas de l'équipe Home Assistant.

## Le matériel

- Hubs Aqara M2 et M3
- Capteurs d'ouverture Aqara T1 (`MCCGQ12LM`)
- Caméras Aqara
- Détecteurs de fuite d'eau Aqara
- Sirène intérieure Heiman, Zigbee
- Sirène extérieure Tuya, Zigbee
- Télécommandes Zigbee deux boutons
- Alarmo, via HACS
- Home Assistant 2026.8.2

---

## La suite

Une alarme qui fait du bruit chez toi ne sert à rien si tu ne sais pas qu'elle sonne.

Le prochain article traite des **alertes critiques iOS** : comment faire sonner un iPhone en mode silencieux et en mode Concentration. C'est ce qui transforme un système de dissuasion en système d'alerte.

---

*Aucun lien de cet article n'est affilié. Le devis Verisure mentionné est celui que j'ai personnellement reçu en 2024 ; les tarifs varient selon la surface, les options et le commercial.*
