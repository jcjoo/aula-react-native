import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orcamento from './Orcamento';
import NewOrcamento from './Orcamento/NewOrcamento';
import { Receipt } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function OrcamentosStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListaOrcamentos"
                component={Orcamento}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NovoOrcamento"
                component={NewOrcamento}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }
                }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="AbaOrcamentos"
                    component={OrcamentosStack}
                    options={{
                        title: 'Orçamentos',
                        tabBarIcon: ({ color, size }) => <Receipt color={color} size={size} />
                    }}


                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}