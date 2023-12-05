import React, { useState } from "react";
import "./planner-table.styles.css";
import { Dropzone } from "../../ui/dropzone/dropzone";
import { DeliveryRequest } from "../../../network/planner";
import { DraggedItem } from "../../../pages/queueing/queueing";
import { formatTimestampToDate, formatToReadableTime } from "../../../helpers/format-time-stamps";

interface Delivery {
  customerID: string;
  customerName: string;
  pickUpLocation: string;
  dropOffLocation: string;
  _id: string;
}

interface DeliveryItem{
  customerDelivery: Delivery;
  startDate: string;
  endDate: string;
  currentDay: string;
  slotNumberOfCurrentDay: number;
}

interface Slot {
  slotNumber: number;
  deliveries: Delivery[];
  _id: string;
}

interface Planner {
  date: string;
  slots: Slot[];
}



interface TableRowProps {
  currentDay: string;
  rowIndex: number;
  onDrop: (data: DraggedItem) => void;
  planner: Planner;
}

const TableRow: React.FC<TableRowProps> = ({
  currentDay,
  rowIndex,
  onDrop,
  planner,
}) => {


  const deliveriesForPlannerSlot1 = planner?.slots[0]?.deliveries
    ?.map((customer) => customer?.customerName)
    .join(",");
  const deliveriesForPlannerSlot2 = planner?.slots[1]?.deliveries
    ?.map((customer) => customer?.customerName)
    .join(",");
  const deliveriesForPlannerSlot3 = planner?.slots[2]?.deliveries
    ?.map((customer) => customer?.customerName)
    .join(",");
  const deliveriesForPlannerSlot4 = planner?.slots[3]?.deliveries
    ?.map((customer) => customer?.customerName)
    .join(",");
  const displayCustomersInEachSlotInEachDate = () => {
    const customers = planner?.slots[2]?.deliveries;
    return customers;
  };

  //  console.log(displayCustomersInSlot())
  return (
    <div className="tablePlannerRow">
      <div className="PlannerTableCell">
        <p>{formatToReadableTime(currentDay)}</p>
      </div>
      <Dropzone
        text={deliveriesForPlannerSlot1}
        currentDay={formatTimestampToDate(currentDay)}
        slotNumber={1}
        onDrop={onDrop}
      />
      <Dropzone
        text={deliveriesForPlannerSlot2}
        currentDay={formatTimestampToDate(currentDay)}
        slotNumber={2}
        onDrop={onDrop}
      />
      <Dropzone
        text={deliveriesForPlannerSlot3}
        currentDay={formatTimestampToDate(currentDay)}
        slotNumber={3}
        onDrop={onDrop}
      />
      <Dropzone
        text={deliveriesForPlannerSlot4}
        currentDay={formatTimestampToDate(currentDay)}
        slotNumber={4}
        onDrop={onDrop}
      />
    </div>
  );
};

interface PlannerTableProps {
  planners: Planner[];
  onDrop: (data: DraggedItem) => void;
}

const PlannerTable: React.FC<PlannerTableProps> = ({ planners, onDrop }) => (
  <div className="Table">
    <div className="PlannerHeading">
      <div className="PlannerHeadTableCell">
        <p>Date</p>
      </div>
      <div className="PlannerHeadTableCell">
        <p>Slot1</p>
      </div>
      <div className="PlannerHeadTableCell">
        <p>Slot2</p>
      </div>
      <div className="PlannerHeadTableCell">
        <p>Slot3</p>
      </div>
      <div className="PlannerHeadTableCell">
        <p>Slot4</p>
      </div>
    </div>

    {planners.map((planner: Planner, rowIndex) => (
      <TableRow
        key={rowIndex}
        planner={planner}
        currentDay={planner.date}
        rowIndex={rowIndex}
        onDrop={onDrop}
      />
    ))}
  </div>
);

export { PlannerTable };
