import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './components/hooks/use-http';

function App() {

  const transformTasks = (tasksObject) => {
    const loadedTasks = [];
    for (const taskKey in tasksObject) {
      loadedTasks.push({ id: taskKey, text: tasksObject[taskKey].text });
    }
    setTasks(loadedTasks);
  }

  const httpData = useHttp({ url: 'https://react-http-tasks-cfa03-default-rtdb.firebaseio.com/tasks.json' }, transformTasks);
  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks()
  },[]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler}/>
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
