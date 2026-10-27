import BackButton from '@/components/BackButton';
import ReviewItem from '@/components/ReviewProduct';
import { reviews } from '@/data/reviews';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

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
      className="flex-1 bg-background"
      contentContainerClassName="gap-2.5 p-4"
      ListHeaderComponent={
        <BackButton label="Product" fallback={{ pathname: '/productDetail/[id]', params: { id: String(id) } }} />
      }
      renderItem={({ item }) => <ReviewItem user={item.user} rating={item.rating} comment={item.comment} />}
      ListFooterComponent={
        <View className="gap-2.5">
          <Stack.Screen options={{ title: 'Reviews' }} />
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Write a Review"
            className="rounded-[10px] border border-gray-300 bg-surface p-3 text-foreground"
          />
          <Pressable className="items-center rounded-xl bg-primary p-3 active:opacity-80" onPress={submit}>
            <Text className="font-bold text-white">Submit</Text>
          </Pressable>
        </View>
      }
    />
  );
}
