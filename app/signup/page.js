import { signUpAction } from "@/app/_lib/actions";
import AuthForm from "../_components/AuthForm";
function page() {
  return <AuthForm action={signUpAction} withName={true} />;
}

export default page;
