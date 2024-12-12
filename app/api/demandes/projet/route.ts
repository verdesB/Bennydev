
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { generateProjectCode } from '@/app/utils/generateCode';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const projectCode = generateProjectCode();

    // Création du contenu Markdown
    const markdownContent = `
# Demande de Projet - ${formData.company || 'Non spécifié'}

## Informations Générales
- **Date de la demande**: ${new Date().toLocaleDateString('fr-FR')}
- **Code Projet**: ${projectCode}
- **Entreprise**: ${formData.company || 'Non spécifié'}
- **Secteur d'activité**: ${formData.businessSector || 'Non spécifié'}

## Contact
- **Nom**: ${formData.contact?.name || 'Non spécifié'}
- **Email**: ${formData.contact?.email || 'Non spécifié'}
- **Mode de contact préféré**: ${formData.contact?.preferredContact || 'Email'}

## Détails du Projet
- **Type de projet**: ${formData.projectType || 'Non spécifié'}
${formData.website_details ? `
### Détails Website
- **Fonctionnalités souhaitées**: ${Object.keys(formData.website_details.features)
  .filter(key => formData.website_details?.features[key])
  .join(', ')}
` : ''}

## Budget et Planning
${formData.budget ? `- **Budget**: ${formData.budget}` : ''}
${formData.timeline ? `- **Timeline**: ${formData.timeline}` : ''}

## Notes Additionnelles
${formData.additionalNotes || 'Aucune note additionnelle'}
    `;

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