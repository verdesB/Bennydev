import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { generateProjectCode } from '@/app/utils/generateCode';

export async function POST(request: Request) {
  try {
    // Récupérer les headers et vérifier le CSRF token
    const headersList = await headers();
    const csrfToken = headersList.get('X-CSRF-Token');

    if (!csrfToken) {
      return NextResponse.json(
        { error: 'Token CSRF manquant' },
        { status: 403 }
      );
    }

    const { captchaToken, ...formData } = await request.json();

    // Vérifier le captcha
    if (!captchaToken) {
      return NextResponse.json(
        { error: 'Token Captcha manquant' },
        { status: 400 }
      );
    }

    // Vérification du captcha avec l'API Google
    const captchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${captchaToken}`,
      { method: 'POST' }
    );

    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return NextResponse.json(
        { error: 'Validation captcha échouée' },
        { status: 400 }
      );
    }

    const projectCode = generateProjectCode();

  

    // Création du contenu Markdown en fonction du type de projet
    const markdownContent = `
# ${formData.company || 'Non spécifié'}

## 📋 Informations Générales
- **Date de la demande**: ${new Date().toLocaleDateString('fr-FR')}
- **Code Projet**: ${projectCode}
- **Entreprise**: ${formData.company || 'Non spécifié'}
- **Secteur d'activité**: ${formData.businessSector || 'Non spécifié'}

## 👤 Contact
- **Nom**: ${formData.contact?.name || 'Non spécifié'}
- **Email**: ${formData.contact?.email || 'Non spécifié'}
- **Téléphone**: ${formData.contact?.phone || 'Non spécifié'}
- **Mode de contact préféré**: ${formData.contact?.preferredContact || 'Email'}

## 🎯 Détails du Projet
- **Type de projet**: ${formData.projectType || 'Non spécifié'}

${formData.projectType === 'website' ? `### 🌐 Détails Website
- **Titre du projet**: ${formData.website_details?.title || 'Non spécifié'}
- **Description**: ${formData.website_details?.description || 'Non spécifié'}

**Pages prévues**:
${formData.website_details?.pages?.map((page: string) => `- ${page}`).join('\n') || '- Non spécifié'}

**Fonctionnalités souhaitées**:
${formData.website_details?.features?.map((feature: string) => `- ${feature}`).join('\n') || '- Non spécifié'}

**Design**:
- **Dispose déjà d'un design**: ${formData.website_details?.hasDesign ? 'Oui' : 'Non'}
- **URL du design**: ${formData.website_details?.hasDesign ? formData.website_details.designUrl || 'Non spécifié' : 'N/A'}

**Intégrations souhaitées**:
${formData.website_details?.integrations?.map((integration: string) => `- ${integration}`).join('\n') || '- Non spécifié'}

**Besoins spécifiques**:
${formData.website_details?.specificNeeds?.map((need: string) => `- ${need}`).join('\n') || '- Non spécifié'}
` : ''}

${formData.projectType === 'application' ? `### 📱 Détails Application
- **Titre**: ${formData.app_details?.title || 'Non spécifié'}
- **Description**: ${formData.app_details?.description || 'Non spécifié'}
- **Plateformes ciblées**: ${Object.keys(formData.app_details?.platforms || {})
    .filter(key => formData.app_details?.platforms[key])
    .join(', ') || 'Non spécifié'}

**Fonctionnalités principales**:
${formData.app_details?.keyFeatures?.map((feature: string) => `- ${feature}`).join('\n') || '- Non spécifié'}

**Technologies préférées**:
${formData.app_details?.preferredTech?.map((tech: string) => `- ${tech}`).join('\n') || '- Non spécifié'}

**Intégrations requises**:
${formData.app_details?.requiredIntegrations?.map((integration: string) => `- ${integration}`).join('\n') || '- Non spécifié'}

**Besoins spécifiques**:
${formData.app_details?.specificNeeds?.map((need: string) => `- ${need}`).join('\n') || '- Non spécifié'}
` : ''}

${formData.projectType === 'ecommerce' ? `### 🛍️ Détails E-commerce
- **Titre**: ${formData.ecommerce_details?.title || 'Non spécifié'}
- **Description**: ${formData.ecommerce_details?.description || 'Non spécifié'}
- **Type de produits**: ${formData.ecommerce_details?.productType || 'Non spécifié'}
- **Nombre de produits**: ${formData.ecommerce_details?.productCount || 'Non spécifié'}
- **Gestion des stocks**: ${formData.ecommerce_details?.hasInventory ? 'Oui' : 'Non'}

**Régions de livraison**:
${formData.ecommerce_details?.shippingRegions?.map((region: string) => `- ${region}`).join('\n') || '- Non spécifié'}

**Méthodes de paiement**:
${formData.ecommerce_details?.paymentMethods?.map((method: string) => `- ${method}`).join('\n') || '- Non spécifié'}

**Fonctionnalités**:
${formData.ecommerce_details?.features?.map((feature: string) => `- ${feature}`).join('\n') || '- Non spécifié'}

**Intégrations souhaitées**:
${formData.ecommerce_details?.integrations?.map((integration: string) => `- ${integration}`).join('\n') || '- Non spécifié'}

**Besoins spécifiques**:
${formData.ecommerce_details?.specificNeeds?.map((need: string) => `- ${need}`).join('\n') || '- Non spécifié'}
` : ''}

${formData.projectType === 'webapp' ? `### 💻 Détails WebApp
- **Type d'application**: ${formData.webapp?.appType || 'Non spécifié'}
- **Nombre d'utilisateurs prévus**: ${formData.webapp?.userCount || 'Non spécifié'}
- **Niveau d'accès**: ${formData.webapp?.accessLevel || 'Non spécifié'}

**Fonctionnalités principales**:
${formData.webapp?.keyFeatures?.map((feature: string) => `- ${feature}`).join('\n') || '- Non spécifié'}

**Besoins techniques**:
${formData.webapp?.technicalNeeds?.map((need: string) => `- ${need}`).join('\n') || '- Non spécifié'}

**Intégrations requises**:
${formData.webapp?.integrations?.map((integration: string) => `- ${integration}`).join('\n') || '- Non spécifié'}

**Site web vitrine nécessaire**: ${formData.website === 'yes' ? 'Oui' : 'Non'}
` : ''}

${formData.projectType === 'api' ? `### 🔌 Détails API
- **Titre**: ${formData.api_details?.title || 'Non spécifié'}
- **Description**: ${formData.api_details?.description || 'Non spécifié'}
- **Type d'API**: ${formData.api_details?.apiType || 'Non spécifié'}
- **Trafic attendu**: ${formData.api_details?.expectedTraffic || 'Non spécifié'}

**Endpoints prévus**:
${formData.api_details?.endpoints?.length > 0 
  ? formData.api_details.endpoints.map((endpoint: string) => `- ${endpoint}`).join('\n') 
  : '- Non spécifié'}

**Fonctionnalités**:
${Object.entries(formData.api_details?.features || {})
  .filter(([_, value]) => value === true)
  .map(([key]) => `- ${key}`)
  .join('\n') || '- Non spécifié'}

**Site web vitrine nécessaire**: ${formData.website === 'yes' ? 'Oui' : 'Non'}
` : ''}

${formData.projectType === 'redesign' ? `### 🎨 Détails Redesign
- **Titre**: ${formData.redesign_details?.title || 'Non spécifié'}
- **Description**: ${formData.redesign_details?.description || 'Non spécifié'}
- **URL actuelle**: ${formData.redesign_details?.currentUrl || 'Non spécifié'}
- **Guide de marque disponible**: ${formData.redesign_details?.brandGuidelines ? 'Oui' : 'Non'}

**Points d'amélioration souhaités**:
${Object.entries(formData.redesign_details?.improvements || {})
  .filter(([_, value]) => value === true)
  .map(([key]) => `- ${key}`)
  .join('\n') || '- Non spécifié'}

**Points problématiques actuels**:
${formData.redesign_details?.painPoints?.map((point: string) => `- ${point}`).join('\n') || '- Non spécifié'}

**Fonctionnalités désirées**:
${formData.redesign_details?.desiredFeatures?.map((feature: string) => `- ${feature}`).join('\n') || '- Non spécifié'}

**Site web vitrine nécessaire**: ${formData.website === 'yes' ? 'Oui' : 'Non'}
` : ''}

${formData.projectType === 'seo' ? `### 🔍 Détails SEO
- **Titre**: ${formData.seo_details?.title || 'Non spécifié'}
- **Description**: ${formData.seo_details?.description || 'Non spécifié'}
- **URL du site**: ${formData.seo_details?.websiteUrl || 'Non spécifié'}
- **Marché cible**: ${formData.seo_details?.targetMarket || 'Non spécifié'}
- **Objectifs**: ${formData.seo_details?.objectives || 'Non spécifié'}

**Mots-clés ciblés**:
${formData.seo_details?.keywords?.map((keyword: string) => `- ${keyword}`).join('\n') || '- Non spécifié'}

**Concurrents principaux**:
${formData.seo_details?.competitors?.map((competitor: string) => `- ${competitor}`).join('\n') || '- Non spécifié'}

**Services requis**:
${Object.entries(formData.seo_details?.services || {})
  .filter(([_, value]) => value === true)
  .map(([key]) => `- ${key}`)
  .join('\n') || '- Non spécifié'}

**Site web vitrine nécessaire**: ${formData.website === 'yes' ? 'Oui' : 'Non'}
` : ''}

## 💰 Budget et Planning 
- **Budget**: ${formData.budget ? `${formData.budget}€` : 'Non spécifié'}
- **Délai souhaité**: ${formData.deadline || 'Non spécifié'}

## 📝 Notes Additionnelles
${formData.contact?.comments || 'Aucune note additionnelle'}`;

    // Sauvegarde dans le bucket Supabase
    const fileName = `${projectCode}.md`;
    const { error: uploadError } = await supabaseAdmin
      .storage
      .from('bennydev.projets')
      .upload(fileName, markdownContent, {
        contentType: 'text/markdown',
        upsert: false
      });

    if (uploadError) {
      console.error('Erreur upload:', uploadError);
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde du fichier' },
        { status: 500 }
      );
    }

    // Obtenir l'URL publique du fichier
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('bennydev.projets')
      .getPublicUrl(fileName);

    // Réponse avec succès
    return NextResponse.json({
      success: true,
      projectCode,
      fileUrl: publicUrl
    });

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors du traitement de la demande',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
} 