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

## Pourquoi j'ai fini avec trois ponts

Voilà le point que je n'ai trouvé nulle part en français, et qui m'a coûté du temps.

Certains types d'accessoires **ne peuvent pas vivre dans un pont partagé**. Home Assistant l'écrit dans sa documentation, mais on ne tombe dessus qu'après avoir cherché : une caméra, une serrure, une télécommande à activités ou un téléviseur doivent être exposés en mode `accessory`, seuls, avec leur propre appairage.

Un téléviseur, côté Home Assistant, c'est une entité `media_player` avec la classe `tv` ou `receiver`. C'est le cas de ma Samsung The Frame. D'où son pont dédié.

Chez moi, ça donne :

| Pont | Contenu | Pourquoi séparé |
|---|---|---|
| `HASS Bridge` | Le gros du système, 10 domaines | Pont principal |
| `TV Bridge the frame` | La télévision | Obligatoire : un téléviseur ne peut pas être ponté |
| `Vanne Garage Bridge` | La vanne d'arrosage | À COMPLÉTER — raison différente de la TV |

Les deux ponts secondaires sont déclarés en YAML plutôt que via l'interface. C'est plus simple à relire quand on multiplie les ponts.

<!-- BLOC YAML À INSÉRER : la config des deux ponts secondaires -->

Si un accessoire refuse obstinément d'apparaître correctement dans l'app Maison, la bonne question n'est donc pas « qu'est-ce que j'ai raté ». C'est : **est-ce que ce type d'accessoire a le droit d'être dans un pont ?**

Le raccourci utile : caméra, serrure, téléviseur, télécommande à activités — chacun son pont.

## La galère qui m'a fait perdre une soirée

Un soir, j'ouvre l'app Maison. C'est le bordel.

Des dizaines de tuiles que je n'avais jamais vues. Des boutons partout, avec des noms incompréhensibles, dans toutes les pièces. Une app devenue inutilisable.

**Ce que j'avais fait juste avant :** retirer un bouton de la liste des entités exposées. Un seul. Le dernier de la liste du domaine `button`.

**Ce que je croyais :** qu'en enlevant la dernière entité d'un domaine, ce domaine cessait d'être exposé.

**Ce que c'était vraiment :** l'inverse exact. Le pont applique le filtre d'entités **seulement s'il en existe un**. Une liste vide ne veut pas dire « n'expose rien ». Elle veut dire « pas de filtre » — donc expose tout le domaine.

En retirant le dernier bouton, j'avais supprimé le filtre lui-même. Tous les boutons de tous mes appareils Aqara sont remontés d'un coup.

**Le correctif :** décocher carrément le domaine `button` dans la configuration du pont, plutôt que de vider sa liste d'entités.

C'est contre-intuitif, ce n'est écrit nulle part, et ça peut arriver sur n'importe quel domaine. Si tu vides une liste d'entités en pensant faire le ménage, tu obtiens exactement le résultat inverse.

## Une astuce de nommage qui surprend

Dans la chambre de mon fils, l'app Maison affiche deux tuiles nommées « Chambre Léon ». Le volet roulant et le capteur de la fenêtre. Rigoureusement le même nom.

C'est volontaire, et ça ne pose aucun problème.

D'abord parce que la pièce porte déjà son nom : répéter « volet » ou « capteur » dans chaque accessoire alourdit l'affichage sans rien apporter. On gagne en lisibilité.

Ensuite parce que **Siri tranche toute seule, par le verbe.** « Ouvre Chambre Léon » ne peut viser qu'un volet — on n'ouvre pas un capteur d'ouverture. Le contexte de la commande suffit à lever l'ambiguïté.

C'est contre-intuitif quand on vient de Home Assistant, où l'identifiant unique est roi. Côté Apple, l'interprétation est plus souple qu'on ne le croit.

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

- Home Assistant : 2026.8.2
- Intégration : HomeKit Bridge (native, aucune installation supplémentaire)
- Côté Apple : iPhone sous iOS 26
- Aucun abonnement, aucun matériel additionnel

---

## La suite

Le pont installé, la vraie question arrive : **qu'est-ce qu'on expose, et qu'est-ce qu'on garde dans Home Assistant ?**

Parce que tout exposer est aussi raté que ne rien exposer. Si l'app Maison de ma femme déborde de capteurs de batterie, elle ne l'ouvre plus. C'est le sujet du prochain article.
