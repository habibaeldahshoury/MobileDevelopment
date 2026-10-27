import ReviewItem from '@/components/ReviewProduct';
import { colors } from '@/constants/colors';
import { reviews } from '../data/reviews';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ReviewsScreen() {
  const { id } = useLocalSearchParams();
  const [list, setList] = useState(reviews.filter((r) => r.productId === id));
  const [text, setText] = useState('');

  function submit() {
    if (text.trim() === '') return;
    const newReview = { id: 'r' + Date.now(), productId: String(id), user: 'You', rating: 5, comment: text.trim() };
    setList([...list, newReview]);
    setText('');
  }

  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.screen}
      renderItem={({ item }) => <ReviewItem user={item.user} rating={item.rating} comment={item.comment} />}
      ListFooterComponent={
        <View style={styles.form}>
          <Stack.Screen options={{ title: 'Reviews' }} />
          <TextInput value={text} onChangeText={setText} placeholder="Write a Review" style={styles.input} />
          <Pressable style={styles.btn} onPress={submit}>
            <Text style={styles.btnText}>Submit</Text>
          </Pressable>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  screen: { padding: 16, gap: 10, backgroundColor: colors.background },
  form: { gap: 10 },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 12, color: colors.text },
  btn: { padding: 12, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center' },
  btnText: { color: colors.surface, fontWeight: '700' },
});