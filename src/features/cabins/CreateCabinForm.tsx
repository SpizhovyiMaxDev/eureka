import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { Cabin } from "../../types/cabin";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset: resetFormState,
    getValues,
    formState,
  } = useForm<Cabin>();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate, isPending: isCreating } = useMutation<Cabin, Error, Cabin>({
    mutationFn: createCabin,
    onSuccess() {
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      resetFormState();
    },
    onError(err) {
      toast.success(err.message);
    },
  });

  function onSubmit(data: Cabin) {
    mutate(data);
  }

  const nameField = register("name", { required: "This field is required" });
  const descriptionField = register("description", {
    required: "This field is required",
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          placeholder="Name..."
          {...nameField}
          onBlur={(e) => {
            nameField.onBlur(e);
            e.target.placeholder = "Name...";
          }}
          onFocus={(e) => (e.target.placeholder = "")}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          defaultValue={1}
          {...register("maxCapacity", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capaciry should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          defaultValue={100}
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 100,
              message: "Price should be at least 100",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
            valueAsNumber: true,
            min: { value: 0, message: "Discount can't be less then 0" },
            max: {
              value: getValues().regularPrice - 1,
              message: "Disount should be less then the regular price",
            },
            // Alternative to max field
            // validate: (value) =>
            //   getValues().regularPrice >= value ||
            //   "Discount should be less then the regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea
          id="description"
          placeholder="Put your description here"
          disabled={isCreating}
          {...descriptionField}
          onBlur={(e) => {
            descriptionField.onBlur(e);
            e.target.placeholder = "Put your description here";
          }}
          onFocus={(e) => (e.target.placeholder = "")}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
