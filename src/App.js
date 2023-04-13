import React, { useState } from 'react';
import './style.css';
import store from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

const App = () => {
  const [bugList, setBugList] = useState(store.getState() || []);

  const unsub = store.subscribe(() => {
    setBugList(store.getState());
  });

  const addBug = (bug) => {
    store.dispatch(bugAdded(bug));
    unsub();
  };
  const removeBug = (id) => {
    store.dispatch(bugRemoved(id));
    unsub();
  };

  const resolveBug = (id) => {
    store.dispatch(bugResolved(id));
    unsub();
  };

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-lg font-extrabold text-center py-3">Bug List</h1>
      <div>
        <div className="flex rounded-md shadow-sm">
          <input
            type="text"
            id="bug"
            name="hs-trailing-button-add-on"
            className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          />
          <button
            type="button"
            className="py-3 px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            onClick={() => {
              const bug = document.getElementById('bug').value;
              if (bug) {
                addBug(bug);
                document.getElementById('bug').value = '';
              }
            }}
          >
            Add Bug
          </button>
        </div>
      </div>
      <br />
      <br />

      <ul className="text-sm flex flex-col">
        {bugList.map((bug, i) => (
          <li
            key={i}
            className={`inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              bug.resolved ? 'bg-green-100' : ''
            }`}
          >
            <svg
              className="flex-shrink-0 h-6 w-6 cursor-pointer"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                resolveBug(bug.id);
              }}
            >
              <path
                d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                fill="currentColor"
                className={bug.resolved ? 'fill-green-500' : 'fill-blue-500'}
              />
              <path
                d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                fill="currentColor"
                className="fill-white"
              />
            </svg>
            <div className="text-gray-800 dark:text-gray-400 flex justify-between w-full">
              {bug.description}
              <span
                onClick={() => {
                  removeBug(bug.id);
                }}
                className="w-6 h-6 bg-red-400 inline-flex items-center text-sm font-medium rounded-full cursor-pointer"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
