import type { PropsWithChildren } from 'react';
import { Platform, View, type ViewProps } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  type AnimatedProps,
} from 'react-native-reanimated';

// Reanimated's `entering` animations on the web sometimes leave elements
// stuck at visibility:hidden during the spring physics, especially when
// rendered headlessly. On web we fall back to a plain View so layouts are
// always visible; native devices still get the fade-in.
type Props = PropsWithChildren<
  ViewProps & {
    enter?: AnimatedProps<typeof Animated.View>['entering'];
  }
>;

const isWeb = Platform.OS === 'web';

export function FadeInView({ enter, children, ...rest }: Props) {
  if (isWeb || !enter) {
    return <View {...rest}>{children}</View>;
  }
  return (
    <Animated.View entering={enter} {...rest}>
      {children}
    </Animated.View>
  );
}

export { FadeInDown, FadeInUp };
