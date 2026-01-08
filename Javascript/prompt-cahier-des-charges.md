Je veux créer un site web qui permet de réaliser un tirage de père noël surprise.

Je veux que le site tourne uniquement dans le navigateur de l'utilisateur, il n'y aura pas de backend de type NodeJS, tout sera uniquement en frontend. Cela signifie que le site doit être en HTML/CSS et Javascript uniquement. Le site sera hébergé dans Github Pages donc je n'ai pas moyen de faire tourner un backend. Cela implique nécessairement que le site est sans état, lorsque la page est rechargé elle est identique pour chaque utilisateur, c'est le comportement souhaité.

Je veux que le site soit une single-page application : le site est composé d'une seule page, dans la première section est déroulable / repliable, on y explique en quelques lignes ce qu'est le Secret Santa, puis comment utiliser le site (contenu statique) et après ça, dans une section déroulante, on peut procéder au tirage.

Pour la charte graphique, je veux un CSS assez épuré, proche du rendu naturel du HTML sans CSS, mais quand même avec quelques amélioration mineures. Je pourrais t'envoyer le CSS que j'utilise pour le reste de mon site web pour que tu puisses t'en inspirer.

Dans l'idéal, j'aimerais que la page soit responsive, qu'elle s'affiche correctement sur ordinateur et sur téléphone, mais à la rigueur ça, c'est une problématique qui peut être traitée dans un second temps. Pour l'instant, concentrons-nous sur un rendu propre sur ordinateur.

Voici le cas d'usage du site : le premier utilisateur affiche le site sur navigateur et rentre ses informations (Nom, Prénom, liste des personnes à exclure), ensuite il appuie sur un bouton "Ajouter un utilisateur", le nouvel utilisateur rentre ses informations, ainsi de suite jusqu'à ce que tous les utilisateurs soient renseignés. Une fois que c'est fait, le site procède à un tirage aléatoire (de façon cachée, il va attribuer à chaque utilisateur une personne à laquelle offrir un cadeau). Chaque utilisateur va venir tour par tour pour dévoiler la personne qu'il a reçu (l'utilisateur doit regarder uniquement pour lui et les autres ne doivent pas regarder) puis masquer l'information avant de laisser le prochain utilisateur regarder à qui il doit offrir un cadeau. A la fin, chaque utilisateur sait à qui il doit offrir un cadeau et il est le seul à savoir.

Il faut un système de blacklist : si par exemple deux utilisateurs sont en couple, ils vont sûrement se faire un cadeau de noel indépendamment du tirage. Il faudrait alors une option lors de l'ajout de l'utilisateur pour préciser la liste des personnes qui ne peuvent pas lui être attribuées, c'est la fameuse blacklist, la liste des personnes à exlcure. Par défaut, chaque personne est dans sa propre blacklist de telle sorte que personne ne puisse recevoir son propre nom, mais il pourrait être possible via des paramètres avancés de désactiver cette option.

Dans un second temps, je voudrais qu'il soit également possible de précéder au tirage en envoyant les réponses par mail, de telle sorte que tous les participants n'aient pas besoin d'être physiquement au même endroit au moment du tirage. Dans ce cas, je veux que le premier utilisateur coche une option spéciale, il lui faudra également fournir une adresse mail ainsi que le mot de passe, le site se chargera d'envoyer les mails en se connectant à cette adresse avec ce mot de passe (comme le site est hébergé sur Github Pages, je n'ai pas de nom de domaine pour héberger un serveur de mails et je ne souhaite pas devoir en administrer un). Dans ce mode de fonctionnement, au moment d'ajouter chaque utilisateur, il faudra aussi préciser quelle est son adresse mail pour pouvoir lui envoyer le résultat. Il faudra également qu'il y ait une option pour envoyer un email de test afin de vérifier que toutes les adresses mails sont correctes.

Dans un premier temps, on va se focaliser sur le premier mode de fonctionnement, celui où tous les utilisateurs sont réunis dans la même pièce et chacun regarde la personne qui lui a été attribuée un à un, mais je veux que tu laisses un placeholder dans le code pour développer ce second mode de fonctionnement ultérieurement.

Avant de me fournir le plan le code de cette page web, je veux que tu m'expliques précisément comment tu vas résoudre et comment tu vas implémenter cette problématique, tu pourras appuyer ton propos avec des extraits de code si ça t'arrange. Le but de cette étape est autant pour que je puisse vérifier que tu as bien saisi ma problématique que pour te permettre de structurer proprement ta pensée. N'hésite pas à réfléchir longuement au problème.

---

Plusieurs points :

1

> UI :
> Une seule page
>   Partie explicative statique
>   Partie interactive repliable/dépliable

Il faut que la partie explicative statique soit également repliable et dépliable (je dirais repliée par défaut)

2

Dans le modèle de représentation d'un utilisateur en JS, je pense qu'il faut dès maintenant prendre en compte le champs "mail", affecté à null pour l'instant, et qui sera implémenté plus tard en mode email.

3

> ⚠️ Important :
> On ne peut pas sélectionner quelqu’un qui n’existe pas encore

Justement il faut prévoir ce cas d'usage : pour 5 participants Alice Bob Charles Dave et Eve, si Charles et Eve sont en couple dans la vie et qu'ils veulent être exclus l'un de l'autre. Au moment de la création d'Eve, Charles doit être déclaré dans sa blacklist mais il doit aussi être de modifier après coup la blacklist de Charles pour y sélectionner Eve.

4

Comment est-ce que tu fais pour déterminer à l'avance si un tirage est possible ? C'est un véritable problème mathématique qui se pose : étant donné une liste de participants et les listes d'exclusion de chaque participant, comment savoir si oui ou non il est possible de trouver de réaliser un tirage qui satisfasse toutes les conditions, avant même de faire le tirage en question ? Personnellement, jusque là j'ai mis le problème sous le tapis mais j'aimerais bien que tu me donnes un algorithme pour montrer qu'un tirage est soluble avant de procéder au tirage. Tu peux faire l'algorithme en Javascript ou en pseudocode

5

Explique moi ton algorithme de tirage. Si jamais tu te retrouves dans une configuration où, pour la dernière personne à laquelle attribuer quelqu'un, la seule personne qui n'a pas encore été attribuée se trouve dans sa liste ? Par exemple, avec Alice Bob Charles Dave et Eve, si toutes les personnes ont été attribuées sauf une et qu'au moment d'attribuer quelqu'un à Eve, il ne reste plus que Charles (alors que Charles et Eve sont dans la blacklist l'un de l'autre). Comment est-ce que tu fais pour éviter ce genre de situation ? Et si ton algorithme peut produire ce genre de résultat, comment est-ce que tu gères l'erreur ? Si la solution est naïvement de relancer l'algorithme en espérant un meilleur aléatoire, comment être sûr que le tirage est bien soluble pour ne pas tomber dans une boucle infinie ?

6

Pour l'étape de révélation, je verrais bien ça affiché de la manière suivante : des "cartes" avec le nom de chaque utilisateur dessus, lorsque la carte est retournée, il y a écrit le nom de la personne à laquelle offrir un cadeau, dès qu'on re-retourne la carte, elle est de nouveau cachée (on peut alors laisser un autre utilisateur dévoiler sa carte)

---

OK, j'ai pu l'essayer, pour un prototype c'est vraiment pas mal. Il y a quelques petits défauts, mais on va les repasser en revue un par un. Déjà pour commencer, j'aimerais bien modifier la charte graphique. Voici le CSS que j'utilise sur le reste de mon site sur Github Pages : 

Comme tu peux le voir, il est extrêmement long, je n'ai pas nécessairement besoin qu'il soit aussi long que ça, je veux simplement que tu reprennes celui que je viens de te donner et que tu le modifies pour utiliser les classes et les ids que tu as défini dans la page HTML


---

> Ce qu’il faut supprimer / éviter du prototype actuel
>
> Dans le prototype que tu as testé, il y avait probablement :
> des styles globaux body { font-family... }
> des couleurs custom
> des boutons stylisés “maison”
>
> 👉 Tout ça doit disparaître.
>
> On va désormais utiliser :
> .container
> .box-shadow
> .border
> .rounded-2
> .bg-gray-light
> .bg-white
> .text-gray
> .text-center
> .d-flex, etc.
>
> Bref : 100% utilitaires GitHub-style.

