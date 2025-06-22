import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';

// Employee Screens
import EmployeeDashboard from '../screens/employee/EmployeeDashboard';
import VisitsScreen from '../screens/employee/VisitsScreen';
import SchedulesScreen from '../screens/employee/SchedulesScreen';
import AttendanceScreen from '../screens/employee/AttendanceScreen';

// Owner Screens
import OwnerDashboard from '../screens/owner/OwnerDashboard';
import EmployeesScreen from '../screens/owner/EmployeesScreen';
import ProductsScreen from '../screens/owner/ProductsScreen';
import OrganizationsScreen from '../screens/owner/OrganizationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const EmployeeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Visits') {
            iconName = 'event';
          } else if (route.name === 'Schedules') {
            iconName = 'schedule';
          } else if (route.name === 'Attendance') {
            iconName = 'access-time';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={EmployeeDashboard} />
      <Tab.Screen name="Visits" component={VisitsScreen} />
      <Tab.Screen name="Schedules" component={SchedulesScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
    </Tab.Navigator>
  );
};

const OwnerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Employees') {
            iconName = 'people';
          } else if (route.name === 'Products') {
            iconName = 'inventory';
          } else if (route.name === 'Organizations') {
            iconName = 'business';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={OwnerDashboard} />
      <Tab.Screen name="Employees" component={EmployeesScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Organizations" component={OrganizationsScreen} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  const { user } = useAuth();

  return user?.role === 'employee' ? <EmployeeNavigator /> : <OwnerNavigator />;
};

export default MainNavigator;