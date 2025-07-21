import { useForm } from "react-hook-form";
import { Cabin, EditCabin, NewCabin, SubmitCabin } from "../../types/cabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

type CreateCabinFormProps = {
  cabin?: Cabin;
};

function CreateCabinForm({ cabin }: CreateCabinFormProps) {
  const isEditSession: boolean = Boolean(cabin?.id);

  const {
    register,
    handleSubmit,
    reset: resetFormState,
    getValues,
    formState: { errors },
  } = useForm<SubmitCabin>();

  const { createMutation, isCreating } = useCreateCabin();
  const { editMutation, isEditing } = useEditCabin();
  const isProcessing: boolean = isEditing || isCreating;

  function onSubmit(data: SubmitCabin) {
    const image: File | string =
      typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession && cabin?.id) {
      const editCabinData: EditCabin = {
        ...data,
        image,
        id: cabin.id,
      };
      editMutation(editCabinData, { onSuccess: resetFormState });
    } else {
      const newCabinData: NewCabin = {
        ...data,
        image,
      };
      createMutation(newCabinData, { onSuccess: resetFormState });
    }
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
          disabled={isProcessing}
          defaultValue={cabin?.name ?? ""}
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
          disabled={isProcessing}
          defaultValue={cabin?.maxCapacity ?? 1}
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
          defaultValue={cabin?.regularPrice ?? 100}
          disabled={isProcessing}
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
          defaultValue={cabin?.discount ?? 0}
          disabled={isProcessing}
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
          disabled={isProcessing}
          {...descriptionField}
          defaultValue={cabin?.description ?? ""}
          onBlur={(e) => {
            descriptionField.onBlur(e);
            e.target.placeholder = "Put your description here";
          }}
          onFocus={(e) => (e.target.placeholder = "")}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isProcessing}>
          {isEditSession ? "Edit" : "Create"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
