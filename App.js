import * as React from 'react';
import { AppRegistry } from 'react-native';
import { BottomNavigation, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

// Screens
const HomeScreen = () => {
  const theme = useTheme();
  const textColor = getContrastColor(theme.colors.primary);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text style={{ color: textColor }}>Home Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const DetailsScreen = () => {
  const theme = useTheme();
  const textColor = getContrastColor(theme.colors.primary);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text style={{ color: textColor }}>Details Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

// Main App component
export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'details', title: 'Details', icon: 'information' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    details: DetailsScreen,
  });

  const renderIcon = ({ route, color }) => {
    const iconColor = getContrastColor(color);
    return <MaterialCommunityIcons name={route.icon} size={24} color={iconColor} />;
  };

  // Get Android system colors
  const { theme: material3Theme } = useMaterial3Theme();

  const paperTheme = {
    dark: { ...material3Theme.dark },
    light: { ...material3Theme.light },
    roundness: 2, // You can customize other theme properties here
    colors: {
      primary: material3Theme.primary, // Set the background color of the navigation bar
      text: getContrastColor(material3Theme.primary), // Set the text color of the navigation bar
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
        barStyle={{ backgroundColor: material3Theme.primary }}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('MyApp', () => App);

// Helper function to calculate contrasting text color
// Helper function to calculate contrasting text color
const getContrastColor = (backgroundColor) => {
  // Default to white if backgroundColor is not provided
  if (!backgroundColor) {
    return 'white';
  }

  const hexColor = backgroundColor.replace(/^#/, '');

  // Calculate the relative luminance of the color
  const rgb = parseInt(hexColor, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // Choose white or black text color based on luminance
  return luminance > 128 ? 'black' : 'white';
};
