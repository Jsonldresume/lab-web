import React from 'react';
import Dropdown from './Dropdown';

const TabBar = ({ tabs, currentTab, setCurrentTab }) => {

  const changeBy = (x) => {
    const index = tabs.findIndex((tab) => tab.key === currentTab);

    if (x < 0 && index > 0) {
      setCurrentTab(tabs[index - 1].key);
    }

    if (x > 0 && index < tabs.length - 1) {
      setCurrentTab(tabs[index + 1].key);
    }
  };
  const TabOption = (tab, index) => {
    return (
      <option key={tab.key} value={tab.key}>
        {tab.name || 'Tab'}
      </option>
    );
  };
  return (
    <div className="mx-4 mb-6 flex items-center">
      <div
        className="flex mr-1 cursor-pointer select-none text-gray-600 hover:text-gray-800"
        onClick={() => changeBy(-1)}
      >
        <i className="material-icons">chevron_left</i>
      </div>
      
        <Dropdown
          className="mb-6"
          label=''
          placeholder=""
          value={currentTab}
          onChange={v => {setCurrentTab(v);}}
          options = {tabs}
          optionItem = {TabOption}
        />

      <div
        className="flex ml-1 cursor-pointer select-none text-gray-600 hover:text-gray-800"
        onClick={() => changeBy(1)}
      >
        <i className="material-icons">chevron_right</i>
      </div>
    </div>
  );
};

export default TabBar;
