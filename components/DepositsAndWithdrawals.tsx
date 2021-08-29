import { Table } from "antd";
import React from "react";
import { TableProps } from "../types/index";

const DepositsAndWithdrawals: React.FC<TableProps> = ({
  transactions,
  eurRates,
}: TableProps) => {
  const columns = [
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Total completed withdrawals",
      dataIndex: "completedWithdrawals",
      key: "completedWithdrawals",
    },
    {
      title: "Total completed deposits",
      dataIndex: "completedDeposits",
      key: "completedDeposits",
    },
    {
      title: "Total pending withdrawals",
      dataIndex: "pendingWithdrawals",
      key: "pendingWithdrawals",
    },
    {
      title: "Total pending deposits",
      dataIndex: "pendingDeposits",
      key: "pendingDeposits",
    },
    {
      title: "Total balance (completed deposits - completed withdrawals)",
      dataIndex: "totalBalance",
      key: "totalBalance",
    },
    {
      title: "Total balance eur equiv",
      render: (record: any) => {
        const eurRate = eurRates ? eurRates[record.currency] : null;
        return eurRate
          ? Math.ceil(parseInt(record.totalBalance) * eurRate * 100)
          : "--";
      },
    },
  ];

  const dataSource = eurRates
    ? Object.keys(eurRates).map((eurRate) => {
        const completedWithdrawals = transactions.filter(
          (el) =>
            el.currency === eurRate &&
            el.type === "withdrawal" &&
            el.status === "completed"
        );
        const completedDeposits = transactions.filter(
          (el) =>
            el.currency === eurRate &&
            el.type === "deposit" &&
            el.status === "completed"
        );
        const pendingWithdrawals = transactions.filter(
          (el) =>
            el.currency === eurRate &&
            el.type === "withdrawal" &&
            el.status === "pending"
        ).length;
        const pendingDeposits = transactions.filter(
          (el) =>
            el.currency === eurRate &&
            el.type === "deposit" &&
            el.status === "pending"
        ).length;
        const totalBalance = Math.ceil(
          completedDeposits.map((el) => el.amount).reduce((a, b) => a + b, 0) -
            completedWithdrawals
              .map((el) => el.amount)
              .reduce((a, b) => a + b, 0)
        );
        return {
          currency: eurRate,
          completedDeposits: completedDeposits.length,
          completedWithdrawals: completedWithdrawals.length,
          totalBalance,
          pendingDeposits,
          pendingWithdrawals,
        };
      })
    : [];

  return (
    <Table
      bordered
      title={() => (
        <h3 style={{ fontWeight: "bold" }}>Deposits and Withdrawals</h3>
      )}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default DepositsAndWithdrawals;
