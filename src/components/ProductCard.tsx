import { Pressable, Text, Image, View } from "react-native";

type Props = {
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  onPress: () => void;
};

export default function ProductCard({ name, price, oldPrice, image, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="flex-1 rounded-2xl bg-surface p-3 active:opacity-80">
      <Text className="text-[15px] font-semibold text-foreground" numberOfLines={1}>
        {name}
      </Text>
      <View className="mt-0.5 flex-row items-baseline gap-1.5">
        <Text className="text-[15px] font-bold text-primary">{price} EGP</Text>
        {oldPrice ? <Text className="text-xs text-muted line-through">{oldPrice} EGP</Text> : null}
      </View>
      <View className="mt-2.5">
        <Image source={{ uri: image }} className="h-[170px] w-full rounded-xl bg-gray-200" />
        {oldPrice ? (
          <View className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5">
            <Text className="text-[10px] font-bold text-foreground">SALE</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
