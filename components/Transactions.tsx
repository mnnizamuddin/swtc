import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";
import { TableProps, Transaction } from "../types/index";

const Transactions: React.FC<TableProps> = ({
  transactions,
  eurRates,
}: TableProps) => {
  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      render: (timestamp: string) => dayjs(timestamp).format("MM DD YYYY"),
    },
    {
      title: "Currency",
      dataIndex: "currency",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Eur equiv",
      render: (record: Transaction) => {
        const eurRate = eurRates ? eurRates[record.currency] : null;
        return eurRate ? Math.ceil(record.amount * eurRate * 100) : "--";
      },
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Table
      bordered
      title={() => <h3 style={{ fontWeight: "bold" }}>Transactions</h3>}
      dataSource={transactions}
      columns={columns}
    />
  );
};

export default Transactions;
