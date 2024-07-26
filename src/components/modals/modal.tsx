import { Children } from "../../models/interfaces/children.interface";

interface Props extends Children {
  isOpen: boolean;
  title: string;
}

const Modal = ({ isOpen, title, children }: Props) => {
  return (
    <>
      {isOpen && (
        <div
          x-transition:enter="transition duration-300 ease-out"
          x-transition:enter-start="translate-y-4 opacity-0 translate-y-0 scale-95"
          x-transition:enter-end="translate-y-0 opacity-100 scale-100"
          x-transition:leave="transition duration-150 ease-in"
          x-transition:leave-start="translate-y-0 opacity-100 scale-100"
          x-transition:leave-end="translate-y-4 opacity-0 translate-y-0 scale-95"
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center block p-0">
            <span
              className="hidden inline-block align-middle h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-[#000000] border-2 border-sgreen-strong rounded-lg shadow-xl rtl:text-right my-8 align-middle max-w-sm w-full p-6">
              <div>
                <div className="mt-2 text-center">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
