import React, { memo, useContext } from 'react';
import PageContext from '../../../context/PageContext';
import { safetyCheck } from '../../../utils';

import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const userSkills = (data) => {
    let workSkills = _.chain(_.get(data, "jsonld['@graph'][1].hasOccupation", [])).map('skills').flatten();
    
    let awardSkills = _.chain(_.get(data, "jsonld['@graph'][0].award", [])).map('skill:assesses').flatten();
    
    let educationSkills = _.chain(_.get(data, "jsonld['@graph'][1].hasCredential", [])).map('teaches').flatten();
    
    let coursesSkills = _.chain(_.get(data, "jsonld['@graph'][1].hasCredential", [])).map('about').flatten().map('hasCourse').flatten().map('teaches').flatten();
    
    let educationProjectSkills = _.chain(_.get(data, "jsonld['@graph'][1].hasCredential", [])).map('about').map('workExample').flatten().map('hasPart').flatten().map('teaches').flatten();
    
    let interactionTeachSkills = _.chain(_.get(data, "jsonld['@graph'][1].interactionStatistic", [])).map('result').flatten().map('teaches').flatten();
    
    let interactionAssessSkills = _.chain(_.get(data, "jsonld['@graph'][1].interactionStatistic", [])).map('result').flatten().map('assesses').flatten();
    
    let allSkills = [...workSkills, ...awardSkills, ...educationSkills, ...coursesSkills, ...educationProjectSkills, ...interactionTeachSkills, ...interactionAssessSkills];
    
    let skillsObject = {};
    for(let i=0; i<allSkills.length; i++){
      if(skillsObject[allSkills[i]]){
        skillsObject[allSkills[i]] = skillsObject[allSkills[i]] + 1;
      }else{
        skillsObject[allSkills[i]] = 1;
      }
    }
    
    return skillsObject;
};

const SkillItem = (x, level) => (
  x !== undefined && x !== 'undefined' && x !== '' && (
  <div key={uuidv4()} className="flex flex-col">
    <h6 className="font-semibold text-sm">{x}</h6>
    <span className="text-xs">{(level < 2) ? 'Beginner': ((level <=4 && level>=2) ? 'Intermediate': 'Advanced')}</span>
  </div>
  )
);

const SkillsA = () => {
  const { data, heading: Heading } = useContext(PageContext);
  const skills = userSkills(data);
  
  return _.size(skills) > 0 ? (
    <div>
      <Heading>{data.skills.heading}</Heading>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {Object.keys(skills).map(SkillItem)}
      </div>
    </div>
  ) : null;
};

export default memo(SkillsA);
