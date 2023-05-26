import React, { useRef, useImperativeHandle, useCallback } from "react";
import { Keyboard, ViewStyle } from "react-native";
import { StyleSheet, View } from "../elements";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import colorConstant from "@constants/color.constant";
import zIndexConstant from "@constants/z-index.constant";
import { StatusBar } from "expo-status-bar";

interface Props {
  children: React.ReactNode;
  snapPoints: (string | number)[];
  initialSnapIndex?: number;
  containerStyle?: ViewStyle;
  onAnimated?: (fromIndex: number, toIndex: number) => void;
  onChange?: (index: number) => void;
  onClose: VoidFunction;
}

export interface BottomPanelHandles {
  snapTo(index: number): void;
}

const BottomPanel: React.ForwardRefRenderFunction<BottomPanelHandles, Props> = (
  props,
  ref
) => {
  const {
    children,
    snapPoints,
    containerStyle,
    initialSnapIndex = 0,
    onAnimated,
    onChange,
    onClose,
  } = props;
  const bottomSheetRef = useRef<BottomSheet>(null);
  useImperativeHandle(ref, () => ({
    snapTo: (index: number) => {
      if (bottomSheetRef.current) {
        Keyboard.dismiss();
        if (index >= 0) {
          bottomSheetRef.current.snapToIndex(index);
        } else {
          bottomSheetRef.current.snapToPosition(index);
        }
      }
    },
  }));

  const renderBackdrop = useCallback(
    (renderBackdropProps) => (
      <BottomSheetBackdrop
        {...renderBackdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={initialSnapIndex}
        enablePanDownToClose
        style={[styles.defaultStyle, containerStyle]}
        backgroundComponent={null}
        backdropComponent={renderBackdrop}
        handleComponent={() => <View style={styles.handle} />}
        onAnimate={onAnimated}
        onChange={onChange}
        detached
        onClose={onClose}
      >
        {children}
      </BottomSheet>
    </>
  );
};

export default React.forwardRef(BottomPanel);

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: colorConstant.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: colorConstant.stroke,
    borderWidth: 2,
  },
  handle: {
    backgroundColor: colorConstant.primaryOrange1,
    height: 4,
    width: 32,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 8,
  },
  // handleBar: {
  //   width: "20%",
  //   backgroundColor: color.primaryBlue1,
  //   height: 5,
  //   borderRadius: 20,
  // },
});
