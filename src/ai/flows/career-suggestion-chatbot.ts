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
  interests: z
    .string()
    .describe('The student\'s interests and hobbies.'),
  academicBackground: z
    .string()
    .describe(
      'The student\'s academic background, including subjects studied and grades obtained.'
    ),
  jobMarketTrends: z
    .string()
    .optional()
    .describe('Optional: Current job market trends in India.'),
});
export type CareerSuggestionInput = z.infer<typeof CareerSuggestionInputSchema>;

const CareerSuggestionOutputSchema = z.object({
  suggestedCareers: z
    .string()
    .describe('A list of suggested career paths for the student.'),
  studyPlanRecommendations: z
    .string()
    .describe(
      'Recommended courses, universities, and study plans tailored to the suggested career paths.'
    ),
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
  prompt: `You are a career guidance mentor for Indian students. Based on the student's interests, academic background, and current job market trends in India, suggest potential career paths and study plans.

  Interests: {{{interests}}}
  Academic Background: {{{academicBackground}}}
  Job Market Trends (Optional): {{{jobMarketTrends}}}

  Provide a detailed list of suggested career paths and corresponding study plan recommendations tailored for Indian students.`,
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
