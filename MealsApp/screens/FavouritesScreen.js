import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavouritesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Favourites Screen!</Text>
    </View>
  );
};

FavouritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Favourites Meals',
    headerLeft: () => (
      <Button title="Menu">
        <Item
          title="Menu"
          iconName='ios-menu'
          onPress={()=>{  navData.navigation.toggleDrawer();}}>
        </Item>
      </Button>
    ),
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavouritesScreen;
