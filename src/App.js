import React, { useState } from 'react';
import './style.css';
import store from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

const App = () => {
  const [bugList, setBugList] = useState([]);

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
    <div>
      <h1>Bug List</h1>
      {/* <p>Start editing to see some magic happen :)</p> */}
      <input id="bug" />
      <button
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
      <br />
      <br />
      {bugList.map((bug, i) => (
        <div>
          {bug.description}
          <button
            onClick={() => {
              removeBug(bug.id);
            }}
          >
            Remove
          </button>

          <button
            onClick={() => {
              resolveBug(bug.id);
            }}
            disabled={bug.resolved}
          >
            {bug.resolved ? 'Resolved' : 'Resolve'}
          </button>
        </div>
      ))}
    </div>
  );
};
export default App;
