import { careerSuggestionChatbot } from '@/ai/flows/career-suggestion-chatbot';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const history = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      content: m.content,
    }));
    
    // Add an initial message if the history is empty
    if (history.length === 0) {
      history.unshift({ role: 'model', content: "Hi! I'm Disha Guru, your AI career mentor. To get started, tell me a bit about your interests and hobbies."});
    }

    const result = await careerSuggestionChatbot({ history });

    return NextResponse.json(result);
  } catch (e: any) {
    console.error(e);
    return new NextResponse(e.message || 'Error processing request', { status: 500 });
  }
}
