import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import './InterviewerList.scss';

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const interviewersGroup = interviewers.map(interviewerTeacher => {
    return (
      <InterviewerListItem
        key = {interviewerTeacher.id}
        name = {interviewerTeacher.name}
        avatar = {interviewerTeacher.avatar}
        selected = {interviewerTeacher.id === interviewer}
        setInterviewer={event => setInterviewer(interviewerTeacher.id)}
        />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
      {interviewersGroup}
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

