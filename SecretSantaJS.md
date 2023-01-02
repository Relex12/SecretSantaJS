# Secret-Santa.JS

## Qu’est-ce que c’est ?

Le Secret Santa ou Père Noël surprise est une manière originale de fêter Noël : chaque participant offre un cadeau à personne, piochée au hasard dans une boîte contenant le nom de participant. Le but est de garder secret le nom pioché par chacun, afin de garder la surprise jusqu'au dernier moment.

Cependant :

- si une personne pioche son propre nom, il faut recommencer tout le tirage
- si plusieurs personnes ne se connaissent pas très bien, il peut être difficile de trouver un bon cadeau
- si une personne pioche le même participant qu'une année précédente, cela peut être redondant

Pour éviter ces problèmes, utilisez **Secret-Santa.JS**.

## Comment l’utiliser ?

Le tirage au sort se fait en trois étapes. **TODO**

## Faire un tirage

Step 1 : paramètres

* radio button: par mail ou via le même téléphone
  * (si mail) toggle : envoyer un mail de test avant le tirage
  * (si mail) large text input : custom email message
  * (si mail) numeric input : amount to spend
* numeric input : nombre de personnes tirées par participants
* toggle : par mail ou via le même téléphone

Step 2 : Participants

* text input : Nom
* (si mail) text input : Adresse mail
* (si mail, hôte uniquement) text input : mot de passe mail
* button: Ajouter participant

Step 3 : exclusions

* radio button : utiliser des whitelist, des blacklist ou pas d'exclusion
* (avancé) toggle : possible de tirer son propre nom
* (pour chaque participant) button : ajouter une personne à la liste d'exclusion
  * dropdown : ajouter une personne à la liste d'exclusion
