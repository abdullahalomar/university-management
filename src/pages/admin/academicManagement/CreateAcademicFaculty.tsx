import { Button, Col, Divider, Row } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "../../../types";
const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    // const name = semesterOptions[Number(data?.name) - 1]?.label;

    const facultyData = {
      name: data.name,
    };

    try {
      const res = (await addAcademicFaculty(facultyData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty Created successfully", { id: toastId });
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Row>
      <Col span={24}>
        <PhForm onSubmit={onSubmit}>
          <Divider>Create Faculty</Divider>
          <Row>
            <Col span={24}>
              <PhInput type="text" name="name" label="Name" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicFaculty;
