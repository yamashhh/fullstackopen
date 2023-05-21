import {
  Text as NativeText,
  type TextProps as NativeTextProps,
  type StyleProp,
  type TextStyle,
} from "react-native";
import theme from "../theme";

interface TextProps extends NativeTextProps {
  color?: keyof (typeof theme)["colors"];
  fontSize?: keyof (typeof theme)["fontSizes"];
  fontWeight?: keyof (typeof theme)["fontWeights"];
  style?: StyleProp<TextStyle>;
}

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  ...props
}: TextProps): JSX.Element => {
  const textStyle = {
    color: theme.colors[color ?? "textPrimary"],
    fontSize: theme.fontSizes[fontSize ?? "body"],
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights[fontWeight ?? "normal"],
  };

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
