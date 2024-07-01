async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: "example@email.com",
    password: "example-password",
    options: {
      emailRedirectTo: "/",
    },
  });
}

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "example@email.com",
    password: "example-password",
  });
}
