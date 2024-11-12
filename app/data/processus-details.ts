type ProcessusStep = {
    description: string;
    points: string[];
  };
  
  type ProcessusPhase = {
    [key: string]: ProcessusStep;
  };
  
  type ProcessusDetails = {
    [key: string]: ProcessusPhase;
  };

export const processusDetails: ProcessusDetails = {
  "Consultation": {
    "Analyse des besoins": {
      description: "Après m'avoir contacté, on se cale un moment sympa pour échanger en visio ou autour d'un café. L'objectif ? Mieux comprendre votre projet et vos ambitions.",
      points: [
        "On définit ensemble vos objectifs business",
        "On cerne votre cible idéale",
        "On jette un œil à ce que fait la concurrence",
        "On liste les fonctionnalités qui vous feront gagner"
      ]
    },
    "Définition des objectifs": {
      description: "On pose les bases solides de votre projet avec des objectifs clairs et atteignables. Pas de stress, on avance étape par étape !",
      points: [
        "On fixe des objectifs concrets, pas du blabla",
        "On choisit les bons indicateurs pour mesurer votre succès",
        "On établit un planning réaliste qui vous convient",
        "On parle budget sans tabou et on optimise les ressources"
      ]
    },
    "Étude de faisabilité": {
      description: "On vérifie que tout est techniquement possible et financièrement viable. Mieux vaut prévenir que guérir !",
      points: [
        "On explore les possibilités techniques sans jargon",
        "On anticipe les obstacles potentiels",
        "On fait les comptes, transparence totale",
        "On garde toujours un plan B sous le coude"
      ]
    },
    "Proposition technique": {
      description: "Je vous prépare un plan d'action sur mesure, clair et sans surprise.",
      points: [
        "Des solutions techniques adaptées à votre réalité",
        "Un calendrier qui respecte vos contraintes",
        "Un budget détaillé sans mauvaises surprises",
        "Une façon de travailler qui vous ressemble"
      ]
    }
  },
  "Conception": {
    "Maquettes et wireframes": {
      description: "On donne vie à vos idées ! Je crée des versions interactives de votre futur projet pour que vous puissiez le visualiser et le tester.",
      points: [
        "Des brouillons rapides pour poser les bases",
        "Des maquettes détaillées qui donnent envie",
        "Des prototypes qu'on peut vraiment tester",
        "On fait essayer à de vrais utilisateurs pour être sûr"
      ]
    },
    "Architecture technique": {
      description: "On pose les fondations solides de votre projet. C'est un peu comme construire une maison : il faut que la base soit costaud !",
      points: [
        "On choisit les technologies qui vous correspondent le mieux",
        "On structure la base de données pour qu'elle soit évolutive",
        "On pense sécurité dès le début, promis !",
        "On prépare le terrain pour les futures évolutions"
      ]
    },
    "Design UI/UX": {
      description: "C'est l'heure de rendre votre projet beau et intuitif ! On marie le style avec l'efficacité pour que vos utilisateurs tombent amoureux.",
      points: [
        "On crée une identité visuelle qui vous ressemble",
        "On pense à l'expérience utilisateur avant tout",
        "On s'assure que c'est joli sur tous les écrans",
        "On garde une cohérence visuelle de A à Z"
      ]
    }
  },
  "Développement": {
    "Développement par sprints": {
      description: "On avance par petites étapes de 2 semaines. Comme ça, vous voyez votre projet grandir et on peut ajuster le tir facilement !",
      points: [
        "On planifie ensemble les prochaines étapes",
        "Je code les fonctionnalités une par une",
        "On fait le point régulièrement",
        "On s'adapte selon vos retours"
      ]
    },
    "Intégration continue": {
      description: "Je mets en place un système qui vérifie automatiquement que tout roule. C'est un peu comme avoir un assistant qualité 24/7 !",
      points: [
        "Chaque modification est testée automatiquement",
        "On repère les bugs avant qu'ils ne posent problème",
        "On garde une qualité de code au top",
        "On peut déployer en toute confiance"
      ]
    },
    "Revue de code": {
      description: "On fait un check-up complet du code régulièrement. C'est comme un contrôle technique, mais pour votre application !",
      points: [
        "On vérifie que le code est propre et maintenable",
        "On optimise les performances",
        "On s'assure que tout est bien documenté",
        "On anticipe les futures évolutions"
      ]
    }
  },
  "Livraison": {
    "Tests finaux": {
      description: "Avant le grand jour, on vérifie tout de A à Z. Pas question de laisser passer le moindre bug !",
      points: [
        "On vérifie que tout marche comme prévu",
        "On s'assure que c'est rapide et fluide",
        "On sécurise vos données comme un coffre-fort",
        "On fait valider par votre équipe"
      ]
    },
    "Mise en production": {
      description: "Le jour J est arrivé ! On met votre projet en ligne en douceur, sans stress et sans interruption de service.",
      points: [
        "On déploie progressivement pour éviter les surprises",
        "On surveille que tout se passe bien",
        "On reste dispo en cas de besoin",
        "On fête ça ensemble ! 🎉"
      ]
    },
    "Formation et documentation": {
      description: "Je vous transmets les clés de votre projet ! Pas d'inquiétude, je vous explique tout simplement et reste dispo pour vos questions.",
      points: [
        "On forme votre équipe sans prise de tête",
        "On crée des guides pratiques et clairs",
        "On documente les points importants",
        "On reste en support si besoin"
      ]
    },
    "Suivi et maintenance": {
      description: "Votre projet est lancé, mais je reste dans les parages ! On continue à faire évoluer votre application selon vos besoins.",
      points: [
        "On garde un œil sur les performances",
        "On fait des mises à jour régulières",
        "On améliore en continu selon vos retours",
        "On planifie les futures évolutions"
      ]
    }
  }
}; 