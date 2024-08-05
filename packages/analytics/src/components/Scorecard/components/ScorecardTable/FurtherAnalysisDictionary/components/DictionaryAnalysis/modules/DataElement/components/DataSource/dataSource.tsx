import React from "react";
import { useDataItemDetails } from "../../../../../DetailsProvider";

export default function DataSource({ id }: any) {
	const details = useDataItemDetails<{
		domainType: "AGGREGATE";
	}>();

	return (
		<>
			{/*{details?.domainType === detailsElementDomainTypes.AGGREGATE && (*/}
			{/*	<DataSets id={id} />*/}
			{/*)}*/}
			{/*{details.domainType === detailsElementDomainTypes.TRACKER && (*/}
			{/*	<Programs id={id} />*/}
			{/*)}*/}
			{/*<div>*/}
			{/*	<OtherDetailTable />*/}
			{/*</div>*/}
		</>
	);
}
