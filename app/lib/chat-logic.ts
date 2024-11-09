
import { siteConfig } from './site-config';

type MessageIntent = 
  | 'pricing'
  | 'services'
  | 'contact'
  | 'support'
  | 'portfolio'
  | 'general'
  | 'devis'
  | 'technical';

export const analyzeIntent = (message: string): MessageIntent => {
  const msg = message.toLowerCase();
  
  if (msg.includes('prix') || msg.includes('tarif') || msg.includes('coût')) {
    return 'pricing';
  }
  if (msg.includes('devis') || msg.includes('estimation')) {
    return 'devis';
  }
  if (msg.includes('service') || msg.includes('prestation')) {
    return 'services';
  }
  if (msg.includes('contact') || msg.includes('joindre') || msg.includes('appeler')) {
    return 'contact';
  }
  if (msg.includes('support') || msg.includes('aide') || msg.includes('problème')) {
    return 'support';
  }
  if (msg.includes('projet') || msg.includes('portfolio') || msg.includes('réalisation')) {
    return 'portfolio';
  }
  if (msg.includes('technique') || msg.includes('technologie') || msg.includes('développement')) {
    return 'technical';
  }
  
  return 'general';
};

export const generateResponse = (intent: MessageIntent, message: string): string => {
  console.log(message)
  switch (intent) {
    case 'pricing':
      return `Les tarifs varient selon la complexité du projet. Pour vous donner une estimation précise, je vous invite à remplir notre formulaire de contact en détaillant vos besoins. 

Voici quelques points de repère :
- Site vitrine : à partir de XXXX€
- E-commerce : à partir de XXXX€
- Application web : sur devis

Souhaitez-vous que je vous guide vers le formulaire de contact ?`;

    case 'devis':
      return `Je peux vous aider à obtenir un devis personnalisé. Pour cela, j'aurais besoin de quelques informations :
1. Type de projet (site vitrine, e-commerce, application...)
2. Fonctionnalités principales souhaitées
3. Délai souhaité

Voulez-vous me donner ces informations ou préférez-vous passer directement par le formulaire de contact ?`;

    case 'services':
      const services = siteConfig.services.map(s => `- ${s.title}: ${s.description}`).join('\n');
      return `Voici nos principaux services :\n\n${services}\n\nQuel type de service vous intéresse particulièrement ?`;

    case 'contact':
      return `Vous pouvez nous contacter de plusieurs façons :
- Email : ${siteConfig.general.contact.email}
- Téléphone : ${siteConfig.general.contact.phone}
- En personne : ${siteConfig.general.location}

Vous pouvez également utiliser notre formulaire de contact sur le site. Que préférez-vous ?`;

    case 'support':
      return `Nous proposons deux niveaux de support :

${siteConfig.support.standard.title}:
${siteConfig.support.standard.features.map(f => `- ${f}`).join('\n')}

${siteConfig.support.premium.title}:
${siteConfig.support.premium.features.map(f => `- ${f}`).join('\n')}

Quel type de support vous intéresse ?`;

    case 'portfolio':
      return `BennyDev a réalisé de nombreux projets variés. Voici quelques retours clients :

${siteConfig.testimonials.map(t => `"${t.content}" - ${t.name}, ${t.role}`).slice(0, 2).join('\n\n')}

Souhaitez-vous voir plus de projets ou discuter d'un projet similaire ?`;

    case 'technical':
      return `En tant qu'expert en développement web, nous utilisons les technologies les plus modernes et performantes. Chaque projet bénéficie :

- D'une architecture optimisée
- Des meilleures pratiques de développement
- D'une attention particulière à la performance

Pour des questions techniques spécifiques, je peux organiser un appel avec notre équipe technique. Souhaitez-vous planifier un appel ?`;

    default:
      return `Bienvenue chez BennyDev ! Je suis là pour vous aider à concrétiser votre projet web. 

Nous sommes spécialisés dans :
${siteConfig.services.map(s => `- ${s.title}`).join('\n')}

Comment puis-je vous aider aujourd'hui ?`;
  }
}; 