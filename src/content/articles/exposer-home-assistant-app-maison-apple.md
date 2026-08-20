---
draft: false
title: "Exposer Home Assistant dans l'app Maison d'Apple : installer le pont HomeKit"
description: "Comment j'ai branché Home Assistant sur l'app Maison de l'iPhone, quels domaines j'expose, et pourquoi j'ai fini avec trois ponts au lieu d'un."
pubDate: 2026-08-19
category: "Le pont HomeKit"
etat: "tourne"
etatLabel: "Tourne chez moi"
tags: ["homekit", "ios", "pont", "apple"]
---

## Le problème

Chez moi, Home Assistant tourne bien. Le souci, c'est que j'étais le seul à m'en servir.

Marie a un iPhone. Les enfants aussi, bientôt. Aucun d'eux n'a envie d'ouvrir une application de domotique pour allumer une lampe. Ils veulent l'app Maison, celle qui est déjà installée, celle qui est dans le centre de contrôle.

Et c'est légitime. Si ta femme doit ouvrir Home Assistant pour éteindre le salon, ton installation a échoué. Peu importe la qualité de tes automatisations.

Le pont HomeKit règle ça. Il fait apparaître tes entités Home Assistant comme des accessoires Apple normaux. Siri fonctionne. Le centre de contrôle fonctionne. Personne n'a besoin de savoir que Home Assistant existe.

Voici comment je l'ai installé, et ce que j'ai appris en route.

## Ce qu'il faut avant de commencer

- Home Assistant accessible sur ton réseau local
- Un iPhone ou un iPad sur le même réseau Wi-Fi
- Le multicast (mDNS) autorisé entre le réseau de HA et celui de ton téléphone

Ce dernier point mérite qu'on s'y arrête. Si tu as un VLAN séparé pour tes objets connectés, l'appairage échouera sans un relais mDNS. C'est la cause numéro un des échecs d'appairage.

<!-- CAPTURE 1 : écran Paramètres > Appareils et services, avant ajout -->

## L'installation

Le pont s'ajoute comme n'importe quelle intégration.

**Paramètres** → **Appareils et services** → **Ajouter une intégration** → chercher **HomeKit Bridge**.

Trois questions arrivent ensuite. Elles paraissent anodines. Elles ne le sont pas.

### Mode pont ou mode accessoire

Le mode **pont** regroupe toutes tes entités derrière un seul accessoire HomeKit. Un seul appairage, une seule fiche dans l'app Maison.

Le mode **accessoire** expose une seule entité, comme un objet indépendant. Utile pour les cas particuliers, on y revient plus bas.

Pour démarrer, prends **pont**.

### Inclure ou exclure

Home Assistant te propose de partir de tout et de retirer, ou de partir de rien et d'ajouter.

Choisis **inclure**. C'est plus long au départ, mais tu gardes la main. En mode exclure, chaque nouvelle entité créée dans Home Assistant se retrouve automatiquement chez Apple. Au bout de six mois, l'app Maison de Marie déborde de capteurs de batterie.

### Les domaines

C'est le choix structurant. Voici ce que j'expose chez moi :

```yaml
mode: bridge
include_exclude_mode: include
domains:
  - alarm_control_panel   # l'alarme, armable depuis l'iPhone
  - climate               # la PAC et ses zones
  - cover                 # les volets roulants
  - light                 # l'éclairage
  - switch                # les prises et interrupteurs
  - sensor                # températures, humidité
  - binary_sensor         # ouvertures, présence
  - button                # actions ponctuelles
  - input_button          # mes boutons virtuels
  - scene                 # les ambiances
```

Dix domaines. Ça peut paraître large, mais chaque domaine est ensuite filtré entité par entité à l'étape suivante. Le domaine ouvre la porte, il ne fait pas entrer tout le monde.

<!-- CAPTURE 2 : écran de sélection des domaines -->

## L'appairage

Une fois validé, Home Assistant crée une notification avec un code d'appairage et un QR code.

Sur l'iPhone : app **Maison** → **+** → **Ajouter un accessoire** → scanner le code.

<!-- CAPTURE 3 : notification HA avec le QR code -->
<!-- CAPTURE 4 : app Maison côté iPhone, accessoires apparus -->

Le pont apparaît, puis les accessoires arrivent un par un. Compte une à deux minutes si tu exposes beaucoup d'entités.

## Ce que ça donne concrètement

Une fois filtré, voilà ce que Marie voit dans son app Maison.

**Les volets**, un par pièce : Bureau, Buanderie, Chambre Léon, Chambre Rose, Suite Parentale, Cuisine, Salle à Manger, Salon, plus la porte de garage.

**Les lumières** : Entrée, Terrasse, Couloir, Évier, Hotte, Lampe de chevet, Lumière Buanderie, Garage 1 et Garage 2.

**Les capteurs d'ouverture** : fenêtres des chambres, salle de bain, salle de douche, toilettes du bas et de l'étage, porte de la buanderie.

**Quelques capteurs utiles** : détecteur de présence garage, détecteur de fuite d'eau sur l'arrosage.

**Une prise** dans la buanderie, et la fontaine à eau du chat.

Le principe qui guide tout ça : est-ce que quelqu'un va vouloir l'actionner ou le consulter depuis son téléphone ? Si non, ça reste dans Home Assistant.

<!-- CAPTURE 5 : liste des entités exposées, côté configuration HA -->

## Pourquoi j'ai fini avec trois ponts

Voilà le point que je n'ai trouvé nulle part en français, et qui m'a coûté du temps.

Certains accessoires refusent de cohabiter dans un pont partagé. HomeKit impose que quelques types d'appareils soient exposés seuls, en mode accessoire, avec leur propre appairage.

Chez moi, ça concerne deux cas :

| Pont | Contenu | Pourquoi séparé |
|---|---|---|
| `HASS Bridge` | Le gros du système, 10 domaines | Pont principal |
| `TV Bridge the frame` | La télévision | À COMPLÉTER |
| `Vanne Garage Bridge` | La vanne d'arrosage | À COMPLÉTER |

Les deux ponts secondaires sont déclarés en YAML, pas via l'interface. C'est plus simple à maintenir quand on multiplie les ponts.

<!-- BLOC YAML À INSÉRER : la config des deux ponts secondaires -->

Si un accessoire refuse obstinément d'apparaître correctement dans l'app Maison, la question à se poser n'est pas « qu'est-ce que j'ai raté ». C'est « est-ce que ce type d'accessoire a le droit d'être dans un pont ».

## Ce que j'ai raté, et qui traîne encore

Trois problèmes que j'ai découverts en regardant l'app Maison avec les yeux de Marie. Aucun n'empêche le système de fonctionner. Tous les trois le rendent pénible à utiliser.

### Deux accessoires portent le même nom

Le symptôme est simple. Dans la chambre de mon fils, l'app Maison affiche deux tuiles nommées « Chambre Léon ». Rigoureusement identiques.

Ce sont deux entités différentes :

| Nom affiché | Entité Home Assistant | Ce que c'est |
|---|---|---|
| Chambre Léon | `cover.chambre_enfant` | Le volet roulant |
| Chambre Léon | `binary_sensor.aqara_door_and_window_sensor_porte_12` | Le capteur de la fenêtre |

Le volet vient de la box Overkiz. Le capteur vient d'un Aqara. Aucun des deux ne sait que l'autre existe. Chacun a hérité du nom de sa pièce, et Home Assistant n'a rien à y redire.

Côté iPhone, c'est autre chose. Deux tuiles jumelles, et Siri qui doit deviner. « Ferme Chambre Léon » devient un tirage au sort.

**Le correctif :** renommer explicitement côté Home Assistant. Le capteur devient « Fenêtre Chambre Léon », le volet reste « Volet Chambre Léon ». Le nom de la pièce est déjà porté par la pièce elle-même — le répéter dans chaque accessoire n'apporte rien.

Le même problème existe dans la Chambre Rose. À COMPLÉTER : vérifier les autres pièces.

### Des boutons de diagnostic sont partis chez Apple

Dans ma liste d'accessoires exposés, il y a un bouton nommé « Identifier ».

Ce n'est pas une commande. C'est la fonction d'identification physique d'un capteur Aqara : elle fait clignoter la LED pour qu'on retrouve l'appareil dans un placard. Utile une fois, à l'installation.

Elle est arrivée là parce que j'ai inclus le domaine `button` dans le pont. Or chaque appareil Aqara génère son propre bouton « Identifier ». Ils sont tous passés.

**Le correctif :** exclure ces entités du pont, ou les masquer dans Home Assistant. C'est le genre de ménage qu'il vaut mieux faire tôt — chaque nouvel appareil en rajoute un.

### Les noms constructeur sont restés en anglais

« Pet Drinking Fountain ». « Indicator Light ».

Ces noms viennent du fabricant. Home Assistant les reprend tels quels, et le pont les transmet sans les toucher. Résultat : une fontaine à eau pour le chat s'appelle « Pet Drinking Fountain » dans une app entièrement en français.

Pour moi c'est lisible. Pour quelqu'un qui ouvre l'app Maison sans savoir ce qu'il y a derrière, c'est du bruit.

**Le correctif :** renommer dans Home Assistant avant d'exposer, jamais après. Un renommage tardif peut recréer l'accessoire côté Apple, et il perd alors sa pièce et ses automatisations.

<!--
À COMPLÉTER — pistes vécues à ajouter :
- l'appairage qui échoue (mDNS, VLAN, pare-feu)
- pourquoi la TV a eu droit à son propre pont
- pourquoi la vanne d'arrosage a eu droit au sien
- le pont qui ne remonte pas après un redémarrage
-->

## Les limites, ce qui casse encore

- **150 accessoires maximum par pont.** Au-delà, HomeKit décroche. C'est une raison de plus de filtrer sérieusement.
- **Tous les types d'entités ne passent pas.** HomeKit a un catalogue fermé d'accessoires. Ce qui n'y entre pas est ignoré silencieusement.
- **Renommer une entité dans Home Assistant** peut la faire réapparaître comme un nouvel accessoire, sans sa pièce ni ses automatisations Apple.
- **À COMPLÉTER** : autres limites rencontrées.

## Le matériel et les versions

- Home Assistant : version XX
- Intégration : HomeKit Bridge (native, aucune installation supplémentaire)
- Côté Apple : iPhone sous iOS XX
- Aucun abonnement, aucun matériel additionnel

---

## La suite

Le pont installé, la vraie question arrive : **qu'est-ce qu'on expose, et qu'est-ce qu'on garde dans Home Assistant ?**

Parce qu'exposer tout est aussi raté que ne rien exposer. C'est le sujet du prochain article.
