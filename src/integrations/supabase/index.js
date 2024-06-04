import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Types for Supabase Tables
 * 
 * Table: users
 * Columns:
 * - id: uuid
 * - username: text
 * - email: text
 * - created_at: timestamp
 * 
 * Table: posts
 * Columns:
 * - id: uuid
 * - user_id: uuid
 * - title: text
 * - content: text
 * - created_at: timestamp
 * 
 * Table: comments
 * Columns:
 * - id: uuid
 * - post_id: uuid
 * - user_id: uuid
 * - content: text
 * - created_at: timestamp
 */

import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

export const SupabaseProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

// Hook for fetching data from a table
export const useFetchTable = (table, options) => {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select('*');
      if (error) throw new Error(error.message);
      return data;
    },
    ...options,
  });
};

// Hook for inserting data into a table
export const useInsertIntoTable = (table) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newData) => {
      const { data, error } = await supabase.from(table).insert(newData);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([table]);
      },
    }
  );
};

// Hook for updating data in a table
export const useUpdateTable = (table) => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, newData }) => {
      const { data, error } = await supabase.from(table).update(newData).eq('id', id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([table]);
      },
    }
  );
};

// Hook for deleting data from a table
export const useDeleteFromTable = (table) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      const { data, error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([table]);
      },
    }
  );
};