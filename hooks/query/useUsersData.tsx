import { fetchUsers } from '@/api/Users';
import { UserDto } from '@/types';
import { useQuery } from 'react-query';
import { AdditionalQueryOptions } from './consts';

export default function useUsersData({ onSuccess, onError, enabled = true }: AdditionalQueryOptions<UserDto[]> = {}) {
  return useQuery<UserDto[]>('operatorUsers', fetchUsers, {
    onSuccess,
    onError,
    enabled
  });
}
