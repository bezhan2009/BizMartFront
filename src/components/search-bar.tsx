"use client";

import { useState, useTransition, useCallback, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { smartSearchSuggestions } from '@/ai/flows/smart-search-assistant';
import { naturalLanguageSearch } from '@/ai/flows/natural-language-search';
import { Button } from './ui/button';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', refinedQuery: '', categories: [] as string[] });
  
  const [isSuggestionsPending, startSuggestionsTransition] = useTransition();
  const [isSearchPending, startSearchTransition] = useTransition();

  const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise(resolve => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
      });
  };

  const fetchSuggestions = async (currentQuery: string) => {
    if (currentQuery.length > 2) {
      startSuggestionsTransition(async () => {
        try {
          const result = await smartSearchSuggestions({ query: currentQuery });
          setSuggestions(result.suggestions);
          if (result.suggestions.length > 0) {
            setPopoverOpen(true);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      });
    } else {
      setSuggestions([]);
      setPopoverOpen(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedFetchSuggestions(newQuery);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setPopoverOpen(false);
    handleSubmit(suggestion);
  };
  
  const handleSubmit = async (searchQuery: string) => {
    if (searchQuery.trim().length === 0) return;
    
    startSearchTransition(async () => {
        try {
            const result = await naturalLanguageSearch({ query: searchQuery });
            setDialogContent({
                title: `Search results for "${searchQuery}"`,
                refinedQuery: result.refinedQuery,
                categories: result.categorySuggestions,
            });
            setDialogOpen(true);
        } catch (error) {
            console.error("Error with natural language search:", error);
            setDialogContent({
                title: "Error",
                refinedQuery: "Could not process your search. Please try again.",
                categories: []
            });
            setDialogOpen(true);
        }
    });
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(query);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <form onSubmit={onFormSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for services like 'logo design'..."
              className="w-full pl-10 pr-4 py-2"
              value={query}
              onChange={handleInputChange}
              onFocus={() => query.length > 2 && suggestions.length > 0 && setPopoverOpen(true)}
            />
             {(isSuggestionsPending || isSearchPending) && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
            )}
          </form>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <div className="flex flex-col gap-1 p-2">
            {suggestions.map((s, i) => (
              <Button
                key={i}
                variant="ghost"
                className="justify-start"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
            <AlertDialogDescription className="pt-4">
              <p className="font-semibold">Refined Query:</p>
              <p className="mb-4">{dialogContent.refinedQuery}</p>
              {dialogContent.categories.length > 0 && (
                <>
                  <p className="font-semibold">Suggested Categories:</p>
                  <ul className="list-disc pl-5">
                    {dialogContent.categories.map((cat, i) => <li key={i}>{cat}</li>)}
                  </ul>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
