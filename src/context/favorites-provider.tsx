"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FavoritesContextType {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('bizmart-favorites');
      if (storedFavorites) {
        setFavoriteIds(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Could not read favorites from localStorage", error);
    }
  }, []);

  const updateLocalStorage = (ids: string[]) => {
    try {
      localStorage.setItem('bizmart-favorites', JSON.stringify(ids));
    } catch (error) {
      console.error("Could not save favorites to localStorage", error);
    }
  };

  const addFavorite = (id: string) => {
    setFavoriteIds((prevIds) => {
      const newIds = [...prevIds, id];
      updateLocalStorage(newIds);
      toast({ title: 'Added to favorites!' });
      return newIds;
    });
  };

  const removeFavorite = (id: string) => {
    setFavoriteIds((prevIds) => {
      const newIds = prevIds.filter((favId) => favId !== id);
      updateLocalStorage(newIds);
      toast({ title: 'Removed from favorites' });
      return newIds;
    });
  };

  const isFavorite = (id: string) => {
    return favoriteIds.includes(id);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
