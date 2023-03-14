import * as React from 'react';
import {
  useController,
  useFormContext,
  ControllerRenderProps,
  ControllerFieldState,
} from 'react-hook-form';

type RenderFunc = ({
  field,
  fieldState,
}: {
  field: ControllerRenderProps;
  fieldState: ControllerFieldState;
}) => React.ReactElement<any>;
interface Props {
  render: RenderFunc;
  name: string;
}

export default function ControlledForm(props: Props) {
  const {render, name} = props;
  const {control} = useFormContext<any>();
  const {field, fieldState} = useController({control, name: name});

  const renderContent = React.useCallback(() => {
    const renderFunc = render as RenderFunc;
    return renderFunc({field, fieldState});
  }, [field, fieldState, render]);

  return <>{renderContent()}</>;
}
