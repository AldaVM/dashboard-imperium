import ShifProvider from "../../src/providers/ShiftProvider";

const { LayoutAdmin } = require("../../src/layouts");
const { ProtectRoute } = require("../../src/hoc/privateRouter");
const {
  default: ShiftWrapper,
} = require("../../src/components/Shift/ShiftWrapper");

function DetailShift({ shift }) {
  return (
    <LayoutAdmin>
      <ShifProvider initialValues={{ shift }}>
        <ShiftWrapper />
      </ShifProvider>
    </LayoutAdmin>
  );
}

export async function getServerSideProps(context) {
  try {
    const { query } = context;

    const res = await fetch(
      `http://localhost:8000/v1/api/timetable/${query.id}`
    );
    const json = await res.json();

    return {
      props: {
        shift: {
          customers: json?.data?.customers,
          ...json?.data,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        shift: {
          customers: [],
        },
      },
    };
  }
}

export default ProtectRoute(DetailShift);
