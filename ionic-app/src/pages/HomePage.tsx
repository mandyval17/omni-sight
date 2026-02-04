import { useAuth } from '@/hooks/auth/useAuth';
import ExampleService from '@/services/example/example.service';
import { ExampleFormSchema, type ExampleFormData } from '@/types/example.model';
import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Alert,
  AppBar,
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
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

export function HomePage() {
  const { user, logout, logoutState } = useAuth();

  // Fetch examples
  const { data: examplesData, refetch, isLoading, isError, error, isRefetching } =
    ExampleService.useGetExamplesQuery();

  // Create example mutation
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
      onSuccess: () => {
        reset();
      },
    });
  };

  const examples = examplesData?.data ?? [];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            OmniSight
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'primary.main',
                  fontSize: '0.9rem',
                }}
              >
                {user?.email?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user?.email}
              </Typography>
            </Box>
            <Tooltip title="Logout">
              <IconButton
                onClick={logout}
                disabled={logoutState.isPending}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main', bgcolor: 'error.light' + '20' },
                }}
              >
                {logoutState.isPending ? <CircularProgress size={20} /> : <LogoutIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Welcome Section */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome back! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Manage your examples and explore the dashboard.
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {/* Create Example Form */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <AddIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Add New Example
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    fullWidth
                    label="Name"
                    placeholder="Enter name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register('name')}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <PersonOutlineIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    placeholder="Enter email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email')}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <EmailOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={createMutation.isPending}
                    startIcon={createMutation.isPending ? null : <AddIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                      },
                    }}
                  >
                    {createMutation.isPending ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Create Example'
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Examples List */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Examples
                    </Typography>
                    {!isLoading && (
                      <Box
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          px: 1.5,
                          py: 0.25,
                          borderRadius: 10,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {examples.length}
                      </Box>
                    )}
                  </Box>
                  <Tooltip title="Refresh">
                    <IconButton onClick={() => refetch()} disabled={isRefetching}>
                      <RefreshIcon
                        sx={{
                          animation: isRefetching ? 'spin 1s linear infinite' : 'none',
                          '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                          },
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {isError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error?.message ?? 'Failed to load examples'}
                  </Alert>
                )}

                {isLoading ? (
                  <Box>
                    {[1, 2, 3].map((i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Skeleton variant="circular" width={48} height={48} />
                        <Box sx={{ flex: 1 }}>
                          <Skeleton variant="text" width="60%" />
                          <Skeleton variant="text" width="40%" />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : examples.length === 0 ? (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 6,
                      color: 'text.secondary',
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <PersonOutlineIcon sx={{ fontSize: 40, color: 'grey.400' }} />
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                      No examples yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create your first example using the form
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ p: 0 }}>
                    {examples.map((example, index) => (
                      <Box key={example.id}>
                        <ListItem
                          sx={{
                            px: 0,
                            py: 1.5,
                            '&:hover': { bgcolor: 'grey.50', borderRadius: 2 },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor: `hsl(${(index * 60) % 360}, 70%, 60%)`,
                                fontWeight: 600,
                              }}
                            >
                              {example.name.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography fontWeight={600}>{example.name}</Typography>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary">
                                {example.email}
                              </Typography>
                            }
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
    </Box>
  );
}
