import { Table } from "antd";
import { TableContainer } from "./Styled";

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
