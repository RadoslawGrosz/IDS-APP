import { useMutation } from "react-query";

interface MutationOverrides {
  onSuccessOverride?: (data: Response) => any;
  onSettledOverride?: () => any;
  onErrorOverride?: (error: any) => any;
  hideSuccessSnackbar?: boolean;
}

export const useCustomMutation = <T>(
  mutationFunction: (data: T) => Promise<any>,
  mutationOverrides: MutationOverrides = {}
) => {
  const {
    onSuccessOverride,
    onSettledOverride,
    onErrorOverride,
    hideSuccessSnackbar,
  } = mutationOverrides;

  const showSuccessSnackbar = () => {
    // enqueueSnackbar(t('Success'), {
    //   variant: 'success'
    // });
  };

  const showErrorSnackbar = () => {
    // enqueueSnackbar(t('UnknownErrorOccurred'), {
    //   variant: 'error'
    // });
  };

  return useMutation<Response, unknown, T>(mutationFunction, {
    onSuccess: (data: Response) => {
      onSuccessOverride?.(data);
      if (!hideSuccessSnackbar) showSuccessSnackbar();
    },
    onSettled: () => onSettledOverride?.(),
    onError: (error) => {
      if (onErrorOverride) return onErrorOverride(error);
      showErrorSnackbar();
    },
  });
};
