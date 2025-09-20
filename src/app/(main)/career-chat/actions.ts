'use server';

import {
  careerSuggestionChatbot,
  type CareerSuggestionInput,
} from '@/ai/flows/career-suggestion-chatbot';

export async function getCareerSuggestion(
  input: CareerSuggestionInput
) {
  try {
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
