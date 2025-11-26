import { useFileStore } from '@/state/useFileStore';

export const ToggleBitsShown: React.FC = () => {
  const showBits = useFileStore((state) => state.bitsShown);
  const setBitsShown = useFileStore((state) => state.setBitsShown);
  return (
    <button className={`${showBits ? 'shown' : 'hidden'}`} onClick={() => setBitsShown(!showBits)}>
      bits
    </button>
  );
};
