---
draft: true
title: "Se lancer dans Home Assistant : le matériel que j'achèterais aujourd'hui"
description: "J'ai commencé par acheter un Raspberry Pi sans savoir ce que j'allais en faire. Deux ans plus tard, voici la liste que j'aurais aimé lire avant de dépenser le premier euro."
pubDate: 2026-08-20
category: "Matériel & réseau"
etat: "tourne"
etatLabel: "Tourne chez moi"
tags: ["debuter", "materiel", "zigbee", "raspberry-pi"]
---

## Le problème

J'ai fait les choses à l'envers.

J'ai acheté un Raspberry Pi 5 sans projet précis. Un de ces achats qu'on justifie après coup. C'est en cherchant quoi en faire que j'ai découvert Home Assistant.

Mon idée de départ tenait en une phrase : **piloter la maison depuis l'app Maison de mon iPhone.** Pas depuis une application de domotique. Depuis celle qui est déjà installée, celle que ma femme utilise sans y penser.

Le reste s'est ajouté par couches. Une lampe. Puis les volets. Puis la climatisation. Puis, le jour où Marie a voulu une alarme, tout est devenu sérieux d'un coup.

C'était de l'expérimentation. Ça a fini par devenir un système dont ma famille dépend.

Voici ce que je conseillerais à quelqu'un qui démarre — c'est-à-dire l'article que j'aurais voulu lire avant de dépenser le premier euro.

## L'erreur que presque tout le monde fait

Acheter le matériel avant de savoir ce qu'on veut résoudre.

Je l'ai faite. La plupart des guides d'achat l'encouragent : ils listent du matériel sans jamais demander à quel problème il répond.

La bonne question n'est pas « qu'est-ce que je peux automatiser ». C'est **« qu'est-ce qui m'agace tous les jours ? »**

Chez moi, les réponses ont été : les volets qu'il faut fermer manuellement en été, la lumière du garage qu'on laisse allumée, et l'absence d'alarme. Trois irritants concrets. Chaque achat en découle.

Si tu n'as pas de réponse à cette question, n'achète rien. Installe Home Assistant sur un vieil ordinateur et regarde ce qu'il sait faire pendant deux semaines.

## Le cerveau : par quoi commencer

### Ce que j'ai

Un **Raspberry Pi 5**. Il tourne depuis le début, sans incident.

### Ce que je conseillerais

Ça dépend de ton rapport au bricolage informatique.

| Option | Prix indicatif | Pour qui |
|---|---|---|
| Home Assistant Green | ~100 € | On branche, ça marche. Zéro configuration système |
| Raspberry Pi 5 + SSD | ~120-150 € | On veut comprendre et pouvoir bidouiller |
| Mini-PC d'occasion | ~80-150 € | On a déjà du matériel qui traîne |

Le Home Assistant Green est le choix par défaut si tu ne veux pas passer une soirée sur une carte SD. C'est un boîtier vendu par l'équipe Home Assistant, prêt à l'emploi.

Le Raspberry Pi reste un bon choix, mais **avec un SSD, pas une carte SD**. Les cartes SD s'usent avec les écritures permanentes de la base de données. C'est la panne la plus fréquente des installations débutantes, et elle arrive souvent entre six et dix-huit mois.

### Et moi, je fais quoi ?

Je tourne sur carte SD. Depuis presque deux ans.

Je sais que c'est un pari. Je l'ai fait par facilité au démarrage, quand l'installation était un jouet, et je ne l'ai jamais corrigé parce que ça marchait. C'est exactement comme ça qu'on se retrouve avec l'alarme de la maison sur un support qui peut lâcher sans prévenir.

Ce que je conseille, et que je vais appliquer :

- **Vérifie où partent tes sauvegardes.** Par défaut, Home Assistant les écrit au même endroit que le système. Si le support meurt, la sauvegarde meurt avec. C'est le vrai piège, plus encore que la carte elle-même.
- **Envoie-les ailleurs** : le cloud Nabu Casa, un NAS, un disque réseau. N'importe où sauf sur le support principal.
- **Passe sur SSD si tu démarres.** Un boîtier NVMe pour Pi 5 coûte 30 à 40 €. C'est moins cher qu'un week-end de réinstallation.

### L'accès à distance

**Nabu Casa**, 6,50 €/mois. C'est l'abonnement officiel : il donne un accès distant sécurisé sans ouvrir de port sur ta box, et il finance le développement du projet.

Il existe des alternatives gratuites. Elles demandent de comprendre les certificats, les reverse proxies et les DNS dynamiques. Si c'est ton métier, tant mieux. Sinon, les 6,50 € sont bien dépensés.

## Le protocole : Zigbee, et rien d'autre pour commencer

C'est la décision qui structure tout le reste.

Le Wi-Fi sature ta box et dépend souvent d'un cloud constructeur. Le Zigbee crée son propre réseau maillé, local, où chaque appareil sur secteur relaie le signal des autres. Pas d'internet, pas de compte, pas de service qui ferme du jour au lendemain.

### La clé Zigbee

Une seule chose à acheter : un **coordinateur USB**.

J'utilise le **Sonoff Zigbee 3.0 USB Dongle Plus V2** (référence ZBDongle-E), autour de 25 €. Il fonctionne avec ZHA, l'intégration Zigbee native de Home Assistant. Aucune installation supplémentaire.

**Un conseil qui vaut de l'or : achète la rallonge USB.** Deux euros. Branchée directement sur le Raspberry Pi, la clé subit les interférences du port USB 3 et du Wi-Fi. Éloignée de trente centimètres, la portée double. C'est la cause numéro un des capteurs qui décrochent.

### Matter et Thread

Tu vas en entendre parler partout. Mon avis : ne construis pas ton installation dessus aujourd'hui.

C'est prometteur, ça fonctionne, mais l'écosystème Zigbee est plus mûr, mieux documenté et moins cher. Tu ajouteras du Matter plus tard, en complément.

## Les premiers appareils

Voici ce que j'ai réellement chez moi, et ce que j'en pense.

### Les modules encastrés — le meilleur rapport qualité/prix

**Sonoff ZBMINIL2**, autour de 15 € pièce, et régulièrement en promotion à une douzaine d'euros. J'en ai sept.

C'est mon achat préféré, et probablement celui que je recommande le plus fort. Ce sont de petits modules qui se glissent **derrière un interrupteur existant**, dans la boîte d'encastrement.

L'intérêt est décisif quand on vit dans une maison finie : tes interrupteurs muraux continuent de fonctionner normalement, ton conjoint ne voit aucune différence, et tu gagnes le pilotage à distance. Aucun mur à percer, aucun appareillage à remplacer.

La version L2 fonctionne **sans neutre**, ce qui règle le cas des installations anciennes.

> ⚠️ L'installation implique de travailler dans une boîte d'encastrement, hors tension. Si tu n'es pas à l'aise avec ça, fais-le faire. Ce n'est pas le sujet où improviser.

### Les capteurs d'ouverture

**Aqara Door and Window Sensor T1** (`MCCGQ12LM`), autour de 20 € pièce. J'en ai sur toutes les fenêtres et les portes.

Ils sont petits, discrets, et ils sont la brique de base de toute alarme sérieuse. C'est aussi ce que j'achèterais en premier si je devais tout refaire.

Un bémol honnête : j'ai eu **quelques faux positifs**. Pas assez pour les déconseiller, assez pour en parler. Un capteur mal aligné, un aimant trop éloigné, une fenêtre qui joue avec la chaleur — et l'alarme part alors que tout est fermé.

La solution n'est pas de changer de matériel, c'est de ne jamais déclencher sur un seul capteur. J'y reviens dans l'article sur l'alarme.

#### Zigbee ou Matter : j'ai tranché

Aqara vend deux capteurs d'ouverture très proches en apparence : le **T1**, en Zigbee, et le **P2**, en Matter over Thread. Le second est plus récent, plus cher, et présenté comme l'avenir.

J'ai basculé toute mon installation sur le **T1 en Zigbee** (`MCCGQ12LM`), en écartant volontairement le **P2 en Matter over Thread**.

La raison principale n'est ni le prix ni la théorie : **les capteurs Matter se déconnectaient.**

Pas tous, pas tout le temps. Mais assez pour qu'un capteur affiche « indisponible » un matin sans raison, et qu'il faille aller le réveiller. Sur un capteur de température, c'est agaçant. Sur une fenêtre reliée à l'alarme, c'est inacceptable : une ouverture qui ne remonte pas, c'est une alarme qui ne part pas.

Mes capteurs Zigbee, eux, tiennent. Même les plus anciens, même les plus éloignés du coordinateur.

Deux raisons secondaires ont confirmé le choix :

**Le prix.** Environ 20 € pour le T1 contre plus de 32 € pour le P2. Sur dix ouvertures, l'écart dépasse 120 €.

**La cohérence du réseau.** Mon réseau Zigbee existe déjà, avec ses routeurs et son maillage. Ajouter des appareils Thread revient à faire vivre un second réseau sans fil en parallèle, avec ses propres points de défaillance. Un protocole bien maîtrisé vaut mieux que deux à moitié — et c'est probablement là qu'il faut chercher l'origine de mes déconnexions.

Je ne dis pas que Matter est un mauvais protocole. Je dis qu'en 2026, chez moi, pour des capteurs dont dépend une alarme, il coûtait plus cher et tenait moins bien.

### Le détecteur de présence

**Sonoff SNZB-06P**, autour de 18 €.

À ne pas confondre avec un détecteur de mouvement. Celui-ci utilise une onde millimétrique et détecte une présence **immobile**. La lumière ne s'éteint pas parce que tu es resté trop longtemps sans bouger.

Je l'utilise dans le garage. C'est le genre de capteur qu'on n'achète pas en premier, mais qu'on regrette de ne pas avoir acheté plus tôt.

### Les télécommandes

**Aqara** (`lumi.remote.b1acn01` et `b1acn02`) et **IKEA RODRET**, autour de 12 à 15 €.

Ce sont de petits boutons sans fil, à coller où tu veux. Aucun câblage, aucune boîte d'encastrement.

Leur vraie fonction est sociale : ils permettent à quelqu'un qui n'a pas ton téléphone d'agir sur la maison. Un bouton près de la porte d'entrée pour les volets, un dans le garage. C'est ce qui fait accepter la domotique par ceux qui ne l'ont pas installée.

### Pour l'alarme

**Sirène intérieure Heiman**, autour de 30 € — prix à confirmer. Plus une sirène extérieure Tuya.

Couplées à **Alarmo**, une extension gratuite de Home Assistant, elles font un système d'alarme complet, entièrement local, sans abonnement.

C'est un sujet à part entière — j'y consacre un article dédié.

### L'extérieur

**Vanne d'arrosage Sonoff SWV**, autour de 35 € — prix à confirmer. Elle se visse sur le robinet et pilote l'arrosage du jardin.

Et un module de **coupure d'alimentation d'eau**, pour fermer l'arrivée générale en cas de fuite détectée. Une trentaine d'euros qui peuvent éviter un sinistre.

## Le budget réel

Pour une installation de départ qui fait vraiment quelque chose :

| Poste | Prix |
|---|---|
| Home Assistant Green ou Raspberry Pi + SSD | 100-150 € |
| Clé Zigbee + rallonge USB | ~27 € |
| 4 capteurs d'ouverture Aqara | ~80 € |
| 2 modules encastrés | ~30 € |
| 1 télécommande | ~13 € |
| **Total** | **environ 250 à 300 €** |

Les prix bougent beaucoup. Domadoo organise plusieurs fois par an des opérations à -15 ou -20 % sur toute la gamme Sonoff. Si tu n'es pas pressé, attendre une de ces fenêtres fait facilement 30 € de différence sur un panier de départ.

Ajoute 6,50 €/mois si tu prends Nabu Casa.

C'est l'ordre de grandeur d'une année d'abonnement à une alarme commerciale. Sauf qu'ici tu ne paies rien ensuite, et que rien ne cesse de fonctionner si l'entreprise ferme.

## Ce que je n'achèterais pas au début

- **Un écran mural dédié.** On croit qu'on va l'utiliser. On utilise son téléphone.
- **Une caméra, en premier achat.** C'est le plus visible, mais rarement le plus utile. Les capteurs d'ouverture apportent davantage.

## Ce que je regrette

Peu de choses, en fait. Et c'est moins flatteur qu'il n'y paraît.

Je n'ai pas de tiroir plein de matériel abandonné, mais pas parce que j'ai bien choisi : parce que j'ai acheté lentement, un appareil à la fois, en réponse à un besoin précis. Le rythme a fait le tri que mon jugement n'aurait pas fait.

Mon seul vrai regret est structurel : **la carte SD**. Pas un mauvais achat, une mauvaise fondation. Et plus l'installation grossit, plus il devient pénible de la corriger.

<!-- À COMPLÉTER si autre chose me revient : marque décevante, appareil qui a mal vieilli, achat en double. -->

## L'ordre que je conseille

1. **Le cerveau et la clé Zigbee.** Rien d'autre. Prends deux semaines pour comprendre l'interface.
2. **Deux capteurs d'ouverture.** Sur la porte d'entrée et une fenêtre. Tu apprends l'appairage et les automatisations de base.
3. **Un module encastré**, sur la pièce qui t'agace le plus.
4. **Une télécommande**, pour que quelqu'un d'autre que toi puisse s'en servir.
5. **Ensuite seulement**, l'alarme, la climatisation, l'arrosage.

Cet ordre n'est pas technique, il est humain. À chaque étape tu dois pouvoir montrer un résultat à quelqu'un qui vit chez toi. Si tu passes trois mois à configurer sans rien de visible, tu abandonneras.

---

## La suite

Une fois le matériel en place, la vraie question devient : **comment faire pour que ta famille s'en serve ?**

Chez moi, la réponse s'appelle l'app Maison d'Apple. C'est le sujet de cet article : [Exposer Home Assistant dans l'app Maison](/articles/exposer-home-assistant-app-maison-apple/).

---

*Aucun lien de cet article n'est affilié et aucun produit ne m'a été offert. Tout le matériel cité est installé chez moi et payé de ma poche.*
