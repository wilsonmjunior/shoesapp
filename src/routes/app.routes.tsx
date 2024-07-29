import { Ionicons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from 'native-base';

import { Cart } from '../screens/Cart';
import { Home } from '../screens/Home';
import { Details } from '../screens/Details';
import { useCart } from '../hooks/useCart';
import { useMemo } from 'react';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  const { cart } = useCart();

  const cartQuantity = useMemo(() => {
    return cart.reduce((acc, product) => {
      return acc + product.quantity
    }, 0)
  }, [cart]);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colors.gray[800]
        },
      }}>
      <Screen
        name="products"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" color={color} size={sizes[6]} />
        }}
      />

      <Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => 
            <Feather name="shopping-bag" color={color} size={sizes[6]} />,
          tabBarBadge: cartQuantity > 0 ? cartQuantity : undefined,
        }}
      />

      <Screen
        name="details"
        component={Details}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}