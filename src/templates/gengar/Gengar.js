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
import NamesA from '../blocks/Names/NamesA';
import SubNamesA from '../blocks/Names/SubNamesA';
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
    data.profile.photograph !== '' && (
      <img
        className="w-24 h-24 rounded-full mr-4 object-cover border-4"
        style={{
          borderColor: theme.colors.background,
        }}
        src={data.profile.photograph}
        alt={data.profile.firstName}
      />
    );

  const Profile = () => (
    <div>
      <h1 className="text-2xl font-bold leading-tight">
        {data.profile.firstName}
      </h1>
      <h1 className="text-2xl font-bold leading-tight">
        {data.profile.lastName}
      </h1>
      <div className="text-xs font-medium mt-2">{data.profile.subtitle}</div>
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

            {hasAddress(data.profile.address) && (
              <div className="flex flex-col mt-4 text-xs">
                <h6 className="font-bold text-xs uppercase tracking-wide mb-1">
                  {t('shared.forms.address')}
                </h6>
                <span>{data.profile.address.line1}</span>
                <span>{data.profile.address.line2}</span>
                <span>
                  {data.profile.address.city} {data.profile.address.pincode}
                </span>
              </div>
            )}

            <hr
              className="w-1/4 my-5 opacity-25"
              style={{ borderColor: theme.colors.background }}
            />

            <h6 className="font-bold text-xs uppercase tracking-wide mb-2">
              Contact
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
