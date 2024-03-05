import EditForm from "@/components/EditForm";
import getSingleCourse from "@/controllers/getSingleCourse";
import React from "react";

export default async function EditCourse({params:{id}}) {
  const course = await getSingleCourse(id)
  return (
    <>
      <EditForm course={course} />
    </>
  );
}
