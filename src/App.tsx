import { useEffect, useState } from "react";
import StudentInfoDialog from "./dialog/StudentInfo";
import type { Student } from "./dialog/StudentInfo";
import AddStudentDialog from "./dialog/AddStudent";
import { ServicePaths } from "./myconfig";
import LoadingDialog from "./dialog/Loading";

function UsersTable() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [addButtonIsClicked, setAddButtonIsClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await fetch(
          //"https://historic-alfy-springboot-api-7f312945.koyeb.app/student"
          ServicePaths.prod
          //ServicePaths.dev
        );
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  const [addFailed, setAddFailed] = useState(false);

  useEffect(() => {
    if (addFailed) {
      const timer = setTimeout(() => setAddFailed(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [addFailed]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        Student Mini Portal
      </h1>

      {/* Card */}
      <div className="p-6 bg-gray-800 rounded-2xl shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2>Student Data</h2>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            onClick={() => setAddButtonIsClicked(true)}
          >
            Add Student
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto rounded-xl border border-gray-700 max-h-[678px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-700 text-gray-300 sticky top-0">
              <tr>
                <th className="px-4 py-3 font-medium w-1/4">Full Name</th>
                <th className="px-4 py-3 font-medium w-1/4">Course</th>
                <th className="px-4 py-3 font-medium w-1/4">Year</th>
                <th className="px-4 py-3 font-medium w-1/4">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600 bg-gray-800">
              {students.map((stud, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-500/50 cursor-pointer"
                  onClick={() => setSelectedStudent(stud)}
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {stud.firstname} {stud.middlename} {stud.lastname}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {stud.data.course}
                  </td>
                  <td className="px-4 py-3 text-gray-300">{stud.data.year}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {stud.data.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {loading && <LoadingDialog open={true} />}

      {selectedStudent && (
        <StudentInfoDialog
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {addButtonIsClicked && (
        <AddStudentDialog
          onClose={() => setAddButtonIsClicked(false)} //  later
          addFailed={() => setAddFailed(true)}
        />
      )}

      {addFailed && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-red-900/70 text-white px-6 py-3 rounded-lg shadow-lg">
            <p>Student already exists</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersTable;
