import { Button, Col, Divider, Row } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import PhSelect from "../../../components/form/PhSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TResponse } from "../../../types";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const { data: fData, isloading: fIsloading } =
    useGetAcademicFacultiesQuery(undefined);

  const facultyOptions = fData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const departmentData = {
      name: data?.name,
      facultyID: data?._id,
    };

    try {
      const res = (await addAcademicDepartment(departmentData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty Created successfully", { id: toastId });
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }

    // const formData = new FormData();

    // formData.append("data", JSON.stringify(departmentData));

    // addDepartment(formData);

    // console.log(Object.fromEntries(formData));
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <PhForm onSubmit={onSubmit}>
            <Divider>Create Department</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput type="text" name="name" label="Department Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhSelect
                  options={facultyOptions}
                  disabled={fIsloading}
                  name="academicFaculty"
                  label="Academic Faculty"
                />
              </Col>
            </Row>

            <Button htmlType="submit">Submit</Button>
          </PhForm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAcademicDepartment;
