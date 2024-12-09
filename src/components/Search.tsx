import { useDebouncedCallback } from 'use-debounce';

interface SearchProps {
  placeHolder?: string;
  width?: 'lg' | 'md' | 'sm';
  debouncedDelay: number;
  handleSearch: (value: string) => void;
}

const Search = ({
  placeHolder,
  width,
  debouncedDelay,
  handleSearch,
}: SearchProps) => {
  const handleChange = useDebouncedCallback((value) => {
    handleSearch(value);
  }, debouncedDelay);

  return (
    <input
      className={`h-12 min-w-[20rem] px-5 rounded-md outline-none shadow-md shadow-zinc-300 focus:border-[1px] transition-all
        ${width === 'lg' ? 'w-[50rem]' : ''}
        ${width === 'md' ? 'w-[40rem]' : ''}
        ${width === 'sm' ? 'w-[30rem]' : ''}
      `}
      type="text"
      placeholder={placeHolder}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default Search;
