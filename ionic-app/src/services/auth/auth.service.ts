import { useCustomMutation } from '@/hooks/tanstack/useCustomQuery';
import AuthAPI from '@/services/auth/auth.api';

export default class AuthService {
  static useUserLoginMutation() {
    return useCustomMutation({
      mutationFn: AuthAPI.userLogin,
    });
  }

  static useUserLogoutMutation() {
    return useCustomMutation({
      mutationFn: AuthAPI.userLogout,
    });
  }

  static useUserRegisterMutation() {
    return useCustomMutation({
      mutationFn: AuthAPI.userRegister,
    });
  }

  static async me() {
    return AuthAPI.getMe();
  }
}
