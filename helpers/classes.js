export const listContainerClasses = `basis-2/3 p-2 m-1 border border-honey-yellow rounded flex flex-col items-center`;
export const listClasses = `p-2 m-1 flex flex-col items-center`;
export const itemClasses = `
  mx-auto relative w-60 hover:cursor-pointer group text-center
  before:transition-all before:duration-500 
  before:content-[" "] before:absolute 
  before:border-b before:left-28 before:right-28 before:top-full before:border-honey-yellow 
  hover:before:left-24 hover:before:right-24
  `;
export const editingItemClasses = `mx-auto relative w-60 hover:cursor-pointer group text-center
  before:transition-all before:duration-500 
  before:content-[" "] before:absolute 
  before:border-b before:left-24 before:right-24 before:top-full before:border-french-raspberry-light
  `;
export const deleteItemClasses = `absolute left-full bottom-2/4 translate-y-2/4 opacity-0 transition ease duration-200 hover:cursor-pointer hover:text-french-raspberry group-hover:opacity-100 focus:opacity-100 focus:text-french-raspberry`;
export const checkItemClasses = `absolute right-full bottom-2/4 translate-y-2/4 opacity-0 transition ease duration-200 hover:cursor-pointer hover:text-french-raspberry group-hover:opacity-100 focus:opacity-100 focus:text-french-raspberry`;
export const itemTextClasses = `bg-transparent text-center focus:outline-none px-2 py-1`;
export const titleInputClasses = `bg-transparent p-1 text-center text-xl focus:outline-none border-b border-honey-yellow placeholder:text-md placeholder:text-oxford-blue`;
