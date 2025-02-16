/* eslint-disable @typescript-eslint/no-explicit-any */



export const modelClose = (modalRef:any, modalForm?:any) => {
    modalRef.current?.close();
    // console.log("helpers",modalForm.current);
    if (modalForm.current) {
      modalForm.current.reset(); // Reset the form fields
    }
  };
  
  //model open
  export const modelOpen = (modalRef:any) => {
    if (modalRef.current) modalRef.current.showModal();
  }

export const dateFormate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`;
  return formattedDate;
}