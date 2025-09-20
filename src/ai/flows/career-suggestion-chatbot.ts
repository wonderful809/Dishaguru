'use server';

/**
 * @fileOverview This file defines a Genkit flow for a career suggestion chatbot tailored for Indian students.
 *
 * The chatbot takes into account the student's interests, academic background, and the Indian job market to suggest potential career paths.
 *
 * @exports `careerSuggestionChatbot` - An async function that takes `CareerSuggestionInput` and returns a `CareerSuggestionOutput`.
 * @exports `CareerSuggestionInput` - The input type for the career suggestion chatbot.
 * @exports `CareerSuggestionOutput` - The output type for the career suggestion chatbot.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerSuggestionInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The conversation history.'),
});
export type CareerSuggestionInput = z.infer<typeof CareerSuggestionInputSchema>;

const CareerSuggestionOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type CareerSuggestionOutput = z.infer<typeof CareerSuggestionOutputSchema>;

export async function careerSuggestionChatbot(
  input: CareerSuggestionInput
): Promise<CareerSuggestionOutput> {
  return careerSuggestionChatbotFlow(input);
}

const careerSuggestionPrompt = ai.definePrompt({
  name: 'careerSuggestionPrompt',
  input: {schema: CareerSuggestionInputSchema},
  output: {schema: CareerSuggestionOutputSchema},
  prompt: `You are a friendly and encouraging career guidance mentor for Indian students. Your name is Disha Guru.
  
  Your goal is to have a conversation with the student to understand their interests and academic background. 
  
  1.  First, introduce yourself and ask about their interests and hobbies.
  2.  Once they respond, ask about their academic background (subjects, grades, etc.).
  3.  After you have both pieces of information, provide a detailed list of suggested career paths and corresponding study plan recommendations. Tailor your suggestions to the Indian job market.
  4.  Keep your responses concise and conversational. Use emojis where appropriate.
  
  Here is the conversation history:
  {{#each history}}
  - {{role}}: {{content}}
  {{/each}}
  `,
});

const careerSuggestionChatbotFlow = ai.defineFlow(
  {
    name: 'careerSuggestionChatbotFlow',
    inputSchema: CareerSuggestionInputSchema,
    outputSchema: CareerSuggestionOutputSchema,
  },
  async input => {
    const {output} = await careerSuggestionPrompt(input);
    return output!;
  }
);
