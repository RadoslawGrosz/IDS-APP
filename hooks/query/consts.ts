export interface AdditionalQueryOptions<T> {
  onSuccess?: ((data: T) => void) | undefined;
  onError?: ((err: unknown) => void) | undefined;
  enabled?: boolean;
}
