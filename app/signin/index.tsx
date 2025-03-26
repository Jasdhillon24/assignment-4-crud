import { useRouter } from 'expo-router';
import { View, TextInput, Button, Text } from 'react-native';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        onChangeText={setEmail}
        value={email}
        style={{ marginBottom: 10, color: 'white' }} // 👈 Add color
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={{ marginBottom: 10, color: 'white' }} // 👈 Add color
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Go to Sign Up" onPress={() => router.push('/signup')} />
      {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
    </View>
  );
}
