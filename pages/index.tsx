import { Col, Layout, Row, Image } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import axios from "axios";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import DepositsAndWithdrawals from "../components/DepositsAndWithdrawals";
import Spinner from "../components/Spinner";
import Transactions from "../components/Transactions";
import { EurRates, Transaction } from "../types/index";

const TRANSACTIONS_URL = "http://localhost:8080/api/transactions";
const EUR_RATES_URL = "http://localhost:8080/api/eur-rates";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [eurRates, setEurRates] = useState<EurRates>({});

  const fetchTransactions = async () => {
    const response = await axios.get(TRANSACTIONS_URL);
    setTransactions(response.data.transactions);
  };
  const fetchEurRates = async () => {
    const response = await axios.get(EUR_RATES_URL);
    setEurRates(response.data);
  };

  useEffect(() => {
    setLoading(true);
    fetchTransactions();
    fetchEurRates();
    setLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactions();
      fetchEurRates();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <Layout>
      <Header>
        <Row justify="start" align="middle">
          <Col style={{ marginTop: 8 }}>
            <Image src={"logo.png"} width={45} preview={false}></Image>
          </Col>
          <Col style={{ marginLeft: 50 }}>
            <h1 style={{ color: "white", fontWeight: "bold" }}>
              SwissBorg Web Tech Challenge
            </h1>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Content>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div>
              <Transactions transactions={transactions} eurRates={eurRates} />
              <DepositsAndWithdrawals
                transactions={transactions}
                eurRates={eurRates}
              />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
