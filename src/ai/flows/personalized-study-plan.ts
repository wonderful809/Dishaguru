'use server';

/**
 * @fileOverview Personalized study plan generator flow.
 *
 * This file defines a Genkit flow that takes a career suggestion and generates a personalized study plan
 * including relevant courses, Indian universities, and study strategies.
 *
 * @interface PersonalizedStudyPlanInput - Defines the input schema for the flow.
 * @interface PersonalizedStudyPlanOutput - Defines the output schema for the flow.
 * @function generatePersonalizedStudyPlan - The exported function to trigger the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedStudyPlanInputSchema = z.object({
  careerSuggestion: z
    .string()
    .describe('The suggested career path for the student.'),
  studentInterests: z
    .string()
    .describe('The interests of the student to create relevant study plan.'),
  academicBackground: z
    .string()
    .describe('The academic background of the student.'),
});
export type PersonalizedStudyPlanInput = z.infer<typeof PersonalizedStudyPlanInputSchema>;

const PersonalizedStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('A personalized study plan for the student.'),
});
export type PersonalizedStudyPlanOutput = z.infer<typeof PersonalizedStudyPlanOutputSchema>;

export async function generatePersonalizedStudyPlan(
  input: PersonalizedStudyPlanInput
): Promise<PersonalizedStudyPlanOutput> {
  return personalizedStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedStudyPlanPrompt',
  input: {schema: PersonalizedStudyPlanInputSchema},
  output: {schema: PersonalizedStudyPlanOutputSchema},
  prompt: `You are an expert career counselor specializing in creating personalized study plans for Indian students. 

  Based on the career suggestion, student's interests and academic background, generate a study plan that includes: 
  - Relevant courses 
  - Indian universities offering these courses 
  - Tailored study strategies

Career Suggestion: {{{careerSuggestion}}}
Student Interests: {{{studentInterests}}}
Academic Background: {{{academicBackground}}}

Study Plan:
`, 
});

const personalizedStudyPlanFlow = ai.defineFlow(
  {
    name: 'personalizedStudyPlanFlow',
    inputSchema: PersonalizedStudyPlanInputSchema,
    outputSchema: PersonalizedStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
