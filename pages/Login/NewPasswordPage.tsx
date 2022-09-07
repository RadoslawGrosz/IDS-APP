import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '@/hooks/useAuth';
import { setNewPassword } from '@/api/Users';
import { PasswordValidationRegex } from '@/consts';

interface NewPassword {
  password: string;
  confirmPassword: string;
}

const NewPasswordPage = () => {
  const { user, login, logout, sessionId } = useAuth();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [oldPassword, setOldPassword] = useState<string | null>(null);

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('@validation.Required')
      .matches(PasswordValidationRegex, '@validation.InvalidPassword')
      .notOneOf([oldPassword], '@validation.PasswordUsedBefore'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], '@validation.MatchPasswords')
  });

  const { handleSubmit, formState, control, trigger } = useForm<NewPassword>({
    resolver: yupResolver(schema)
  });

  // trigger form validation if old password was provided
  useEffect(() => {
    if (!oldPassword) return;
    trigger();
  }, [oldPassword]);

  const handleSetPassword = handleSubmit(async data => {
    const changePasswordData = {
      email: user.email,
      sessionId,
      newPassword: data.password
    };

    try {
      await setNewPassword(changePasswordData);
      await login(user.email, data.password);
      enqueueSnackbar(t('newPassword.success'), {
        variant: 'success'
      });
    } catch (error) {
      if (error.response.data.errorCode === 'PASSWORD_USED_BEFORE') return setOldPassword(data.password);

      logout();
      enqueueSnackbar(t('newPassword.error'), {
        variant: 'error'
      });
    }
  });

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(244, 245, 247)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Box className='flexSpaceBetween' mb={3}>
            <div>
              <Typography variant='h4' gutterBottom>
                {t('newPassword.header')}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {t('newPassword.subheader')}
              </Typography>
            </div>
          </Box>
          <Box flexGrow={1} mt={6} width={600}>
            <form onSubmit={handleSetPassword}>
              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='password'
                    label={t('Password')}
                    error={Boolean(error)}
                    value={field.value}
                    onChange={field.onChange}
                    helperText={error?.message && t(error.message)}
                    sx={{ mb: 3 }}
                  />
                )}
              />
              <Controller
                name='confirmPassword'
                control={control}
                defaultValue=''
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='password'
                    label={t('ConfirmPassword')}
                    error={Boolean(error)}
                    value={field.value}
                    onChange={field.onChange}
                    helperText={error?.message && t(error.message)}
                    sx={{ mb: 3 }}
                  />
                )}
              />
              <LoadingButton color='primary' variant='contained' size='large' type='submit' fullWidth loading={formState.isSubmitting}>
                {t('newPassword.button')}
              </LoadingButton>
            </form>
          </Box>
          <Box my={3}>
            <Divider />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewPasswordPage;
