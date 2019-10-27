import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

import Colors from '../constants/colors';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: 'Meal Categories'
      }
    },
    CategoryMeals: CategoryMealScreen,
    Favourites: FavouritesScreen,
    Filters: FiltersScreen,
    MealDetail: {
      screen: MealDetailScreen,
      navigationOptions: {
        headerTitle: 'Meal Details'
      }
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: 'white'
    }
  }
 

);

export default createAppContainer(MealsNavigator);