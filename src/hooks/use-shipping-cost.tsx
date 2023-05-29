import { CourierCost } from "@api-hooks/checkout/checkout.model";
import * as React from "react";

interface ShippingCostContext {
    cost?: CourierCost;
    setCost?: React.Dispatch<React.SetStateAction<CourierCost | undefined>>;
}

const context = React.createContext<ShippingCostContext>({});

const { Provider } = context;

export default function ShippingCostProvider(props: React.PropsWithChildren) {
    const [cost, setCost] = React.useState<CourierCost>();
    return <Provider value={{ cost, setCost }}>{props.children}</Provider>;
}

export function useShippingCostContext() {
    return React.useContext(context);
}
