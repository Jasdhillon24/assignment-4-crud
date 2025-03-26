import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LandingScreen() {
  const [userFullName, setUserFullName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/signin');
      } else {
        const { data, error } = await supabase
          .from('user_details')
          .select('first_name, last_name')
          .eq('uuid', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching full name:', error);
        } else {
          setUserFullName(`${data.first_name} ${data.last_name}`);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/signin');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 18 }}>
        Welcome, {userFullName}
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
