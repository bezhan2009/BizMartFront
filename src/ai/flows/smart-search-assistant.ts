// 'use server';
/**
 * @fileOverview This file implements the smart search assistant flow.
 *
 * - smartSearchSuggestions - A function that suggests search terms as the user types.
 * - SmartSearchSuggestionsInput - The input type for the smartSearchSuggestions function.
 * - SmartSearchSuggestionsOutput - The return type for the smartSearchSuggestions function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSearchSuggestionsInputSchema = z.object({
  query: z.string().describe('The current search query.'),
});
export type SmartSearchSuggestionsInput = z.infer<
  typeof SmartSearchSuggestionsInputSchema
>;

const SmartSearchSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of search suggestions.'),
});
export type SmartSearchSuggestionsOutput = z.infer<
  typeof SmartSearchSuggestionsOutputSchema
>;

export async function smartSearchSuggestions(
  input: SmartSearchSuggestionsInput
): Promise<SmartSearchSuggestionsOutput> {
  return smartSearchSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSearchSuggestionsPrompt',
  input: {schema: SmartSearchSuggestionsInputSchema},
  output: {schema: SmartSearchSuggestionsOutputSchema},
  prompt: `You are a search assistant that provides search suggestions based on the user's current query.

Current query: {{{query}}}

Provide a list of search suggestions that are relevant to the query. Return as a JSON array of strings.
Ensure the output is a valid JSON array.`,
});

const smartSearchSuggestionsFlow = ai.defineFlow(
  {
    name: 'smartSearchSuggestionsFlow',
    inputSchema: SmartSearchSuggestionsInputSchema,
    outputSchema: SmartSearchSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
