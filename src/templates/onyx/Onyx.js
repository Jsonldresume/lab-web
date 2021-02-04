import React, { useContext, memo } from 'react';
import { useTranslation } from 'react-i18next';
import AwardsA from '../blocks/Awards/AwardsA';
import CertificationsA from '../blocks/Certifications/CertificationsA';
import Contact from '../blocks/Contact/ContactA';
import EducationA from '../blocks/Education/EducationA';
import HeadingA from '../blocks/Heading/HeadingA';
import HobbiesA from '../blocks/Hobbies/HobbiesA';
import LanguagesA from '../blocks/Languages/LanguagesA';
import ObjectiveA from '../blocks/Objective/ObjectiveA';
import ProjectsA from '../blocks/Projects/ProjectsA';
import ReferencesA from '../blocks/References/ReferencesA';
import SkillsA from '../blocks/Skills/SkillsA';
import WorkA from '../blocks/Work/WorkA';
import AddressA from '../blocks/Address/AddressA';

import PageContext from '../../context/PageContext';
import { hasAddress } from '../../utils';

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

const Onyx = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  const layout = _.get(theme,'layoutblocks.onyx', []);

  return (
    <PageContext.Provider value={{ data, heading: HeadingA }}>
      <div
        id="page"
        className="p-8 rounded"
        style={{
          fontFamily: theme.font.family,
          color: theme.colors.primary,
          backgroundColor: theme.colors.background,
        }}
      >
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-3 flex items-center">
            {_.get(data, 'jsonld["@graph"][1].image.contentUrl', "") !== '' && (
              <img
                className="rounded object-cover mr-4"
                src={_.get(data, 'jsonld["@graph"][1].image.contentUrl', "")}
                alt="Resume Photograph"
                style={{ width: '120px', height: '120px' }}
              />
            )}

            <div>
                <NamesA data={data} className="font-bold text-4xl" style={{ color: theme.colors.primary }} />
                <SubNamesA data={data} />
              <h6 className="font-medium text-sm">{_.get(data, 'jsonld["@graph"][1].description', "")}</h6>

              <AddressA data={data} mainclassName="flex flex-col mt-4 text-xs" hclassName="font-bold text-xs uppercase tracking-wide mb-1" subclassName="" />
            </div>
          </div>

          <Contact />
        </div>

        <hr
          className="my-5 opacity-25"
          style={{ borderColor: theme.colors.primary }}
        />

        <div className="grid gap-4">
          {layout[0] &&
            layout[0].map((x) => {
              const Component = Blocks[x];
              return Component && <Component key={x} />;
            })}

          <div className="grid grid-cols-2 gap-4">
            {layout[1] &&
              layout[1].map((x) => {
                const Component = Blocks[x];
                return Component && <Component key={x} />;
              })}
          </div>

          {layout[2] &&
            layout[2].map((x) => {
              const Component = Blocks[x];
              return Component && <Component key={x} />;
            })}
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default Onyx;
