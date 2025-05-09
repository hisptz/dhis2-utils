import { Field } from "@dhis2/ui";
import JoditEditor, { Jodit } from "jodit-react";
import React, { forwardRef } from "react";
import { FieldProps } from "../../interfaces";

export interface RichTextEditorProps extends FieldProps {
	config?: Parameters<typeof JoditEditor>[0]["config"];
}

export const RichTextEditor: React.FC<RichTextEditorProps> = forwardRef<
	typeof Jodit,
	RichTextEditorProps
>(
	(
		{
			name,
			label,
			value,
			onChange,
			error,
			config: overrideConfig,
			warning,
			...props
		},
		ref,
	) => {
		const config: Parameters<typeof JoditEditor>[0]["config"] = {
			readonly: false,
			defaultFontSizePoints: "pt" as const,
			...(overrideConfig ?? {}),
		};
		return (
			<Field
				{...props}
				name={name}
				label={label}
				error={Boolean(error)}
				warning={Boolean(warning)}
				validationText={
					typeof props.warning === "string"
						? props.warning
						: typeof error === "string"
							? error
							: undefined
				}
			>
				<JoditEditor
					ref={ref}
					value={value}
					onBlur={(newValue: any) => onChange(newValue)}
					config={config}
				/>
			</Field>
		);
	},
);
