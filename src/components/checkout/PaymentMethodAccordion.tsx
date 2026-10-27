import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

export const paymentMethods = [
  "VISA",
  "Vodafone Cash",
  "InstaPay",
  "Cash on Delivery",
] as const;

export type PaymentMethod = (typeof paymentMethods)[number];

export type PaymentFormData = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  walletNumber: string;
  instaPayId: string;
};

type PaymentMethodAccordionProps = {
  selectedPayment: PaymentMethod | null;
  onSelectPayment: (method: PaymentMethod) => void;
  formData: PaymentFormData;
  onChangeFormData: (fields: Partial<PaymentFormData>) => void;
  errors: Record<string, string>;
};

export default function PaymentMethodAccordion({
  selectedPayment,
  onSelectPayment,
  formData,
  onChangeFormData,
  errors,
}: PaymentMethodAccordionProps) {
  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    onChangeFormData({ cardNumber: formatted });
  };

  const handleExpiryChange = (text: string) => {
    // Check this later
    const cleaned = text.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      onChangeFormData({
        expiryDate: `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`,
      });
    } else {
      onChangeFormData({ expiryDate: cleaned });
    }
  };

  const handleCvvChange = (text: string) => {
    onChangeFormData({ cvv: text.replace(/\D/g, "").slice(0, 3) });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View
        style={[
          styles.cardGroup,
          errors.paymentMethod ? styles.cardGroupError : null,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.paymentHeader,
            selectedPayment === "VISA" ? styles.paymentHeaderActive : null,
          ]}
          onPress={() => onSelectPayment("VISA")}
        >
          <FontAwesome
            name={selectedPayment === "VISA" ? "dot-circle-o" : "circle-o"}
            size={scale(18)}
            color={selectedPayment === "VISA" ? "#4F46E5" : "#9CA3AF"}
          />
          <FontAwesome5
            name="cc-visa"
            size={scale(20)}
            color="#4F46E5"
            style={styles.methodIcon}
          />
          <Text style={styles.paymentTitle}>VISA</Text>
        </TouchableOpacity>

        {selectedPayment === "VISA" ? (
          <View style={styles.accordionContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.cardNumber ? styles.inputError : null,
                ]}
                placeholder="4123 4567 8901 2345"
                placeholderTextColor="#9CA3AF"
                value={formData.cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                maxLength={19}
              />
              {errors.cardNumber ? (
                <Text style={styles.errorText}>{errors.cardNumber}</Text>
              ) : null}
            </View>

            <View style={styles.rowInputs}>
              <View style={styles.flexHalf}>
                <Text style={styles.inputLabel}>Expiry (MM/YY)</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.expiryDate ? styles.inputError : null,
                  ]}
                  placeholder="MM/YY"
                  placeholderTextColor="#9CA3AF"
                  value={formData.expiryDate}
                  onChangeText={handleExpiryChange}
                  keyboardType="numeric"
                  maxLength={5}
                />
                {errors.expiryDate ? (
                  <Text style={styles.errorText}>{errors.expiryDate}</Text>
                ) : null}
              </View>

              <View style={[styles.flexHalf, { marginLeft: scale(10) }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={[styles.input, errors.cvv ? styles.inputError : null]}
                  placeholder="123"
                  placeholderTextColor="#9CA3AF"
                  value={formData.cvv}
                  onChangeText={handleCvvChange}
                  keyboardType="numeric"
                  secureTextEntry
                  maxLength={3}
                />
                {errors.cvv ? (
                  <Text style={styles.errorText}>{errors.cvv}</Text>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}

        <View style={styles.innerDivider} />

        <TouchableOpacity
          style={[
            styles.paymentHeader,
            selectedPayment === "Vodafone Cash"
              ? styles.paymentHeaderActive
              : null,
          ]}
          onPress={() => onSelectPayment("Vodafone Cash")}
        >
          <FontAwesome
            name={
              selectedPayment === "Vodafone Cash" ? "dot-circle-o" : "circle-o"
            }
            size={scale(18)}
            color={selectedPayment === "Vodafone Cash" ? "#4F46E5" : "#9CA3AF"}
          />
          <Image
            source={require("../../../assets/Svgs/vodafoneLogo.svg")}
            style={styles.svgIcon}
            contentFit="contain"
          />
          <Text style={styles.paymentTitle}>Vodafone Cash</Text>
        </TouchableOpacity>

        {selectedPayment === "Vodafone Cash" ? (
          <View style={styles.accordionContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Wallet Number</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.walletNumber ? styles.inputError : null,
                ]}
                placeholder="010xxxxxxxx"
                placeholderTextColor="#9CA3AF"
                value={formData.walletNumber}
                onChangeText={(text) =>
                  onChangeFormData({ walletNumber: text.replace(/\D/g, "") })
                }
                keyboardType="phone-pad"
                maxLength={11}
              />
              {errors.walletNumber ? (
                <Text style={styles.errorText}>{errors.walletNumber}</Text>
              ) : null}
            </View>
          </View>
        ) : null}

        <View style={styles.innerDivider} />

        <TouchableOpacity
          style={[
            styles.paymentHeader,
            selectedPayment === "InstaPay" ? styles.paymentHeaderActive : null,
          ]}
          onPress={() => onSelectPayment("InstaPay")}
        >
          <FontAwesome
            name={selectedPayment === "InstaPay" ? "dot-circle-o" : "circle-o"}
            size={scale(18)}
            color={selectedPayment === "InstaPay" ? "#4F46E5" : "#9CA3AF"}
          />
          <Image
            source={require("../../../assets/Svgs/InstaPayLogo.svg")}
            style={styles.svgIcon}
            contentFit="contain"
          />

          <Text style={styles.paymentTitle}>InstaPay</Text>
        </TouchableOpacity>

        {selectedPayment === "InstaPay" ? (
          <View style={styles.accordionContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                IPA Address or Mobile Number
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.instaPayId ? styles.inputError : null,
                ]}
                placeholder="username@instapay or 01xxxxxxxxx"
                placeholderTextColor="#9CA3AF"
                value={formData.instaPayId}
                onChangeText={(text) =>
                  onChangeFormData({ instaPayId: text.trim() })
                }
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.instaPayId ? (
                <Text style={styles.errorText}>{errors.instaPayId}</Text>
              ) : null}
            </View>
          </View>
        ) : null}

        <View style={styles.innerDivider} />

        <TouchableOpacity
          style={[
            styles.paymentHeader,
            selectedPayment === "Cash on Delivery"
              ? styles.paymentHeaderActive
              : null,
          ]}
          onPress={() => onSelectPayment("Cash on Delivery")}
        >
          <FontAwesome
            name={
              selectedPayment === "Cash on Delivery"
                ? "dot-circle-o"
                : "circle-o"
            }
            size={scale(18)}
            color={
              selectedPayment === "Cash on Delivery" ? "#4F46E5" : "#9CA3AF"
            }
          />
          <Feather
            name="dollar-sign"
            size={scale(18)}
            color="#10B981"
            style={styles.methodIcon}
          />
          <Text style={styles.paymentTitle}>Cash on Delivery</Text>
        </TouchableOpacity>

        {selectedPayment === "Cash on Delivery" ? (
          <View style={styles.accordionContent}>
            <Text style={styles.cashNotice}>
              Pay in cash upon delivery at your doorstep.
            </Text>
          </View>
        ) : null}
      </View>
      {errors.paymentMethod ? (
        <Text style={styles.errorText}>{errors.paymentMethod}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(14),
  },
  sectionTitle: {
    fontSize: scale(15),
    fontWeight: "bold",
    color: "#111827",
    marginBottom: scale(8),
  },
  cardGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  cardGroupError: {
    borderColor: "#EF4444",
  },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(14),
  },
  paymentHeaderActive: {
    backgroundColor: "#FAF5FF",
  },
  methodIcon: {
    marginLeft: scale(12),
    marginRight: scale(10),
  },
  svgIcon: {
    width: scale(22),
    height: scale(22),
    marginLeft: scale(12),
    marginRight: scale(10),
  },
  paymentTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#111827",
  },
  innerDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  accordionContent: {
    backgroundColor: "#F9FAFB",
    padding: scale(14),
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  inputGroup: {
    marginBottom: scale(8),
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexHalf: {
    flex: 1,
  },
  inputLabel: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: scale(4),
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    fontSize: scale(14),
    color: "#111827",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: scale(11),
    marginTop: scale(4),
  },
  cashNotice: {
    fontSize: scale(13),
    color: "#4B5563",
    lineHeight: scale(18),
  },
});
