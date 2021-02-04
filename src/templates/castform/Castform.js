import React, { useContext, memo } from 'react';
import { useTranslation } from 'react-i18next';
import AwardsA from '../blocks/Awards/AwardsA';
import CertificationsA from '../blocks/Certifications/CertificationsA';
import ContactC from '../blocks/Contact/ContactC';
import EducationA from '../blocks/Education/EducationA';
import HeadingD from '../blocks/Heading/HeadingD';
import HobbiesA from '../blocks/Hobbies/HobbiesA';
import LanguagesA from '../blocks/Languages/LanguagesA';
import ObjectiveA from '../blocks/Objective/ObjectiveA';
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
  objective: ObjectiveA,
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

const Castform = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  const layout = _.get(theme,'layoutblocks.castform', []);

  const Photo = () =>
    _.get(data, 'jsonld["@graph"][1].image.contentUrl', "") !== '' && (
      <img
        className="w-32 h-32 rounded-full"
        style={{
          borderWidth: 6,
          borderColor: theme.colors.background,
        }}
        src={_.get(data, 'jsonld["@graph"][1].image.contentUrl', "")}
        alt="Resume Photograph"
      />
    );

  const Profile = () => (
    <div>
      <NamesA data={data} className="text-2xl font-bold"/>
      <SubNamesA data={data} />
      <h5>{_.get(data, 'jsonld["@graph"][1].description', "")}</h5>
    </div>
  );

  return (
    <PageContext.Provider value={{ data, heading: HeadingD }}>
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
            className="col-span-4 py-8 pr-8 pl-5"
            style={{
              color: theme.colors.background,
              backgroundColor: theme.colors.primary,
            }}
          >
            <div className="grid gap-4">
              <Photo />
              <Profile />

              <div>
                <HeadingD>{data.profile.heading}</HeadingD>
                <ContactC />
              </div>

              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>
          <div className="col-span-8 py-8 pr-8 pl-5">
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

export default Castform;
