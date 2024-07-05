import { View, ViewStyle } from "react-native";

interface CardProps extends React.PropsWithChildren {
  style?: ViewStyle;
}

export default function Card({ children, style = {} }: CardProps) {
  return (
    <View
      style={{
        padding: 15,
        elevation: 8,
        marginHorizontal: 5,
        ...style,
      }}
    >
      {children}
    </View>
  );
}

