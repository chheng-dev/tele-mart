import { ReactNode } from "react";
import { PageLayout } from "./page-layout";

type FormPageProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  form: ReactNode;
};

export function FormPage({ title, description, actions, form }: FormPageProps) {
  return (
    <PageLayout title={title} description={description} actions={actions}>
      <div className="max-w-xl">{form}</div>
    </PageLayout>
  );
}
