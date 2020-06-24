import React, { Component } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import data from "./data";

const { Column, ColumnGroup } = Table;
class IndividualSummary extends Component {
  render() {
    return (
      <Table
        dataSource={data[0].DBT}
        scroll={{ x: true }}
        bordered
        size="small"
        pagination={false}
      >
        <Column title="Day" dataIndex="day" key="day" />
        <ColumnGroup title="Highest Urge To:" width={150}>
          <Column
            title="Commit Suicide"
            dataIndex="urges.suicide"
            key="suicide"
            width={75}
            align="center"
          />
          <Column
            title="Self-harm"
            dataIndex="urges.selfHarm"
            key="self-harm"
            width={75}
            align="center"
          />
          <Column
            title="Use Drugs"
            dataIndex="urges.drugs"
            key="drugs"
            width={75}
            align="center"
          />
        </ColumnGroup>
        <ColumnGroup title="Highest Rating For Each Day:">
          <Column
            title="Emotional Misery"
            dataIndex="dailyRating.emoMisery"
            key="emoMisery"
            width={85}
            align="center"
          />
          <Column
            title="Physical Misery"
            dataIndex="dailyRating.phyMisery"
            key="phyMisery"
            width={75}
            align="center"
          />
          <Column
            title="Joy"
            dataIndex="dailyRating.joy"
            key="joy"
            align="center"
          />
        </ColumnGroup>
        <ColumnGroup title="Drugs/Medication">
          <ColumnGroup title="Alcohol">
            <Column
              title="#"
              dataIndex="drugsMeds.alcohol.amt"
              key="alocohol#"
            />
            <Column
              title="What?"
              dataIndex="drugsMeds.alcohol.name"
              key="alocoholName"
            />
          </ColumnGroup>
          <ColumnGroup title="Illicit Drugs">
            <Column
              title="#"
              dataIndex="drugsMeds.illicitDrugs.amt"
              key="drugs#"
            />
            <Column
              title="What?"
              dataIndex="drugsMeds.illicitDrugs.name"
              key="drugsName"
            />
          </ColumnGroup>
          <ColumnGroup title="Meds. as Prescribed">
            <Column
              title="Yes/No"
              dataIndex="drugsMeds.meds.prescribed"
              key="isPrescribed"
              width={75}
              align="center"
            />
          </ColumnGroup>
          <ColumnGroup title="PRN/Over the Counter">
            <Column title="#" dataIndex="drugsMeds.meds.amt" key="meds#" />
            <Column
              title="What?"
              dataIndex="drugsMeds.meds.name"
              key="medsName"
            />
          </ColumnGroup>
        </ColumnGroup>
        <ColumnGroup title="Actions">
          <Column
            title="Self-Harm"
            dataIndex="actions.selfHarm"
            key="selfharm"
            width={75}
            align="center"
          />
          <Column
            title="Skills"
            dataIndex="actions.skills"
            key="skills"
            width={75}
            align="center"
          />
        </ColumnGroup>
      </Table>
    );
  }
}

export default IndividualSummary;
