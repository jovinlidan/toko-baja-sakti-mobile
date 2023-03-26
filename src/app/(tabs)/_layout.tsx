import colorConstant from "@constants/color.constant";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "@components/elements";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

function TopBorder({ focused }) {
  if (!focused) return null;

  return <View style={styles.topBorder} />;
}

export default function TabLayout() {
  return (
    <Tabs
      backBehavior="none"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { height: 80 },
        tabBarActiveTintColor: colorConstant.gray1,
        tabBarInactiveTintColor: colorConstant.gray7,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <TopBorder focused={focused} />
              <Feather name="home" color={color} size={24} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <TopBorder focused={focused} />
              <MaterialCommunityIcons
                name="view-grid-outline"
                size={24}
                color={color}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <TopBorder focused={focused} />
              <View
                style={[
                  {
                    backgroundColor: !focused
                      ? colorConstant.primaryOrange1
                      : color,
                  },
                  styles.circleSearch,
                ]}
              >
                <Feather name="search" size={24} color="#FFFFFF" />
              </View>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <TopBorder focused={focused} />
              <Feather name="heart" size={24} color={color} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <TopBorder focused={focused} />
              <Feather name="shopping-cart" size={24} color={color} />
            </>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  topBorder: {
    position: "absolute",
    backgroundColor: colorConstant.gray1,
    width: "80%",
    height: 1,
    top: 0,
  },
  circleSearch: {
    width: 48,
    height: 48,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
