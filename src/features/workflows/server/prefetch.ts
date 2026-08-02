import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.Workflows.getMany>;

export const prefetchWorkflows = (params: Input) => {
    return prefetch(trpc.Workflows.getMany.queryOptions(params));
};

/**
 * Prefetch a single workflow by its ID.
 */

export const prefetchWorkflow = (id: string) => {
    return prefetch(trpc.Workflows.getOne.queryOptions({ id }));
}
