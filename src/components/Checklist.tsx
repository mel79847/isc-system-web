import dayjs from 'dayjs'
import 'dayjs/locale/es'
import {
  FaEnvelope,
  FaCalendarCheck,
  FaUserTie,
  FaUserSecret,
  // FaUserShield,
  // FaUserGraduate,
} from 'react-icons/fa'
import { Seminar } from '../models/studentProcess'
import { useProcessStore } from '../store/store'

const Checklist = () => {
  const process = useProcessStore((state) => state.process)
  let formattedDate = ''
  if (process) {
    formattedDate = process.tutor_approval_date
      ? dayjs(process.tutor_approval_date).format('DD/MM/YYYY')
      : ''
  }

  const {
    student_name: studentName,
    project_name: titleProject,
    modality_name: mode,
  } = process as Seminar
  const telegramLink = `https://t.me/+59176517816`
  return (
    <div className="h-full bg-white rounded-lg shadow-lg p-4 m-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{studentName}</h2>
          <p className="text-gray-600">{titleProject}</p>
          <p className="text-gray-500 text-sm">{mode}</p>
        </div>
      </div>

      <div className="flex space-x-4 my-4">
        <a href={telegramLink} target="_blank" rel="noopener noreferrer">
          <button className="btn flex flex-row items-center">
            <FaEnvelope className="mr-2" /> Enviar Mensaje
          </button>
        </a>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-gray-800 text-md">
          <button>Etapas de Graduación</button>
        </div>
      </div>

      <ol className="ml-5 mt-2 relative border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaCalendarCheck className="text-blue-800" />
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Seminario de Grado
          </h3>
          {process?.period ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Inscripción {process.period}
            </time>
          ) : (
            <span>No inscrito aun</span>
          )}
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaUserTie className="text-blue-800" />
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Tutor: {process?.tutor_degree}. {process?.tutor_fullname || ' '}
          </h3>
          {process?.tutor_approval ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Aprobación del Tutor el {formattedDate}
            </time>
          ) : (
            <span>Fase de Tutor no Aprobada</span>
          )}
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaUserSecret className="text-blue-800" />
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Revisor: {process?.reviewer_degree}. {process?.reviewer_fullname || ' '}
          </h3>
          {process?.reviewer_approval ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Aprobación del Revisor on {formattedDate}
            </time>
          ) : (
            <span>Fase de Revisor no Aprobada</span>
          )}
        </li>
        {/* <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaUserShield className="text-blue-800" />
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Defensa Interna
          </h3>
          {internalDefenseStage.passed ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Defensa Interna on December 2nd, 2021
            </time>
          ) : (
            <span className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Sin defensa Interna
            </span>
          )}
        </li>
        <li className="ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaUserGraduate className="text-blue-800"/>
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Defensa Externa
          </h3>
          {internalDefenseStage.passed ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Defensa Interna on December 2nd, 2021
            </time>
          ) : (
            <span className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Sin defensa Externa
            </span>
          )}
        </li> */}
      </ol>
    </div>
  )
}

export default Checklist
