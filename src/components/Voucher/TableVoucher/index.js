import { Table, Typography } from "antd";
import { TableContainer } from "./Styled";

const { Title } = Typography;

export default function TablePaids({ paids, columns, isPagination = true }) {
  return (
    <>
      <TableContainer>
        <Table
          columns={columns}
          dataSource={paids}
          pagination={isPagination}
          size="middle"
          scroll={{ x: 2000, y: 700 }}
        />
      </TableContainer>
    </>
  );
}
