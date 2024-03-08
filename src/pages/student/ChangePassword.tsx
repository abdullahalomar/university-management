import { Button, Row } from "antd";
import PhForm from "../../components/form/PhForm";
import PhInput from "../../components/form/PhInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/features/admin/userManagement.api";
import { useAppDispatch } from "../../redux/features/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { TResponse } from "../../types";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await changePassword(data)) as TResponse<any>;
    console.log(res?.data?.success);

    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit}>
        <PhInput type="text" name="oldPassword" label="Old Password" />
        <PhInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default ChangePassword;
