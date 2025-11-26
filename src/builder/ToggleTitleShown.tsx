import { useFileStore } from '@/state/useFileStore';

export const ToggleTitleShown: React.FC = () => {
  const showTitle = useFileStore((state) => state.titleShown);
  const setTitleShown = useFileStore((state) => state.setTitleShown);
  return (
    <button className={`${showTitle ? 'shown' : 'hidden'}`} onClick={() => setTitleShown(!showTitle)}>
      titles
    </button>
  );
};
