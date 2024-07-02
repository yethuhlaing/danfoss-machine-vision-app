import { View, ViewStyle } from "react-native";

interface CardProps extends React.PropsWithChildren {
  style?: ViewStyle;
}

export default function Card({ children, style = {} }: CardProps) {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 15,
        backgroundColor: "white",
        elevation: 8,
        shadowColor: "#fca5a5",
        shadowRadius: 8,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.15,
        marginBottom: 10,
        ...style,
      }}
    >
      {children}
    </View>
  );
}

