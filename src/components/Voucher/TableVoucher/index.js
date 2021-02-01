import { Table, Typography } from "antd";
import { TableContainer } from "./Styled";

const { Title } = Typography;

export default function TablePaids({ paids, columns, isPagination = true }) {
  return (
    <>
      <Title level={2}>Lista de pagos</Title>
      <TableContainer>
        <Table
          columns={columns}
          dataSource={paids}
          pagination={isPagination}
          scroll={{ x: "calc(700px + 50%)", y: 500 }}
        />
      </TableContainer>
    </>
  );
}
