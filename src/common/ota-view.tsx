import * as Updates from "expo-updates";
import * as React from "react";

import AppConfig from "../../app.json";
import Toast from "./helpers/toast";

export default function AnnouncementInAppUpdate() {
  React.useEffect(() => {
    async function exec() {
      try {
        const update = await Updates.checkForUpdateAsync();
        const isUpdateable =
          update.isAvailable &&
          `${update?.manifest?.runtimeVersion}` ===
            `${AppConfig.expo.runtimeVersion}`;

        if (isUpdateable) {
          // setIsUpdating(true);
          Toast.info("Memperbaharui aplikasi");
          await Updates.fetchUpdateAsync();
          Toast.info("Aplikasi berhasil diperbaharui, Mohon Restart aplikasi");
        }
      } catch (e: any) {
        if (typeof e?.message === "string") {
          Toast.info(e?.message);
        } else {
          Toast.info("Gagal diperbaharui");
        }
      } finally {
      }
    }

    exec();
  }, []);

  return <></>;
}
