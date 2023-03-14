import * as React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
  LayoutChangeEvent,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { View, Text, TouchableOpacity } from "@components/elements";
import Constants from "expo-constants";
import colorConstant from "@constants/color.constant";
import typographyConstant from "@constants/typography.constant";
import { AntDesign } from "@expo/vector-icons";
import sizeConstant from "@constants/size.constant";

interface Props {
  title?: React.ReactNode;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  children?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  statusBarStyles?: StyleProp<ViewStyle>;
  back?: boolean;
  titleColor?: string;
  topSafeArea?: boolean;
  showUpperHeader?: boolean;
  hideAndroidStatusBar?: boolean;
  concave?: boolean;
  renderRightSpace?: boolean;
}

export const HEADER_HEIGHT =
  (Platform.OS === "ios" ? 78 : 83) - (StatusBar.currentHeight || 0);
const { width: screenWidth } = Dimensions.get("window");
const preLollipop = Platform.OS === "android" && Platform.Version < 21;

export default function Header(props: Props) {
  const [width, setWidth] = React.useState<number | undefined>();
  const navigation = useNavigation();
  const {
    back,
    leftComponent,
    rightComponent,
    bottomComponent,
    wrapperStyle,
    title,
    children,
    statusBarStyles,
    hideAndroidStatusBar,
    showUpperHeader = true,
    topSafeArea = true,
    titleColor = colorConstant.gray1,
    concave,
    renderRightSpace = true,
  } = props;
  const { goBack } = navigation;

  const close = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const renderTitle = React.useCallback(() => {
    return (
      <View
        style={typeof title !== "string" && title ? styles.notStringTitle : {}}
      >
        {title ? (
          typeof title === "string" ? (
            <View style={[styles.titleContainer]}>
              <Text
                style={[typographyConstant.h5, { color: titleColor }]}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {title}
              </Text>
            </View>
          ) : (
            title
          )
        ) : null}
      </View>
    );
  }, [back, title, titleColor]);

  const onLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      if (!width || e.nativeEvent.layout.width > width) {
        setWidth(e.nativeEvent.layout.width);
      }
    },
    [width]
  );

  const renderLeft = React.useCallback(() => {
    switch (typeof leftComponent) {
      case "undefined":
        return back ? (
          <TouchableOpacity onLayout={onLayout} onPress={close}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        ) : null;

      default:
        return leftComponent;
    }
  }, [leftComponent, back, onLayout, close]);

  const renderRight = React.useCallback(
    () => (rightComponent ? rightComponent : null),
    [rightComponent]
  );

  const renderBottom = React.useCallback(
    () => (bottomComponent ? bottomComponent : null),
    [bottomComponent]
  );

  return (
    <>
      <View style={[styles.wrapper, wrapperStyle, concave && styles.flat]}>
        {!topSafeArea && <View style={[styles.statusBar, statusBarStyles]} />}
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="dark-content"
        />
        {Platform.OS === "android" &&
          !preLollipop &&
          !hideAndroidStatusBar &&
          topSafeArea && <View style={[styles.statusBar]} />}
        {showUpperHeader && (
          <View style={styles.container}>
            {children ? (
              children
            ) : (
              <>
                <View>
                  <View onLayout={onLayout} style={[styles.left]}>
                    {renderLeft()}
                  </View>
                </View>
                <View style={styles.center}>{renderTitle()}</View>
                {renderRightSpace && back && (
                  <View
                    style={{
                      width,
                    }}
                  >
                    <View onLayout={onLayout} style={[styles.right]}>
                      {renderRight()}
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        )}
        <View>{renderBottom()}</View>
      </View>
      {concave && (
        <View style={[styles.concaveContainer]}>
          <View style={[styles.concave]} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    zIndex: 1000,
    borderBottomColor: "#F1F0EE",
    borderBottomWidth: 1,
    paddingHorizontal: sizeConstant.contentPad,
  },
  flat: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  concaveContainer: {
    backgroundColor: colorConstant.white,
    width: screenWidth,
    height: 20,
    marginBottom: -15,
  },
  concave: {
    backgroundColor: colorConstant.white,
    height: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: colorConstant.white,
    zIndex: 3000,
  },
  container: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    justifyContent: "center",
    height: HEADER_HEIGHT,
  },
  center: {
    flexGrow: 1,
    flexShrink: 1,
    height: HEADER_HEIGHT,
    justifyContent: "flex-end",
    paddingBottom: 16,
    alignItems: "center",
  },
  right: {
    justifyContent: "center",
    height: HEADER_HEIGHT,
  },
  backTitle: {
    fontSize: 11,
  },
  notStringTitle: {
    width: "100%",
    flex: 1,
  },
});
