import { Card } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";

const { Meta } = Card;

export default function ShiftCard({
  _id,
  names,
  surnames,
  dni,
  gender,
  date_timetable,
  onDeleteClient,
  editClient,
}) {
  return (
    <>
      <Card
        cover={
          <img
            alt={`${names}`}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU"
          />
        }
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <EditOutlined key="edit" onClick={() => editClient(_id)} />,
          <DeleteFilled key="delete" onClick={() => onDeleteClient(_id)} />,
        ]}
      >
        <Meta
          title={`${names} ${surnames}`}
          description={`${dni} - ${gender} - ${date_timetable}`}
        />
      </Card>
    </>
  );
}
