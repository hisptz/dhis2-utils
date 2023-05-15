import {Button} from "@dhis2/ui";
import type {Story} from "@storybook/react";
import React, {ReactNode} from "react";
import {ConfirmDialogConfig, ConfirmDialogProvider, useConfirmDialog} from "@hisptz/dhis2-ui";

const ExampleChild = ({config, isAsync}: { config?: ConfirmDialogConfig, isAsync?: boolean }) => {
    const {confirm} = useConfirmDialog();

    return (
        <Button
            onClick={() => {
                confirm(
                    config ?? {
                        title: "Are you sure?",
                        message: "Your confirm message will appear here",
                        onConfirm: isAsync ? async () => {
                            alert(await new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    resolve("Confirmed 🤗")
                                }, 5000)
                            }))
                        } : () => {
                            alert("Confirmed 🤗");
                        },
                        onCancel: () => {
                            alert("Cancelled 😔");
                        },
                    }
                );
            }}>
            Click me!
        </Button>
    );
};

const Template: Story<{ children: ReactNode }> = (args) =>
    <ConfirmDialogProvider>{args.children}</ConfirmDialogProvider>;

export const ConfirmDialogInProvider = Template.bind({});
ConfirmDialogInProvider.args = {
    children: (
        <div>
            <ExampleChild/>
        </div>
    ),
};
export const ConfirmDialogInProviderWithAsync = Template.bind({});
ConfirmDialogInProviderWithAsync.args = {
    children: (
        <div>
            <ExampleChild isAsync/>
        </div>
    ),
};

export const ConfirmDialogInProviderWithOptions = Template.bind({});
ConfirmDialogInProviderWithOptions.args = {
    children: (
        <div>
            <ExampleChild
                config={{
                    title: "Are you sure?",
                    message: "Your confirm message will appear here",
                    onConfirm: () => {
                        alert("Confirmed 🤗");
                    },
                    onCancel: () => {
                        alert("Cancelled 😔");
                    },
                    customActions: [
                        {
                            label: "Custom",
                            color: "secondary",
                            onClick: () => {
                                alert("Custom 😉");
                            },
                        },
                    ],
                    cancelButtonText: "Custom cancel",
                    confirmButtonText: "Custom confirm",
                    confirmButtonColor: "primary",
                }}
            />
        </div>
    ),
};

export default {
    title: "Dialogs/Confirm Dialog/Confirm Dialog Provider",
    component: ConfirmDialogInProviderWithAsync,
};
