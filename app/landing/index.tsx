import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LandingScreen() {
  const router = useRouter();
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        router.replace('/signin');
        return;
      }

      const userId = sessionData.session.user.id;

      const { data, error } = await supabase
        .from('user_details')
        .select('first_name, last_name')
        .eq('uuid', userId)
        .single();

      if (error) {
        console.error('Error fetching user details:', error.message);
        setUserFullName('(Name not found)');
      } else {
        setUserFullName(`${data.first_name} ${data.last_name}`);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/signin');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>
        Welcome, {userFullName}
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
