import React, { PureComponent } from "react";
import "./Table.scss";

interface Props<T> {
	thRowData: Array<T> | undefined;
	tbRowData: Array<{ [key: string]: any }>
}

export default class TableBenefits extends PureComponent<Props<any>> {
	render() {
		const { thRowData, tbRowData } = this.props;
		return (
			<table role="table" className="table table-borderless table-benefits col-12 px-0">
				<thead>
					<tr role="row">
						{thRowData?.map((headVal, index) => (
							<th key={index} role="cell"><div className="border-lb">{headVal}</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tbRowData.map((bodyVal, index) => (
						<tr key={index} role="row">
							<td role="cell">{bodyVal.benefits}</td>
							<td role="cell">{bodyVal.bronze}</td>
							<td role="cell">{bodyVal.silver}</td>
							<td role="cell">{bodyVal.gold}</td>
						</tr>
					))}

				</tbody>
			</table>
		)
	}

}