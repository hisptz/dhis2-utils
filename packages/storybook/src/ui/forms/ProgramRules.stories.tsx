import {Meta, Story, StoryObj} from "@storybook/react"
import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from '@dhis2/ui'
import {
		FieldProgramRule,
		FieldProgramRuleChildrenProps,
		ProgramRuleProvider,
		ProgramRuleProviderProps,
		RHFDHIS2FormField,
		RHFDHIS2FormFieldProps
} from "@hisptz/dhis2-ui"
import {ProgramRule} from "@hisptz/dhis2-utils";
import {CustomDataProvider} from "@dhis2/app-runtime";
import {RecoilRoot} from "recoil";


type Story = StoryObj<typeof ProgramRuleProvider>;


const fields: RHFDHIS2FormFieldProps[] = [
		{
				label: "Name",
				name: "name",
				valueType: "TEXT"
		},
		{
				name: "dob",
				label: 'Date of birth',
				valueType: "DATE",
				max: new Date().toDateString(),
		},
		{
				label: "Age",
				name: 'age',
				valueType: "NUMBER"
		},
		{
				label: "Sex",
				name: "sex",
				valueType: 'TEXT',
				optionSet: {
						id: 'sex-options',
						options: [
								{
										id: "male",
										name: 'Male',
										code: "male"
								},
								{
										id: "female",
										name: "Female",
										code: 'female'
								}
						]
				}
		},
		{
				label: "Are you pregnant",
				name: 'pregnant',
				valueType: "BOOLEAN"
		},
		{
				label: "How long (in months)",
				name: 'pregnant-months',
				valueType: "NUMBER"
		},
];
const program = {
		id: "random-program",
		programRuleVariables: [
				{
						name: 'dob',
						trackedEntityAttribute: {
								id: 'dob'
						},
						programRuleVariableSourceType: 'TEI_ATTRIBUTE'
				},
				{
						name: 'sex',
						trackedEntityAttribute: {
								id: 'sex'
						},
						programRuleVariableSourceType: 'TEI_ATTRIBUTE'
				},
				{
						name: 'pregnant',
						trackedEntityAttribute: {
								id: 'pregnant'
						},
						programRuleVariableSourceType: 'TEI_ATTRIBUTE'
				},
				{
						name: 'name',
						trackedEntityAttribute: {
								id: 'name'
						},
						programRuleVariableSourceType: 'TEI_ATTRIBUTE'
				},
		]
};

const FormComponent = () => <form
		style={{display: "flex", gap: 16, maxWidth: 500, alignItems: "center", width: "100%", flexDirection: "column"}}>
		{
				fields.map((field: JSX.IntrinsicAttributes & RHFDHIS2FormFieldProps) => (
						<FieldProgramRule key={`${field.name}-program-rule`} validations={field.validations} name={field.name}
															optionSet={field.optionSet}>
								{(props: FieldProgramRuleChildrenProps) => {

										if (props.hidden) {
												return null;
										}

										return (
												<div key={`${field.name}-field-container`} style={{width: "100%"}}>
														<RHFDHIS2FormField key={`${field.name}`} {...field} {...props} />
												</div>
										)
								}}
						</FieldProgramRule>))
		}
</form>

const OptionGroupProvider = ({children}: { children: React.ReactNode }) => (
		<CustomDataProvider data={
				{
						optionGroups: (type, query, options) => {
								console.log(query)
								return {
										optionGroups: [{
												id: "male",
												name: "Male group",
												options: [
														{
																id: "male",
																code: "male",
																name: "Male"
														}
												]
										}]
								} as any
						}
				}
		}>
				{children}
		</CustomDataProvider>
)

export const AssignmentRules: Story = {
		args: {
				program: program,
				programRules: [
						{
								programRuleActions: [
										{
												programRuleActionType: "ASSIGN",
												trackedEntityAttribute: {
														id: "age"
												},
												data: "d2:yearsBetween(A{dob},V{current_date})",
												id: "assign-age"
										}
								],
								condition: "d2:hasValue(A{dob})",
								id: "assign-age-after-dob"
						}
				] as unknown as ProgramRule[],
				attributes: fields.map(({name}) => name),
				children: <><FormComponent/></>

		}
}
export const HideField: Story = {
		args: {
				program: program,
				programRules: [
						{
								programRuleActions: [
										{
												programRuleActionType: "ASSIGN",
												trackedEntityAttribute: {
														id: "age"
												},
												data: "d2:yearsBetween(A{dob},V{current_date})",
												id: "assign-age"
										}
								],
								condition: "d2:hasValue(A{dob})",
								id: "assign-age-after-dob"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant"
												},
												id: "hide-pregnant"
										}
								],
								condition: "A{sex} != 'female'",
								id: "hide-pregnant-for-male"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant-months"
												},
												id: "hide-pregnant-months"
										}
								],
								condition: "!A{pregnant}",
								id: "hide-pregnant-months-if-not-pregnant"
						},
				] as unknown as ProgramRule[],
				attributes: fields.map(({name}) => name),
				children: <><FormComponent/></>

		}
}
export const ShowWarning: Story = {
		args: {
				program: program,
				programRules: [
						{
								programRuleActions: [
										{
												programRuleActionType: "ASSIGN",
												trackedEntityAttribute: {
														id: "age"
												},
												data: "d2:yearsBetween(A{dob},V{current_date})",
												id: "assign-age"
										}
								],
								condition: "d2:hasValue(A{dob})",
								id: "assign-age-after-dob"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant"
												},
												id: "hide-pregnant"
										}
								],
								condition: "A{sex} != 'female'",
								id: "hide-pregnant-for-male"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant-months"
												},
												id: "hide-pregnant-months"
										}
								],
								condition: "!A{pregnant}",
								id: "hide-pregnant-months-if-not-pregnant"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "SHOWWARNING",
												trackedEntityAttribute: {
														id: "pregnant"
												},
												content: "Consider registration to special care for under age pregnancy",
												id: "hide-pregnant"
										}
								],
								condition: "A{pregnant} && d2:yearsBetween(A{dob},V{current_date}) < 18",
								id: "show-warning-for-under-age-pregnancy"
						},
				] as unknown as ProgramRule[],
				attributes: fields.map(({name}) => name),
				children: <><FormComponent/></>
		}
}
export const HideOption: Story = {
		args: {
				program: program,
				programRules: [
						{
								programRuleActions: [
										{
												programRuleActionType: "ASSIGN",
												trackedEntityAttribute: {
														id: "age"
												},
												data: "d2:yearsBetween(A{dob},V{current_date})",
												id: "assign-age"
										}
								],
								condition: "d2:hasValue(A{dob})",
								id: "assign-age-after-dob"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant"
												},
												id: "hide-pregnant"
										}
								],
								condition: "A{sex} != 'female'",
								id: "hide-pregnant-for-male"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant-months"
												},
												id: "hide-pregnant-months"
										}
								],
								condition: "!A{pregnant}",
								id: "hide-pregnant-months-if-not-pregnant"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "SHOWWARNING",
												trackedEntityAttribute: {
														id: "pregnant"
												},
												content: "Consider registration to special care for under age pregnancy",
												id: "hide-pregnant"
										}
								],
								condition: "A{pregnant} && d2:yearsBetween(A{dob},V{current_date}) < 18",
								id: "show-warning-for-under-age-pregnancy"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEOPTION",
												trackedEntityAttribute: {
														id: "sex"
												},
												option: {
														code: "female"
												},
												id: "hide-female-if-man"
										}
								],
								condition: "A{name} == 'John'",
								id: "hide-female-option-if-man"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEOPTION",
												trackedEntityAttribute: {
														id: "sex"
												},
												option: {
														code: "male"
												},
												id: "hide-male-if-lady-name"
										}
								],
								condition: "A{name} == 'Jane'",
								id: "hide-male-if-lady"
						},
				] as unknown as ProgramRule[],
				attributes: fields.map(({name}) => name),
				children: <><FormComponent/></>
		}
}
export const HideOptionGroup: Story = {
		args: {
				program: program,
				programRules: [
						{
								programRuleActions: [
										{
												programRuleActionType: "ASSIGN",
												trackedEntityAttribute: {
														id: "age"
												},
												data: "d2:yearsBetween(A{dob},V{current_date})",
												id: "assign-age"
										}
								],
								condition: "d2:hasValue(A{dob})",
								id: "assign-age-after-dob"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant"
												},
												id: "hide-pregnant"
										}
								],
								condition: "A{sex} != 'female'",
								id: "hide-pregnant-for-male"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant-months"
												},
												id: "hide-pregnant-months"
										}
								],
								condition: "!A{pregnant}",
								id: "hide-pregnant-months-if-not-pregnant"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "SHOWWARNING",
												trackedEntityAttribute: {
														id: "pregnant"
												},
												content: "Consider registration to special care for under age pregnancy",
												id: "hide-pregnant"
										}
								],
								condition: "A{pregnant} && d2:yearsBetween(A{dob},V{current_date}) < 18",
								id: "show-warning-for-under-age-pregnancy"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEOPTIONGROUP",
												trackedEntityAttribute: {
														id: "sex"
												},
												optionGroup: {
														id: "male"
												},
												id: "hide-male-group-if-lady-name"
										}
								],
								condition: "A{name} == 'Jane'",
								id: "hide-male-if-lady"
						},

				] as unknown as ProgramRule[],
				attributes: fields.map(({name}) => name),
				children: <><FormComponent/></>
		}
}
export const ShowError: Story = {
		args: {
				program: program,
				programRules: [
						{
								programRuleActions: [
										{
												programRuleActionType: "ASSIGN",
												trackedEntityAttribute: {
														id: "age"
												},
												data: "d2:yearsBetween(A{dob},V{current_date})",
												id: "assign-age"
										}
								],
								condition: "d2:hasValue(A{dob})",
								id: "assign-age-after-dob"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "SHOWERROR",
												trackedEntityAttribute: {
														id: "dob"
												},
												content: "Date of birth should not be in the future",
												id: "show-error"
										}
								],
								condition: "d2:daysBetween(A{dob},V{current_date}) < 0",
								id: "show-error-if-dob-is-future"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant"
												},
												id: "hide-pregnant"
										}
								],
								condition: "A{sex} != 'female'",
								id: "hide-pregnant-for-male"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEFIELD",
												trackedEntityAttribute: {
														id: "pregnant-months"
												},
												id: "hide-pregnant-months"
										}
								],
								condition: "!A{pregnant}",
								id: "hide-pregnant-months-if-not-pregnant"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "SHOWWARNING",
												trackedEntityAttribute: {
														id: "pregnant"
												},
												content: "Consider registration to special care for under age pregnancy",
												id: "hide-pregnant"
										}
								],
								condition: "A{pregnant} && d2:yearsBetween(A{dob},V{current_date}) < 18",
								id: "show-warning-for-under-age-pregnancy"
						},
						{
								programRuleActions: [
										{
												programRuleActionType: "HIDEOPTIONGROUP",
												trackedEntityAttribute: {
														id: "sex"
												},
												optionGroup: {
														id: "male"
												},
												id: "hide-male-group-if-lady-name"
										}
								],
								condition: "A{name} == 'Jane'",
								id: "hide-male-if-lady"
						},

				] as unknown as ProgramRule[],
				attributes: fields.map(({name}) => name),
				children: <><FormComponent/></>
		}
}

const meta: Meta<ProgramRuleProviderProps> = {
		title: "Form/Program rules",
		component: ProgramRuleProvider,
		decorators: [
				(Story: any) => {
						const form = useForm({
								shouldFocusError: false
						});
						const onSubmit = (data: any) => {
								console.log(data);
						}
						return (
								<RecoilRoot>
										<div
												style={{display: "flex", flexDirection: "column", gap: 8, width: "100%", alignItems: "center"}}>
												<OptionGroupProvider>
														<FormProvider {...form}>
																<Story/>
														</FormProvider>
												</OptionGroupProvider>
												<div>
														<Button onClick={form.handleSubmit(onSubmit)} type="submit">Submit</Button>
												</div>
										</div>
								</RecoilRoot>
						)

				}
		]
}
export default meta;
