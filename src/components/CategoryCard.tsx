import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  color: string;
  emoji: string;
  onPress: () => void;
};

export default function CategoryCard({ title, color, emoji, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="min-h-[120px] flex-row items-center justify-between gap-3 rounded-[18px] p-[18px] shadow-md active:opacity-90"
      style={{ backgroundColor: color }}
    >
      <Text className="flex-1 text-[22px] font-extrabold text-white">{title}</Text>
      <View className="h-20 w-20 items-center justify-center rounded-2xl bg-white/20">
        <Text className="text-[40px]">{emoji}</Text>
      </View>
    </Pressable>
  );
}
