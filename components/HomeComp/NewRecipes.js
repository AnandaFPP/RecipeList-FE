import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipe } from '../../app/config/redux/actions/recipeAction';
import { useNavigation } from '@react-navigation/native';

const NewRecipesSection = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllRecipe())
  }, [dispatch])

  const onPressRecipe = (recipes_id) => {
    navigation.navigate("DetailRecipe", {recipes_id})
  };

  const recipes = useSelector((state) => state.recipe.recipe)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {recipes.map((recipe, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPressRecipe(recipe.recipes_id)}
          style={styles.categoryItem}
        >
          <Image source={{uri: recipe.recipes_photo}} style={styles.newRecipesImage} />
          <View style={styles.bottomLeftTextContainer}>
            <Text style={styles.centeredText}>{recipe.recipes_title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NewRecipesSection;

const styles = {
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  newRecipesImage: {
    width: 130,
    height: 160,
    borderRadius: 15,
  },
  centeredText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomLeftTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 10,
    paddingBottom: 25,
    width: 90,
  },
};
