import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeForm = () => {
  const { register, control, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("form submitted with data", data);
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
