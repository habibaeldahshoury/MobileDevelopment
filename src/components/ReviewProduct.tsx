import { View, Text } from "react-native";

type Props = {
  user: string;
  rating: number;
  comment: string;
};

export default function ReviewItem({ user, rating, comment }: Props) {
  return (
    <View className="rounded-[14px] bg-surface p-3.5">
      <View className="flex-row items-center justify-between">
        <Text className="text-[15px] font-bold text-foreground">{user}</Text>
        <Text className="text-sm font-bold text-accent">{rating}/5</Text>
      </View>
      <Text className="mt-1.5 text-sm text-muted">{comment}</Text>
    </View>
  );
}
