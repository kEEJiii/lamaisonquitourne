---
layout: ../layouts/Page.astro
title: "Mon matériel"
description: "Tout le matériel domotique installé chez moi, avec mon avis après usage réel. Ce que je rachèterais, ce que j'éviterais."
---

# Mon matériel

Cette page liste **tout ce qui est réellement installé chez moi**, avec mon avis après usage.

Une seule règle : rien n'y figure si je ne l'utilise pas au quotidien. Pas de matériel testé une semaine, pas de produit reçu gratuitement, pas de recommandation sur catalogue.

Les prix sont des ordres de grandeur. Ils bougent beaucoup, notamment chez les revendeurs français qui font plusieurs opérations promotionnelles par an.

---

## Le cerveau

| Matériel | Prix | Mon avis |
|---|---|---|
| **Raspberry Pi 5** | ~90 € | Tourne depuis presque deux ans sans incident. Mais sur carte SD, ce qui est une erreur — voir plus bas. |
| **Nabu Casa** | 6,50 €/mois | L'accès distant officiel. Payer pour ne pas ouvrir de port sur sa box, ça vaut le coup. |

**Ce que je ferais différemment :** un SSD ou un NVMe dès le départ. Les cartes SD s'usent avec les écritures de la base de données, et c'est la panne la plus fréquente des installations débutantes.

Si je devais recommander à quelqu'un qui démarre sans envie de bricoler : **Home Assistant Green**, autour de 100 €. On branche, ça marche.

📄 [Se lancer dans Home Assistant : le matériel que j'achèterais aujourd'hui](/articles/materiel-debuter-home-assistant/)

---

## Le réseau Zigbee

| Matériel | Prix | Mon avis |
|---|---|---|
| **Sonoff ZBDongle-E** (Zigbee 3.0 USB Dongle Plus V2) | ~25 € | Le coordinateur. Fonctionne avec ZHA, l'intégration native de Home Assistant. Rien à installer. |
| **Rallonge USB** | ~2 € | Le meilleur rapport qualité/prix de toute mon installation. Éloigner la clé de trente centimètres double la portée. |

Sans la rallonge, la clé subit les interférences du port USB 3 et du Wi-Fi. C'est la cause numéro un des capteurs qui décrochent, et ça coûte deux euros à régler.

---

## Éclairage et modules

| Matériel | Prix | Mon avis |
|---|---|---|
| **Sonoff ZBMINIL2** ×7 | ~15 € | Mon achat préféré. Se glisse derrière un interrupteur existant, fonctionne sans neutre. Les interrupteurs muraux continuent de marcher normalement. |
| **IKEA TRADFRI Driver 30W** | ~25 € | Alimente les LED de la buanderie. Fiable, sans surprise. |

Le ZBMINIL2 est ce que je recommande le plus fort à quiconque vit dans une maison finie : aucun mur à percer, aucun appareillage à remplacer, et personne ne voit la différence.

⚠️ L'installation implique de travailler dans une boîte d'encastrement, hors tension. Si ce n'est pas ton domaine, fais-le faire.

---

## Les capteurs

| Matériel | Prix | Mon avis |
|---|---|---|
| **Aqara Door and Window Sensor T1** (`MCCGQ12LM`) | ~20 € | La brique de base de toute alarme sérieuse. Petits, discrets, fiables. Quelques faux positifs si l'aimant est mal aligné. |
| **Sonoff SNZB-06P** | ~18 € | Détecteur de présence à onde millimétrique. Détecte quelqu'un d'**immobile**, contrairement à un détecteur de mouvement classique. |

### Pourquoi le T1 en Zigbee et non le P2 en Matter

J'ai basculé toute mon installation sur la version Zigbee. Les capteurs Matter se déconnectaient — pas tous, pas tout le temps, mais assez pour qu'une fenêtre affiche « indisponible » un matin sans raison.

Sur un capteur de température, c'est agaçant. Sur une ouverture reliée à l'alarme, c'est inacceptable.

Le T1 coûte en plus une vingtaine d'euros contre plus de trente pour le P2.

---

## Les télécommandes

| Matériel | Prix | Mon avis |
|---|---|---|
| **Aqara Wireless Mini Switch** (`b1acn01`, `b1acn02`) | ~13 € | Se colle où on veut, sans câblage. |
| **IKEA RODRET** | ~10 € | Encore moins cher, très bien fini. |
| **Télécommandes Tuya TS0042** | ~8 € | Deux boutons, correctes pour le prix. |

Leur vraie fonction est sociale : elles permettent à quelqu'un qui n'a pas ton téléphone d'agir sur la maison. C'est ce qui fait accepter la domotique par ceux qui ne l'ont pas installée.

---

## La sécurité

| Matériel | Prix | Mon avis |
|---|---|---|
| **Sirène intérieure Heiman** | ~30 € | Suffisamment forte pour une maison. Zigbee, entièrement locale. |
| **Sirène extérieure Tuya** | ~35 € | Complète la précédente. Une alarme qui ne s'entend pas dehors ne dissuade personne. |
| **Alarmo** | Gratuit | Extension Home Assistant. Transforme des capteurs en vrai système d'alarme, sans abonnement. |

C'est le sujet qui m'a demandé le plus de recherches, et celui où j'ai trouvé le moins de choses en français. Un article lui sera consacré.

---

## L'extérieur

| Matériel | Prix | Mon avis |
|---|---|---|
| **Sonoff SWV** (vanne d'arrosage) | ~35 € | Se visse sur le robinet. Pilote l'arrosage du jardin depuis Home Assistant. |
| **Module de coupure d'eau Tuya** | ~30 € | Ferme l'arrivée générale si une fuite est détectée. Trente euros qui peuvent éviter un sinistre. |
| **Robot tondeuse Navimow** | — | Un article dédié viendra, après une saison complète d'usage. |

---

## Ce que je n'achèterais pas

- **Un écran mural dédié.** On croit qu'on va l'utiliser. On utilise son téléphone.
- **Une caméra, en premier achat.** C'est le plus visible, mais rarement le plus utile. Les capteurs d'ouverture apportent davantage.

---

## Où j'achète

**[Domadoo](https://www.domadoo.fr/fr/?domid=148)** est un revendeur français spécialisé en domotique, basé près de Lyon. C'est là que je commande l'essentiel de mon matériel Zigbee : gamme Sonoff, Aqara, accessoires compatibles Home Assistant.

Deux raisons à ce choix : un catalogue qui colle vraiment à l'écosystème Home Assistant plutôt qu'un rayon généraliste, et des opérations promotionnelles régulières sur les marques que j'utilise — plusieurs fois par an à -15 ou -20 % sur la gamme Sonoff, comme mentionné plus haut.

Le lien ci-dessus est un lien d'affiliation : si tu commandes en passant par lui, je touche une petite commission, sans que ça change ton prix. Ça ne change rien à mes avis non plus — je continue de n'écrire ici que sur ce que j'utilise réellement.

## Transparence

Le seul lien affilié de cette page est celui vers Domadoo ci-dessus. Aucun produit listé ici ne m'a été offert ni prêté.

Tout le matériel listé ici a été acheté de ma poche et est installé chez moi. Si d'autres liens affiliés apparaissent un jour, ce sera écrit noir sur blanc, produit par produit.

*Page mise à jour au fil des articles.*
