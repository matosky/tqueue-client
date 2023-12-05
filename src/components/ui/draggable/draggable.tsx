import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useQuery } from "react-query";
import { getCurrentPlanner } from "../../../network/planner";
import { formatTimestampToDate } from "../../../helpers/format-time-stamps";

export const ItemTypes = {
  BOX: "box",
};

interface Customer {
  customerID: number;
  customerName: string;
  pickUpLocation: string;
  dropOffLocation: string;
  _id?: string;
}
interface TableProps {
  customer: Customer;
}

const style: React.CSSProperties = {
  backgroundColor: "white",
  marginBottom: "1.5rem",
  cursor: "move",
};

export const Draggable: React.FC<TableProps> = ({ customer }) => {
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();


  const draggableItem = {...customer, startDate, endDate}
  const { data, error, isLoading } = useQuery("plannerData", () =>
  getCurrentPlanner()
);
   // getting the start and end date parameters for updating a planner slot
   useEffect(() => {
    if (!isLoading) {
      const startDate = formatTimestampToDate(data?.data[0]?.date);
      const endDate = formatTimestampToDate(data?.data[6]?.date);
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, [isLoading]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { data: draggableItem },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult ) {
        // console.log("item", item.data);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }),[startDate,endDate]);



  const opacity = isDragging ? 0.4 : 1;

  




  return (
    <div
      className="Row"
      ref={drag}
      style={{ ...style, opacity }}
      data-testid={`box`}
    >
      <div className="Cell">
        <p>{customer.customerID}</p>
      </div>
      <div className="Cell">
        <p>{customer.customerName}</p>
      </div>
      <div className="Cell">
        <p>{customer.pickUpLocation}</p>
      </div>
      <div className="Cell">
        <p>{customer.dropOffLocation}</p>
      </div>
    </div>
  );
};
