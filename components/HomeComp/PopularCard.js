import React from 'react';
import { View, Text, Image } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const PopularCard = ({ imageSource, name, category, rating }) => {
  return (
    <View style={styles.popularCard}>
      <Image source={imageSource} style={styles.popularCardImage} />
      <View style={styles.popularCardContent}>
        <Text style={styles.popularCardName}>{name}</Text>
        <Text style={styles.popularCardCategory}>{category}</Text>
        <View style={styles.popularCardRating}>
          <EntypoIcon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
};

export default PopularCard;


const styles = {
  popularCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
  },
  popularCardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  popularCardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  popularCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  popularCardCategory: {
    fontSize: 14,
    color: '#B6B6B6',
    marginBottom: 5,
  },
  popularCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
  },
};
