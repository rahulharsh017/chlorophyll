import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';

interface PlantData {
  Temperature: number;
  Humidity: number;
  Moisture: number;
  PumpStatus: string;
}

const HomeScreen: React.FC = () => {
  const [plantData, setPlantData] = useState<PlantData | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://garden-484d3-default-rtdb.firebaseio.com/.json?auth=AIzaSyBB9qcEt1h45EfRVvGKniUWElM_XjTOZzQ'
      );
      const data: PlantData = await response.json();
      console.log(data);
      setPlantData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/neem.jpg')} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Temperature:</Text>
            <Text style={styles.infoText}>
              {plantData ? `${plantData.Temperature} Degree` : 'Loading...'}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Humidity:</Text>
            <Text style={styles.infoText}>
              {plantData ? `${plantData.Humidity} %` : 'Loading...'}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Moisture:</Text>
            <Text style={styles.infoText}>
              {plantData ? `${plantData.Moisture}` : 'Loading...'}
            </Text>y
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>PumpStatus:</Text>
            <Text style={styles.infoText}>
              {plantData ? `${plantData.PumpStatus}` : 'Loading...'}
            </Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Plant Details</Text>
          <Text style={styles.detailsText}>
            Neem is a tree in the mahogany family Meliaceae. It is native to the Indian subcontinent. It is typically grown in tropical and semi-tropical regions. Neem trees also grow in islands located in the southern part of Iran. Its fruits and seeds are the source of neeem
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Refresh Data" onPress={fetchData} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 0,
  },
  image: {
    width: 300,
    height: 300,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  infoBox: {
    backgroundColor: 'white',
    width: 250,
    height: 65,
    borderColor: '#9C9C9C',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  infoText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderColor: '#9C9C9C',
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 40,
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 20, // Add marginTop to the button
  },
});

export default HomeScreen;
