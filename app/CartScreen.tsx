import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeItems, updateItems, emptyCart } from "../store/slice/cartSlice";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

// Define Drawer Navigator Types
type DrawerParamList = {
  CartPage: undefined;
  PaymentsScreen: undefined;
};

// Define Navigation Prop
type NavigationProp = DrawerNavigationProp<DrawerParamList, "CartPage">;

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface RootState {
  cart: {
    value: CartItem[];
  };
}

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.value);

  // Get navigation object
  const navigation = useNavigation<NavigationProp>();

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity >= 0) {
      dispatch(updateItems({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItems({ id }));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleBuyNow = () => {
    // Navigate to PaymentsScreen
    navigation.navigate("PaymentsScreen");
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveItem(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
          <Button
            title="Empty Cart"
            onPress={handleEmptyCart}
            color="#ff4444"
          />
        </>
      )}
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total: $
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: "#53E540",
  },
  quantity: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: "#ff4444",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    flexDirection: "column",
    alignItems: "center",
  },
  buyNowButton: {
    backgroundColor: "#53E540",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buyNowText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CartPage;
