export const useAuth = () => {
  
  const client = useSupabaseClient();
  const mainStore = useMainStore();

  const login = async(email: string, password: string) => {
    
    await logout();

    const {data, error} = await client.auth.signInWithPassword({
      email, password
    });

    if (error) throw (`Login failed: ${error.message}`);

    return data;
  };

  const logout = async() => {
    await client.auth.signOut();
    mainStore.initAuth();
    navigateTo('/auth/login')
  };

  const register = async(username: string, password: string) => {
    const result = await client.auth.signUp({
      email: username,
      password: password
    });
    return result;
  }

  return { login, logout, register }
}
