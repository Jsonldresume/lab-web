import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import TextArea from '../../../shared/TextArea';
import Dropdown from '../../../shared/Dropdown';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import { addItem } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';
import AddItemButton from '../../../shared/AddItemButton';
import ItemHeading from '../../../shared/ItemHeading';

import * as _  from 'lodash';

const EducationTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;
  
  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.education.enable}
            onChange={v => onChange('data.education.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.education.heading}
            onChange={v => onChange('data.education.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {_.get(data.jsonld["@graph"][1], 'hasCredential', []).map((x, index) => (
        <Item
          item={x}
          key={_.get(x, '@id', 'item')}
          index={index}
          onChange={onChange}
          dispatch={dispatch}
          first={index === 0}
          last={index === _.size(_.get(data.jsonld["@graph"][1], 'hasCredential', [])) - 1}
        />
      ))}

      <AddItem heading={data.education.heading} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation(['leftSidebar', 'app']);
  const EducationTypeOption = (x, index) => {
    return (
      <option key={x} value={x}>
        {x}
      </option>
    );
  };
  
  const setValue = (path, field, v, type=null, id=null) => {
    let fullPath = path;
    if(field){
      fullPath = fullPath+"."+field;
    }
    let val = _.get(item, fullPath, null);
    if(val === null){
      if(typeof(v) === "string" || typeof(v) === "number"){
        _.set(item, fullPath, "");
      }else if(typeof(v) === "object"){
          if(Array.isArray(v)){
            _.set(item, fullPath, []);
          }else{
            _.set(item, fullPath, {});
          }
      }
    }
  
    onChange(identifier+fullPath, v);
    if(id){
      onChange(`${identifier}`+path+'["@id"]', id);
    }
    if(type){
      onChange(`${identifier}`+path+'["@type"]', type);
    }
  };
  
  return (
    <div>
      <TextField
        className="mb-6"
        label={t('education.name.label')}
        placeholder="Harvard University"
        value={_.get(item, "about.provider.name", "")}
        onChange={v => onChange(`${identifier}about.provider.name`, v)}
      />
      <div className="grid grid-cols-2 col-gap-4">
        <Dropdown
          className="mb-6"
          label={t('education.type.label')}
          placeholder="Certificate type"
          value={_.get(item, "credentialCategory", "")}
          onChange={v => onChange(`${identifier}credentialCategory`, v)}
          options = {["Degree", "Certificate", "Badge"]}
          optionItem = {EducationTypeOption}
        />
        
        <TextField
          className="mb-6"
          label={t('education.major.degree')}
          placeholder="Masters of Science"
          value={_.get(item, "educationalLevel", "")}
          onChange={v => onChange(`${identifier}educationalLevel`, v)}
        />
      </div>

      <TextField
        className="mb-6"
        label={t('education.major.label')}
        placeholder="Computer Science"
        value={_.get(item, "about.educationalCredentialAwarded", "")}
        onChange={v => onChange(`${identifier}about.educationalCredentialAwarded`, v)}
      />
      
      <div className="grid grid-cols-2 col-gap-4">
        <TextField
          className="mb-6"
          label={t('education.grade.label')}
          placeholder="3.7"
          value={_.get(item, "aggregateRating.ratingValue", "")}
          onChange={v => onChange(`${identifier}aggregateRating.ratingValue`, v)}
        />
        
        <TextField
          className="mb-6"
          label={t('education.maxGrade.label')}
          placeholder="4"
          value={_.get(item, "aggregateRating.bestRating", "")}
          onChange={v => onChange(`${identifier}aggregateRating.bestRating`, v)}
        />
      </div>
      
      <div className="grid grid-cols-2 col-gap-4">
        <TextField
          className="mb-6"
          label={t('app:item.startDate.label')}
          placeholder="2018-01-01"
          value={_.get(item, "about.startDate", "")}
          onChange={v => onChange(`${identifier}about.startDate`, v)}
        />
      
        <TextField
          className="mb-6"
          label={t('app:item.endDate.label')}
          placeholder="2020-01-01"
          value={_.get(item, "about.endDate", "")}
          onChange={v => onChange(`${identifier}about.endDate`, v)}
        />
      </div>
      
      <TextField
        className="mb-6"
        label={t('work.skills.label')}
        placeholder="Project Management"
        value={_.get(item,'teaches', [])}
        onChange={v => setValue('teaches', '', v)}
        AddItem={()=>{}}
        type="multitext"
      />

      <TextArea
        rows="5"
        className="mb-6"
        label={t('app:item.description.label')}
        value={_.get(item, 'abstract', '')}
        onChange={v => onChange(`${identifier}abstract`, v)}
      />
    </div>
  );
};

const emptyItem = () => {
  let id = uuidv4();
  return ({
    "@type": "EducationalOccupationalCredential",
    "@id": "_:"+id+"#enable",
    "aggregateRating": {
      "@id": "_:"+id+"#aggregateRating",
      "@type": "aggregateRating",
      "bestRating": "",
      "ratingValue": "",
      "name": "GPA",
      "itemReviewed": {
        "@id": "_:"+id+"#enable"
      }
    },
    "credentialCategory": "degree",
    "educationalLevel": "",
	"abstract": "",
    "teaches": [],
    "about": {
      "@id": "_:"+id+"#about",
      "@type": "EducationalOccupationalProgram",
      "educationalCredentialAwarded": "",
      "startDate": "",
      "endDate": "",
      "provider": {
		"@id": "_:"+id+"#about#provider",
		"@type": "CollegeOrUniversity",
		"name": ""
      }
    }
  });
};

const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState(emptyItem());

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const onSubmit = () => {
    if (item.educationalLevel === '') return;

    addItem(dispatch, 'data.jsonld["@graph"][1].hasCredential', item);

    setItem(emptyItem());

    setOpen(false);
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} />
        <AddItemButton onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const ItemActionEnable = (identifier, item, onChange) => {
  
  return (
    <></>
  )
}

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.jsonld['@graph'][1].hasCredential[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading title={_.get(item, "educationalLevel", "")} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="data.jsonld['@graph'][1].hasCredential"
          enableAction={ItemActionEnable}
        />
      </div>
    </div>
  );
};

export default EducationTab;
