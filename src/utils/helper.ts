import { TransactionStatusEnum } from "@api-hooks/transaction/transaction.model";
import config from "@common/config";
import { MutationMethodType } from "@common/helpers/common";
import Toast from "@common/helpers/toast";
import colorConstant from "@constants/color.constant";
import { Platform } from "react-native";
import ReactNativeBlobUtil, {
  ReactNativeBlobUtilConfig,
} from "react-native-blob-util";

export function getTransactionStatusLabel(status?: TransactionStatusEnum) {
  switch (status) {
    case TransactionStatusEnum.Created:
      return "Belum Dibayar";
    case TransactionStatusEnum.InProcess:
      return "Sedang Diproses";
    case TransactionStatusEnum.Requested:
      return "Menunggu Kurir";
    case TransactionStatusEnum.Shipped:
      return "Sedang Dikirim";
    case TransactionStatusEnum.Delivered:
      return "Pesanan Telah Tiba Di Tujuan";
    case TransactionStatusEnum.Finished:
      return "Selesai";
    case TransactionStatusEnum.Disputed:
      return "Dikomplain";
    case TransactionStatusEnum.Cancelled:
      return "Dibatalkan";
    case TransactionStatusEnum.AllReturn:
      return "Dikembalikan semua";
    case TransactionStatusEnum.HalfReturn:
      return "Dikembalikan sebagian";
  }
}
export function getTransactionStatusColor(status?: TransactionStatusEnum) {
  switch (status) {
    case TransactionStatusEnum.Created:
    case TransactionStatusEnum.InProcess:
    case TransactionStatusEnum.Requested:
    case TransactionStatusEnum.Shipped:
      return colorConstant.primaryOrange1;
    case TransactionStatusEnum.Delivered:
    case TransactionStatusEnum.Finished:
      return colorConstant.successDefault;
    case TransactionStatusEnum.Disputed:
    case TransactionStatusEnum.Cancelled:
    case TransactionStatusEnum.AllReturn:
    case TransactionStatusEnum.HalfReturn:
      return colorConstant.redDefault;
  }
}

interface DownloadFileProps {
  url: string;
  filePathTitle: string;
  filePathType: string;
  title: string;
  method?: MutationMethodType;
}

const MIME = {
  pdf: "application/pdf",
  doc: "application/msword",
  xls: "application/vnd.ms-excel",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  sldx: "application/vnd.openxmlformats-officedocument.presentationml.slide",
  ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export const downloadFile = async (props: DownloadFileProps, authToken) => {
  const { url, filePathTitle, filePathType, title, method = "GET" } = props;

  const signalError = (e?: any) => {
    Toast.error(e.message);
  };

  const signalSuccess = () => {
    Toast.success("Unduh berhasil");
  };

  try {
    const {
      dirs: { DownloadDir, DocumentDir, LegacyDownloadDir },
    } = ReactNativeBlobUtil.fs;
    const isIOS = Platform.OS === "ios";
    const directoryPath = Platform.select({
      ios: LegacyDownloadDir ? LegacyDownloadDir : DocumentDir,
      android: LegacyDownloadDir ? LegacyDownloadDir : DownloadDir,
    });
    const date = new Date();
    const filePath = `${directoryPath}/${filePathTitle}_${Math.floor(
      date.getTime() + date.getSeconds() / 2
    )}.${filePathType}`;

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
        notification: true,
      },
      android: {
        fileCache: true,
        indicator: true,
        overwrite: true,
        appendExt: "pdf",
        addAndroidDownloads: {
          useDownloadManager: true,
          title,
          path: filePath,
          notification: true,
        },
      },
    });

    ReactNativeBlobUtil.config(configOptions as ReactNativeBlobUtilConfig)
      .fetch(method, config.apiEndpoint + "/api/user" + url, {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .then((resp) => {
        signalSuccess();
        if (isIOS) {
          ReactNativeBlobUtil.ios.previewDocument(resp.path());
        } else if (Platform.OS === "android") {
          ReactNativeBlobUtil.android.actionViewIntent(
            filePath,
            MIME[filePathType]
          );
        }
      })
      .catch((e) => {
        e.message ? signalError(e.message) : signalError();
      });
  } catch (error) {}
};
