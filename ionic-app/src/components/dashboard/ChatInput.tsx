import { colors, typography } from '@/theme/theme';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, InputBase } from '@mui/material';
import { useState } from 'react';

type ChatInputProps = {
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  focused?: boolean;
};

export function ChatInput({
  onSubmit,
  placeholder = 'Write here...',
  disabled = false,
  autoFocus = false,
  focused = false,
}: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed && onSubmit) {
      onSubmit(trimmed);
      setValue('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 56,
        pl: 3,
        pr: 1,
        py: 1,
        bgcolor: 'rgba(29, 29, 29, 0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: focused ? '1px solid #0cbcdf' : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 28,
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease',
      }}
    >
      <InputBase
        fullWidth
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder={placeholder}
        disabled={disabled}
        sx={{
          flex: 1,
          minWidth: 0,
          color: colors.text,
          fontFamily: typography.fontFamily.sans,
          fontSize: '15px',
          '& input::placeholder': {
            color: 'rgba(255, 255, 255, 0.4)',
            opacity: 1,
          },
        }}
      />
      <IconButton
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        sx={{
          width: 44,
          height: 44,
          color: colors.primary,
          flexShrink: 0,
          '&:hover': { bgcolor: `${colors.primary}15` },
          '&.Mui-disabled': { color: `${colors.primary}50` },
        }}
      >
        <SendIcon sx={{ fontSize: 22 }} />
      </IconButton>
    </Box>
  );
}
