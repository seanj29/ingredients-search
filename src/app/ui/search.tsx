'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch= useDebouncedCallback((term: string) => {
        console.log(`Searching... ${term}`);


        const params = new URLSearchParams(searchParams);

        if (term.length >= 3) {
            params.set('query', term);
          } else {
            params.delete('query');
          }
          replace(`${pathname}?${params.toString()}`);
       
      }, 300)
    return (
        <div className="relative mx-auto flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-96 rounded-md border border-gray-200 py-2.5 pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    );
  }