import React, { useRef, useImperativeHandle } from "react";
import Animated from "react-native-reanimated";
import { StyleSheet, ScrollViewProps, ScrollView } from "react-native";
import size from "@app/common/constants/size.constant";

interface Props extends ScrollViewProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export interface ContentHandler {
  scrollTo: typeof ScrollView.prototype.scrollTo;
}

const Content: React.RefForwardingComponent<ContentHandler, Props> = (
  props,
  ref
) => {
  const { contentContainerStyle, style, noPadding = false, ...rest } = props;
  const newStyle = StyleSheet.flatten([styles.content, style]);
  const scrollView = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    scrollTo(...args) {
      if (scrollView.current) {
        scrollView.current.getNode().scrollTo(args);
      }
    },
  }));
  return (
    <Animated.ScrollView
      keyboardShouldPersistTaps={"handled"}
      {...rest}
      ref={scrollView}
      style={newStyle}
      scrollEventThrottle={1}
      contentContainerStyle={StyleSheet.flatten([
        styles.container,
        noPadding && styles.noPadding,
        contentContainerStyle,
      ])}
    />
  );
};

export default React.forwardRef<ContentHandler, Props>(Content);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    padding: size.contentPad,
    flexGrow: 1,
  },
  noPadding: {
    padding: 0,
  },
});
