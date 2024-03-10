import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const defaultValues = {
  //   id: "A-0001",
  //   password: "admin123",
  // };

  // faculty
  // "id":"F-0001",
  //   "password":"123456"

  const defaultValues = {
    id: "2027030001",
    password: "123456",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      console.log(res);

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PhInput type="text" name="id" label="ID:" />
        <PhInput type="text" name="password" label="Password:" />
        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default Login;
