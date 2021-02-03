import React, { useContext, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { hexToRgb } from '../../utils';
import AwardsA from '../blocks/Awards/AwardsA';
import CertificationsA from '../blocks/Certifications/CertificationsA';
import ContactC from '../blocks/Contact/ContactC';
import EducationA from '../blocks/Education/EducationA';
import HeadingE from '../blocks/Heading/HeadingE';
import HobbiesA from '../blocks/Hobbies/HobbiesA';
import LanguagesB from '../blocks/Languages/LanguagesB';
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
  languages: LanguagesB,
  references: ReferencesA,
};

const Celebi = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  const layout = _.get(theme,'layoutblocks.celebi', []);
  
  const { r, g, b } = hexToRgb(theme.colors.accent) || {};


  const styles = {
    header: {
      position: 'absolute',
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      color: 'white',
      backgroundColor: theme.colors.primary,
      height: '160px',
      paddingLeft: '275px',
    },
    leftSection: {
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
    },
    rightSection: {
      marginTop: '160px',
    },
  };

  const Photo = () =>
    (_.get(data, 'jsonld["@graph"][1].image.contentUrl', "") !== '' && (
      <div className="relative z-40">
        <img
          className="w-full object-cover object-center"
          src={_.get(data, 'jsonld["@graph"][1].image.contentUrl', "")}
          alt="Person Photograph"
          style={{
            height: '160px',
          }}
        />
      </div>
    )) || (
      <div className="relative z-40">
        <div style={{
            height: '160px',
          }}>
        </div>
      </div>
    );
  
  const Profile = () => (
    <div style={styles.header}>
        <NamesA data={data} />
        <SubNamesA data={data} />
      <h6 className="text-lg tracking-wider uppercase">
        {_.get(data, 'jsonld["@graph"][1].description', "")}
      </h6>
    </div>
  );

  return (
    <PageContext.Provider value={{ data, heading: HeadingE }}>
      <div
        id="page"
        className="relative rounded"
        style={{
          fontFamily: theme.font.family,
          color: theme.colors.text,
          backgroundColor: theme.colors.background,
        }}
      >
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4 ml-8" style={styles.leftSection}>
            <Photo />

            <div className="text-center grid gap-4 mt-4 mb-8 mx-6">
              <div>
                <HeadingE>{data.profile.heading}</HeadingE>
                <div className="relative w-full grid gap-4 text-xs">
                  <ContactC />
                </div>
              </div>

              {_.get(layout,"[0]", []) &&
                _.get(layout,"[0]", []).map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>
          <div className="col-span-8">
            <Profile />

            <div className="relative" style={styles.rightSection}>
              <div className="grid gap-4 mt-4 mb-8 mr-8">
                {_.get(layout,"[1]", []) &&
                  _.get(layout,"[1]", []).map((x) => {
                    const Component = Blocks[x];
                    return Component && <Component key={x} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default Celebi;
