import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: "";
    facebook: "";
  };
  phoneNumbers: string[];
  phNumbers: { number: string }[];
  age: number;
  dob: Date;
};

const YouTubeForm = () => {
  const { register, control, handleSubmit, formState, watch } =
    useForm<FormValues>({
      defaultValues: {
        username: "Batman",
        email: "",
        channel: "",
        social: {
          facebook: "",
          twitter: "",
        },
        phoneNumbers: ["", ""],
        phNumbers: [{ number: "" }],
        age: 0,
        dob: new Date(),
      },
      // defaultValues: async () => {
      //   const response = await fetch(
      //     "https://jsonplaceholder.typicode.com/users/1",
      //   );
      //   const data = await response.json();

      //   return {
      //     username: data?.username || "",
      //     email: data?.email || "",
      //     channel: "",
      //   };
      // },
    });

  const { errors } = formState;
  // console.log("errors", errors);

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("form submitted with data", data);
  };

  // watch field
  // const watchUsername = watch("username");

  // watch several fields
  // const watchUsername = watch(["username", "email"]);

  // watch the whole form
  // const watchForm = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <div>
      <h1>YouTube Form</h1>
      {/* <h2>Watched value: {JSON.stringify(watchForm)}</h2> */}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              // required: "Username is required",
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email",
              },
              // validate: (fieldValue) => {
              //   return (
              //     fieldValue !== "admin@example.com" ||
              //     "Enter a defferent email address"
              //   );
              // },
              validate: {
                notAdmin: (fieldValue) =>
                  fieldValue !== "admin@example.com" ||
                  "Enter a defferent email address",
                notBlacklisted: (fieldValue) =>
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>

        <div className="form-control">
          <label htmlFor="primary-number">Primary Phone Number</label>
          <input
            type="text"
            id="primary-number"
            {...register("phoneNumbers.0")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-number">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-number"
            {...register("phoneNumbers.1")}
          />
        </div>

        <div>
          <label htmlFor="">List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div className="form-control" key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number`)} />
                {index > 0 && (
                  <button onClick={() => remove(index)}>Remove</button>
                )}
              </div>
            ))}
            <button onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,

              required: "Date of birth is required",
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
