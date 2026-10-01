import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

const YouTubeForm = () => {
  const { register, control } = useForm();

  console.log("YouTubeForm");
  renderCount++;

  return (
    <div>
      {/* changing input filelds does not cause rerenders; renderCount don`t change */}
      <h1>YouTube Form ({renderCount / 2})</h1>

      <form>
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
