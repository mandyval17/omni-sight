import { AppHeader } from '@/components/layout/AppHeader';
import { AppCard } from '@/components/ui/AppCard';
import { useAuth } from '@/hooks/auth/useAuth';
import ExampleService from '@/services/example/example.service';
import { ExampleFormSchema, type ExampleFormData } from '@/types/example.model';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import AddIcon from '@mui/icons-material/Add';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

export function HomePage() {
  const { user, logout, logoutState } = useAuth();

  const { data: examplesData, refetch, isLoading, isError, error, isRefetching } =
    ExampleService.useGetExamplesQuery();

  const createMutation = ExampleService.useCreateExampleMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExampleFormData>({
    resolver: zodResolver(ExampleFormSchema),
  });

  const onSubmit = (data: ExampleFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  const handleRefresh = async (event: CustomEvent) => {
    await refetch();
    event.detail.complete();
  };

  const examples = examplesData?.data ?? [];

  return (
    <IonPage>
      <AppHeader
        title="Omnisight"
        rightSlot={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.8rem' }}>
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Tooltip title="Logout">
              <IconButton
                onClick={logout}
                disabled={logoutState.isPending}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                {logoutState.isPending ? <CircularProgress size={18} /> : <LogoutIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
        }
      />

      <IonContent>
        {/* Ionic Pull-to-Refresh */}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Welcome Banner – Figma teal/cyan gradient */}
          <Paper
            sx={{
              p: 3,
              mb: 3,
              background: 'linear-gradient(135deg, #0d3d38 0%, #062923 50%, #0d9488 100%)',
              color: 'white',
              borderRadius: 2,
              border: '1px solid rgba(34, 211, 238, 0.2)',
            }}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Welcome back! 👋
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {user?.email} • Pull down to refresh
            </Typography>
          </Paper>

          <Grid container spacing={3}>
            {/* Create Form */}
            <Grid size={{ xs: 12, md: 5 }}>
              <AppCard title="Add New Example" padding={2.5}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register('name')}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <PersonOutlineIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email')}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <EmailOutlinedIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />,
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={createMutation.isPending}
                    startIcon={createMutation.isPending ? null : <AddIcon />}
                  >
                    {createMutation.isPending ? <CircularProgress size={22} color="inherit" /> : 'Create'}
                  </Button>
                </Box>
              </AppCard>
            </Grid>

            {/* Examples List */}
            <Grid size={{ xs: 12, md: 7 }}>
              <AppCard
                title="Examples"
                padding={2.5}
                action={
                  <IconButton size="small" onClick={() => refetch()} disabled={isRefetching}>
                    <RefreshIcon
                      fontSize="small"
                      sx={{
                        animation: isRefetching ? 'spin 1s linear infinite' : 'none',
                        '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
                      }}
                    />
                  </IconButton>
                }
              >
                {!isLoading && (
                  <Box
                    sx={{
                      display: 'inline-block',
                      bgcolor: 'primary.main',
                      color: 'background.default',
                      px: 1,
                      py: 0.25,
                      borderRadius: 5,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {examples.length}
                  </Box>
                )}

                <Divider sx={{ mb: 2 }} />

                {isError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error?.message ?? 'Failed to load'}
                  </Alert>
                )}

                {isLoading ? (
                  <Box>
                    {[1, 2, 3].map((i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box sx={{ flex: 1 }}>
                          <Skeleton variant="text" width="50%" />
                          <Skeleton variant="text" width="30%" />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : examples.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <PersonOutlineIcon sx={{ fontSize: 48, color: 'grey.300', mb: 1 }} />
                    <Typography variant="body2">No examples yet</Typography>
                  </Box>
                ) : (
                  <List sx={{ p: 0 }}>
                    {examples.map((example, index) => (
                      <Box key={example.id}>
                        <ListItem sx={{ px: 0, py: 1 }}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: `hsl(${(index * 60) % 360}, 70%, 60%)`,
                                fontSize: '0.9rem',
                              }}
                            >
                              {example.name.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="body2" fontWeight={600}>{example.name}</Typography>}
                            secondary={<Typography variant="caption" color="text.secondary">{example.email}</Typography>}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(example.createdAt).toLocaleDateString()}
                          </Typography>
                        </ListItem>
                        {index < examples.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                )}
              </AppCard>
            </Grid>
          </Grid>
        </Container>
      </IonContent>
    </IonPage>
  );
}
