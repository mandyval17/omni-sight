import AuthService from '@/services/auth/auth.service';
import { RegisterFormSchema, type RegisterFormData } from '@/types/auth.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { IonContent, IonPage } from '@ionic/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';

export function RegisterPage() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = AuthService.useUserRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        history.push('/login');
      },
    });
  };

  return (
    <IonPage>
      <IonContent>
        <Box
          sx={{
            minHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            py: 4,
          }}
        >
          <Container maxWidth="sm">
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 4,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: 'secondary.main',
                    width: 56,
                    height: 56,
                    boxShadow: '0 8px 16px rgba(236, 72, 153, 0.3)',
                  }}
                >
                  <PersonAddOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography component="h1" variant="h4" fontWeight={700} sx={{ mt: 2 }}>
                  Create account
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Join us and start your journey
                </Typography>
              </Box>

              {registerMutation.error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {registerMutation.error.response?.data?.message ?? registerMutation.error.message}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register('email')}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password?.message ?? 'Must be at least 6 characters'}
                  {...register('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={registerMutation.isPending}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #db2777 0%, #e11d48 100%)',
                    },
                  }}
                >
                  {registerMutation.isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Create Account'
                  )}
                </Button>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      sx={{
                        fontWeight: 600,
                        color: 'secondary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </IonContent>
    </IonPage>
  );
}
