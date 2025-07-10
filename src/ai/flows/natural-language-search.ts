'use server';

/**
 * @fileOverview A natural language search AI agent.
 *
 * - naturalLanguageSearch - A function that handles the natural language search process.
 * - NaturalLanguageSearchInput - The input type for the naturalLanguageSearch function.
 * - NaturalLanguageSearchOutput - The return type for the naturalLanguageSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NaturalLanguageSearchInputSchema = z.object({
  query: z.string().describe('The natural language search query.'),
});
export type NaturalLanguageSearchInput = z.infer<typeof NaturalLanguageSearchInputSchema>;

const NaturalLanguageSearchOutputSchema = z.object({
  refinedQuery: z.string().describe('The refined search query.'),
  categorySuggestions: z.array(z.string()).describe('Suggested categories for the search.'),
});
export type NaturalLanguageSearchOutput = z.infer<typeof NaturalLanguageSearchOutputSchema>;

export async function naturalLanguageSearch(input: NaturalLanguageSearchInput): Promise<NaturalLanguageSearchOutput> {
  return naturalLanguageSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'naturalLanguageSearchPrompt',
  input: {schema: NaturalLanguageSearchInputSchema},
  output: {schema: NaturalLanguageSearchOutputSchema},
  prompt: `You are a search assistant that helps users find services.

The user will provide a natural language query, and you will refine it into a search query and suggest categories to search in.

Query: {{{query}}}

Refined Query:  Based on the user's query, refine it to be a better query that can be used to search for the service.

Category Suggestions: Suggest a few categories that the user can search in.
`,
});

const naturalLanguageSearchFlow = ai.defineFlow(
  {
    name: 'naturalLanguageSearchFlow',
    inputSchema: NaturalLanguageSearchInputSchema,
    outputSchema: NaturalLanguageSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
