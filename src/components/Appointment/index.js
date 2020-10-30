import React from "react";

import "./styles.scss";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

// Switching mode for identifiers
const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";
const EMPTY = "EMPTY";
const SAVING = "SAVING";
const SHOW = "SHOW";

export default function Appointment(props) {
  const {
    interview,
    interviewers = [],
    bookInterview,
    id,
    cancelInterview,
  } = props;

  console.log(props.id);
  console.log(props.interview);

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    if (interview && name) {
      transition(SAVING);

      bookInterview(id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    }
  };

  const confirmMessage = (event) => {
    event.preventDefault();
    transition(CONFIRM);
  };

  const confirmDelete = () => {
    transition(DELETE, true);

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  console.log(interviewers.interviewer);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form onCancel={back} interviewers={interviewers} onSave={save} />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer ? interview.interviewer.name : "unassigned"}
          onEdit={() => transition(EDIT)}
          onDelete={confirmMessage}
        />
      )}

      {mode === SAVING && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && (
        <Error message="Couldn't save the appointment" onClose={back} />
      )}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && (
        <Error message="Couldn't delete the appointment" onClose={back} />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure deleting it ?"}
          onCancel={back}
          onConfirm={confirmDelete}
        />
      )}

      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}
    </article>
  );
}
