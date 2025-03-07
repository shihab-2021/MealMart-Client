import LoginForm from "@/components/modules/auth/login/LoginForm";

const LoginPage = async () => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
