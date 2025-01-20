import React from 'react';

const Filter = ({ filterStatus, setFilterStatus }) => {
  const filters = ['all', 'en cours', 'livré', 'annulé'];

  return (
    <div className="flex space-x-2 border-[3px] border-gray-700 rounded-xl select-none mt-4">
      {filters.map((status) => (
        <label
          key={status}
          className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
        >
          <input
            type="radio"
            name="filter"
            value={status}
            className="peer hidden"
            checked={filterStatus === status}
            onChange={() => setFilterStatus(status)}
          />
          <span className="tracking-widest peer-checked:bg-gray-700 peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </label>
      ))}
    </div>
  );
};

export default Filter;
