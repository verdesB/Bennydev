import { NextResponse } from 'next/server';
import { togetherClient } from '@/app/lib/together';
import { siteConfig } from '@/app/lib/site-config';
import { getSystemMessage } from '@/app/lib/getSystemMessage';
import type { Context } from "../../lib/types";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const context: Context = {
      companyInfo: siteConfig.companyInfo,
      expertise: siteConfig.expertise,
      services: siteConfig.services,
      processus: siteConfig.processus,
      garanties: siteConfig.garanties,
      valeurs: siteConfig.valeurs
    };

    // Envoyer la requête à l'IA Together avec le contexte
    const response = await togetherClient.chat.completions.create({
      messages: [
        getSystemMessage(),
        ...messages
      ],
      model: "meta-llama/Llama-Vision-Free",
      max_tokens: 2000,
      temperature: 0.7,
      top_p: 0.9,
      top_k: 50,
      repetition_penalty: 1,
      stream: false
    });

    console.log('Response from Together:', response);

    if (!response.choices?.[0]?.message?.content) {
      console.error('Empty response from Together API');
      throw new Error('Empty response from API');
    }

    // Enrichir la réponse avec des informations pertinentes de siteConfig
    const enrichedResponse = await enrichResponseWithSiteData(response.choices[0].message.content, context);

    return NextResponse.json({
      choices: [{
        message: {
          role: 'assistant',
          content: enrichedResponse
        }
      }]
    });

  } catch (error) {
    console.error('Erreur détaillée:', error);
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors du traitement de votre demande',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function enrichResponseWithSiteData(response: string, context: Context) {
  // Analyser la réponse et trouver des éléments à enrichir à l'aide de siteConfig
  let enrichedResponse = response;

  // Par exemple, si la réponse mentionne les services, ajouter plus de détails
  if (response.includes('services')) {
    const servicesInfo = Object.values(context.services).map((service: unknown) => {
      const typedService = service as { title: string, description: string };
      return `- ${typedService.title}: ${typedService.description}`;
    }).join('\n');
    enrichedResponse += `\n\nVoici plus de détails sur nos services :\n${servicesInfo}`;
  }

  // Ajouter d'autres enrichissements en fonction de la réponse
  // ...

  return enrichedResponse;
}