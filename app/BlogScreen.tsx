import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';

const BlogScreen = () => {
  // Function to handle opening URLs
  const handleReadMore = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.blogCard}>
        <Text style={styles.blogTitle}>The Peace Lily: NASA's Little Air-Purifying Superstar</Text>
        <Text style={styles.blogContent}>
          If you're a fellow plant parent like me, you've probably heard about the Peace Lily being crowned as the air-purifying champion of the plant world.
          But did you know it's not just your average houseplant? Oh no, it's practically an astronaut, and here's why!
          Let's talk about NASA, folks. We've all seen those awe-inspiring space missions and the brilliant minds behind them. Well, it turns out they are not just great at sending rockets into space; they are also excellent at keeping the air clean up there.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleReadMore(
                'https://nurserylive.com/blogs/top-10-plants/the-peace-lily-nasas-little-air-purifying-superstar-dyoe-dys'
              )
            }
          >
            <Text style={styles.buttonText}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.blogCard}>
        <Text style={styles.blogTitle}>The Mighty Tulsi Plant: Unveiling Its Healing Powers and Growing Tips</Text>
        <Text style={styles.blogContent}>
          In a world dominated by modern medicine, the incredible healing properties of ancient herbs often go unnoticed. However, one herb that deserves the spotlight is the sacred tulsi plant. Join us as we delve into the fascinating world of tulsi plants, exploring their health benefits and sharing valuable tips on growing and caring for these miraculous plants.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleReadMore(
                'https://nurserylive.com/blogs/top-10-plants/the-mighty-tulsi-plant-unveiling-its-healing-powers-and-growing-tips'
              )
            }
          >
            <Text style={styles.buttonText}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: '#53E540',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  blogCard: {
    backgroundColor: 'white',
    borderColor: '#9C9C9C',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blogContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#53E540',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BlogScreen;
