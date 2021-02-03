import React, { useContext, memo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import ContactA from '../blocks/Contact/ContactA';
import HeadingB from '../blocks/Heading/HeadingB';
import AwardsA from '../blocks/Awards/AwardsA';
import CertificationsA from '../blocks/Certifications/CertificationsA';
import EducationA from '../blocks/Education/EducationA';
import HobbiesA from '../blocks/Hobbies/HobbiesA';
import LanguagesA from '../blocks/Languages/LanguagesA';
import ProjectsA from '../blocks/Projects/ProjectsA';
import ReferencesA from '../blocks/References/ReferencesA';
import SkillsA from '../blocks/Skills/SkillsA';
import WorkA from '../blocks/Work/WorkA';

import PageContext from '../../context/PageContext';

import AppContext from '../../context/AppContext';
import NamesA from '../blocks/Names/NamesA';
import SubNamesA from '../blocks/Names/SubNamesA';
import * as _  from 'lodash';

const Blocks = {
  work: WorkA,
  education: EducationA,
  projects: ProjectsA,
  awards: AwardsA,
  certifications: CertificationsA,
  skills: SkillsA,
  hobbies: HobbiesA,
  languages: LanguagesA,
  references: ReferencesA,
};

const Pikachu = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  const layout = _.get(theme,'layoutblocks.pikachu', []);

  return (
    <PageContext.Provider value={{ data, heading: HeadingB }}>
      <div
        id="page"
        className="p-8 rounded"
        style={{
          fontFamily: theme.font.family,
          color: theme.colors.primary,
          backgroundColor: theme.colors.background,
        }}
      >
        <div className="grid grid-cols-12 gap-8">
          {data.profile.photograph && (
            <div className="self-center col-span-4">
              <img
                className="w-48 h-48 rounded-full mx-auto object-cover"
                src={data.profile.photograph}
                alt={data.profile.firstName}
              />
            </div>
          )}

          <div
            className={`${
              data.profile.photograph !== '' ? 'col-span-8' : 'col-span-12'
            }`}
          >
            <div
              className="h-48 rounded flex flex-col justify-center"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
              }}
            >
              <div className="flex flex-col justify-center mx-8 my-6">
                <h1 className="text-3xl font-bold leading-tight">
                  {data.profile.firstName} {data.profile.lastName}
                </h1>
                <div className="text-sm font-medium tracking-wide">
                  {data.profile.subtitle}
                </div>

                {data.objective.body && (
                  <div>
                    <hr
                      className="my-5 opacity-25"
                      style={{ borderColor: theme.colors.background }}
                    />

                    <ReactMarkdown
                      className="text-sm"
                      source={data.objective.body}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div className="grid gap-4">
              <ContactA />

              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>

          <div className="col-span-8">
            <div className="grid gap-4">
              {layout[1] &&
                layout[1].map((x) => {
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

export default Pikachu;
