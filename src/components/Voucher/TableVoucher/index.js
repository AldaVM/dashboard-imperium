import { Table, Typography } from "antd";
import { TableContainer } from "./Styled";

const { Title } = Typography;

export default function TablePaids({ paids, columns }) {
  return (
    <>
      <Title level={2}>Lista de pagos</Title>
      <TableContainer>
        <Table columns={columns} dataSource={paids} scroll={{ x: 0, y: 500 }} />
      </TableContainer>
    </>
  );
}
