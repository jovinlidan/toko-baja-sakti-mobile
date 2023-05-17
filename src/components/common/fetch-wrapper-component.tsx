import { ApiError } from "@common/repositories";
import React from "react";

import ErrorView from "./error-view-component";
import LoadingViewComponent from "./loading-view-component";
import { Text } from "../elements";
import EmptyViewComponent from "./empty-view-component";

interface WrapperProps {
  isLoading?: boolean;
  error?: ApiError | boolean | null;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  component: React.ReactNode;
  errorVertical?: boolean;
  onRetry?: () => void;
  emptyText?: string;
  showEmptyText?: boolean;
  showEmptyComponent?: boolean;
  empty?: boolean;

  noPadding?: boolean;
}

export default function FetchWrapperComponent(props: WrapperProps) {
  const {
    isLoading = false,
    error,
    onRetry,
    loadingComponent,
    component,
    errorComponent,
    empty,
    emptyText,
    noPadding,
  } = props;

  if (isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    return <LoadingViewComponent noPadding={noPadding} />;
  } else if (error) {
    if (errorComponent) {
      return <>{errorComponent}</>;
    }
    return (
      <ErrorView refetch={onRetry} error={error as any} noPadding={noPadding} />
    );
  } else if (empty) {
    if (emptyText) {
      return <Text>{emptyText}</Text>;
    }
    return <EmptyViewComponent refetch={onRetry} noPadding={noPadding} />;
  }

  return <>{component}</>;
}
