import { StyleSheet } from "react-native";
import colorConstant from "./color.constant";

export default StyleSheet.create({
  h1: {
    fontSize: 40,
    lineHeight: 40,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
  },
  h5: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
  },
  h6: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },
  bodyLg: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
  },
  bodyReg: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
  },
  bodySm: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
  label: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "700",
  },
  hint: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "400",
  },
  linkReg: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    borderBottomColor: colorConstant.gray1,
    borderBottomWidth: 1,
  },
  linkSm: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    borderBottomColor: colorConstant.gray1,
    borderBottomWidth: 1,
  },
});
