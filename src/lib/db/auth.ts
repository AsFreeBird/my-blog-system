import supabase from "../supabaseClient";
import { User } from "@supabase/supabase-js";

export async function singUp(
  email: string,
  password: string
): Promise<User | null> {

  console.log("db login params：",email,password)
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options:{
      emailRedirectTo:undefined
    }
  });
  if (error) {
    console.error("Error fetching singUp:", error);
    throw new Error(error.message);
  }
  console.log("fetching singUp:", data.user);
  return data.user;
}

export async function singIn(
  email: string,
  paassword: string
): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: paassword,
  });

  if (error) {
    console.error("Error fetching singIn:", error);
    throw new Error(error.message);
  }
  return data.user;
}

export async function getUser(supabaseClient: typeof supabase): Promise<User | null> {
  
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) {
    console.error("Error fetching getUser:", error);
    throw new Error(error.message);
  }
  return data.user || null;
}
