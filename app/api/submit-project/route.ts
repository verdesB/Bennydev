import { projectFormSchema } from '../../validations/projectSchemas';
import { ProjectSummaryService } from '../../services/ProjectSummaryService';
import { generateProjectCode } from '../../utils/generateCode';

export async function POST(request: Request) {
  try {
    // 1. Récupération et validation des données
    const rawData = await request.json();
    console.log('Données reçues:', rawData); // Debug

    // 2. Validation avec Zod
    const validationResult = projectFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      console.log('Erreurs de validation:', validationResult.error.errors);
      return Response.json({ 
        success: false, 
        error: 'Données invalides',
        validationErrors: validationResult.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { 
        status: 400 
      });
    }

    // 3. Utilisation des données validées
    const formData = validationResult.data;
    const projectCode = generateProjectCode();
    
    const summaryService = new ProjectSummaryService();
    await summaryService.generateProjectSummary(rawData, projectCode);

    return Response.json({ 
      success: true, 
      projectCode 
    });

  } catch (error) {
    console.error('Erreur complète:', error);
    return Response.json({ 
      success: false, 
      error: 'Erreur lors de la création du projet',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { 
      status: 500 
    });
  }
} 