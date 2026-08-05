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

/**
 * Hook to remove a workflow by its ID. It uses the TRPC client to call the remove mutation and handles success and error cases with toast notifications. On success, it invalidates the workflows query to refresh the list.
 * @returns {object} An object containing the mutation function and its state.
 */
export const useRemoveWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.Workflows.remove.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" removed`);
                queryClient.invalidateQueries(
                    trpc.Workflows.getMany.queryOptions({}),
                );
                queryClient.invalidateQueries(
                    trpc.Workflows.getOne.queryFilter({ id: data.id }),
                );
            }
        })
    )
}

/**
 * Hook to fetch single workflow using suspense
 */
export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.Workflows.getOne.queryOptions({ id }));
};

/**
 * 
 * Hook to update workflow name
 */

export const useUpdateWorkflowName = () => {
    
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    

    return useMutation(
        trpc.Workflows.updateName.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" updated`);
                queryClient.invalidateQueries(
                    trpc.Workflows.getMany.queryOptions({}),
                );
                queryClient.invalidateQueries(
                    trpc.Workflows.getOne.queryOptions({ id: data.id }),
                );
            },
            onError: (error) => {
                toast.error(`Failed to update workflow: ${error.message}`);
            },
        }),
    );
};

/**
 *  Hook to update a workflow
 */

export const useUpdateWorkflow = () => {
    
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    

    return useMutation(
        trpc.Workflows.update.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" saved`);
                queryClient.invalidateQueries(
                    trpc.Workflows.getMany.queryOptions({}),
                );
                queryClient.invalidateQueries(
                    trpc.Workflows.getOne.queryOptions({ id: data.id }),
                );
            },
            onError: (error) => {
                toast.error(`Failed to save workflow: ${error.message}`);
            },
        }),
    );
};

/**
 *  Hook to execute a workflow
 */

export const useExecuteWorkflow = () => {
    
    const trpc = useTRPC();
    

    return useMutation(
        trpc.Workflows.execute.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" executed`);
            },
            onError: (error) => {
                toast.error(`Failed to execute workflow: ${error.message}`);
            },
        }),
    );
};