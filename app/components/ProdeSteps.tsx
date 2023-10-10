export function ProdeSteps({ step }: { step: number }) {
  return (
    <div>
      <h2 className="sr-only">Steps</h2>

      <div>
        <ol className="grid grid-cols-3 text-sm font-medium text-gray-500">
          <li className="relative flex justify-start text-teal-500">
            <span className="absolute -bottom-[1.75rem] start-0 rounded-full bg-teal-500 text-white z-10">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <span className={`${step === 1 ? "" : "hidden"} sm:block`}>
              Crear Prode
            </span>

            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
          </li>

          <li
            className={`relative flex justify-center ${
              step >= 2 ? "text-teal-500" : "text-gray-600"
            }`}
          >
            <span
              className={`absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full ${
                step >= 2 ? "bg-teal-500" : "bg-gray-600"
              } text-white z-10`}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <span className={`${step == 2 ? "" : "hidden"} sm:block`}>
              {" "}
              Registra <br />
              tu voto{" "}
            </span>
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"></path>
              <path d="M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 0 0-2.3 5.6zm63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1.7-46.4z"></path>
            </svg>
          </li>

          <li
            className={`relative flex justify-end ${
              step >= 3 ? "text-teal-500" : "text-gray-600"
            }`}
          >
            <span
              className={`absolute -bottom-[1.75rem] end-0 rounded-full ${
                step >= 3 ? "bg-teal-500" : "bg-gray-600"
              } text-white z-10`}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <span className={`${step === 3 ? "" : "hidden"} sm:block z-1`}>
              Compartir
            </span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z"></path>
            </svg>
          </li>
        </ol>
        <div className="relative mt-4 block h-2 w-full rounded-lg">
          <div
            className={`absolute top-0 left-0 h-full rounded-lg bg-teal-500 ${
              step === 3 ? "w-full" : `w-${step - 1}/2`
            }`}
          />
          <div
            className={`absolute top-0 right-0 h-full rounded-lg bg-gray-200  ${
              step > 1 ? `w-${step - 1}/2 ` : " w-full "
            }`}
          />
        </div>
      </div>
    </div>
  )
}
