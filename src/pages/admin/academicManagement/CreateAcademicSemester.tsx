import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";

import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemestersMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemestersMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Created", { id: toastId });
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PhSelect
            label="Name"
            name="name"
            options={semesterOptions}
          ></PhSelect>
          <PhSelect label="Year" name="year" options={yearOptions}></PhSelect>
          <PhSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          ></PhSelect>
          <PhSelect
            label="End Month"
            name="endMonth"
            options={monthOptions}
          ></PhSelect>
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
