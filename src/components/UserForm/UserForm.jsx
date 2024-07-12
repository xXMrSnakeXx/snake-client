import { useId } from "react";
import * as Yup from "yup";
import css from "./UserForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "../Button/Button";
import { useUsersStore } from "../../store/useUsersStore";

const initialValues = {
  name: "",
};
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required("Required"),
});
export const UserForm = ({ closeModal }) => {
  const { addUserName } = useUsersStore();
  const nameId = useId();
  const handleSubmit = (values, { resetForm }) => {
    addUserName(values);
    closeModal();
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label htmlFor={nameId} className={css.label}>
          Please enter your name
        </label>
        <Field
          id={nameId}
          name="name"
          placeholder="Jane"
          className={css.input}
        />
        <ErrorMessage name="name" component="p" className={css.error} />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
};
