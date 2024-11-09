import { NextResponse } from 'next/server';
import { togetherClient, getSystemMessage } from '@/app/lib/together';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

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

    return NextResponse.json({
      choices: [{
        message: {
          role: 'assistant',
          content: response.choices[0].message.content
        }
      }]
    });

  } catch (error) {
    console.error('Erreur détaillée:', error);
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors du traitement de votre demande',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 