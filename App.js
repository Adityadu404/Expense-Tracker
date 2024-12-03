import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'

import ManageExpenses from './Screens/ManageExpenses';
import RecentExpenses from './Screens/RecentExpenses';
import AllExpenses from './Screens/AllExpenses';
import { GlobalStyles } from './constants/Styles';
import IconButton from './components/UI/IconButton'
import ExpenseContextProvider from './store/Expenses-context';

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function ExpenseOverview (){
  return (<BottomTabs.Navigator screenOptions={({navigation})=>({
    headerStyle:{
      backgroundColor : GlobalStyles.colors.primary400
    },
    headerTintColor:GlobalStyles.colors.primary50,
    tabBarStyle:{ backgroundColor :GlobalStyles.colors.primary400},
    tabBarActiveTintColor: GlobalStyles.colors.primary50,
    headerRight : ({tintColor})=> (
     <IconButton 
      icon='add'
      color={tintColor} 
      size={24} 
      onPress={()=>{ navigation.navigate('ManageExpense')}}/>
  )
  })}>
    <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses}
    options={{
      title:'Recent Expenses',
      tabBarLabel:'Recents',
      tabBarIcon:({color,size})=> (<Ionicons name='hourglass' color={color} size={size}/> )
    }}
    />
    <BottomTabs.Screen name='AllExpenses' component={AllExpenses}
     options={{
      title:'All Expenses',
      tabBarLabel:'All Expenses',
      tabBarIcon:({color,size})=>(<Ionicons name='list-circle-outline' color={color} size={size}/>)
    }}
    />
  </BottomTabs.Navigator>)
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
      <NavigationContainer>
       <Stack.Navigator screenOptions={{
        headerStyle:{backgroundColor: GlobalStyles.colors.primary400},
        headerTintColor:GlobalStyles.colors.primary50
       }}>
       <Stack.Screen 
       name='ExpenseOverview' 
       component={ExpenseOverview}
       options={{
        headerShown: false
       }}
        />
        <Stack.Screen 
        name='ManageExpense' 
        component={ManageExpenses}
        options={{
            presentation:'modal'
          }}
        />
       </Stack.Navigator>
      </NavigationContainer>
      </ExpenseContextProvider>

      </>
  );
}



