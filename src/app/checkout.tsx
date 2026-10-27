import BackButton from "@/components/BackButton";
import AddressCard, {
  DeliveryAddress,
} from "@/components/checkout/AddressCard";
import CheckoutBottomBar from "@/components/checkout/CheckoutBottomBar";
import DeliveryMethodSelector, {
  DeliveryMethod,
} from "@/components/checkout/DeliveryMethodSelector";
import PaymentMethodAccordion, {
  PaymentFormData,
  PaymentMethod,
} from "@/components/checkout/PaymentMethodAccordion";
import { useProducts } from "@/context/products";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

export default function CheckoutScreen() {
  const { products, cart, clearCart } = useProducts();

  const [address, setAddress] = useState<DeliveryAddress | null>({
    name: "Mostafa Makram",
    street: "123 Cairo University St",
    city: "Giza",
  });

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("standard");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null,
  );

  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    walletNumber: "",
    instaPayId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as any[];

  const isCartEmpty = cartItems.length === 0;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = cartItems.reduce((sum, item) => {
    if (!item.discountPercent) return sum;
    return sum + item.price * (item.discountPercent / 100) * item.quantity;
  }, 0);

  const deliveryFee = isCartEmpty
    ? 0
    : deliveryMethod === "express"
      ? 12.0
      : 5.0;
  const totalAmount = isCartEmpty
    ? 0
    : Math.max(0, subtotal - discount + deliveryFee);

  const handleSelectPayment = (method: PaymentMethod) => {
    setSelectedPayment(method);
    setPaymentFormData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      walletNumber: "",
      instaPayId: "",
    });
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.cardNumber;
      delete updated.expiryDate;
      delete updated.cvv;
      delete updated.walletNumber;
      delete updated.instaPayId;
      return updated;
    });
  };

  const handleFormChange = (fields: Partial<PaymentFormData>) => {
    setPaymentFormData((prev) => ({ ...prev, ...fields }));
    const fieldNames = Object.keys(fields);
    if (fieldNames.length > 0) {
      setErrors((prev) => {
        const updated = { ...prev };
        fieldNames.forEach((key) => delete updated[key]);
        return updated;
      });
    }
  };

  const handleSelectAddress = () => {
    router.push("/select-address" as any);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!address) {
      newErrors.address = "Please select a delivery address";
    }

    if (!selectedPayment) {
      newErrors.paymentMethod = "Please select a payment method";
    } else if (selectedPayment === "VISA") {
      const rawCard = paymentFormData.cardNumber.replace(/\s/g, "");
      if (!rawCard) {
        newErrors.cardNumber = "Card number is required";
      } else if (rawCard.length !== 16) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }

      if (!paymentFormData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
      } else {
        const parts = paymentFormData.expiryDate.split("/");
        if (
          parts.length !== 2 ||
          parts[0].length !== 2 ||
          parts[1].length !== 2
        ) {
          newErrors.expiryDate = "Format must be MM/YY";
        } else {
          const month = parseInt(parts[0], 10);
          const year = parseInt(`20${parts[1]}`, 10);
          const now = new Date();
          const currentYear = now.getFullYear();
          const currentMonth = now.getMonth() + 1;

          if (isNaN(month) || month < 1 || month > 12) {
            newErrors.expiryDate = "Month must be between 01 and 12";
          } else if (
            isNaN(year) ||
            year < currentYear ||
            (year === currentYear && month < currentMonth)
          ) {
            newErrors.expiryDate = "Card has expired";
          }
        }
      }

      if (!paymentFormData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (paymentFormData.cvv.length !== 3) {
        newErrors.cvv = "CVV must be 3 digits";
      }
    } else if (selectedPayment === "Vodafone Cash") {
      if (!paymentFormData.walletNumber) {
        newErrors.walletNumber = "Wallet number is required";
      } else if (!/^010\d{8}$/.test(paymentFormData.walletNumber)) {
        newErrors.walletNumber =
          "Must be an 11-digit Vodafone number (010xxxxxxxx)";
      }
    } else if (selectedPayment === "InstaPay") {
      if (!paymentFormData.instaPayId) {
        newErrors.instaPayId = "IPA address or mobile number is required";
      } else {
        const isIPA = /.+@instapay$/i.test(paymentFormData.instaPayId);
        const isMobile = /^01[0125]\d{8}$/.test(paymentFormData.instaPayId);
        if (!isIPA && !isMobile) {
          newErrors.instaPayId =
            "Enter username@instapay or an 11-digit mobile number";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (isCartEmpty) return;
    if (!validate()) return;

    const paymentData: Record<string, string> =
      selectedPayment === "VISA"
        ? {
            cardNumber: paymentFormData.cardNumber.replace(/\s/g, ""),
            expiryDate: paymentFormData.expiryDate,
            cvv: paymentFormData.cvv,
          }
        : selectedPayment === "Vodafone Cash"
          ? { walletNumber: paymentFormData.walletNumber }
          : selectedPayment === "InstaPay"
            ? { instaPayId: paymentFormData.instaPayId }
            : { method: "Cash on Delivery" };

    const payload = {
      address: address!,
      deliveryMethod,
      paymentMethod: selectedPayment,
      paymentData,
      totalAmount,
    };

    clearCart();
    router.replace("/order-success");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>Checkout</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AddressCard
            address={address}
            onSelectAddress={handleSelectAddress}
            error={errors.address}
          />

          <DeliveryMethodSelector
            selectedMethod={deliveryMethod}
            onSelectMethod={setDeliveryMethod}
          />

          <PaymentMethodAccordion
            selectedPayment={selectedPayment}
            onSelectPayment={handleSelectPayment}
            formData={paymentFormData}
            onChangeFormData={handleFormChange}
            errors={errors}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <CheckoutBottomBar
        totalAmount={totalAmount}
        disabled={isCartEmpty}
        onPlaceOrder={handlePlaceOrder}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(10),
    marginHorizontal: scale(10),
    paddingTop: scale(25),
  },
  title: {
    fontSize: scale(23),
    fontWeight: "bold",
    paddingHorizontal: scale(5),
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  scrollContent: {
    paddingTop: scale(10),
    paddingBottom: scale(20),
  },
});
