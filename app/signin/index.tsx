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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Sign-in error:', error.message);
      setErrorMsg('Invalid email or password');
    } else if (data.session) {
      router.replace('/landing');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        style={{
          marginBottom: 10,
          color: 'white',
          borderBottomWidth: 1,
          borderColor: 'gray',
        }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={{
          marginBottom: 10,
          color: 'white',
          borderBottomWidth: 1,
          borderColor: 'gray',
        }}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={{ marginTop: 10 }}>
        <Button title="Go to Sign Up" onPress={() => router.push('/signup')} />
      </View>
      {errorMsg ? <Text style={{ color: 'red', marginTop: 10 }}>{errorMsg}</Text> : null}
    </View>
  );
}
