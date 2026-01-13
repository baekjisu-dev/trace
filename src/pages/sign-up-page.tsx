import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { useSignUp } from "@/hooks/mutations/use-sign-up";

const signUpSchema = z.object({
  email: z
    .email("이메일 형식이 올바르지 않습니다.")
    .min(1, "이메일을 입력해주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

const SignUpPage = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signUp } = useSignUp();

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    signUp(data);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center-safe overflow-auto">
      <div className="w-full max-w-xl flex flex-col p-4 gap-6">
        <header className="flex flex-col gap-2 items-center">
          <h1 className="text-4xl font-bold">Trace</h1>
          <p className="text-sm italic">Moments Worth Keeping</p>
        </header>
        <main className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>회원가입</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <FieldGroup>
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            id="sign-in-email"
                            aria-invalid={fieldState.invalid}
                            placeholder="example@example.com"
                            {...field}
                          />
                          {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            id="sign-in-password"
                            type="password"
                            aria-invalid={fieldState.invalid}
                            placeholder="password"
                            {...field}
                          />
                          {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" type="submit" form="sign-in-form">
                회원가입
              </Button>
              <p>또는</p>
              <Button
                className="w-full flex items-center justify-center gap-2 border border-input bg-white text-black hover:bg-gray-50"
                variant="outline"
                type="button"
              >
                {/* Google 아이콘 위치 */}
                Google로 회원가입
              </Button>
              <Button
                className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black"
                type="button"
              >
                {/* Kakao 아이콘 위치 */}
                Kakao로 회원가입
              </Button>
              <Link className="w-full" to="/sign-in">
                <p className="text-sm text-muted-foreground hover:underline">
                  이미 회원이신가요?
                </p>
              </Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default SignUpPage;
