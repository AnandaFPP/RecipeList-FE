import React from 'react';
import { View, Text, Image } from 'react-native';

const CategoriesSection = ({ categories }) => {
  return (
    <View style={styles.categoriesContainer}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryItem}>
          <Image source={category.imageSource} style={styles.categoryImage} />
          <Text style={styles.centeredTextCategories}>{category.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default CategoriesSection;

const styles = {
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
  },
  centeredTextCategories: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
};
