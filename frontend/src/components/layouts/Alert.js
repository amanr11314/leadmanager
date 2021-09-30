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
      const error = context.errors;
      if (error.msg.name)
        alert.error(`Name: ${error.msg.name.join()}`, options);
      if (error.msg.email)
        alert.error(`Email: ${error.msg.email.join()}`, options);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`, options);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join(), options);
      if (error.msg.username) alert.error(error.msg.username.join(), options);
      if (error.msg.detail) alert.error(`Error: ${error.msg.detail}`, options);

      context.resetError();
    }
  }, [context.errors]);

  useEffect(() => {
    if (!!context.messageState) {
      const message = context.messageState;
      if (message.deleteLead) alert.success(message.deleteLead, options);
      if (message.addLead) alert.success(message.addLead, options);
      if (message.passwordNotMatch)
        alert.error(message.passwordNotMatch, options);
    }
  }, [context.messageState]);

  return <Fragment />;
}

export default Alert;
