'use server';

import {
  careerSuggestionChatbot,
  type CareerSuggestionInput,
  type CareerSuggestionOutput,
} from '@/ai/flows/career-suggestion-chatbot';
import { z } from 'zod';

const schema = z.object({
  interests: z.string().min(10, 'Please describe your interests in more detail.'),
  academicBackground: z.string().min(10, 'Please describe your academic background in more detail.'),
});

export async function getCareerSuggestion(
  prevState: any,
  formData: FormData
): Promise<{
  message: string;
  data: CareerSuggestionOutput | null;
  issues: string[] | null;
}> {
  const validatedFields = schema.safeParse({
    interests: formData.get('interests'),
    academicBackground: formData.get('academicBackground'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please check your inputs.',
      data: null,
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const input: CareerSuggestionInput = {
      interests: validatedFields.data.interests,
      academicBackground: validatedFields.data.academicBackground,
    };
    const result = await careerSuggestionChatbot(input);
    return {
      message: 'Success',
      data: result,
      issues: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while getting suggestions. Please try again.',
      data: null,
      issues: ['An unexpected error occurred.'],
    };
  }
}
