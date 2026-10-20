import { DevTool } from "@hookform/devtools";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const MuiLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("submitted values", values);
  };

  console.log(isDirty, isValid, isSubmitting);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} sx={{ width: 400 }}>
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "Required field",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: "Required field",
              minLength: {
                value: 5,
                message: "At least 5 chars",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default MuiLoginForm;
