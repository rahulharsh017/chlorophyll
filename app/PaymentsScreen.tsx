import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  index: undefined;
};

const PaymentPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showModal, setShowModal] = useState(false);
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');


  const handleSubmit = () => {
    if (cardHolder && cardNumber && expiryDate && cvv) {
      setShowModal(true);
    }
  };

  const handleReturnHome = () : void => {
    setShowModal(false); 
    navigation.navigate('index');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Payment Details</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Card Holder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
            placeholderTextColor="rgba(128, 128, 128, 0.6)"
          value={cardHolder}
          onChangeText={setCardHolder}
        />

        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor="rgba(128, 128, 128, 0.6)"
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              placeholderTextColor="rgba(128, 128, 128, 0.6)"
              maxLength={5}
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              placeholderTextColor="rgba(128, 128, 128, 0.6)"
              keyboardType="numeric"
              maxLength={3}
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Order Successfully Placed!</Text>
            <Text style={styles.modalText}>Thank you for your purchase.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleReturnHome}
            >
              <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    width: '48%',
  },
  button: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default PaymentPage;
