import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useQuery } from "react-query";
import { getCurrentPlanner } from "../../../network/planner";
import { formatTimestampToDate } from "../../../helpers/format-time-stamps";
import { DraggedItem } from "../../../pages/queueing/queueing";

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
interface DropzoneProps {
  text?: string;
  currentDay: string;
  slotNumber: number;
  onDrop: (data: DraggedItem) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
  text,
  currentDay,
  slotNumber,
  onDrop,
}) => {

  
  const [{ canDrop, isOver }, drop] = useDrop(() => ({

    accept: "box",
    drop: (item: DraggedItem) => {
        onDrop({...item, currentDay, slotNumberOfCurrentDay: slotNumber});
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

 

  const isActive = canDrop && isOver;
  let backgroundColor = "transparent";

  if (isActive) {
    backgroundColor = "#000";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

 



const displayText = (customer: string | undefined): string => {
  const customers = customer?.split(",") ?? [];
  const hasMoreCustomersInSameSlot = customers.length > 1;

  if (hasMoreCustomersInSameSlot) {
    const firstCustomer = customers[0].trim();
    const remainingCustomersCount = customers.length - 1;
    return `${firstCustomer} and ${remainingCustomersCount}+`;
  }
  return customer ?? "";
};
  return (
    <div className="PlannerTableCell" ref={drop} style={{ backgroundColor }}>
      <p>{isActive ? "" : displayText(text)}</p>
    </div>
  );
};

export { Dropzone };
