export const useAuth = () => {

  const client = useSupabaseClient();
  const authStore = useAuthStore();
  const { getUser } = useDataBase();

  const login = async(username: string, password: string) => {
    const result = await client.auth.signInWithPassword({
      email: username,
      password: password
    });
    authStore.setAuthenticated(!!result.data.user);
    authStore.setUserId(result.data.user?.id || '');

    const userInfo = await getUser();
    if (!userInfo || userInfo.error) {
      console.error('Failed to fetch user info: ', userInfo?.error)
    } else {
      authStore.setUserInfo(userInfo.data || {});
    }

    return result;
  };

  const logout = async() => {
    await client.auth.signOut();
    authStore.initAuth();
  };

  const register = async(username: string, password: string) => {
    const result = await client.auth.signUp({
      email: username,
      password: password
    });
    return result;
  };

  return { login, logout, register }
}
