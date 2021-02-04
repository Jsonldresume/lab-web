import React, { useContext, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { hasAddress, hexToRgb } from '../../utils';
import AwardsA from '../blocks/Awards/AwardsA';
import CertificationsA from '../blocks/Certifications/CertificationsA';
import ContactB from '../blocks/Contact/ContactB';
import EducationA from '../blocks/Education/EducationA';
import HeadingC from '../blocks/Heading/HeadingC';
import HobbiesA from '../blocks/Hobbies/HobbiesA';
import LanguagesA from '../blocks/Languages/LanguagesA';
import ObjectiveA from '../blocks/Objective/ObjectiveA';
import ProjectsA from '../blocks/Projects/ProjectsA';
import ReferencesB from '../blocks/References/ReferencesB';
import SkillsA from '../blocks/Skills/SkillsA';
import WorkA from '../blocks/Work/WorkA';

import PageContext from '../../context/PageContext';

import AppContext from '../../context/AppContext';
import NamesB from '../blocks/Names/NamesB';
import SubNamesA from '../blocks/Names/SubNamesA';
import AddressA from '../blocks/Address/AddressA';
import * as _  from 'lodash';

const Blocks = {
  objective: ObjectiveA,
  work: WorkA,
  education: EducationA,
  projects: ProjectsA,
  awards: AwardsA,
  certifications: CertificationsA,
  skills: SkillsA,
  hobbies: HobbiesA,
  languages: LanguagesA,
  references: ReferencesB,
};

const Gengar = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  const layout = _.get(theme,'layoutblocks.gengar', []);
  
  const { r, g, b } = hexToRgb(theme.colors.primary) || {};

  const Photo = () =>
    _.get(data, 'jsonld["@graph"][1].image.contentUrl', "") !== '' && (
      <img
        className="w-24 h-24 rounded-full mr-4 object-cover border-4"
        style={{
          borderColor: theme.colors.background,
        }}
        src={_.get(data, 'jsonld["@graph"][1].image.contentUrl', "")}
        alt="Resume Photograph"
      />
    );

  const Profile = () => (
    <div>
      <NamesB data={data} className="text-2xl font-bold leading-tight"/>
      <SubNamesA data={data} />
      <div className="text-xs font-medium mt-2">{_.get(data, 'jsonld["@graph"][1].description', "")}</div>
    </div>
  );

  return (
    <PageContext.Provider value={{ data, heading: HeadingC }}>
      <div
        id="page"
        className="rounded"
        style={{
          fontFamily: theme.font.family,
          color: theme.colors.primary,
          backgroundColor: theme.colors.background,
        }}
      >
        <div className="grid grid-cols-12">
          <div
            className="col-span-4 px-6 py-8"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            <div className="flex items-center">
              <Photo />
              <Profile />
            </div>
            
            <AddressA data={data} mainclassName="flex flex-col mt-4 text-xs" hclassName="font-bold text-xs uppercase tracking-wide mb-1" subclassName="" />

            <hr
              className="w-1/4 my-5 opacity-25"
              style={{ borderColor: theme.colors.background }}
            />

            <h6 className="font-bold text-xs uppercase tracking-wide mb-2">
              {data.contacts.heading || "Contact"}
            </h6>
            <ContactB />
          </div>

          <div
            className="col-span-8 px-6 py-8"
            style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
          >
            <div className="grid gap-6 items-center">
              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>

          <div
            className="col-span-4 px-6 py-8"
            style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
          >
            <div className="grid gap-6">
              {layout[1] &&
                layout[1].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>

          <div className="col-span-8 px-6 py-8">
            <div className="grid gap-6">
              {layout[2] &&
                layout[2].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default Gengar;
