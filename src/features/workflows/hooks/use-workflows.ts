import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams();

    return useSuspenseQuery(trpc.Workflows.getMany.queryOptions(params));
};

export const useCreateWorkflow = () => {
    
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    

    return useMutation(
        trpc.Workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}"created`);
                queryClient.invalidateQueries(
                    trpc.Workflows.getMany.queryOptions({}),
                );
            },
            onError: (error) => {
                toast.error(`Failed to create workflow: ${error.message}`);
            },
        }),
    );
};