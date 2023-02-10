import React from "react";
import {FormSectionInterface} from "./interfaces";
import {FormSection} from "./components/FormSection";


export interface SectionFormProps {
    sections: FormSectionInterface[];
    showProgress?: boolean;
    collapsible?: boolean;
}

export function SectionForm({sections, showProgress, collapsible}: SectionFormProps) {
    return (
        <form>
            {
                sections.map((section) => (
                    <FormSection collapsible={collapsible} key={`${section.id}-form-section`} section={section}
                                 showProgress={showProgress}/>
                ))
            }
        </form>
    )
}
