import EditSettingsForm from "../features/settings/EditSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
      <EditSettingsForm />
    </>
  );
}

export default Settings;
