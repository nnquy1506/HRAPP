import AlertComponent from "../components/Alert";

export const notification = (status, title) => {
  return {
    render: () => <AlertComponent status={status} title={title} />,
    placement: "top",
  };
};
