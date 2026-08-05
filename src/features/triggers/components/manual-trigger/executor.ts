import type { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async({
    nodeId,
    context,
    step,
}) => {
    //publish loading state


    const result = await step.run("manual-trigger", async () => context);

    //publish success state

    return result;
};