import { X } from "lucide-react";
import { Student } from "./StudentInfo";
import { useState } from "react";
import { SaveConfirmationDialog } from "./SaveConfirmation";
import { ServicePaths } from "../myconfig";
import LoadingDialog from "./Loading";

async function updateStudentRequest(
  fullname: string,
  UpdatedStudentData: Student
) {
  const response = await fetch(
    //`https://historic-alfy-springboot-api-7f312945.koyeb.app/student/${fullname}`
    ServicePaths.prod + "/" + fullname,
    //ServicePaths.dev + fullname,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpdatedStudentData),
    }
  );
  if (response.status === 200 || response.status === 204) {
    console.log("Student updated successfully");
    return true;
  } else {
    console.error("Failed to update student");
    return false;
  }
}

const studentDataAreSame = (student1: Student, student2: Student): boolean => {
  return (
    student1.firstname === student2.firstname &&
    student1.middlename === student2.middlename &&
    student1.lastname === student2.lastname &&
    student1.data.course === student2.data.course &&
    student1.data.year === student2.data.year &&
    student1.data.address === student2.data.address
  );
};

function EditStudentDialog({
  onClose,
  student,
}: {
  onClose: () => void;
  student: Student;
}) {
  const [saveButtonIsClicked, setSaveButtonIsClicked] = useState(false);

  const [updatedFirstname, setUpdatedFirstname] = useState(student.firstname);
  const [updatedMiddlename, setUpdatedMiddlename] = useState(
    student.middlename
  );
  const [updatedLastname, setUpdatedLastname] = useState(student.lastname);
  const [updatedCourse, setUpdatedCourse] = useState(student.data.course);
  const [updatedYear, setUpdatedYear] = useState(student.data.year);
  const [updatedAddress, setUpdatedAddress] = useState(student.data.address);

  const [loading, setLoading] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray/20 backdrop-blur-sm">
      <div className="relative bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 transform transition-all scale-100 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">
          Edit Student Data
        </h2>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <label className="block mb-2 font-medium">Firstname</label>
        <input
          type="text"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updatedFirstname}
          onChange={(e) => setUpdatedFirstname(e.target.value)}
        />

        <label className="block mb-2 font-medium">Middlename</label>
        <input
          type="text"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updatedMiddlename}
          onChange={(e) => setUpdatedMiddlename(e.target.value)}
        />

        <label className="block mb-2 font-medium">Lastname</label>
        <input
          type="text"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updatedLastname}
          onChange={(e) => setUpdatedLastname(e.target.value)}
        />

        <label className="block mb-2 font-medium">Course</label>
        <input
          type="text"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updatedCourse}
          onChange={(e) => setUpdatedCourse(e.target.value)}
        />

        <label className="block mb-2 font-medium">Year</label>
        <input
          type="number"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updatedYear}
          onChange={(e) => setUpdatedYear(Number(e.target.value))}
        />

        <label className="block mb-2 font-medium">Address</label>
        <input
          type="text"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updatedAddress}
          onChange={(e) => setUpdatedAddress(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => {
              const updatedStudent = new Student(
                updatedFirstname,
                updatedMiddlename,
                updatedLastname,
                {
                  course: updatedCourse,
                  year: updatedYear,
                  address: updatedAddress,
                }
              );

              if (!studentDataAreSame(student, updatedStudent)) {
                setSaveButtonIsClicked(true);
              }
            }}
          >
            Save
          </button>

          <button
            className="mr-4 mt-4 ml-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>

      {saveButtonIsClicked && (
        <SaveConfirmationDialog
          onCancel={() => setSaveButtonIsClicked(false)}
          onConfirm={async () => {
            //setSaveButtonIsClicked(false);
            setLoading(true);

            const updatedStudent = new Student(
              updatedFirstname,
              updatedMiddlename,
              updatedLastname,
              {
                course: updatedCourse,
                year: updatedYear,
                address: updatedAddress,
              }
            );

            const updateSuccess = await updateStudentRequest(
              student.fullname,
              updatedStudent
            );

            if (updateSuccess) {
              window.location.reload();
            } else {
              setUpdateFailed(true);
            }

            setSaveButtonIsClicked(false);
          }}
        />
      )}

      {updateFailed && (
        <div className="bg-red-500/20 text-red-400 border border-red-500 rounded-lg px-4 py-2 mt-3">
          <p>Student already exists</p>
        </div>
      )}

      {loading && <LoadingDialog open={true} />}
    </div>
  );
}

export { EditStudentDialog };
