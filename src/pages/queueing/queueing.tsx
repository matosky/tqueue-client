import { Header } from "../../components/ui/header/header";
import { CustomerTable } from "../../components/common/table/customerTable";
import "./queueing.styles.css";
import { PlannerTable } from "../../components/common/table/plannerTable";
import { useMutation, useQuery } from "react-query";
import {
  DeliveryRequest,
  getCurrentPlanner,
  updateCurrentPlanner,
} from "../../network/planner";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dummy customers in queue for booking
// API to be prepared in future from server
const initialCustomers = [
  {
    customerID: 1,
    customerName: "John Doe",
    pickUpLocation: "123 Main St",
    dropOffLocation: "456 Oak St",
  },
  {
    customerID: 2,
    customerName: "Dani Doe",
    pickUpLocation: "123 Main St",
    dropOffLocation: "456 Oak St",
  },
];
export interface DraggedItem {
  data: {
    customerID: number;
    customerName: string;
    pickUpLocation: string;
    dropOffLocation: string;
    startDate: string;
    endDate: string;
  };
  currentDay: string;
  slotNumberOfCurrentDay: number;
}

const Queueing = () => {
  const [delivery, setDelivery] = useState<DeliveryRequest | undefined>();
  const { data, error, isLoading } = useQuery("plannerData", () =>
    getCurrentPlanner()
  );
  const showToast = () => {
    toast.success('Customer delivery in queue !!!');
  };

  const {
    mutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = useMutation(updateCurrentPlanner);

  // Function to conditionally call mutate when Delivery has complete data
  const handleMutate = async () => {
    if (delivery) {
      console.log("delivery", delivery);
      mutate(delivery, {
        onSuccess: (data) => {
          console.log(data);
            // Show success toast
            toast.success('Delivery shipped successfully!');
        },
        onError: (error) => {
          console.log("error", error);
           // Show error toast
           toast.error('Failed to update delivery!');
        },
      });
    } else {
      console.warn("Incomplete Delivery data. Mutate not called.");
    }
  };

  const handleDrop = ({
    slotNumberOfCurrentDay,
    currentDay,
    data,
  }: DraggedItem) => {
    // console.log("datafff", data);
    if (data) {
      const customerDelivery = {
        pickUpLocation: data?.pickUpLocation,
        dropOffLocation: data?.dropOffLocation,
        customerName: data?.customerName,
        customerID: data?.customerID,
      }
      const item: DeliveryRequest = {
        startDate: data?.startDate,
        endDate: data?.endDate,
        slotNumberOfCurrentDay,
        currentDay,
        customerDelivery: customerDelivery
      }; 
      setDelivery(item)
    }
  };
  
  

  useEffect(() => {
    // Call mutate when Delivery has complete data
    if (delivery) {
      handleMutate();
    }
  }, [delivery]);
  return (
    <div>
      <Header />
      <section className="queueing">
        <div>
          <h3>
            Showing list of 1 - {initialCustomers.length} customers in queue:
          </h3>
          <CustomerTable customers={initialCustomers} />
        </div>
        <div>
          <h3>Deliverables for Next 7 Days</h3>
          {!isLoading ? (
            <PlannerTable planners={data?.data} onDrop={handleDrop} />
          ) : (
            <div>loading</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Queueing;
