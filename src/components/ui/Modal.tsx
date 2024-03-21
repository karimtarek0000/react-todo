import { Dialog, Transition } from "@headlessui/react";
import {
  Fragment,
  MutableRefObject,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

interface IModal {
  title: string;
  children: ReactNode;
  fnForClose?: () => void;
}

type Ref = MutableRefObject<{
  openModal: () => void;
  closeModal: () => void;
}>;

const Modal = ({ title, children, fnForClose }: IModal, ref: Ref) => {
  // ----------------- STATE -----------------
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ----------------- HANDLER -----------------
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    fnForClose && fnForClose();
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30"
          aria-hidden="true"
        />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="mb-8 text-2xl font-medium leading-9 text-gray-900"
                >
                  {title}
                </Dialog.Title>

                {/* Actions */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default forwardRef(Modal);
