import type {Story} from "@storybook/react";
import React from "react";
import {OrgUnitSelectorProps} from "../OrgUnitSelector/types";
import {PeriodSelectorProps} from "../PeriodSelector/types/props";
import OrgUnitSelectorModal from "./components/OrgUnitSelectorModal";
import PeriodSelectorModal from "./components/PeriodSelectorModal";
import {ModalProps} from "./types";
import OrgUnitDataProvider from "../../../dataProviders/orgUnit";

const PeriodTemplate: Story<ModalProps & PeriodSelectorProps> = (args) => <PeriodSelectorModal {...args} />;
const OrgUnitTemplate: Story<ModalProps & OrgUnitSelectorProps> = (args) => <OrgUnitSelectorModal {...args} />;

export const PeriodSelector = PeriodTemplate.bind({});
PeriodSelector.args = {
  hide: false,
  onClose: () => {
    console.log("onClose");
  },
  onUpdate: (value) => console.log(value),
  singleSelection: true,
  enableDateRange: true,
  enablePeriodSelector: true,

};

export const OrgUnitSelector = OrgUnitTemplate.bind({});
OrgUnitSelector.args = {
  hide: false,
  onClose: () => {
    return;
  },
  onUpdate: (value) => console.log(value),
  singleSelection: true,
};

export default {
  title: "Selectors/Modals",
  components: [PeriodSelectorModal, OrgUnitSelectorModal],
  decorators: [
    (Story: any) => (
      <OrgUnitDataProvider>
        <Story />
      </OrgUnitDataProvider>
    ),
  ],
};
