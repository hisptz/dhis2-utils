import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {ConfirmDialog, ConfirmDialogProps} from "@hisptz/dhis2-ui";


const meta: Meta<ConfirmDialogProps> = {
    title: "Dialogs/Confirm Dialog/Confirm Dialog",
    component: ConfirmDialog,
    argTypes: {
        title: {
            control: {
                type: "text",
            },
        },
        message: {
            control: {
                type: "text",
            },
        },
        position: {
            control: {
                type: "select",
                options: ["top", "middle", "bottom"],
            },
        },
        size: {
            control: {
                type: "select",
                options: ["small", "large"],
            },
        },
        hide: {
            control: {
                type: "boolean",
            },
        },
        cancelButtonText: {
            control: {
                type: "text",
            },
        },
        confirmButtonText: {
            control: {
                type: "text",
            },
        },
        confirmButtonColor: {
            control: {
                type: "select",
                options: ["primary", "secondary", "destructive"],
            },
        },
    },
}

type Story = StoryObj<typeof ConfirmDialog>;

export const ConfirmDialogExample: Story = {
    args: {
        title: "Confirm Title",
        message: "Confirm Content",
        onConfirm: () => {
            alert("Confirm 🤗");
        },
        onCancel: () => {
            alert("Cancel 😔");
        },
    }
}
export const ConfirmDialogExampleWithAllOptions: Story = {
    args: {
        title: "Confirm Title",
        message: "Confirm Content",
        position: "middle",
        size: "small",
        hide: false,
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
        confirmButtonColor: "primary",
        onConfirm: () => {
            alert("Confirm 🤗");
        },
        onCancel: () => {
            alert("Cancel 😔");
        },
        customActions: [
            {
                label: "Custom Action",
                color: "secondary",
                onClick: () => {
                    alert("Custom Action 🙃");
                },
            },
        ],
    }
}
export default meta;
