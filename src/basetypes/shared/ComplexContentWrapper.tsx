import { useState } from 'react';

type ComplexContentWrapperProps = {
  descriptorContent: React.ReactNode;
  stateContent: React.ReactNode;
};

export const ComplexContentWrapper: React.FC<ComplexContentWrapperProps> = ({ descriptorContent, stateContent }) => {
  const [showDescriptor, setShowDescriptor] = useState(false);

  return (
    <>
      <span className="text-right">descriptor</span>
      {showDescriptor ? (
        <>
          <button onClick={() => setShowDescriptor(false)}>hide descriptor</button>
          <div className="absolute top-[-.55rem] left-[calc(100%+1rem)] h-0">
            <div className="background justify-center flex flex-col gap-2">{descriptorContent}</div>
          </div>
        </>
      ) : (
        <button onClick={() => setShowDescriptor(true)}>show descriptor</button>
      )}
      <span className="text-right">value</span>
      {stateContent}
    </>
  );
};
