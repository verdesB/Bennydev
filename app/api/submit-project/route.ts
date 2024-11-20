import { ProjectSummaryService } from '../../services/ProjectSummaryService';
import { generateProjectCode } from '../../utils/generateCode';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const projectCode = generateProjectCode();
    
    const summaryService = new ProjectSummaryService();
    await summaryService.generateProjectSummary(formData, projectCode);

    return Response.json({ 
      success: true, 
      projectCode 
    });

  } catch (error) {
    console.error('Erreur:', error);
    return Response.json({ 
      success: false, 
      error: 'Erreur lors de la création du projet' 
    }, { 
      status: 500 
    });
  }
} 