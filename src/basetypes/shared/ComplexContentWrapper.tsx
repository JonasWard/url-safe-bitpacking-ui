import { useFileStore } from '@/state/useFileStore';
import { useState } from 'react';

type ComplexContentWrapperProps = {
  descriptorContent: React.ReactNode;
  stateContent: React.ReactNode;
};

export const ComplexContentWrapper: React.FC<ComplexContentWrapperProps> = ({ descriptorContent, stateContent }) => {
  const [showDescriptor, setShowDescriptor] = useState(false);
  const showTitle = useFileStore((state) => state.titleShown);

  return (
    <>
      {stateContent}
      {showTitle ? <span className="text-right font-bold">descriptor</span> : null}

      <>
        <button className="small" onClick={() => setShowDescriptor(!showDescriptor)}>
          {showDescriptor ? '< hide descriptor' : 'show descriptor >'}
        </button>
        {showDescriptor ? (
          <>
            <div className="absolute top-[-.55rem] left-[calc(100%+1rem)] h-0">
              <div className=" py-2 justify-center flex flex-col gap-2">{descriptorContent}</div>
            </div>
            <div className="absolute top-[-2.65rem] left-[calc(100%+1rem)] h-0">
              <button className="w-2" onClick={() => setShowDescriptor(!showDescriptor)}>
                {showDescriptor ? '<' : '>'}
              </button>
            </div>
          </>
        ) : null}
      </>
    </>
  );
};
