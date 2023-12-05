// CustomerTable.tsx
import React from 'react';
import './customer-table.styles.css';
import { Draggable } from '../../ui/draggable/draggable';


interface Customer {
  customerID: number;
  customerName: string;
  pickUpLocation: string;
  dropOffLocation: string;
  _id?: string;
}
interface TableProps {
  customers: Customer[];
}

export const CustomerTable: React.FC<TableProps> = ({ customers }) => (
  <div className="Table">
    <div className="Heading">
      <div className="Cell">
        <p>Customer ID</p>
      </div>
      <div className="Cell">
        <p>Customer Name</p>
      </div>
      <div className="Cell">
        <p>Pick Up Location</p>
      </div>
      <div className="Cell">
        <p>Drop Off Location</p>
      </div>
    </div>

    {customers.map((customer: Customer, rowIndex) => (
      <Draggable key={rowIndex} customer={customer}/>
    ))}
  </div>
);
