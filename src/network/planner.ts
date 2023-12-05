import axios from "axios";

export const getCurrentPlanner = async () => {
  try {
    // Make a GET request using Axios
    const response = await axios.get(
      "http://localhost:8080/api/planners/current-planner"
    );

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle errors, you might want to log or display an error message
    console.error("Error fetching planner data:", error);
    throw error; // Rethrow the error to handle it further up the chain
  }
};

export interface CustomerDelivery {
  customerID: number;
  customerName: string;
  pickUpLocation: string;
  dropOffLocation: string;
}

export interface DeliveryRequest {
  startDate: string;
  endDate: string;
  slotNumberOfCurrentDay: number;
  currentDay: string;
  customerDelivery: CustomerDelivery;
}

export const updateCurrentPlanner = async ({
  startDate,
  endDate,
  slotNumberOfCurrentDay,
  currentDay,
  customerDelivery,
}: DeliveryRequest) => {
  try {
    // Make a GET request using Axios with parameters in the body
    const response = await axios.put(
      "http://localhost:8080/api/planners/current-planner",
      {
        startDate,
        endDate,
        slotNumberOfCurrentDay,
        currentDay,
        customerDelivery,
      }
    );
    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle errors, you might want to log or display an error message
    console.error("Error fetching planner data:", error);
    throw error; // Rethrow the error to handle it further up the chain
  }
};
