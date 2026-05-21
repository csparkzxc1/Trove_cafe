import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';

type IconProps = { color: string; size?: number };

function BookIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 4.5C5 3.67 5.67 3 6.5 3H18a1 1 0 011 1v15a1 1 0 01-1 1H6.5C5.67 20 5 19.33 5 18.5v-14z"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path d="M5 17h13" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function PlusIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.8} />
      <Path
        d="M12 8v8M8 12h8"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function UserIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} />
      <Path
        d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text
        variant="mono"
        size={9}
        letterSpacing={1.6}
        uppercase
        color={focused ? colors.mocha : colors.mochaLight}
        style={{ opacity: focused ? 1 : 0.7 }}
      >
        {label}
      </Text>
      {focused ? (
        <View
          style={{
            marginTop: 3,
            width: 18,
            height: 2,
            borderRadius: 999,
            backgroundColor: colors.honey,
          }}
        />
      ) : null}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.latte,
          borderTopColor: colors.paperLine,
          borderTopWidth: 1,
          height: 76,
          paddingTop: 10,
          paddingBottom: 18,
        },
        tabBarItemStyle: {
          gap: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <BookIcon color={focused ? colors.mocha : colors.mochaLight} />
          ),
          tabBarLabel: ({ focused }) => <TabLabel label="Book" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ focused }) => (
            <PlusIcon color={focused ? colors.mocha : colors.mochaLight} />
          ),
          tabBarLabel: ({ focused }) => <TabLabel label="Stick" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <UserIcon color={focused ? colors.mocha : colors.mochaLight} />
          ),
          tabBarLabel: ({ focused }) => <TabLabel label="Me" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
