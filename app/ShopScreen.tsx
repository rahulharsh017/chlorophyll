import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, Button, StyleSheet, FlatList } from "react-native";
import data from "../assets/data.json";
import { addItems } from "../store/slice/cartSlice";
import { store } from "@/store/store";
import { Provider } from "react-redux";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends Item {
  quantity: number;
}

const ShopScreen: React.FC = () => {
  const items: Item[] = data.gardening_items;
  const cartItems = useSelector((state: any) => state.cart.value); // Adjust the type according to your Redux state
  const dispatch = useDispatch();

  const handleSubmit = (item: Item) => {
    const cartItem = cartItems.find((cartItem: CartItem) => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity + 1 : 1;
    dispatch(addItems({ ...item, quantity }));
  };

  const getButtonText = (item: Item) => {
    const cartItem = cartItems.find((cartItem: CartItem) => cartItem.id === item.id);
    if (cartItem) {
      return `Added (${cartItem.quantity})`; // Show quantity in the button text
    } else {
      return "Add to Cart"; // Default text if the item is not in the cart
    }
  };

  useEffect(() => {
    // This effect will run when the component is mounted, ensuring that the cart is updated from localStorage on page load.
    console.log('Cart Items from Redux:', cartItems);
  }, [cartItems]);

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Gardening Tools</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Button
                  title={getButtonText(item)}
                  onPress={() => handleSubmit(item)}
                  color="#4CAF50"
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default ShopScreen;
