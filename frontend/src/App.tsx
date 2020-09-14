import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import {
  columns,
  getTableData,
  Table,
  fetchGithubData,
  initialToolData,
  features,
  Feature,
  recoilFilters,
  FeatureFilter,
} from './Tools';
import { RecoilRoot, useRecoilValue } from 'recoil';

function FeatureFilters() {
  return (
    <>
      {features.map((feature: Feature, i) => (
        <FeatureFilter key={i} feature={feature} />
      ))}
    </>
  );
}
const githubLogo = (
  <svg width="24" height="24" fill="currentColor" className="text-white mr-3 ">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
    ></path>
  </svg>
);
function FeaturesAndTable() {
  const [toolData, setToolData] = useState(initialToolData);
  useEffect(() => {
    async function _fetchGithubData() {
      setToolData(await fetchGithubData());
    }
    _fetchGithubData();
  }, []);

  const featureFilters = useRecoilValue(recoilFilters);
  const data = useMemo(() => getTableData(toolData, featureFilters), [
    toolData,
    featureFilters,
  ]);
  return (
    <>
      <FeatureFilters />
      <Table columns={columns} data={data} />
    </>
  );
}

function App() {
  return (
    <RecoilRoot>
      <div className="w-full h-full content-center  items-center flex flex-col">
        <nav className="bg-blue-800 p-2 w-full mb-10">
          <div className="w-full flex flex-wrap items-center justify-between mt-0 py-2">
            <div className="pl-4 flex items-center">
              <img
                alt="Python logo"
                src="https://www.python.org/static/img/python-logo.png"
              />
              <div className="text-white text-xl">
                The Big List of Python Packaging and Distribution Tools
              </div>
            </div>
            <div className="text-white">
              <a href="https://github.com/cs01/python-packaging-tools">
                {githubLogo}
              </a>
            </div>
          </div>
        </nav>
        <div className="container w-full mx-15">
          <FeaturesAndTable />
        </div>
        <footer className="w-full flex items-center bg-black mt-20 h-64 text-white ">
          <div className="w-full text-xl text-center text-blue-800">
            a <a href="http://grassfedcode.com">grassfedcode.com</a> project
          </div>
        </footer>
      </div>
    </RecoilRoot>
  );
}

export default App;