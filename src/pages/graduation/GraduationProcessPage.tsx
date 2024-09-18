import { ChangeEvent, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "./components/Table";
import { FaSearch } from "react-icons/fa";
import { Student } from "../../models/studentInterface";
import { getPermissionById } from "../../services/permissionsService";
import { Permission } from "../../models/permissionInterface";
import { HasPermission } from "../../helper/permissions";

const tableHeaders = [
  { key: "studentName", label: "Estudiante" },
  { key: "period", label: "Periodo" },
  { key: "tutorName", label: "Tutor" },
  { key: "reviewerName", label: "Revisor" },
  { key: "actions", label: "Acciones" },
];

const GraduationProcessPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [filteredData, setFilteredData] = useState<Student[] | []>([]);
  const [search, setSearch] = useState("");
  const studentsResponse = useLoaderData() as {
    data: Student[];
    message: string;
  };
  const { data: students } = studentsResponse;
  const navigate = useNavigate();
  const [createProcess, setCreateProcess] = useState<Permission>();

  useEffect(() => {
    const fetchCreateProcess = async () => {
      const response = await getPermissionById(3);
      setCreateProcess(response.data[0]);
    };
    fetchCreateProcess();
  }, []);
  
  useEffect(() => {
    const results = students.filter((item: Student) =>
      item.student_name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(results);
  }, [search, students]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToCreateProcessPage = () => {
    navigate("/createProcess");
  };

  return (
    <>
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between m-5 mb-8 overflow-hidden">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar por nombre de estudiante"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {HasPermission(createProcess?.name || "") && (<button className="btn z-50 relative" onClick={goToCreateProcessPage}>
          {" "}
          Crear Proceso de Graduación
        </button>)}
      </div>
      <Table
        data={filteredData}
        pageSize={pageSize}
        currentPage={currentPage}
        tableHeaders={tableHeaders}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default GraduationProcessPage;
