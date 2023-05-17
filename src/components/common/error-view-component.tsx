import { ApiError } from "@common/repositories";
import * as React from "react";
import { View, ActivityIndicator, StyleSheet, Text, Button } from "../elements";
import colorConstant from "@constants/color.constant";

interface Props {
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  refetch?: () => void;
  error?: ApiError;
}

export default function ErrorViewComponent(props: Props) {
  const { isLoading, refetch, error } = props;

  return (
    <View style={styles.errorViewContainer}>
      <View style={styles.errorContentContainer}>
        <Text variant="bodyReg" style={styles.text}>
          Gagal Memuat {error && `(${error?.message})`}
        </Text>
      </View>
      <View style={styles.errorActionContainer}>
        {isLoading ? (
          <ActivityIndicator color={colorConstant.white} size="large" />
        ) : (
          <View style={styles.refreshContainer}>
            <Button
              variant="primary"
              onPress={() => {
                refetch && refetch();
              }}
              style={styles.button}
            >
              Coba Ulang
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colorConstant.redDefault,
  },
  errorViewContainer: {
    display: "flex",
    marginBottom: 16,
    marginTop: 16,
  },
  errorContentContainer: {},

  errorActionContainer: {},

  refreshContainer: {
    marginTop: 8,
    alignItems: "center",
  },

  button: {
    paddingVertical: 12,
    width: 120,
  },
});
