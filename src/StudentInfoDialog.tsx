import { X } from "lucide-react";

class Student {
    fullname: string;

    data: {
        course: string;
        year: number;
        address: string;
    }
   
    constructor(fullname: string, data: {course: string, year: number, address: string}) {
        this.fullname = fullname
        this.data = data
    }
}

function StudentInfoDialog({stud, onClose}: {stud: Student, onClose: () => void}) {

    return <>
    <div className="fixed inset-0 flex items-center justify-center bg-gray/20 backdrop-blur-sm">
          <div className="relative bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 transform transition-all scale-100 animate-fadeIn">

            {/* X Close Icon */}
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              onClick={onClose}
            >
                <X size={20} />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">Student Data</h2>

            <div className="flex mb-1">
                <span className="w-24">Name:</span>
                <span>{stud.fullname}</span>
            </div>

            <div className="flex mb-1">
                <span className="w-24">Course:</span>
                <span>{stud.data.course}</span>
            </div>

            <div className="flex mb-1">
                <span className="w-24">Year:</span>
                <span>{stud.data.year}</span>
            </div>

            <div className="flex mb-1">
                <span className="w-24">Address:</span>
                <span className="flex-1 line-clamp-10" >{stud.data.address}</span>
            </div>

            </div>
           
    </div>
    </>
}

export default StudentInfoDialog;