'use client'
import ContentComponent from './ContentComponent';
import React from 'react'

import { BookUser, BriefcaseBusiness, Globe, Handshake, Lightbulb, FileText, Code2, TestTube2, Rocket, Paintbrush, LocateFixed } from 'lucide-react';
import Image from 'next/image';
import { Section } from './types';


export const sections: Section[] = [
    {
        id: 'getting-started',
        title: 'Pour Commencer',
        items: [
            {
                id: 'welcome',
                title: 'Bienvenue',
                content: <ContentComponent sections={[
                    {
                        type: 'text',
                        content: 'Cher utilisateur, cher client,',
                        className: 'font-bold'
                    },
                    {
                        type: 'text',
                        content: 'Je suis ravis de vous accueillir dans votre espace projet personnel. Cette plateforme a été spécialement conçue pour assurer un suivi optimal de votre projet web et faciliter notre collaboration tout au long de son développement.',
                        className: 'font-bold'
                    },
                    {
                        type: 'media',
                        content: {
                            type: 'image',
                            src: '/Bennydev.webp',
                            alt: 'Image de bienvenue',
                            style: {
                                width: '100%',
                                height: 300,
                                objectFit: 'cover',
                                containerClassName: 'my-4 mx-auto',
                                className: 'shadow-lg'
                            }
                        }
                    },
                    {
                        type: 'text',
                        content: "Mon Engagement",
                        className: 'font-bold '
                    },
                    {
                        type: 'text',
                        content: "Le support a été développé avec un objectif précis : vous offrir une visibilité complète sur l'avancement de votre projet et maintenir une communication fluide et efficace. Je comprends que chaque projet est unique, c'est pourquoi cet espace s'adapte parfaitement à vos besoins spécifiques."
                    },
                    {
                        type: 'text',
                        content: "Ce qui vous attend",
                        className: 'font-bold'
                    },
                    {
                        type: 'list',
                        listType: 'bullet',
                        listClassName: 'space-y-2 list-none',
                        items: [
                            {
                                content: 'Un tableau de bord clair pour suivre l\'avancement de votre projet, voir les notifications importantes'
                            },
                            {
                                content: 'Des outils de communication intégrés pour une collaboration fluide'
                            },
                            {
                                content: 'Un espace de stockage centralisé pour tous vos documents, fichiers, images, etc.'
                            },
                            {
                                content: 'Des notifications en temps réel sur les avancées importantes'
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: "Comment débuter ?",
                        className: 'font-bold'
                    },
                    {
                        type: 'list',
                        listType: 'number',
                        listClassName: 'space-y-2 list-none',
                        items: [
                            {
                                content: 'Complétez votre profil : Personnalisez votre espace pour une meilleure expérience'
                            },
                            {
                                content: 'Explorez votre tableau de bord : Familiarisez-vous avec les différentes sections'
                            },
                            {
                                content: 'Consultez vos documents : Retrouvez votre cahier des charges et autres documents importants'
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: "Mon Engagement Qualité",
                        className: 'font-bold'
                    },
                    
                    {
                        type: 'list',
                        listType: 'bullet',
                        listClassName: 'space-y-2 list-none',
                        items: [
                            {
                                content: 'Une profonde écoute humaine'
                            },
                            {
                                content: 'Réponses à vos messages sous 24h ouvrées (en général)'
                            },
                            {
                                content: 'Réponses au tickets post développement selon (formule standard, formule premium)'
                            },
                            {
                                content: 'Accès sécurisé 24/7 à votre espace'
                            },
                            {
                                content: 'Protection optimale de vos données'
                            },
                            {
                                content: 'Mises à jour régulières du projet'
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: "Ressources à Votre Disposition",
                        className: 'font-bold'
                    },
                    {
                        type: 'list',
                        listType: 'bullet',
                        listClassName: 'space-y-2 list-none',
                        items: [
                            {
                                content: 'Guide d\'utilisation de la plateforme'
                            },
                            {
                                content: 'Accès aux maquettes et documents techniques'
                            },
                            {
                                content: 'Partage de fichiers'
                            },
                            {
                                content: 'Système de suivi des demandes'
                            },
                            {
                                content: 'Contact direct avec votre développeur, moi-même'
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: "Les étapes de votre projet",
                        className: 'font-bold text-2xl mt-8 mb-4'
                    },
                   
                    
                ]} />
            },

           
        ]
    },
    {
        id: 'typesprojects',
        title: 'Types de projets',
        items: [
            {
                id: 'typesprojects-1',
                title: 'Site vitrine',
                content: <ContentComponent sections={[
                    {
                        type: 'text',
                        content: 'Qu\'est-ce qu\'un Site Vitrine ?',
                        className: 'font-bold'
                    },
                    {
                        type: 'text',
                        content: 'Un site vitrine est un site web qui présente une entreprise, une organisation ou une personne de manière concise et efficace. Il peut inclure des informations telles que le profil de l\'entreprise, ses produits ou services, ses événements, ses actualités, etc. Le site vitrine est conçu pour être simple, intuitif et attrayant, offrant une première impression visuelle et une compréhension rapide du contenu.',
                    },
                    {
                        type: 'text',
                        content: 'Quels sont les avantages d\'un site vitrine ?',
                        className: 'font-bold'
                    },
                    {
                        type: 'list',
                        listType: 'bullet',
                        listClassName: 'space-y-4 list-none m-0 p-0',
                        items: [
                            {
                                content: 'Présenter votre entreprise et vos services',
                                className: ' font-semibold p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900 shadow-sm',
                                icon: <BriefcaseBusiness className='w-28 h-28 text-gray-100/100 hover:text-white transition-colors' />,
                            },
                            {
                                content: 'Être visible 24h/24 sur internet',
                                className: ' font-semibold p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900 shadow-sm',
                                icon: <Globe className='w-28 h-28 text-gray-100/100 hover:text-white transition-colors' />,
                            },
                            {
                                content: 'Renforcer votre crédibilité professionnelle',
                                className: ' font-semibold p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900 shadow-sm',
                                icon: <Handshake className='w-28 h-28 text-gray-100/100 hover:text-white transition-colors' />,
                            },
                            {
                                content: 'Attirer de nouveaux clients ou partenaires',
                                className: ' font-semibold p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900 shadow-sm',
                                icon: <BookUser className='w-28 h-28 text-gray-100/100 hover:text-white transition-colors' />,
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: 'Étapes de Création',
                        className: 'font-bold'
                    },
                    {
                        type: 'steps',
                        content: [
                            {
                                title: "Découverte",
                                description: "Premier contact et analyse de vos besoins",
                                icon: <Lightbulb className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Proposition",
                                description: "Devis détaillé et planning prévisionnel",
                                icon: <FileText className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Maquettage",
                                description: "Création de votre maquette avec Figma ",
                                icon: <Paintbrush className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Développement",
                                description: "Création de votre projet avec des points réguliers",
                                icon: <Code2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Tests",
                                description: "Vérification approfondie et ajustements",
                                icon: <TestTube2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Livraison",
                                description: "Mise en ligne et formation",
                                icon: <Rocket className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: 'Mes préoccupations qui vont vous faire gagner',
                        className: 'font-bold'
                    },
                    {
                        type: 'list',
                        listType: 'bullet',
                        listClassName: 'space-y-2 list-none m-0 p-0',
                        items: [
                            {
                                content: 'Une qualité irréprochable pour votre image de marque',
                                className: ' font-semibold p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900 shadow-sm',
                                icon: <LocateFixed className='w-28 h-28 text-gray-100/100 hover:text-white transition-colors' />,
                            },
                            {
                                content: 'Des performances optimales pour satisfaire vos visiteurs',
                                className: ' font-semibold p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900',
                                icon: <LocateFixed className='w-28 h-28 text-gray-100/100 hover:text-white transition-colors' />,
                            },
                            {
                                content: 'Une évolutivité garantie pour accompagner votre croissance',
                                className: ' font-semibold p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900',
                                icon: <LocateFixed className='w-28 h-28 text-gray-100/100 hover:text-white transition-colors' />,
                            },
                            {
                                content: 'Une parfaite adéquation avec les standards actuels du web',
                                className: ' font-semibold p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900',
                                icon: <LocateFixed className='w-28 h-28 text-gray-100/100 hover:text-white transition-colors' />,
                            }
                        ]
                    },
                        {
                        type: 'media',
                        content: {
                            type: 'image',
                            src: '/perf.png',
                            alt: 'Image de bienvenue',
                            style: {
                                width: '100%',
                                height: 200,
                                objectFit: 'cover',
                                containerClassName: 'my-4 mx-auto',
                                className: 'shadow-lg rounded-xl'
                            }
                        }
                    },
                    {
                        type: 'text',
                        content: 'Les indicateurs de performances ci dessus sont des indicateurs de performance globaux, il peut y avoir des différences en fonction de vos besoins spécifiques. Mais mon objectif est de vous donner une idée de la qualité du site que je vais vous créer.',
                        className: 'italic'
                    },
                    {
                        type: 'text',
                        content: 'Les technologies',
                        className: 'font-bold'
                    },
                    {
                        type: 'text',
                        content: 'j\'ai soigneusement sélectionné les technologies que j\'utilise pour vos projets. Mon expérience m\'a permis d\'identifier les solutions les plus pertinentes pour créer des sites web qui se démarquent.',
                    },
                    {
                        type: 'text',
                        content: 'Chaque technologie que je propose a fait ses preuves et répond à des critères essentiels :',
                        className: 'italic'
                    },
                    {
                        type: 'list',
                        listType: 'bullet',
                        listClassName: 'space-y-2 list-none m-0 p-0',
                        items: [
                            {
                                content: 'Next.js , c\'est le framework qui me permet de créer des sites web modernes et performants, avec des performances optimales. Ainsi que des sites qui sont optimisés pour les moteurs de recherche.',
                                className: '  p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900 shadow-sm pr-36',
                                icon: <Image 
                                    src='/next.webp' 
                                    alt='Next.js' 
                                    width={112} 
                                    height={112} 
                                    className='rotate-[30deg]' 
                                />,
                            },
                            {
                                content: 'Tailwind CSS, c\'est la librairie qui me permet de créer des designs modernes et esthétiques, avec des styles personnalisés.',
                                className: '  p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900 pr-36',
                                icon: <Image 
                                    src='/tailwind.webp' 
                                    alt='Next.js' 
                                    width={112} 
                                    height={112} 
                                    className='rotate-[30deg]' 
                                />,
                            },
                            {
                                content: 'Strapi, c\'est le CMS qui me permet de gérer le contenu de votre site de manière simple et efficace.',
                                className: '  p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900 pr-36',
                                icon: <Image 
                                    src='/strapi.webp' 
                                    alt='Next.js' 
                                    width={112} 
                                    height={112} 
                                    className='rotate-[30deg]' 
                                />,
                            },
                            {
                                content: 'Vercel, c\'est la plateforme qui me permet de déployer et de gérer votre site de manière simple et efficace. C\'est un gain de temps et de ressources par rapport a un deploiement classique',
                                className: '  p-8 rounded-xl text-white relative overflow-hidden bg-gradient-to-r from-black to-violet-900 pr-36',
                                icon: <Image 
                                    src='/vercel.webp' 
                                    alt='Next.js' 
                                    width={112} 
                                    height={112} 
                                    className='rotate-[30deg]' 
                                />,
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: 'Tarifs',
                        className: 'font-bold'
                    },
                    {
                        type: 'text',
                        content: 'Les tarifs sont flexibles et adaptés à vos besoins. Nous vous proposons des options abordables pour tous les budgets.',
                     
                    },
                    {
                        type: 'table',
                        content: {
                            headers: ['Fonctionnalités', 'Essentiel (à partir de 800€)', 'Business (à partir de 1200€)', 'Premium ( à partir de1800€)'],
                            rows: [
                                ['Pages incluses', 'Jusqu\'à 5 pages', 'Jusqu\'à 10 pages', 'Sur-mesure'],
                                ['Design responsive', 'Template optimisé', 'Design personnalisé', 'Design sur-mesure'],
                                ['Performance & SEO', 'SEO basique + score >90', 'SEO avancé + schema.org', 'SEO premium + stratégie'],
                                ['Animations', 'Standards', 'Personnalisées', 'Sur-mesure + Micro-interactions'],
                                ['Formulaires', '1 formulaire contact', '3 formulaires', 'Illimités + CRM'],
                                ['Blog', 'Non inclus', 'Blog simple', 'Blog avancé + Catégories'],
                                ['Multilingue', 'Non inclus', '2 langues', '3 langues'],
                                ['Analytics & Rapports', 'Google Analytics', '+ Events tracking', '+ Dashboard personnalisé'],
                                ['Support technique', 'Email (48h)', 'Email prioritaire (24h)', 'Support dédié (4h)'],
                                ['Maintenance', 'Trimestrielle', 'Mensuelle', 'Hebdomadaire'],
                                ['Formation admin', '1h', '2h', '4h'],
                                ['Modifications post-launch', '1 révision', '3 révisions', 'Illimitées 1er mois'],
                                ['Hébergement', 'Offert pendant 1 an', 'Offert pendant 1 an', 'Offert pendant 1 an'],
                                ['Certificat SSL', 'Inclus', 'Inclus', 'Inclus']
                            ]
                        },
                        className: 'w-full mt-4'
                    },
                    {
                        type: 'text',
                        content: 'Important : Ces tarifs sont présentés à titre indicatif et constituent une base de départ. Chaque projet étant unique, nous personnaliserons ensemble votre devis en fonction de vos besoins spécifiques. Des fonctionnalités supplémentaires peuvent être ajoutées ou retirées pour correspondre parfaitement à votre vision.',
                        className: 'mt-4 p-4 bg-violet-50 border-l-4 border-violet-500 italic'
                    },
                ]} />
            },
            {
                id: 'typesprojects-2',
                title: 'E-commerce',
                content: <ContentComponent sections={[
                    {
                        type: 'text',
                        content: 'Boutiques en ligne personnalisées avec Shopify',
                    },
                    {
                        type: 'text',
                        content: 'Étapes de Création',
                        className: 'font-bold'
                    },
                    {
                        type: 'steps',
                        content: [
                            {
                                title: "Découverte",
                                description: "Premier contact et analyse de vos besoins",
                                icon: <Lightbulb className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Proposition",
                                description: "Devis détaillé et planning prévisionnel",
                                icon: <FileText className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Maquettage",
                                description: "Création de votre maquette avec Figma ",
                                icon: <Code2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Développement",
                                description: "Création de votre projet avec des points réguliers",
                                icon: <Code2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Tests",
                                description: "Vérification approfondie et ajustements",
                                icon: <TestTube2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Livraison",
                                description: "Mise en ligne et formation",
                                icon: <Rocket className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: 'Tarifs',
                        className: 'font-bold'
                    },
                    {
                        type: 'text',
                        content: 'Les tarifs sont flexibles et adaptés à vos besoins. Nous vous proposons des options abordables pour tous les budgets.',
                     
                    },
                    {
                        type: 'table',
                        content: {
                            headers: ['Fonctionnalités', 'Starter (1999€)', 'Business (2999€)', 'Premium (4999€)'],
                            rows: [
                                ['Produits inclus', 'Jusqu\'à 50 produits', 'Jusqu\'à 500 produits', 'Illimité'],
                                ['Design responsive', 'Template optimisé', 'Design personnalisé', 'Design sur-mesure'],
                                ['Performance & SEO', 'SEO e-commerce basique', 'SEO avancé + Rich Snippets', 'SEO premium + Stratégie'],
                                ['Méthodes de paiement', '2 méthodes', '4 méthodes', 'Illimité'],
                                ['Gestion des stocks', 'Basique', 'Avancée', 'Multi-entrepôts'],
                                ['Transporteurs', '1 transporteur', '3 transporteurs', 'Illimité'],
                                ['Emails transactionnels', 'Templates standards', 'Templates personnalisés', 'Templates sur-mesure'],
                                ['Analytics & Rapports', 'Basique', '+ Rapports avancés', '+ Dashboard personnalisé'],
                                ['Support technique', 'Email (48h)', 'Email prioritaire (24h)', 'Support dédié (4h)'],
                                ['Formation', '2h', '4h', '8h'],
                                ['Maintenance', 'Trimestrielle', 'Mensuelle', 'Hebdomadaire'],
                                ['Import produits', 'Manuel', 'CSV/Excel', 'API + automatisation'],
                                ['Hébergement', 'Offert pendant 1 an', 'Offert pendant 1 an', 'Offert pendant 1 an'],
                                ['Certificat SSL', 'Inclus', 'Inclus', 'Inclus']
                            ]
                        },
                        className: 'w-full mt-4'
                    },
                   
                    
                ]} />,
            },
            {
                id: 'typesprojects-3',
                title: 'Application Web',
                content: <ContentComponent sections={[
                    {
                        type: 'text',
                        content: 'Développements spécifiques adaptés à vos besoins',
                    },
                    {
                        type: 'text',
                        content: 'Étapes de Création',
                        className: 'font-bold'
                    },
                    {
                        type: 'steps',
                        content: [
                            {
                                title: "Découverte",
                                description: "Premier contact et analyse de vos besoins",
                                icon: <Lightbulb className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Proposition",
                                description: "Devis détaillé et planning prévisionnel",
                                icon: <FileText className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Développement",
                                description: "Création de votre projet avec des points réguliers",
                                icon: <Code2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Tests",
                                description: "Vérification approfondie et ajustements",
                                icon: <TestTube2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Livraison",
                                description: "Mise en ligne et formation",
                                icon: <Rocket className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: 'Tarifs',
                        className: 'font-bold'
                    },
                    {
                        type: 'text',
                        content: 'Les tarifs sont flexibles et adaptés à vos besoins. Nous vous proposons des options abordables pour tous les budgets.',
                     
                    },
                    {
                        type: 'table',
                        content: {
                            headers: ['Fonctionnalités', 'Application Simple (4900€)', 'Application Avancée (9900€)', 'Application Entreprise (Sur mesure)'],
                            rows: [
                                ['Type d\'application', 'CRUD simple, 3-5 fonctionnalités', '5-10 fonctionnalités complexes', 'Solution métier complète'],
                                ['Authentification', 'Email + Social Auth', '+ Rôles et permissions', '+ SSO & Auth personnalisée'],
                                ['Base de données', 'PostgreSQL simple', '+ Cache + Indexation', '+ Clustering & Réplication'],
                                ['API', 'REST API basique', '+ GraphQL', '+ API Gateway & Microservices'],
                                ['Interface utilisateur', 'UI Components standards', 'UI Components personnalisés', 'Design système complet'],
                                ['Temps réel', 'Notifications simples', '+ WebSocket temps réel', '+ Synchronisation complète'],
                                ['Intégrations', '1-2 services externes', '3-5 services externes', 'Intégrations illimitées'],
                                ['Tests', 'Tests unitaires', '+ Tests E2E', '+ Tests de charge & QA'],
                                ['Déploiement', 'Environnement unique', 'Dev/Staging/Prod', '+ Infrastructure HA'],
                                ['Monitoring', 'Logs basiques', '+ APM & Alerting', '+ Dashboard personnalisé'],
                                ['Support & Maintenance', '3 mois inclus', '6 mois inclus', 'SLA personnalisé'],
                                ['Formation', '4h de formation', '8h + documentation', 'Formation sur mesure'],
                                ['Documentation', 'Documentation utilisateur', '+ Documentation technique', '+ Architecture & API']
                            ]
                        },
                        className: 'w-full mt-4'
                    }
                ]} />,
            },
            {
                id: 'typesprojects-4',
                title: 'SEO',
                content: <ContentComponent sections={[
                    {
                        type: 'text',
                        content: 'Optimisation du référencement naturel de votre site web',
                    },
                    {
                        type: 'table',
                        content: {
                            headers: ['Services', 'Basique (800€)', 'Avancé (1500€)', 'Premium (2500€)'],
                            rows: [
                                ['Audit SEO initial', 'Audit basique', 'Audit approfondi', 'Audit complet + Benchmark'],
                                ['Mots-clés', 'Recherche basique', 'Recherche avancée + Long tail', 'Stratégie complète + Saisonnalité'],
                                ['Optimisation on-page', '5 pages principales', '10 pages', 'Site complet'],
                                ['Optimisation technique', 'Basique', 'Avancée', 'Complète + Core Web Vitals'],
                                ['Contenu optimisé', '2 articles/mois', '4 articles/mois', '8 articles/mois'],
                                ['Backlinks', 'Analyse', 'Stratégie + 5 backlinks', 'Stratégie complète + 15 backlinks'],
                                ['Rapports', 'Mensuel', 'Bi-mensuel', 'Hebdomadaire + Dashboards'],
                                ['Support', 'Email', 'Email + Téléphone', 'Support prioritaire'],
                                ['Durée minimale', '3 mois', '6 mois', '12 mois']
                            ]
                        },
                        className: 'w-full mt-4'
                    }
                ]} />,
            },
            {
                id: 'typesprojects-5',
                title: 'Refonte de site',
                content: <ContentComponent sections={[
                    {
                        type: 'text',
                        content: 'Modernisation et optimisation de sites web existants',
                    },
                    {
                        type: 'text',
                        content: 'Étapes de Création',
                        className: 'font-bold'
                    },
                    {
                        type: 'steps',
                        content: [
                            {
                                title: "Découverte",
                                description: "Premier contact et analyse de vos besoins",
                                icon: <Lightbulb className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Proposition",
                                description: "Devis détaillé et planning prévisionnel",
                                icon: <FileText className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Développement",
                                description: "Création de votre projet avec des points réguliers",
                                icon: <Code2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Tests",
                                description: "Vérification approfondie et ajustements",
                                icon: <TestTube2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Livraison",
                                description: "Mise en ligne et formation",
                                icon: <Rocket className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: 'Tarifs',
                        className: 'font-bold'
                    },
                    {
                        type: 'text',
                        content: 'Les tarifs sont flexibles et adaptés à vos besoins. Nous vous proposons des options abordables pour tous les budgets.',
                     
                    },
                    {
                        type: 'table',
                        content: {
                            headers: ['Fonctionnalités', 'Refonte Essentielle (1499€)', 'Refonte Premium (2999€)', 'Sur-Mesure (Sur devis)'],
                            rows: [
                                ['Audit initial', 'Audit de base', 'Audit approfondi', 'Audit complet + Benchmark'],
                                ['Design', 'Design moderne responsive', 'Design premium personnalisé', 'Design sur-mesure illimité'],
                                ['Migration contenu', 'Migration basique', 'Migration + Optimisation', 'Migration complète + Restructuration'],
                                ['SEO', 'Optimisation de base', 'SEO avancé + Stratégie', 'SEO premium + Suivi'],
                                ['Performance', 'Score > 85', 'Score > 90 + Optimisations', 'Score > 95 + CDN'],
                                ['Sécurité', 'SSL + Sécurité de base', 'Protection avancée', 'Sécurité maximale + Audit'],
                                ['Analytics', 'Google Analytics', '+ Rapports personnalisés', '+ Dashboard sur mesure'],
                                ['Formation', '2h incluses', '4h + Documentation', 'Formation complète équipe'],
                                ['Support', '3 mois', '6 mois', '12 mois'],
                                ['Maintenance', 'Trimestrielle', 'Mensuelle', 'Hebdomadaire'],
                                ['Révisions', '2 séries de révisions', '4 séries de révisions', 'Révisions illimitées'],
                                ['Délai', '4-6 semaines', '8-12 semaines', 'Sur mesure']
                            ]
                        },
                        className: 'w-full mt-4'
                    }
                ]} />,
            },
            {
                id: 'typesprojects-6',
                title: 'API',
                content: <ContentComponent sections={[
                    {
                        type: 'text',
                        content: 'Développement d\'APIs robustes et scalables',
                    },
                    {
                        type: 'text',
                        content: 'Étapes de Création',
                        className: 'font-bold'
                    },
                    {
                        type: 'steps',
                        content: [
                            {
                                title: "Découverte",
                                description: "Premier contact et analyse de vos besoins",
                                icon: <Lightbulb className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Proposition",
                                description: "Devis détaillé et planning prévisionnel",
                                icon: <FileText className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Développement",
                                description: "Création de votre projet avec des points réguliers",
                                icon: <Code2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Tests",
                                description: "Vérification approfondie et ajustements",
                                icon: <TestTube2 className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            },
                            {
                                title: "Livraison",
                                description: "Mise en ligne et formation",
                                icon: <Rocket className="w-8 h-8 text-violet-600" />,
                                className: "bg-violet-50"
                            }
                        ]
                    },
                    {
                        type: 'text',
                        content: 'Tarifs',
                        className: 'font-bold'
                    },
                    {
                        type: 'text',
                        content: 'Les tarifs sont flexibles et adaptés à vos besoins. Nous vous proposons des options abordables pour tous les budgets.',
                     
                    },
                    {
                        type: 'table',
                        content: {
                            headers: ['Fonctionnalités', 'API Starter (3900€)', 'API Business (7900€)', 'API Enterprise (Sur devis)'],
                            rows: [
                                ['Endpoints', 'Jusqu\'à 10 endpoints', 'Jusqu\'à 25 endpoints', 'Illimité'],
                                ['Architecture', 'REST API basique', 'REST + GraphQL', 'Architecture sur mesure'],
                                ['Documentation', 'Swagger/OpenAPI basique', 'Documentation interactive', 'Documentation complète + Exemples'],
                                ['Authentification', 'JWT + API Keys', '+ OAuth2', '+ SSO & Auth personnalisée'],
                                ['Rate Limiting', 'Limites basiques', 'Limites personnalisables', 'Sur mesure + Quotas'],
                                ['Monitoring', 'Monitoring basique', '+ Alertes personnalisées', 'Monitoring avancé + Dashboard'],
                                ['Tests', 'Tests unitaires', '+ Tests d\'intégration', '+ Tests de charge'],
                                ['Versioning', 'Gestion basique', 'Gestion avancée', 'Stratégie sur mesure'],
                                ['Cache', 'Cache basique', 'Cache distribué', 'Cache sur mesure + CDN'],
                                ['Support', 'Email (48h)', 'Email + Chat (24h)', 'Support dédié (4h)'],
                                ['Formation', '2h incluses', '4h + Documentation', 'Formation complète équipe'],
                                ['Maintenance', '3 mois inclus', '6 mois inclus', '12 mois inclus']
                            ]
                        },
                        className: 'w-full mt-4'
                    }
                ]} />
            },
        ]
    },
    {
        id: 'dealpricing',
        title: 'Offres & Tarifications',
        items: [
            {
                id: 'dealpricing-1',
                title: 'Prix de développement',
                content: 'Les prix sont flexibles et adaptés à vos besoins. Nous vous proposons des options abordables pour tous les budgets.'
            },
            {
                id: 'dealpricing-2',
                title: 'Formule de maintenance',
                content: 'Les prix sont flexibles et adaptés à vos besoins. Nous vous proposons des options abordables pour tous les budgets.'
            },
            
            
            
        ]
    },
    {
        id: 'focusCRM',
        title: 'Guide de l\'utilisation du CRM',
        items: [
            
        ]
    }
    
]; 