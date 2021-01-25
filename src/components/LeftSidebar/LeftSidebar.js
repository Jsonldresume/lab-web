import React, { useState, useContext } from 'react';
import * as _  from 'lodash';

import AppContext from '../../context/AppContext';
import TabBar from '../../shared/TabBar';
import ProfileTab from './tabs/Profile';
import AddressTab from './tabs/Address';
import ContactsTab from './tabs/Contacts';
import ObjectiveTab from './tabs/Objective';
import WorkTab from './tabs/Work';
import EducationTab from './tabs/Education';
import AwardsTab from './tabs/Awards';
import CertificationsTab from './tabs/Certifications';
import SkillsTab from './tabs/Skills';
import ExtrasTab from './tabs/Extras';
import LanguagesTab from './tabs/Languages';
import ReferencesTab from './tabs/References';
import HobbiesTab from './tabs/Hobbies';

const LeftSidebar = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { data } = state;

  const tabs = [
    { key: 'profile', name: _.get(data, "profile.heading", "Profile") },
    { key: 'address', name: _.get(data, "address.headin", "Address") },
    { key: 'contacts', name: _.get(data, "contacts.heading", "Contacts") },
    { key: 'objective', name: _.get(data, "objective.heading", "Objective") },
    { key: 'work', name: _.get(data, "work.heading", "Work") },
    { key: 'education', name: _.get(data, "education.heading", "Education") },
    { key: 'awards', name: _.get(data, "awards.heading", "Awards")  },
    { key: 'certifications', name: _.get(data, "certifications.heading", "Certifications") },
    { key: 'skills', name: _.get(data, "skills.heading", "Skills") },
    { key: 'hobbies', name: _.get(data, "hobbies.heading", "Hobbies") },
    { key: 'languages', name: _.get(data, "languages.heading", "Languages") },
    { key: 'references', name: _.get(data, "references.heading", "References") },
    { key: 'extras', name: _.get(data, "extras.heading", "Extras") },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0].key);
  const onChange = (key, value) => {
    dispatch({
      type: 'on_input',
      payload: {
        key,
        value,
      },
    });

    dispatch({ type: 'save_data' });
  };

  const renderTabs = () => {
    switch (currentTab) {
      case 'profile':
        return <ProfileTab data={data} onChange={onChange} />;
      case 'address':
        return <AddressTab data={data} onChange={onChange} />;
      case 'contacts':
        return <ContactsTab data={data} onChange={onChange} />;
      case 'objective':
        return <ObjectiveTab data={data} onChange={onChange} />;
      case 'work':
        return <WorkTab data={data} onChange={onChange} />;
      case 'education':
        return <EducationTab data={data} onChange={onChange} />;
      case 'awards':
        return <AwardsTab data={data} onChange={onChange} />;
      case 'certifications':
        return <CertificationsTab data={data} onChange={onChange} />;
      case 'skills':
        return <SkillsTab data={data} onChange={onChange} />;
      case 'hobbies':
        return <HobbiesTab data={data} onChange={onChange} />;
      case 'languages':
        return <LanguagesTab data={data} onChange={onChange} />;
      case 'references':
        return <ReferencesTab data={data} onChange={onChange} />;
      case 'extras':
        return <ExtrasTab data={data} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div
      id="leftSidebar"
      className="animated slideInLeft z-10 py-6 h-screen bg-white col-span-1 shadow-2xl overflow-y-scroll"
    >
      <TabBar tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="px-6">{renderTabs()}</div>
    </div>
  );
};

export default LeftSidebar;
