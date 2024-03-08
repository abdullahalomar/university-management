import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";

import PhInput from "../../../components/form/PhInput";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFAcultyQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PhSelect from "../../../components/form/PhSelect";
import PHTimePicker from "../../../components/form/PHTimePicker";
import moment from "moment";
import { useState } from "react";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  console.log(courseId);

  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery(
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" }
  );

  const { data: academicFAcultyData } = useGetAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  const { data: CourseData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFAculties } =
    useGetCourseFAcultyQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFAcultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = CourseData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const addOfferedCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const res = await addOfferedCourse(addOfferedCourseData);
    console.log(res);
  };
  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PhForm onSubmit={onSubmit}>
            <PhSelect
              label="Semester Registration"
              name="academicSemester"
              options={semesterRegistrationOptions}
            ></PhSelect>
            <PhSelect
              label="Academic Faculty"
              name="academicFaculty"
              options={academicFacultyOptions}
            ></PhSelect>
            <PhSelect
              label="Academic Department"
              name="academicDEpartment"
              options={academicDepartmentOptions}
            ></PhSelect>
            <PHSelectWithWatch
              onValueChange={setCourseId}
              label="Course"
              name="course"
              options={courseOptions}
            ></PHSelectWithWatch>

            <PhSelect
              disabled={!courseId || fetchingFAculties}
              options={facultiesOptions}
              name="faculty"
              label="Faculty"
            />
            <PhInput type="text" name="section" label="Section" />
            <PhInput type="text" name="maxCapacity" label="Max Capacity" />
            {/* <PhSelect
              mode="multiple"
              options={weekDaysOptions}
              name="days"
              label="Days"
            /> */}
            <PHTimePicker name="startTime" label="Start Time" />
            <PHTimePicker name="endTime" label="End Time" />
            <Button htmlType="submit">Submit</Button>
          </PhForm>
        </Col>
      </Flex>
    </div>
  );
};

export default OfferCourse;
