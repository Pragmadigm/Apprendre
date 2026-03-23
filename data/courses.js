// Données des cours et des quiz - chargées comme variable globale pour fonctionner en offline (file://)
const COURSES_DATA = [
  {
    id: "computer",
    title: "L'Ordinateur",
    subtitle: "Comment fonctionne un ordi ?",
    emoji: "💻",
    color: "#6c63ff",
    colorLight: "#e8e6ff",
    description: "Découvre les composants qui font tourner ton ordinateur et comprends comment il pense !",
    chapters: [
      {
        id: 0,
        title: "Le Processeur (CPU)",
        emoji: "⚙️",
        content: `
          <h2>⚙️ Le Processeur — Le cerveau de l'ordinateur</h2>
          <p>Le <strong>CPU</strong> (Central Processing Unit) est le composant le plus important d'un ordinateur. C'est lui qui exécute tous les calculs et toutes les instructions des programmes.</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> Imagine que l'ordinateur est une cuisine. Le CPU, c'est le cuisinier — il lit la recette (le programme) et réalise chaque étape, une par une, très très vite !
          </div>
          <h3>Quelques chiffres fous !</h3>
          <ul>
            <li>Un CPU moderne peut faire <strong>plusieurs milliards de calculs par seconde</strong> (on dit "plusieurs GHz")</li>
            <li>Il contient des <strong>milliards de transistors</strong> — des mini-interrupteurs microscopiques</li>
            <li>Ces transistors sont <strong>1000 fois plus petits</strong> qu'un cheveu humain !</li>
          </ul>
          <h3>Comment il travaille ?</h3>
          <p>Le CPU répète sans cesse 3 étapes :</p>
          <ol>
            <li><strong>Lire</strong> l'instruction suivante (depuis la RAM)</li>
            <li><strong>Décoder</strong> ce qu'il doit faire</li>
            <li><strong>Exécuter</strong> l'action (calculer, déplacer des données...)</li>
          </ol>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> Le premier processeur grand public (Intel 4004, 1971) fonctionnait à 0,000740 GHz. Aujourd'hui on dépasse facilement 5 GHz — soit <strong>6 000 fois plus rapide !</strong>
          </div>
        `
      },
      {
        id: 1,
        title: "La Mémoire Vive (RAM)",
        emoji: "🧠",
        content: `
          <h2>🧠 La RAM — La mémoire de travail</h2>
          <p>La <strong>RAM</strong> (Random Access Memory) est la mémoire temporaire de l'ordinateur. Elle stocke les données dont le CPU a besoin <em>en ce moment</em>.</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> La RAM, c'est ton bureau. Quand tu travailles, tu poses tes affaires dessus pour y accéder vite. Mais quand tu ranges tout et que tu éteins la lumière... le bureau se vide ! Tout disparaît.
          </div>
          <h3>Pourquoi la RAM est importante ?</h3>
          <ul>
            <li>Plus tu as de RAM, plus tu peux avoir d'<strong>onglets ouverts</strong> dans le navigateur</li>
            <li>Plus de RAM = <strong>jeux plus fluides</strong>, car le PC charge plus de données à portée du CPU</li>
            <li>La RAM est <strong>ultra-rapide</strong> — bien plus que le disque dur</li>
          </ul>
          <h3>RAM vs Disque dur</h3>
          <p>La grande différence :</p>
          <ul>
            <li>La RAM : rapide ⚡, mais <strong>oublie tout</strong> quand on coupe l'alimentation</li>
            <li>Le disque dur : plus lent 🐢, mais <strong>garde tout</strong> même sans électricité</li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> En 1980, un ordinateur avait 64 Ko de RAM. Aujourd'hui un PC gamer en a souvent 32 Go — soit <strong>500 000 fois plus !</strong>
          </div>
        `
      },
      {
        id: 2,
        title: "Le Disque Dur (SSD/HDD)",
        emoji: "💾",
        content: `
          <h2>💾 Le Disque Dur — Le garde-mémoire</h2>
          <p>Le disque dur stocke tes fichiers, tes photos, tes jeux et le système d'exploitation. Contrairement à la RAM, il <strong>ne perd pas les données</strong> quand tu éteinds l'ordi.</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> Si la RAM est ton bureau de travail, le disque dur c'est ton armoire — tu y ranges tout, et ça reste là même quand tu pars en vacances !
          </div>
          <h3>HDD vs SSD — Quelle différence ?</h3>
          <ul>
            <li><strong>HDD</strong> (Hard Disk Drive) : utilise des plateaux magnétiques qui tournent à 7200 tours/min. Plus lent mais moins cher pour le même espace.</li>
            <li><strong>SSD</strong> (Solid State Drive) : utilise de la mémoire flash (comme une grande clé USB). <strong>5 à 10 fois plus rapide</strong>, silencieux, résiste aux chocs !</li>
          </ul>
          <h3>Pourquoi le SSD change tout ?</h3>
          <p>Avant les SSD, démarrer un PC prenait 2-3 minutes. Avec un SSD, c'est <strong>10-15 secondes</strong>. Les jeux se chargent aussi bien plus vite !</p>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> Un SSD n'a aucune pièce mécanique. C'est pour ça qu'il ne fait aucun bruit et survit mieux si on fait tomber son ordi portable !
          </div>
        `
      },
      {
        id: 3,
        title: "La Carte Graphique (GPU)",
        emoji: "🎮",
        content: `
          <h2>🎮 La Carte Graphique — Le dessinateur de l'ordi</h2>
          <p>Le <strong>GPU</strong> (Graphics Processing Unit) est spécialisé dans l'affichage des images, des jeux vidéo et de la 3D. C'est lui qui dessine chaque pixel de ton écran.</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> Le CPU est un génie qui peut tout faire, mais seul. Le GPU, c'est une armée de milliers de petits ouvriers qui travaillent <em>en même temps</em> — parfait pour dessiner des milliers de pixels simultanément !
          </div>
          <h3>CPU vs GPU</h3>
          <ul>
            <li>Le CPU a <strong>4 à 16 cœurs</strong> très puissants — idéal pour les tâches complexes</li>
            <li>Le GPU a <strong>des milliers de petits cœurs</strong> — idéal pour faire plein de calculs simples en parallèle</li>
          </ul>
          <h3>Le GPU fait plus que des jeux !</h3>
          <p>Aujourd'hui, les GPU servent aussi à :</p>
          <ul>
            <li>Entraîner des <strong>intelligences artificielles</strong> 🤖</li>
            <li>Faire du <strong>minage de cryptomonnaies</strong></li>
            <li>Accélérer les <strong>simulations scientifiques</strong></li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> Un GPU haut de gamme peut afficher plus de <strong>240 images par seconde</strong>. L'œil humain commence à percevoir la fluidité à partir de 60 images/seconde !
          </div>
        `
      },
      {
        id: 4,
        title: "La Carte Mère",
        emoji: "🔌",
        content: `
          <h2>🔌 La Carte Mère — Le chef d'orchestre</h2>
          <p>La <strong>carte mère</strong> (motherboard) est la grande plaque verte/noire sur laquelle se branchent tous les composants. Elle permet à tous ces éléments de <strong>communiquer entre eux</strong>.</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> La carte mère, c'est comme les routes et les autoroutes d'une ville. Sans routes, les voitures (données) ne peuvent pas circuler entre les bâtiments (composants) !
          </div>
          <h3>Ce qui est branché sur la carte mère</h3>
          <ul>
            <li>🧠 Le <strong>CPU</strong> (dans un socket spécial)</li>
            <li>💡 Les barrettes de <strong>RAM</strong></li>
            <li>🎮 La <strong>carte graphique</strong> (slot PCIe)</li>
            <li>💾 Les <strong>disques SSD/HDD</strong></li>
            <li>🔋 L'<strong>alimentation</strong> qui fournit l'électricité</li>
          </ul>
          <h3>Le BIOS/UEFI</h3>
          <p>La carte mère contient aussi un petit programme appelé <strong>BIOS</strong> (ou UEFI). C'est le tout premier programme qui se lance quand tu appuies sur le bouton Power — il vérifie que tout est branché correctement, puis démarre Windows (ou Linux) !</p>
          <div class="fun-fact">
            💡 <strong>Récap :</strong> CPU (cerveau) + RAM (bureau) + SSD (armoire) + GPU (artiste) + Carte mère (routes) = un ordinateur complet ! Tu as tout compris 🎉
          </div>
        `
      }
    ],
    quiz: [
      {
        question: "Qu'est-ce que le CPU ?",
        answers: ["Le disque dur de l'ordinateur", "Le cerveau qui exécute les calculs", "La mémoire temporaire", "La carte d'affichage"],
        correct: 1
      },
      {
        question: "Que se passe-t-il avec les données dans la RAM quand on éteint l'ordinateur ?",
        answers: ["Elles sont sauvegardées automatiquement", "Elles passent sur le disque dur", "Elles sont effacées", "Elles vont dans le GPU"],
        correct: 2
      },
      {
        question: "Quelle est la principale différence entre un SSD et un HDD ?",
        answers: ["Le SSD est plus lent mais moins cher", "Le HDD n'a pas de pièces mécaniques", "Le SSD est plus rapide et sans pièces mécaniques", "Ils sont identiques mais de tailles différentes"],
        correct: 2
      },
      {
        question: "Pourquoi le GPU a-t-il des milliers de petits cœurs ?",
        answers: ["Pour économiser de l'électricité", "Pour faire plein de calculs simples en même temps (parallèle)", "Parce que c'est moins cher à fabriquer", "Pour remplacer le CPU"],
        correct: 1
      },
      {
        question: "À quoi sert la carte mère ?",
        answers: ["À stocker les jeux vidéo", "À afficher les images à l'écran", "À connecter et faire communiquer tous les composants", "À refroidir le processeur"],
        correct: 2
      },
      {
        question: "Quel programme se lance en PREMIER quand tu allumes un PC ?",
        answers: ["Windows", "Google Chrome", "Le BIOS/UEFI", "Le GPU"],
        correct: 2
      },
      {
        question: "Combien de fois plus rapide est un CPU moderne par rapport au premier (Intel 4004) ?",
        answers: ["10 fois", "100 fois", "1000 fois", "6000 fois"],
        correct: 3
      },
      {
        question: "Pour quoi d'autre (en dehors des jeux) utilise-t-on les GPU aujourd'hui ?",
        answers: ["Imprimer des documents", "Entraîner des IA et simuler des phénomènes scientifiques", "Stocker des fichiers", "Accéder à Internet"],
        correct: 1
      }
    ]
  },

  {
    id: "ai",
    title: "L'Intelligence Artificielle",
    subtitle: "Comment une IA apprend-elle ?",
    emoji: "🤖",
    color: "#ff6b6b",
    colorLight: "#ffe8e8",
    description: "Comprends comment des programmes comme ChatGPT apprennent, réfléchissent et génèrent du texte ou des images !",
    chapters: [
      {
        id: 0,
        title: "C'est quoi une IA ?",
        emoji: "🤔",
        content: `
          <h2>🤔 C'est quoi une Intelligence Artificielle ?</h2>
          <p>Une <strong>IA (Intelligence Artificielle)</strong> est un programme informatique capable d'apprendre à partir d'exemples pour accomplir des tâches qui semblaient réservées aux humains : comprendre du texte, reconnaître des images, jouer aux échecs...</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> Un programme classique suit des règles écrites par un humain ("si X, fais Y"). Une IA, elle, apprend les règles <em>toute seule</em> en regardant des milliers d'exemples — comme un enfant qui apprend à parler en écoutant ses parents !
          </div>
          <h3>Les différents types d'IA</h3>
          <ul>
            <li><strong>IA étroite</strong> : spécialisée dans une seule tâche (recommandations YouTube, filtre anti-spam...)</li>
            <li><strong>IA générative</strong> : peut créer du texte, des images, de la musique (ChatGPT, DALL-E, Midjourney...)</li>
            <li><strong>IA générale</strong> : (hypothétique) ferait tout aussi bien qu'un humain... pas encore là !</li>
          </ul>
          <h3>Comment ça marche en gros ?</h3>
          <p>Une IA générative fonctionne en <strong>2 grandes phases</strong> :</p>
          <ol>
            <li>🎓 <strong>L'entraînement</strong> : elle apprend sur des milliards de textes</li>
            <li>💬 <strong>L'inférence</strong> : elle utilise ce qu'elle a appris pour répondre à tes questions</li>
          </ol>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> ChatGPT a été entraîné sur environ <strong>45 téraoctets</strong> de texte — c'est l'équivalent de lire <strong>plus d'un million de livres !</strong>
          </div>
        `
      },
      {
        id: 1,
        title: "Les Données d'Entraînement",
        emoji: "📚",
        content: `
          <h2>📚 Les Données d'Entraînement — La nourriture de l'IA</h2>
          <p>Avant qu'une IA puisse faire quoi que ce soit, il faut lui donner des exemples — beaucoup d'exemples. Ces exemples s'appellent les <strong>données d'entraînement</strong>.</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> Imagine que tu veux apprendre à reconnaître des chats. On te montre 10 millions de photos en disant "ça c'est un chat, ça c'est un chien...". Après assez d'exemples, tu deviens capable de reconnaître un chat que tu n'as jamais vu !
          </div>
          <h3>Où viennent ces données ?</h3>
          <ul>
            <li>📖 Des <strong>livres et articles</strong> numérisés</li>
            <li>🌐 Des <strong>pages web</strong> (une grande partie d'Internet !)</li>
            <li>💬 Des <strong>conversations</strong> et forums en ligne</li>
            <li>🖼️ Des <strong>images avec descriptions</strong></li>
            <li>💻 Du <strong>code informatique</strong> sur GitHub</li>
          </ul>
          <h3>Les problèmes des données</h3>
          <p>Si les données contiennent des <strong>erreurs ou des biais</strong>, l'IA va les apprendre ! C'est pour ça que :</p>
          <ul>
            <li>Des humains vérifient et <strong>nettoient les données</strong></li>
            <li>On retire les contenus <strong>dangereux ou faux</strong></li>
            <li>On s'assure que les données sont <strong>variées et équilibrées</strong></li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> GPT-4 a été entraîné sur des données collectées jusqu'à une certaine date — c'est pourquoi il ne sait pas ce qui s'est passé <em>après</em> cette date !
          </div>
        `
      },
      {
        id: 2,
        title: "L'Entraînement du Modèle",
        emoji: "🏋️",
        content: `
          <h2>🏋️ L'Entraînement — Comment l'IA apprend</h2>
          <p>L'entraînement, c'est le processus par lequel l'IA <strong>apprend à partir des données</strong>. Elle ajuste des millions de paramètres jusqu'à être performante.</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> Imagine des millions de petits boutons de volume. Au début ils sont réglés au hasard. L'IA fait une erreur → on tourne légèrement les boutons → l'erreur diminue. On répète ça des milliards de fois jusqu'à ce que l'IA soit bonne !
          </div>
          <h3>Le réseau de neurones artificiels</h3>
          <p>L'IA est construite comme un <strong>réseau de neurones</strong> inspiré du cerveau humain :</p>
          <ul>
            <li>Des milliers de <strong>neurones artificiels</strong> connectés entre eux</li>
            <li>Chaque connexion a un <strong>poids</strong> (comme le réglage d'un bouton)</li>
            <li>L'entraînement ajuste ces poids pour minimiser les erreurs</li>
          </ul>
          <h3>Combien ça coûte ?</h3>
          <p>Entraîner un grand modèle est <strong>très coûteux</strong> :</p>
          <ul>
            <li>🖥️ Des milliers de GPU puissants travaillent en parallèle pendant des semaines</li>
            <li>⚡ Consommation électrique colossale</li>
            <li>💰 Le coût peut dépasser <strong>100 millions de dollars</strong> pour les plus grands modèles !</li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> GPT-4 aurait environ <strong>1 000 milliards de paramètres</strong> (les fameux "boutons"). C'est plus que le nombre de neurones dans un cerveau humain !
          </div>
        `
      },
      {
        id: 3,
        title: "L'Inférence",
        emoji: "💬",
        content: `
          <h2>💬 L'Inférence — Quand l'IA te répond</h2>
          <p>L'<strong>inférence</strong>, c'est quand tu utilises l'IA entraînée pour obtenir une réponse. C'est la phase qu'on utilise tous les jours avec ChatGPT ou Copilot.</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> L'entraînement, c'est comme aller à l'école pendant des années. L'inférence, c'est quand on te pose une question à l'examen et que tu utilises tout ce que tu as appris pour répondre !
          </div>
          <h3>Comment l'IA génère du texte ?</h3>
          <p>Un modèle de langage (LLM) génère du texte <strong>mot par mot</strong> (en réalité, "token par token") :</p>
          <ol>
            <li>Tu poses une question</li>
            <li>L'IA calcule quel mot devrait venir en premier</li>
            <li>Puis quel mot vient après, et après, et après...</li>
            <li>Jusqu'à ce que la réponse soit complète</li>
          </ol>
          <h3>La "température" — contrôler la créativité</h3>
          <p>On peut régler la <strong>température</strong> du modèle :</p>
          <ul>
            <li>🧊 <strong>Température basse</strong> → réponses prévisibles et sûres (bon pour la médecine, le droit)</li>
            <li>🔥 <strong>Température haute</strong> → réponses créatives mais parfois surprenantes (bon pour la créativité)</li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> L'inférence est bien moins chère que l'entraînement — mais quand des millions de personnes utilisent ChatGPT en même temps, ça coûte quand même <strong>des millions de dollars par jour</strong> en électricité et serveurs !
          </div>
        `
      },
      {
        id: 4,
        title: "Les Applications",
        emoji: "🚀",
        content: `
          <h2>🚀 Les Applications — L'IA dans ta vie</h2>
          <p>Les IA génératives sont partout ! Voici comment elles changent notre quotidien.</p>
          <h3>Texte — Les LLM</h3>
          <ul>
            <li>💬 <strong>ChatGPT, Claude, Gemini</strong> — assistants conversationnels</li>
            <li>💻 <strong>GitHub Copilot</strong> — aide les développeurs à coder</li>
            <li>✍️ <strong>Aide à la rédaction</strong> — emails, résumés, traductions</li>
          </ul>
          <h3>Images — Les modèles de diffusion</h3>
          <ul>
            <li>🎨 <strong>DALL-E, Midjourney, Stable Diffusion</strong> — créent des images depuis du texte</li>
            <li>📸 <strong>Adobe Firefly</strong> — édition d'images avec l'IA</li>
          </ul>
          <h3>Son et Vidéo</h3>
          <ul>
            <li>🎵 <strong>Suno, Udio</strong> — génèrent de la musique</li>
            <li>🎬 <strong>Sora</strong> — génère des vidéos réalistes depuis du texte</li>
            <li>🗣️ <strong>Clonage de voix</strong> — reproduire n'importe quelle voix</li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Attention !</strong> Ces outils sont très puissants et peuvent être mal utilisés (deepfakes, désinformation...). C'est important de toujours vérifier la source d'une image ou d'une vidéo surprenante que tu vois en ligne ! 🧐
          </div>
        `
      }
    ],
    quiz: [
      {
        question: "Quelle est la différence entre un programme classique et une IA ?",
        answers: ["L'IA est plus rapide que les programmes classiques", "L'IA apprend des règles toute seule à partir d'exemples", "L'IA ne peut faire qu'une seule chose", "L'IA n'a pas besoin d'électricité"],
        correct: 1
      },
      {
        question: "Qu'est-ce que les 'données d'entraînement' ?",
        answers: ["Les câbles qui connectent le GPU", "Les paramètres du modèle", "Les exemples sur lesquels l'IA apprend", "Les serveurs qui hébergent l'IA"],
        correct: 2
      },
      {
        question: "Qu'ajuste-t-on pendant l'entraînement d'une IA ?",
        answers: ["La couleur de l'interface", "Les poids des connexions entre neurones", "Le nombre de disques durs", "La résolution de l'écran"],
        correct: 1
      },
      {
        question: "Qu'est-ce que 'l'inférence' dans le contexte de l'IA ?",
        answers: ["La phase d'apprentissage sur les données", "Quand on utilise l'IA entraînée pour obtenir une réponse", "La fabrication des GPU", "La connexion à Internet"],
        correct: 1
      },
      {
        question: "Comment un LLM génère-t-il du texte ?",
        answers: ["Il copie du texte depuis Internet", "Il génère la réponse complète en une seule fois", "Il génère le texte mot par mot (token par token)", "Il choisit une réponse dans une liste préétablie"],
        correct: 2
      },
      {
        question: "Qu'est-ce que la 'température' dans un modèle d'IA ?",
        answers: ["La chaleur dégagée par les serveurs", "Un paramètre qui contrôle la créativité des réponses", "La vitesse de génération du texte", "La langue dans laquelle répond l'IA"],
        correct: 1
      },
      {
        question: "Pourquoi GPT ne connaît pas les événements récents ?",
        answers: ["Il est trop lent pour chercher sur Internet", "Ses données d'entraînement s'arrêtent à une certaine date", "Il n'a pas accès aux journaux", "Il ne parle qu'anglais"],
        correct: 1
      },
      {
        question: "Quel outil génère des images à partir d'une description texte ?",
        answers: ["GitHub Copilot", "ChatGPT", "DALL-E / Midjourney", "Google Chrome"],
        correct: 2
      }
    ]
  },

  {
    id: "internet",
    title: "Internet Mondial",
    subtitle: "Comment fonctionne le réseau des réseaux ?",
    emoji: "🌍",
    color: "#00b894",
    colorLight: "#e0f5f0",
    description: "Explore les câbles sous-marins, les protocoles et l'infrastructure qui relie 5 milliards de personnes !",
    chapters: [
      {
        id: 0,
        title: "Les Origines d'Internet",
        emoji: "📡",
        content: `
          <h2>📡 Les Origines d'Internet</h2>
          <p>Internet ne s'est pas créé en un jour ! Il a une histoire fascinante qui commence pendant la Guerre Froide...</p>
          <div class="info-box">
            <strong>🗓️ 1969 — ARPANET :</strong> L'armée américaine crée un réseau qui résiste à une attaque nucléaire. L'idée : si un nœud du réseau est détruit, les données trouvent un autre chemin. Ce réseau s'appelle <strong>ARPANET</strong>.
          </div>
          <h3>Les grandes étapes</h3>
          <ul>
            <li>📡 <strong>1969</strong> — Première connexion ARPANET (4 universités américaines)</li>
            <li>📧 <strong>1971</strong> — Premier email envoyé !</li>
            <li>🌐 <strong>1983</strong> — Invention de TCP/IP (le langage d'Internet)</li>
            <li>💻 <strong>1991</strong> — Tim Berners-Lee invente le <strong>Web</strong> (les pages web qu'on visite)</li>
            <li>🔍 <strong>1998</strong> — Création de Google</li>
            <li>📱 <strong>2007</strong> — iPhone et Internet mobile</li>
          </ul>
          <h3>Internet ≠ Web !</h3>
          <p>Attention, beaucoup confondent !</p>
          <ul>
            <li><strong>Internet</strong> = l'infrastructure physique (câbles, routeurs, serveurs...)</li>
            <li><strong>Le Web</strong> = les sites web qu'on visite via un navigateur (un service parmi d'autres sur Internet)</li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> En 2024, Internet connecte plus de <strong>5 milliards de personnes</strong> — soit 60% de la population mondiale !
          </div>
        `
      },
      {
        id: 1,
        title: "Les Protocoles TCP/IP",
        emoji: "📦",
        content: `
          <h2>📦 TCP/IP — La langue d'Internet</h2>
          <p>Pour qu'un ordinateur à Paris puisse parler à un serveur à New York, il faut qu'ils parlent le <strong>même langage</strong>. Ce langage, c'est <strong>TCP/IP</strong>.</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> TCP/IP, c'est comme les règles de La Poste. N'importe qui peut envoyer une lettre à n'importe où dans le monde — tant qu'il respecte le format (enveloppe, adresse, timbre). TCP/IP, c'est pareil pour les données !
          </div>
          <h3>Comment ça marche ?</h3>
          <ol>
            <li>📦 Les données sont découpées en petits <strong>paquets</strong></li>
            <li>🏷️ Chaque paquet reçoit une <strong>adresse IP</strong> source et destination</li>
            <li>🗺️ Les paquets voyagent indépendamment sur le réseau</li>
            <li>🧩 À l'arrivée, ils sont <strong>reassemblés</strong> dans le bon ordre</li>
          </ol>
          <h3>IP — Les adresses d'Internet</h3>
          <p>Chaque appareil connecté a une <strong>adresse IP</strong> unique :</p>
          <ul>
            <li><strong>IPv4</strong> : ex. 192.168.1.1 — mais on manque d'adresses !</li>
            <li><strong>IPv6</strong> : ex. 2001:db8::1 — 340 sextillions d'adresses possibles 🤯</li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> Quand tu regardes une vidéo YouTube, elle est découpée en <strong>milliers de paquets</strong> qui voyagent peut-être par des chemins différents avant d'être rassemblés sur ton écran !
          </div>
        `
      },
      {
        id: 2,
        title: "Les Câbles Sous-Marins",
        emoji: "🌊",
        content: `
          <h2>🌊 Les Câbles Sous-Marins — L'épine dorsale d'Internet</h2>
          <p>99% du trafic Internet entre les continents passe par des <strong>câbles sous-marins</strong> posés au fond des océans — pas par les satellites comme beaucoup le croient !</p>
          <div class="info-box">
            <strong>🗺️ Le réseau actuel :</strong> Il existe plus de <strong>400 câbles sous-marins actifs</strong> qui forment une toile de plus de <strong>1,3 million de kilomètres</strong> — soit 3 fois la distance Terre-Lune !
          </div>
          <h3>Comment ils sont faits ?</h3>
          <ul>
            <li>🔦 Au centre : des <strong>fibres optiques</strong> (de la lumière qui transmet les données à la vitesse de la lumière)</li>
            <li>🛡️ Autour : plusieurs couches de protection (acier, plastique) pour résister à la pression, aux ancres de bateaux, aux requins...</li>
            <li>📏 Diamètre : pas beaucoup plus épais qu'un <strong>tuyau d'arrosage !</strong></li>
          </ul>
          <h3>Comment on les pose ?</h3>
          <p>Des <strong>navires câbliers</strong> spéciaux déroutent lentement le câble au fond de l'océan. Pour un câble transatlantique, ça prend plusieurs semaines !</p>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> Le câble MAREA entre les USA et l'Espagne peut transmettre <strong>160 térabits par seconde</strong> — assez pour streamer <strong>71 millions de films HD en simultané !</strong>
          </div>
        `
      },
      {
        id: 3,
        title: "Routeurs et Data Centers",
        emoji: "🏭",
        content: `
          <h2>🏭 Routeurs et Data Centers</h2>
          <p>Quand tes données voyagent sur Internet, elles passent par des milliers de <strong>routeurs</strong> avant d'arriver à destination, et sont souvent stockées dans des gigantesques <strong>data centers</strong>.</p>
          <div class="info-box">
            <strong>🤔 Les routeurs :</strong> Ce sont des ordinateurs spécialisés dont le seul travail est de lire l'adresse IP d'un paquet et de le rediriger vers le prochain routeur le plus proche de sa destination — comme des signaleurs de circulation !
          </div>
          <h3>Les Data Centers</h3>
          <p>Tes photos Instagram, tes vidéos YouTube, tes emails... tout est stocké dans des <strong>data centers</strong> :</p>
          <ul>
            <li>🏢 Des bâtiments entiers remplis de <strong>milliers de serveurs</strong></li>
            <li>❄️ Refroidissement intense (les serveurs chauffent énormément)</li>
            <li>⚡ Alimentés en électricité 24h/24 avec des générateurs de secours</li>
            <li>🔒 Sécurité physique maximale</li>
          </ul>
          <h3>Les géants du Cloud</h3>
          <p>Amazon (AWS), Google (GCP) et Microsoft (Azure) possèdent des dizaines de data centers géants répartis dans le monde entier pour que tes données soient toujours proches de toi.</p>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> Les data centers d'Amazon consomment autant d'électricité que <strong>plusieurs grandes villes</strong>. C'est pour ça qu'ils cherchent à les alimenter avec des énergies renouvelables !
          </div>
        `
      },
      {
        id: 4,
        title: "Le DNS — L'Annuaire d'Internet",
        emoji: "📖",
        content: `
          <h2>📖 Le DNS — L'Annuaire d'Internet</h2>
          <p>Quand tu tapes "google.com" dans ton navigateur, comment l'ordinateur sait-il à quelle adresse IP aller ? Grâce au <strong>DNS (Domain Name System)</strong> !</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> Le DNS, c'est l'annuaire téléphonique d'Internet. Tu connais le nom de quelqu'un (google.com) mais tu as besoin de son numéro (142.250.185.14) pour l'appeler. Le DNS fait la traduction !
          </div>
          <h3>Comment ça se passe ?</h3>
          <ol>
            <li>Tu tapes <strong>www.youtube.com</strong></li>
            <li>Ton ordi demande au <strong>résolveur DNS</strong> de ton FAI (Free, Orange...)</li>
            <li>Celui-ci interroge les <strong>serveurs DNS racine</strong> mondiaux</li>
            <li>On remonte jusqu'au serveur qui connaît youtube.com</li>
            <li>Tu reçois l'<strong>adresse IP</strong> et ton navigateur s'y connecte !</li>
          </ol>
          <h3>Tout ça en combien de temps ?</h3>
          <p>Cette résolution DNS prend généralement moins de <strong>50 millisecondes</strong>. Et souvent ton ordinateur <strong>mémorise le résultat</strong> pour ne pas refaire la demande à chaque fois !</p>
          <div class="fun-fact">
            💡 <strong>Récap Internet :</strong> Câbles sous-marins (autoroutes) → Routeurs (carrefours) → DNS (GPS) → Data Centers (villes) → et voilà ton site affiché ! 🌍
          </div>
        `
      }
    ],
    quiz: [
      {
        question: "Quel réseau est considéré comme le précurseur d'Internet ?",
        answers: ["WorldWideWeb", "ARPANET", "TCP/IP", "Ethernet"],
        correct: 1
      },
      {
        question: "Quelle est la différence entre Internet et le Web ?",
        answers: ["Ce sont deux noms pour la même chose", "Internet est plus récent que le Web", "Internet est l'infrastructure, le Web sont les sites web qui l'utilisent", "Le Web fonctionne sans Internet"],
        correct: 2
      },
      {
        question: "Comment les données voyagent-elles sur Internet ?",
        answers: ["En un seul bloc de données", "Découpées en petits paquets qui sont reassemblés à l'arrivée", "Via des ondes radio uniquement", "En passant par des satellites"],
        correct: 1
      },
      {
        question: "Quel pourcentage du trafic intercontinental passe par des câbles sous-marins ?",
        answers: ["10%", "50%", "75%", "99%"],
        correct: 3
      },
      {
        question: "À quoi sert un routeur ?",
        answers: ["À stocker des vidéos en ligne", "À lire l'adresse IP et rediriger les paquets vers leur destination", "À créer des sites web", "À refroidir les data centers"],
        correct: 1
      },
      {
        question: "Qu'est-ce que le DNS ?",
        answers: ["Un type de câble sous-marin", "Un protocole de sécurité", "Un système qui traduit les noms de domaine en adresses IP", "Un langage de programmation"],
        correct: 2
      },
      {
        question: "Qui a inventé le World Wide Web (les pages web) ?",
        answers: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Mark Zuckerberg"],
        correct: 2
      },
      {
        question: "Que contient un câble sous-marin au centre ?",
        answers: ["Des fils de cuivre", "Des fibres optiques qui transmettent de la lumière", "De l'eau de mer", "Des câbles d'acier"],
        correct: 1
      }
    ]
  },

  {
    id: "games",
    title: "Jeux Vidéo en Ligne",
    subtitle: "Comment joue-t-on tous ensemble ?",
    emoji: "🎮",
    color: "#fdcb6e",
    colorLight: "#fff8e8",
    description: "Découvre la magie technique derrière Fortnite, Minecraft et tous les jeux en ligne que tu adores !",
    chapters: [
      {
        id: 0,
        title: "Les Serveurs de Jeux",
        emoji: "🖥️",
        content: `
          <h2>🖥️ Les Serveurs de Jeux — Le cœur du jeu en ligne</h2>
          <p>Quand tu joues à Fortnite ou Minecraft en ligne, tu ne te connectes pas directement aux autres joueurs. Tout passe par un <strong>serveur central</strong> !</p>
          <div class="info-box">
            <strong>🤔 Une analogie :</strong> Imagine un arbitre de foot. Les joueurs lui disent ce qu'ils font, et lui décide de l'état officiel du jeu pour tout le monde. Dans les jeux en ligne, le serveur est cet arbitre !
          </div>
          <h3>Qu'est-ce qu'un serveur de jeu ?</h3>
          <ul>
            <li>💻 Un <strong>ordinateur très puissant</strong> qui tourne 24h/24</li>
            <li>🌍 Il gère l'<strong>état du monde</strong> : position de chaque joueur, score, objets...</li>
            <li>📡 Il reçoit les actions de tous les joueurs et <strong>renvoie le résultat</strong> à chacun</li>
            <li>⚖️ Il est l'<strong>arbitre officiel</strong> — ce qu'il dit est la vérité !</li>
          </ul>
          <h3>Combien de joueurs peut gérer un serveur ?</h3>
          <p>Ça dépend du jeu et de son architecture :</p>
          <ul>
            <li>🏆 Jeu de bataille royale (Fortnite) : ~<strong>100 joueurs</strong> par partie</li>
            <li>⚔️ MMO (World of Warcraft) : des <strong>milliers</strong> sur une même carte</li>
            <li>🤝 Jeux coopératifs : souvent <strong>4 à 16</strong> joueurs</li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> Fortnite a parfois plus de <strong>10 millions de joueurs connectés simultanément</strong>. Ça représente des milliers de serveurs tournant en même temps !
          </div>
        `
      },
      {
        id: 1,
        title: "Architecture Client-Serveur",
        emoji: "🔄",
        content: `
          <h2>🔄 Client-Serveur — La danse entre toi et le jeu</h2>
          <p>Dans un jeu en ligne, ton PC (le <strong>client</strong>) et le serveur échangent en permanence des milliers de messages par seconde.</p>
          <div class="info-box">
            <strong>🤔 Le flux d'une action :</strong>
            Tu appuies sur "tirer" → Ton PC envoie l'info au serveur → Le serveur vérifie (tu visais bien ? tu avais des munitions ?) → Le serveur dit "oui, tu as touché !" → Tous les clients (toi + les autres) voient l'effet
          </div>
          <h3>Pourquoi tout passer par le serveur ?</h3>
          <ul>
            <li>🛡️ <strong>Anti-triche</strong> : si le client décidait seul, les tricheurs pourraient se donner des super-pouvoirs</li>
            <li>⚖️ <strong>Équité</strong> : tout le monde a la même vérité officielle</li>
            <li>📊 <strong>Synchronisation</strong> : tout le monde voit la même chose</li>
          </ul>
          <h3>UDP vs TCP dans les jeux</h3>
          <p>Les jeux utilisent souvent <strong>UDP</strong> plutôt que TCP :</p>
          <ul>
            <li><strong>TCP</strong> : vérifie que chaque paquet est bien arrivé. Sûr mais plus lent ✅</li>
            <li><strong>UDP</strong> : envoie les paquets sans vérification. Ultra-rapide mais peut en perdre ⚡</li>
          </ul>
          <p>Dans un jeu, perdre un paquet de "position" n'est pas grave — le prochain arrivera dans 16ms avec la bonne position !</p>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> Les serveurs de jeux envoient souvent des mises à jour <strong>60 fois par seconde</strong> (60 "ticks") — une mise à jour toutes les 16 millisecondes !
          </div>
        `
      },
      {
        id: 2,
        title: "Le Lag et la Latence",
        emoji: "⏱️",
        content: `
          <h2>⏱️ Le Lag — L'ennemi du gamer</h2>
          <p>Le <strong>lag</strong>, tout le monde le déteste ! C'est le délai entre ton action et son résultat à l'écran. Il est mesuré en <strong>millisecondes (ms)</strong> — c'est ce qu'on appelle la <strong>latence</strong>.</p>
          <div class="info-box">
            <strong>📊 Échelle de latence :</strong><br>
            🟢 &lt;20ms — Excellent, lag imperceptible<br>
            🟡 20-50ms — Bon, confortable pour la plupart des jeux<br>
            🟠 50-100ms — Acceptable mais on ressent parfois le délai<br>
            🔴 &gt;100ms — Lag notable, difficile dans les FPS<br>
            💀 &gt;300ms — Injouable !
          </div>
          <h3>D'où vient le lag ?</h3>
          <ul>
            <li>📡 <strong>Distance physique</strong> : un serveur au Japon sera plus lent qu'un serveur en France (la lumière met du temps à voyager !)</li>
            <li>🌐 <strong>Congestion réseau</strong> : trop de données en même temps</li>
            <li>📶 <strong>Wi-Fi instable</strong> : le WiFi est moins stable que l'Ethernet</li>
            <li>💻 <strong>PC trop lent</strong> : si ton ordi rame, ça rajoute du délai</li>
          </ul>
          <h3>Ping vs Latence</h3>
          <p>Le <strong>ping</strong>, c'est un test simple : on envoie un message au serveur et on mesure combien de temps il met à répondre. "Avoir un bon ping" = avoir une faible latence !</p>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> La lumière dans une fibre optique met environ <strong>67ms</strong> pour faire Paris-New York. C'est le minimum physiquement possible — on ne peut pas aller plus vite que la lumière !
          </div>
        `
      },
      {
        id: 3,
        title: "La Synchronisation",
        emoji: "🔁",
        content: `
          <h2>🔁 La Synchronisation — Même jeu, même monde</h2>
          <p>Dans un jeu en ligne, des milliers de joueurs avec des connexions différentes doivent tous <strong>voir la même chose</strong>. Comment c'est possible ?</p>
          <div class="info-box">
            <strong>🤔 Le problème :</strong> Le joueur A a 20ms de latence, le joueur B a 80ms. Quand B appuie sur "tirer", A a déjà bougé ! Comment l'arbitre (serveur) décide-t-il si le tir touche ?
          </div>
          <h3>Les techniques de synchronisation</h3>
          <ul>
            <li>🔮 <strong>Prédiction client (Client-side prediction)</strong> : ton PC prédit ce qui va se passer AVANT la réponse du serveur — ça donne l'impression d'un jeu réactif !</li>
            <li>🎬 <strong>Interpolation</strong> : au lieu d'afficher des positions saccadées, le jeu "lisse" les mouvements entre deux mises à jour</li>
            <li>⏪ <strong>Lag compensation</strong> : le serveur "remonte dans le temps" pour comparer les positions au moment où tu as appuyé sur "tirer"</li>
          </ul>
          <h3>Rollback Netcode</h3>
          <p>Dans les jeux de combat (Street Fighter, Smash...), on utilise le <strong>rollback</strong> : si le serveur reçoit une action en retard, il revient en arrière et <em>recalcule</em> ce qui aurait dû se passer. Ultra-rapide et très précis !</p>
          <div class="fun-fact">
            💡 <strong>Le savais-tu ?</strong> Ces techniques sont si bien optimisées que dans un bon jeu, tu ne ressens aucun lag même avec 50ms de latence — tout est une question d'illusion bien maîtrisée ! 🎩
          </div>
        `
      },
      {
        id: 4,
        title: "Technologies Réseau des Jeux",
        emoji: "🛠️",
        content: `
          <h2>🛠️ Technologies Avancées — La boîte à outils du développeur jeux</h2>
          <p>Derrière chaque jeu en ligne se cachent des technologies réseau sophistiquées. Voici un aperçu de ce que les développeurs utilisent !</p>
          <h3>Les Régions de Serveurs</h3>
          <p>Les grands studios placent des serveurs sur tous les continents :</p>
          <ul>
            <li>🌍 Europe (Paris, Frankfurt, Londres...)</li>
            <li>🌎 Amérique (New York, Dallas, São Paulo...)</li>
            <li>🌏 Asie (Tokyo, Singapour, Sydney...)</li>
          </ul>
          <p>Le jeu te connecte automatiquement au serveur <strong>le plus proche</strong> pour minimiser la latence !</p>
          <h3>Les technologies derrière tout ça</h3>
          <ul>
            <li>🏋️ <strong>Serveurs dédiés</strong> : chaque partie tourne sur son propre serveur (plus stable)</li>
            <li>☁️ <strong>Cloud Gaming</strong> : le jeu tourne sur un serveur lointain, tu reçois juste la vidéo (Xbox Cloud, GeForce Now)</li>
            <li>🔒 <strong>Anti-cheat</strong> : des logiciels qui détectent les tricheurs en temps réel</li>
            <li>📊 <strong>Matchmaking</strong> : des algorithmes qui te mettent avec des joueurs de même niveau</li>
          </ul>
          <div class="fun-fact">
            💡 <strong>Récap Jeux en Ligne :</strong> Serveurs dédiés + Architecture client-serveur + Optimisation réseau (UDP, prédiction, interpolation) + Serveurs proches = une expérience de jeu fluide et équitable pour tout le monde ! 🎮🏆
          </div>
        `
      }
    ],
    quiz: [
      {
        question: "Quel est le rôle d'un serveur dans un jeu en ligne ?",
        answers: ["Stocker tes photos de profil", "Être l'arbitre officiel qui gère l'état du jeu pour tous les joueurs", "Télécharger les mises à jour du jeu", "Afficher les graphismes du jeu"],
        correct: 1
      },
      {
        question: "Pourquoi les actions des joueurs passent-elles par le serveur plutôt que directement entre les joueurs ?",
        answers: ["Pour économiser de la bande passante", "Pour éviter la triche et garantir l'équité", "Parce que les joueurs n'ont pas de connexion Internet directe", "Pour enregistrer les replays"],
        correct: 1
      },
      {
        question: "Qu'est-ce que la 'latence' (ou 'ping') dans un jeu en ligne ?",
        answers: ["La qualité graphique du jeu", "Le nombre de joueurs sur un serveur", "Le délai entre ton action et la réponse du serveur, en millisecondes", "La vitesse de téléchargement du jeu"],
        correct: 2
      },
      {
        question: "Pourquoi les jeux utilisent-ils UDP plutôt que TCP ?",
        answers: ["UDP est plus sécurisé", "UDP est plus rapide car il n'attend pas la confirmation de chaque paquet", "TCP n'est pas compatible avec les jeux", "UDP utilise moins d'électricité"],
        correct: 1
      },
      {
        question: "Qu'est-ce que la 'prédiction client' dans les jeux ?",
        answers: ["L'IA qui prédit tes mouvements", "Le jeu calcule le résultat probable AVANT la réponse du serveur pour paraître réactif", "Le serveur prédit les actions des tricheurs", "Une technique pour améliorer les graphismes"],
        correct: 1
      },
      {
        question: "Quel ping est considéré comme excellent pour jouer ?",
        answers: ["Moins de 20ms", "Entre 100 et 150ms", "Entre 200 et 300ms", "Plus de 500ms"],
        correct: 0
      },
      {
        question: "Pourquoi les studios placent-ils des serveurs sur tous les continents ?",
        answers: ["Pour respecter les lois locales uniquement", "Pour minimiser la latence en connectant les joueurs au serveur le plus proche", "Pour stocker plus de sauvegardes", "Pour que les jeux fonctionnent en offline"],
        correct: 1
      },
      {
        question: "Qu'est-ce que le 'Cloud Gaming' ?",
        answers: ["Jouer à des jeux en plein air", "Le jeu tourne sur un serveur distant et tu reçois seulement la vidéo", "Sauvegarder sa progression en ligne", "Jouer avec des amis dans le même nuage"],
        correct: 1
      }
    ]
  }
];
