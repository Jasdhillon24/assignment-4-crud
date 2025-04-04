import { useRouter } from 'expo-router';
import { View, TextInput, Button, Text } from 'react-native';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Auth error:', error.message);
      setErrorMsg(error.message);
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.user) {
      setErrorMsg('Please verify your email or try again.');
      return;
    }

    const { error: insertError } = await supabase.from('user_details').insert([
      {
        uuid: session.user.id,         // ✅ required for RLS
        email: email,
        first_name: firstName,
        last_name: lastName,
      },
    ]);

    if (insertError) {
      console.error('Insert error:', insertError.message);
      setErrorMsg('Failed to save user details.');
    } else {
      console.log('✅ User details saved!');
      router.replace('/landing');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="gray"
        onChangeText={setFirstName}
        value={firstName}
        style={{ marginBottom: 10, color: 'white' }}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="gray"
        onChangeText={setLastName}
        value={lastName}
        style={{ marginBottom: 10, color: 'white' }}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        style={{ marginBottom: 10, color: 'white' }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={{ marginBottom: 10, color: 'white' }}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Go to Sign In" onPress={() => router.replace('/signin')} />
      {errorMsg ? (
        <Text style={{ color: 'red', marginTop: 10 }}>{errorMsg}</Text>
      ) : null}
    </View>
  );
}
