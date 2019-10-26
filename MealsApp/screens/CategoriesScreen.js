import React from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/colors'
import CategoryGridTile from '../components/CategoryGridTile';


const CategoriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      numColumns={2}
      renderItem={renderGridItem}
      keyExtractor={(item, index) => item.id}
    />
  );
};


// tmp
const IoniconsHeaderButton = props => (
  <HeaderButton {...props} 
  IconComponent={Ionicons} 
  iconSize={23} color="blue"
  />
);

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          iconName='ios-menu'
          onPress={()=>{  navData.navigation.toggleDrawer();}}>
        </Item>
      </HeaderButtons>
    ),
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  }
});

export default CategoriesScreen;
