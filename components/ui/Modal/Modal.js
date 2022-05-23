const Modal = ({ children, open }) => {
  const classNames = `w-screen h-screen bg-seashell absolute top-2/4 left-2/4 
  transform scale-0 -translate-y-3/4 -translate-x-2/4 opacity-95 rounded-md drop-shadow-md 
  flex flex-col items-center justify-start pt-40 transition duration-200 ease-in-out`;
  const classNames2 = `${classNames} !scale-100 !-translate-y-2/4`;
  return <div className={!open ? classNames : classNames2}>{children}</div>;
};

export default Modal;
