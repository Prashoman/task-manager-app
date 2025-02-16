/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { FormProvider,  useForm } from "react-hook-form";

interface SFFormProps {
  onSubmit: any;
  children: ReactNode;
  formRef?: any;
}
const SFForm = ({ onSubmit, children ,formRef}: SFFormProps) => {
  // const {handleSubmit} = useForm();
  const methods = useForm();
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>{children}</form>
      </FormProvider>
    </>
  );
};

export default SFForm;
