import { useAuth } from '@/hooks/auth/useAuth';
import ExampleService from '@/services/example/example.service';
import { ExampleFormSchema, type ExampleFormData } from '@/types/example.model';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
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
  Card,
  CardContent,
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <Box
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              OmniSight
            </Box>
          </IonTitle>
          <Box slot="end" sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 1 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                fontSize: '0.8rem',
              }}
            >
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
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Ionic Pull-to-Refresh */}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Welcome Banner */}
          <Paper
            sx={{
              p: 3,
              mb: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
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
              <Card>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AddIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Add New Example
                    </Typography>
                  </Box>

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
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' },
                      }}
                    >
                      {createMutation.isPending ? <CircularProgress size={22} color="inherit" /> : 'Create'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Examples List */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Examples
                      </Typography>
                      {!isLoading && (
                        <Box
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            px: 1,
                            py: 0.25,
                            borderRadius: 5,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {examples.length}
                        </Box>
                      )}
                    </Box>
                    <IconButton size="small" onClick={() => refetch()} disabled={isRefetching}>
                      <RefreshIcon
                        fontSize="small"
                        sx={{
                          animation: isRefetching ? 'spin 1s linear infinite' : 'none',
                          '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                          },
                        }}
                      />
                    </IconButton>
                  </Box>

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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </IonContent>
    </IonPage>
  );
}
