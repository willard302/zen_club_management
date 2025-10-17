export const useAuth = () => {

  const client = useSupabaseClient();
  const authStore = useAuthStore();

  const login = async(email: string, password: string) => {

    await client.auth.signOut();

    const {data, error} = await client.auth.signInWithPassword({
      email, password
    });

    if (error) throw error.message;

    return data;
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
