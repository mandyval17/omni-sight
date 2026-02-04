import type { CustomError } from '@/types/api.model';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export type CustomQueryOptions<TData> = Omit<UseQueryOptions<TData, CustomError, TData>, 'queryFn'> & {
  queryFn: () => Promise<TData>;
};

export function useCustomQuery<TData>(
  options: CustomQueryOptions<TData>
): UseQueryResult<TData, CustomError> {
  return useQuery<TData, CustomError, TData>({
    refetchOnWindowFocus: false,
    ...options,
  });
}

export function useCustomMutation<TData, TError = CustomError, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    ...options,
  });
}
