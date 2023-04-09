import { Form, Button, Spin, Select } from "antd";
import { VoucherContext } from "../../../context";
import { tailLayoutForm } from "../complements";
import { useState, useContext, useEffect } from "react";

function validateVigence(validity_date) {
  if (validity_date) {
    switch (validity_date) {
      case "expire":
        return { date_expiration: { $lt: new Date() } };
      case "validity":
        return { date_expiration: { $gte: new Date() } };
      default:
        return {};
    }
  }

  return {};
}

function validateCompany(company) {
  if (company) {
    return { company: company };
  }

  return {};
}



function validateStatusPaid(status_paid) {
  if (status_paid) {
    return { status_paid: status_paid };
  }

  return {};
}

function validateExpireDate(expire_date) {
  if (expire_date) {
    let date = new Date();
    let dateInit = new Date();
    return {
      date_expiration: {
        $gte: dateInit,
        $lt: new Date(date.setDate(date.getDate() + 5)),
      },
    };
  }

  return {};
}

function validateFilters(filters) {
  let cleanFilters = {};

  for (const key in filters) {
    if (filters[key]) {
      if (key == "company") {
        cleanFilters = Object.assign({}, validateCompany(filters[key]));
      }
      if (key == "validity_date") {
        cleanFilters = Object.assign({}, validateVigence(filters[key]));
      }
      if (key == "status_paid") {
        cleanFilters = Object.assign(
          cleanFilters,
          validateStatusPaid(filters[key])
        );
      }
      if (key == "expire_date") {
        cleanFilters = Object.assign(
          cleanFilters,
          validateExpireDate(filters[key])
        );
      }
    }
  }

  return cleanFilters;
}

function FormActionsVoucher() {
  const { getVouchersByFilters, filters } = useContext(VoucherContext);
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...filters,
    });
  }, [filters]);

  const onFinish = async (values) => {
    setIsLoading(true);

    const { validity_date, status_paid, expire_date, company } = values;

    let newFilters = validateFilters({
      validity_date: validity_date ? validity_date : null,
      status_paid: status_paid ? status_paid : null,
      expire_date: expire_date ? expire_date : null,
      company: company ? company : null,
    });

    if (Object.keys(newFilters).length > 0) {
      await getVouchersByFilters(1, newFilters);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form
        form={form}
        layout="inline"
        name="form_actions_vouchers"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{ ...filters }}
        style={{ margin: "0 1em" }}
      >
        <Form.Item label="Filtar Vigencia:" name="validity_date">
          <Select style={{ width: 130 }}>
            <Select.Option value="validity">Vigente</Select.Option>
            <Select.Option value="expire">Expirado</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Sede:" name="company">
          <Select style={{ width: 130 }}>
            <Select.Option value="1">Chosica</Select.Option>
            <Select.Option value="2">Ate</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Estado del Pago:" name="status_paid">
          <Select style={{ width: 130 }}>
            <Select.Option value="completed">Completados</Select.Option>
            <Select.Option value="pending">Pendientes</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Próximos a vencer:" name="expire_date">
          <Select style={{ width: 130 }}>
            <Select.Option value="expire_five_days">En 5 días</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayoutForm}>
          <Button type="primary" htmlType="submit" style={{ marginLeft: -20 }}>
            Aplicar
          </Button>
        </Form.Item>
        {isLoading && <Spin />}
      </Form>
    </>
  );
}

export default FormActionsVoucher;
