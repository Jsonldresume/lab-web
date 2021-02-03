import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';
import { hexToRgb } from '../../utils';

import { v4 as uuidv4 } from 'uuid';
import * as _  from 'lodash';

const styles = {
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    color: 'white',
    backgroundColor: '#222',
    height: '160px',
    paddingLeft: '270px',
  },
  section: {
    marginTop: '167px',
    marginLeft: '20px',
  },
};

const Celebi = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  
  const { t } = useTranslation();

  const { r, g, b } = hexToRgb(theme.colors.accent) || {};

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
  
  const Subnames = () => (
    <h6 className="text-lg tracking-wider uppercase">{((data.jsonld['@graph'][1].givenName[1]) ? (" ("+data.jsonld['@graph'][1].givenName.map(function(elem,index){
              if(index > 0 && elem['@value']){
                let name = elem['@value'];
                let familynameIndex = data.jsonld['@graph'][1].familyName.findIndex(x=>x['@language']===elem['@language']);
                if(familynameIndex >= 0){
                  if(data.jsonld['@graph'][1].familyName[familynameIndex] && data.jsonld['@graph'][1].familyName[familynameIndex]['@value']){
                    name += " "+data.jsonld['@graph'][1].familyName[familynameIndex]['@value'];
                  }
                }
                return name;
              }else{
                return null;
              }
}).filter(function (el) {
  return el != null;
}).join(", ")+")") : (""))}
</h6>
  );
  const Names = () => (
    <h1 className="tracking-wide uppercase font-semibold" style={{ fontSize: '2.75em' }}>
          {(Array.isArray(data.jsonld['@graph'][1].givenName)) ? (data.jsonld['@graph'][1].givenName[0]['@value']) : (data.jsonld['@graph'][1].givenName)} {(Array.isArray(data.jsonld['@graph'][1].familyName)) ? (data.jsonld['@graph'][1].familyName[0]['@value']) : (data.jsonld['@graph'][1].familyName)}
        </h1>
  );
  
  const Header = () => (
    <header style={styles.header}>
      <div className="ml-6">
        <Names />
        <Subnames />
        <h6 className="text-lg tracking-wider uppercase">{_.get(data, 'jsonld["@graph"][1].description', "")}</h6>
      </div>
    </header>
  );
  
  const Heading = ({ title, className }) => (
    <h5
      className={`my-2 text-md uppercase font-semibold tracking-wider pb-1 border-b-2 border-gray-800 ${className}`}
    >
      {title}
    </h5>
  );
  
  const Objective = () =>
    data.objective &&
    data.objective.enable && (
      <div className="mb-6">
        <Heading title={data.objective.heading} />
          {_.get(data, 'jsonld["@graph"][1].seeks',[]).map((x, index) => (
              <ReactMarkdown key={"objetive_"+index} className="mr-10 text-sm" source={x.description} />
          ))}
          {_.get(data, 'jsonld["@graph"][1].seeks',[]).map((x, index) => (
            <div key={"holder_"+index}>
              <p className="text-xs text-gray-800" key={"p_"+index}>
                {(_.get(x,'availableAtOrFrom.address.addressCountry', null) || _.get(x,'availableAtOrFrom.address.addressRegion', null) || _.get(x,'availableAtOrFrom.address.addressLocality', null)) ? "" : ""}
                {(_.get(x,'availableAtOrFrom.address.addressLocality', null) ? (_.get(x,'availableAtOrFrom.address.addressLocality', '')+' ') : '')
                +(_.get(x,'availableAtOrFrom.address.addressRegion', null) ? (_.get(x,'availableAtOrFrom.address.addressRegion', '')+' ') : '')
                +(_.get(x,'availableAtOrFrom.address.addressCountry', null) ? (_.get(x,'availableAtOrFrom.address.addressCountry', '')) : '')} | {(_.get(x, 'availabilityStarts', null)) ? (_.get(x, 'availabilityStarts', '')) : ""} {_.get(x, 'availabilityEnds', null) ? ("- " +_.get(x,'availabilityEnds','')): ""}
              </p>
            </div>
          ))}
      </div>
    );

  const ContactItem = ({ label, value }) =>
    value && (
      <div className="mb-3">
        <h6 className="text-xs font-bold">{label}</h6>
        <p className="text-sm">{value}</p>
      </div>
    );
  
  const Address = () => (
    (
      data.jsonld["@graph"][1].address && data.jsonld["@graph"][1].address.length>0 &&
      data.address.enable && (
        <div className="mb-6">
          {data.jsonld["@graph"][1].address.filter(x => (Date.parse(x.hoursAvailable.validThrough) - Date.parse(new Date()))>0).map(AddressItem)}
        </div>
      )
    ) || ("")
  );
  
  const AddressItem = (x, index) => (
    (
        <div className="mb-3" key={_.get(x,'@id', 'main')}>
          {index===0?<h6 className="text-xs font-bold">{data.profile.address.heading || "Address"}</h6>:""}
          <p className="text-sm">{x.streetAddress}</p>
          <p className="text-sm">{x.addressLocality} {x.addressRegion}</p>
          <p className="text-sm">{x.addressCountry} {x.postalCode}</p>
        </div>
    )
  );
  const Contact = () => (
    data.contacts.enable && (
      <div className="mb-6">
        <Heading title="Contact" className="mt-8 w-3/4 mx-auto" />
        <Address />
        <ContactItem label="Phone" value={_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'telephone', "")} />
        <ContactItem label="Email Address" value={_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'email', "")} />
        <ContactItem label="Website" value={_.get(data,'jsonld["@graph"][1].sameAs[0]',"")} />
      </div>
    )
  );
  
  const SectionSkillsItem = x => (
    x && (
        <p key={uuidv4()}>| {x} </p>
    )
  )
  
  const SectionSkills = ({skills}) => (
    skills && (skills.length>0) && (
      <div className="text-xs text-gray-800 flex">
      {
        skills.filter(x => (x !== '')).map(SectionSkillsItem)
      }
      </div>
    )
  )
  
  const WorkResponsibilityItem = x => (
    x && (
        <li className="mt-2 text-sm" key={uuidv4()}>{x}</li>
    )
  )
    
  const WorkResponsibility = ({responsibilities}) => (
    responsibilities && (responsibilities.length>0) && (
      <ul>
      {
        responsibilities.filter(x => (x !== '')).map(WorkResponsibilityItem)
      }
      </ul>
    )
  )
  
  const WorkItem = x => (
    <div key={_.get(x,'@id', 'main')} className="my-3 mr-10">
      <div>
        <h6 className="font-semibold">{_.get(x,'subjectOf.organizer.name','')}</h6>
        <p className="text-xs text-gray-800">
          {_.get(x,'roleName', '')} | {_.get(x,'startDate','')} - {_.get(x,'endDate','')}
        </p>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={_.get(x,'description','')} />
      <WorkResponsibility responsibilities={_.get(x, "hasOccupation.responsibilities", [])} />
      <SectionSkills skills={_.get(x, "hasOccupation.skills", [])} />
    </div>
  );

  const Work = () =>
    _.get(data, "jsonld['@graph'][1].hasOccupation", []).length && data.work.enable && (
      <div className="mb-6">
        <Heading title={data.work.heading} />
        {_.get(data, "jsonld['@graph'][1].hasOccupation", []).filter(x => !_.get(x, '@id', '').endsWith("disable")).map(WorkItem)}
      </div>
    );

  const EducationItem = x => (
    <div key={_.get(x,'@id', 'main')} className="my-3 mr-10">
      <h6 className="font-semibold">{_.get(x, "about.provider.name", "")}</h6>
      <p className="text-xs">{_.get(x, "educationalLevel", "")} {_.get(x, "about.educationalCredentialAwarded", "")}</p>
      <div className="text-xs">
        {_.get(x, "about.startDate", "")} - {_.get(x, "about.endDate", "")}
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={_.get(x, 'abstract', '')} />
      <SectionSkills skills={_.get(x, "teaches", [])} />
    </div>
  );

  const Education = () =>
    (_.get(data, "jsonld['@graph'][1].hasCredential", []).length>0) &&
    data.education.enable && (
      <div className="mb-6">
        <Heading title={data.education.heading} />
        {_.get(data, "jsonld['@graph'][1].hasCredential", []).filter(x => (!_.get(x, '@id', '').endsWith("disable") && _.get(x, 'credentialCategory', '')==="degree")).map(EducationItem)}
      </div>
    );
  
  const userSkills = () => {
    let workSkills = _.chain(_.get(data, "jsonld['@graph'][1].hasOccupation", [])).map('skills').flatten();
    
    let awardSkills = _.chain(_.get(data, "jsonld['@graph'][0].award", [])).map('skill:assesses').flatten();
    
    let educationSkills = _.chain(_.get(data, "jsonld['@graph'][1].hasCredential", [])).map('teaches').flatten();
    
    let coursesSkills = _.chain(_.get(data, "jsonld['@graph'][1].hasCredential", [])).map('about').flatten().map('hasCourse').flatten().map('teaches').flatten();
    
    let educationProjectSkills = _.chain(_.get(data, "jsonld['@graph'][1].hasCredential", [])).map('about').map('workExample').flatten().map('hasPart').flatten().map('teaches').flatten();
    
    let interactionTeachSkills = _.chain(_.get(data, "jsonld['@graph'][1].interactionStatistic", [])).map('result').flatten().map('teaches').flatten();
    
    let interactionAssessSkills = _.chain(_.get(data, "jsonld['@graph'][1].interactionStatistic", [])).map('result').flatten().map('assesses').flatten();
    
    return [...workSkills, ...awardSkills, ...educationSkills, ...coursesSkills, ...educationProjectSkills, ...interactionTeachSkills, ...interactionAssessSkills];
  }
  const Skills = () =>
    data.skills.enable && (
      <div className="mb-6">
        <Heading title="Skills" className="w-3/4 mx-auto" />
        <ul className="list-none text-sm">
          {userSkills().map(x => (
            <li key={uuidv4()} className="my-2">
              {x}
            </li>
          ))}
        </ul>
      </div>
    );

  const Memberships = () =>
    data.memberships.enable && (
      <div className="mb-6">
        <Heading title="Memberships" className="w-3/4 mx-auto" />
        <ul className="list-none text-sm">
          {_.get(data.jsonld["@graph"][1], 'memberOf', []).map(x => (
            <li key={_.get(x,'@id', '')} className="my-2">
              {_.get(x, "memberOf.programName", "")}
            </li>
          ))}
        </ul>
      </div>
    );

  const ReferenceItem = x => (
    <div key={_.get(x, '@id', 'main')} className="flex flex-col">
      <h6 className="text-sm font-semibold">{_.get(x, 'interactionType.participant.givenName', '')} {_.get(x, 'interactionType.participant.familyName', '')}</h6>
      <span className="text-sm">{_.get(x, 'interactionType.participant.jobTitle', '')}</span>
      <span className="text-sm">{_.get(x, 'interactionType.participant.telephone', '')}</span>
      <span className="text-sm">{_.get(x, 'interactionType.participant.email', '')}</span>
      <ReactMarkdown className="mt-2 text-sm" source={_.get(x, 'result[0].reviewRating.ratingExplanation', '')} />
    </div>
  );

  const References = () =>
    data.references &&
    data.references.enable && (
      <div className="mb-6">
        <Heading title={data.references.heading} />
        <div className="grid grid-cols-2 col-gap-4 row-gap-2">
          {_.get(data.jsonld["@graph"][1], 'interactionStatistic', []).filter(x => _.get(x, 'disambiguatingDescription', '')=== 'Reference').map(ReferenceItem)}
        </div>
      </div>
    );

  const LanguageItem = x => (
    <div key={_.get(x, '@id', '')} className="grid grid-cols-2 items-center py-2">
      <h6 className="text-xs font-medium text-left">{_.get(x, 'name', '')}</h6>
      <div className="flex">
        {x.level && <div className="font-bold text-sm mr-2">{x.level}</div>}
        {x.rating !== 0 && (
          <div className="flex">
            {Array.from(Array(x.rating)).map((_, i) => (
              <i key={i} className="material-icons text-lg" style={{ color: theme.colors.accent }}>
                star
              </i>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const Languages = () =>
    data.languages &&
    data.languages.enable && (_.get(data, 'jsonld["@graph"][1].knowsLanguage',[]).length > 0) && (
      <div className="w-3/4 mx-auto mb-6">
        <Heading title={data.languages.heading} />
        <div>{_.get(data, 'jsonld["@graph"][1].knowsLanguage', []).filter(x => _.get(x, 'name', '') !== '').map(LanguageItem)}</div>
      </div>
    );

  const AwardItem = x => (
    <div key={_.get(x,'@id', 'main')} className="my-2">
      <h6 className="font-semibold">{_.get(x, "skill:title", "")}</h6>
      <p className="text-xs">{_.get(x, "skill:nativeLabel", "")}</p>
      <ReactMarkdown className="mt-2 text-sm" source={_.get(x, "description", "")} />
    </div>
  );

  const Awards = () =>
    data.awards &&
    data.awards.enable && (
      <div className="mb-6">
        <Heading light title={data.awards.heading} />
        {_.get(data.jsonld["@graph"][0], 'award', []).filter(x => x["skill:title"]!=="").map(AwardItem)}
      </div>
    );

  const CertificationItem = x => (
    <div key={_.get(x,'@id','main')} className="my-2">
      <h6 className="font-semibold">{_.get(x, 'educationalLevel', '')}</h6>
      <p className="text-xs">{_.get(x, 'about.educationalCredentialAwarded', '')}</p>
      <ReactMarkdown className="mt-2 text-sm" source={_.get(x, 'abstract', '')} />
    </div>
  );

  const Certifications = () =>
    data.certifications &&
    data.certifications.enable && (
      <div className="mb-6">
        <Heading title={data.certifications.heading} className="w-3/4 mx-auto" />
        {_.get(data, "jsonld['@graph'][1].hasCredential", []).filter(x => (!_.get(x, '@id', '').endsWith("disable") && _.get(x, 'credentialCategory', '')!=="Degree")).map(CertificationItem)}
      </div>
    );

  const ExtraItem = x => (
    <div key={_.get(x, '@id', 'main')} className="my-3">
      <h6 className="text-xs font-bold">{_.get(x, 'propertyID', '')}</h6>
      <div className="text-sm">{_.get(x, 'value', '')}</div>
    </div>
  );

  const Extras = () =>
    data.extras &&
    data.extras.enable && (
      <div className="mb-6">
        <Heading title={data.extras.heading} className="w-3/4 mx-auto" />
        {_.get(data.jsonld["@graph"][1], 'identifier', []).filter(x => x['value'] !== '').map(ExtraItem)}
      </div>
    );

  return (
    <div
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="grid grid-cols-12">
        <div
          className="sidebar col-span-4 pb-8 ml-8 z-10 text-center"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
        >
          <Photo />
          <Contact />
          <Skills />
          <Memberships />
          <Languages />
          <Certifications />
          <Extras />
        </div>
        <div className="col-span-8">
          <Header />

          <section className="py-4" style={styles.section}>
            <Objective />
            <Work />
            <Education />
            <Awards />
            <References />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Celebi;
