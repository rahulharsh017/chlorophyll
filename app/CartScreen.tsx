import React from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeItems, updateItems, emptyCart } from '../store/slice/cartSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// ...existing code...

type CartPageProps = {
  navigation: NativeStackNavigationProp<any>;
};
const CartPage: React.FC<CartPageProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.value);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateItems({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItems({ id }));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleBuyNow = () => {
    navigation.navigate('PaymentsScreen');
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemText}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityControl}>
          <Button title="-" onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)} />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Button title="+" onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)} />
        </View>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      <View style={styles.footer}>
        <Button title="Empty Cart" onPress={handleEmptyCart} />
        <Text style={styles.totalText}>
          Total: ${cartItems.reduce((total : number, item:any) => total + item.price * item.quantity, 0).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.buyNowButton}
        onPress={handleBuyNow}
      >
        <Text style={styles.buyNowText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#38a169',
    marginBottom: 16,
  },
  emptyCartText: {
    textAlign: 'center',
    color: '#718096',
  },
  listContent: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height:250
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemText: {
    marginLeft: 12,
    flexShrink: 1, // Allow text to shrink to prevent overflow
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  itemDescription: {
    fontSize: 12,
    color: '#718096',
  },
  itemActions: {
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 8,
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#38a169',
    marginVertical: 8,
  },
  removeButton: {
    backgroundColor: '#e53e3e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  removeButtonText: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: '#53E540',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  buyNowText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartPage;
