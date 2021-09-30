import React, { Fragment, useContext, useEffect } from "react";
import { transitions, positions, useAlert } from "react-alert";
import GlobalContext from "../../context/lead-context";
const options = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: "30px",
  transition: transitions.SCALE,
};
function Alert() {
  const alert = useAlert();
  const context = useContext(GlobalContext);

  useEffect(() => {
    if (!!context.errors.status) {
      console.log("context.errors");
      const error = context.errors;
      if (error.msg.name)
        alert.error(`Name: ${error.msg.name.join()}`, options);
      if (error.msg.email)
        alert.error(`Email: ${error.msg.email.join()}`, options);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`, options);
      if (error.msg.detail) alert.error(`Error: ${error.msg.detail}`, options);

      context.resetError();
    }
  }, [context.errors]);

  useEffect(() => {
    console.log("messagestate useffect called");
    if (!!context.messageState) {
      const message = context.messageState;
      if (message.deleteLead) alert.success(message.deleteLead, options);
      if (message.addLead) alert.success(message.addLead, options);
    }
  }, [context.messageState]);

  return <Fragment />;
}

export default Alert;
