import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, TextField, FormControlLabel, Checkbox, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import theme from '@/theme';
import { UserCredentials } from '@/types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const schema = yup.object().shape({
  email: yup.string().required('@validation.Required'),
  password: yup.string().required('@validation.Required')
});

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login, logout } = useAuth();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, formState, control } = useForm<UserCredentials>({
    resolver: yupResolver(schema)
  });

  const handleLogin = handleSubmit(async data => {
    try {
      await login(data.email, data.password);
      enqueueSnackbar(t('LoginSuccess'), {
        variant: 'success'
      });
      rememberMe === false && (window.onbeforeunload = logout);
    } catch {
      enqueueSnackbar(t('LoginError'), {
        variant: 'error'
      });
    }
  });

  return (
    <form>
      <Controller
        name='email'
        control={control}
        defaultValue=''
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant='outlined'
            type='email'
            label={t('Email')}
            error={Boolean(error)}
            value={field.value}
            onChange={field.onChange}
            helperText={error?.message && t(error.message)}
            sx={{ mb: 3 }}
            data-cy='loginPageEmail'
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        defaultValue=''
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant='outlined'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            label={t('Password')}
            error={Boolean(error)}
            value={field.value}
            onChange={field.onChange}
            helperText={error?.message && t(error.message)}
            sx={{ mb: 3 }}
            data-cy='loginPagePassword'
          />
        )}
      />
      <LoadingButton
        color='primary'
        variant='contained'
        size='large'
        type='submit'
        fullWidth
        loading={formState.isSubmitting}
        onClick={handleLogin}
        data-cy='loginPageSubmit'
      >
        {t('loginPage.loginButton')}
      </LoadingButton>
      <Box my={3} sx={{ display: 'flex ', justifyContent: 'space-between' }}>
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
          labelPlacement='end'
          label={t('RememberMe')}
        />

        <Link
          to='/forgot-password'
          color='textSecondary'
          style={{ alignSelf: 'center', textDecoration: 'none', color: theme.palette.primary.main }}
        >
          {t('loginPage.remindPassword.link')}
        </Link>
      </Box>
    </form>
  );
};

export default LoginForm;
