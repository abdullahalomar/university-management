import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";

import PhInput from "../../../components/form/PhInput";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const OfferCourse = () => {
  const [id, setId] = useState("");

  console.log("Inside parent component", id);

  const { data: academicFAcultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFAcultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PhForm onSubmit={onSubmit}>
            <PHSelectWithWatch
              onValueChange={setId}
              label="Academic Semester"
              name="academicSemester"
              options={academicSemesterOptions}
            ></PHSelectWithWatch>

            {/* <PHDatePicker name="startDate" label="Start Date" />
            <PHDatePicker name="endDate" label="End Date" />
            <PhInput type="text" name="minCredit" label="Min Credit" />
            <PhInput type="text" name="maxCredit" label="Max Credit" /> */}
            <PhInput disabled={!id} type="text" name="test" label="Test" />
            <Button htmlType="submit">Submit</Button>
          </PhForm>
        </Col>
      </Flex>
    </div>
  );
};

export default OfferCourse;
