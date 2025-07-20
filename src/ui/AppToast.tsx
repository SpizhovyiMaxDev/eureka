import { Toaster } from "react-hot-toast";

const options = {
  success: {
    duration: 3000,
  },
  error: {
    duration: 5000,
  },
  style: {
    fontSize: "16px",
    maxWidth: "500px",
    padding: "16px 24px",
    color: "var(--color-grey-700)",
    backgroundColor: "var(--color-grey-0)",
  },
};

const containerStyle = {
  margin: "8px",
};

function AppToast() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={containerStyle}
      toastOptions={options}
    />
  );
}

export default AppToast;
