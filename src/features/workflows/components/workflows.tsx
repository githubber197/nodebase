"use client";
import { boolean } from "zod";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useUpgradeModel } from "../hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "../hooks/use-entity-search";
import { Workflow } from "@/generated/prisma/browser";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner";


export const WorkflowsSearch = () => {
    const [params, SetParams] = useWorkflowsParams();
    const { searchValue, onSearchChange } = useEntitySearch({
        params,
        setParams: SetParams,
    });

    return (
        <EntitySearch 
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search Workflows"
        />
    );
};

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return (
        <EntityList 
            items={workflows.data.items}
            getKey={(workflow) => workflow.id}
            renderItem={(workflow) => <WorkflowItem data={workflow} />}
            emptyView={<WorkflowsEmpty />}
        />
    )
};

export const WorkflowsHeader = ({ disabled }: {disabled?: boolean}) =>
{
    const createWorkflow = useCreateWorkflow();
    const router = useRouter();
    const { handleError, model } = useUpgradeModel();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            },

            onError: (error) => {
                handleError(error);
            },
        });
    }

    return (
        <>
            {model}
            <EntityHeader
                title="Workflows"
                description="Create and manage your workflows"
                onNew={handleCreate}
                newButtonLabel="New workflow"
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            />
        </>
    );
};

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [params, SetParams] = useWorkflowsParams();

    return (
        <EntityPagination
            disabled={workflows.isFetching}
            totalPages={workflows.data.totalPages}
            page={workflows.data.page}
            onPageChange={(page) => 
                SetParams({
                    ...params,
                    page
                })
            }
        />
    );
};

export const WorkflowsContainer = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
    <EntityContainer
        header={<WorkflowsHeader />}
        search={<WorkflowsSearch />}
        pagination={<WorkflowsPagination />}
    >
        {children}
    </EntityContainer>
    );;
};

export const WorkflowsLoading = () => {
    return <LoadingView message="Loading workflows" />;
};

export const WorkflowsError = () => {
    return <ErrorView message="Failed to load workflows" />;
};

export const WorkflowsEmpty = () => {
    const createWorkflow = useCreateWorkflow();
    const { handleError, model } = useUpgradeModel();
    
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error);
            },
        });
    };

    return (
        <>
            {model}
        <EmptyView
            onNew={handleCreate}
            message="No workflows found. Get started by creating one." 
        />
        </>
    );
};

export const WorkflowItem = ({
    data,
}: {data: Workflow}) => {

    const removeWorkflow = useRemoveWorkflow();
    
    const handleRemove = () => {
        removeWorkflow.mutate({id: data.id }, {
            onError: (error) => {
                toast.error(`Failed to remove workflow: ${error.message}`);
            },
        });
    }

    return (
        <EntityItem
            href={`/workflows/${data.id}`}
            title={data.name}
            subtitle={
                <>
                    Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
                    &bull; Created {" "}
                    {formatDistanceToNow(data.createdAt, { addSuffix: true })}
                </>
            }
            image={
                <div className="size-8 flex items-center justify-center">
                    <WorkflowIcon className="size-5 text-muted-foreground" />
                </div>
            }
            onRemove={handleRemove}
            isRemoving={removeWorkflow.isPending}
        />
    );
}