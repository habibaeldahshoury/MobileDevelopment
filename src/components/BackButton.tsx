import Entypo from "@expo/vector-icons/Entypo";
import { router, type Href } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";

type BackButtonProps = {
  label?: string;
  // where to go when there is no screen to go back to (e.g. opened from a deep link)
  fallback?: Href;
};

const BackButton = ({ label, fallback }: BackButtonProps) => {
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else if (fallback) router.replace(fallback);
  };

  return (
    <TouchableOpacity
      style={[styles.container, label ? styles.withLabel : null]}
      onPress={goBack}
      accessibilityRole="button"
      accessibilityLabel={label ? `Back to ${label}` : "Back"}
    >
      <Entypo name="chevron-left" size={scale(25)} color="black" />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    height: scale(32),
    width: scale(32),
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  withLabel: {
    width: undefined,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  label: {
    fontSize: scale(15),
    fontWeight: "600",
  },
});
