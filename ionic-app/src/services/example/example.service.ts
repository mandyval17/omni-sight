import { useCustomMutation, useCustomQuery } from '@/hooks/tanstack/useCustomQuery';
import ExampleAPI from '@/services/example/example.api';
import { useQueryClient } from '@tanstack/react-query';

export default class ExampleService {
  static useGetExamplesQuery() {
    return useCustomQuery({
      queryKey: ['examples'],
      queryFn: ExampleAPI.getAll,
      retry: 1,
      staleTime: 30_000, // 30 seconds
    });
  }

  static useCreateExampleMutation() {
    const queryClient = useQueryClient();

    return useCustomMutation({
      mutationFn: ExampleAPI.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['examples'] });
      },
    });
  }
}
