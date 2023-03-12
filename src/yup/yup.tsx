import * as yup from "yup";

export const SchemaFormEdit = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  image: yup.string().url(),
});

export const SchemaSingIn = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
});

export const SchemaSignUp = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  repeatPassword: yup.string().required(),
  checkbox: yup.boolean().oneOf([true]).required(),
});
