import React from "react";

interface StepperProps {
  id: number;
  title: string;
  isian: string;
}

const Stepper: React.FC<StepperProps> = ({ id, title, isian }) => {
  return (

      <li className="flex gap-x-4 group">
        <div className="flex flex-col items-center">
          <span className="size-7 flex justify-center items-center shrink-0 border-2 p-4 border-chocolate font-medium text-md text-doff ">
            {id}
          </span>
          <div className="mt-2 h-8 w-px  bg-doff group-last:hidden"></div>
        </div>
        <div className="grow pb-6 group-last:pb-0">
          <span className="block text-sm font-medium text-doff">
            {title}
          </span>
          <p className="mt-1 text-sm text-doff">{isian}</p>
        </div>
      </li>

  );
};

export default Stepper;
