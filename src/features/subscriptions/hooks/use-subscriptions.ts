import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";

export const useSubscription = () => {
    return useQuery({
        queryKey: ["subscription"],
        queryFn: async () => {
            const { data } = await authClient.customer.state();
            return data;
        },
    });
};

export const useHasActiveSubscriptions = () => {
    const { data: customerState, isLoading, ...rest } = useSubscription();

    const hasActiveSubscriptions = 
    customerState?.activeSubscriptions && 
    customerState.activeSubscriptions.length > 0;

    return {
        hasActiveSubscriptions,
        subscription: customerState?.activeSubscriptions?. [0],
        isLoading,
        ...rest,
    };
};