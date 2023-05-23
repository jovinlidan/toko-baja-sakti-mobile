import ky, { HTTPError, TimeoutError } from "ky";

import { ApiError } from "./index";

export default async function toApiError(error: Error): Promise<ApiError> {
  const mError: ApiError = {
    message: error.message,
  };

  if (error instanceof HTTPError) {
    mError.message = error.message;
    try {
      const body = await error.response.json();
      mError.message = body.message;
      mError.statusCode = body.statusCode;
      mError.errors = body.errors;
    } catch {}
  } else if (error instanceof TimeoutError) {
    mError.message = "Looks like the server is taking too long to respond";
  } else {
    // return error;
    // if (error.message === "Network request failed") {
    //   mError.message =
    //     "Looks like there is problem with the internet connection";
    // }
  }
  return mError;
}
