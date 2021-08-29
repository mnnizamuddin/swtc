import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { SpinnerProps } from "../types";

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
  return (
    <div style={{ textAlign: "center", height: "100vh" }}>
      <Spin
        spinning={props.loading}
        indicator={
          <LoadingOutlined
            style={{
              marginTop: "45vh",
              fontSize: 150,
            }}
          />
        }
      />
    </div>
  );
};

export default Spinner;
