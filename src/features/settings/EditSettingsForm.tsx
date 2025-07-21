import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { SettingsField } from "../../types/settings";
import { useEditSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";

function EditSettingsForm() {
  const { editMutation, isEditing } = useEditSettings();
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    error,
    isFetching,
  } = useSettings();

  if (isFetching) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  function handleEdit(
    e: React.FocusEvent<HTMLInputElement>,
    field: keyof SettingsField
  ): void {
    const value = +e.target.value;
    if (!value) return;
    editMutation({ [field]: value } as SettingsField);
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleEdit(e, "minBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleEdit(e, "maxBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleEdit(e, "maxGuestsPerBooking")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleEdit(e, "breakfastPrice")}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default EditSettingsForm;
