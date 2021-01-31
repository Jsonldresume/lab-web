import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import TextArea from '../../../shared/TextArea';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import { addItem } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';
import AddItemButton from '../../../shared/AddItemButton';
import ItemHeading from '../../../shared/ItemHeading';

import * as _  from 'lodash';

const WorkTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox checked={data.work.enable} onChange={v => onChange('data.work.enable', v)} />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.work.heading}
            onChange={v => onChange('data.work.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {_.get(data.jsonld["@graph"][1], 'hasOccupation', []).map((x, index) => (
        <Item
          dispatch={dispatch}
          first={index === 0}
          index={index}
          item={x}
          key={_.get(x, '@id', 'item')}
          last={index === _.size(data.jsonld["@graph"][1].hasOccupation) - 1}
          onChange={onChange}
        />
      ))}

      <AddItem heading={data.work.heading} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation(['leftSidebar', 'app']);
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
        label={t('work.name.label')}
        placeholder="Amazon"
        value={_.get(item, 'subjectOf.organizer.name', '')}
        onChange={v => onChange(`${identifier}subjectOf.organizer.name`, v)}
      />

      <TextField
        className="mb-6"
        label={t('work.role.label')}
        placeholder="Full-Stack Web Developer"
        value={_.get(item, 'roleName', '')}
        onChange={v => onChange(`${identifier}roleName`, v)}
      />

      <div className="grid grid-cols-2 col-gap-4">
        <TextField
          className="mb-6"
          label={t('app:item.startDate.label')}
          placeholder="2019-01-01"
          value={_.get(item, 'startDate', '')}
          onChange={v => onChange(`${identifier}startDate`, v)}
        />

        <TextField
          className="mb-6"
          label={t('app:item.endDate.label')}
          placeholder="2020-01-01"
          value={_.get(item, 'endDate', '')}
          onChange={v => onChange(`${identifier}endDate`, v)}
        />
      </div>
      
      <TextField
        className="mb-6"
        label={t('work.responsibilities.label')}
        placeholder="Preparing project plans"
        value={_.get(item,'hasOccupation.responsibilities', [])}
        onChange={v => setValue('hasOccupation', "responsibilities", v)}
        AddItem={()=>{}}
        type="multitext"
      />
      
      <TextField
        className="mb-6"
        label={t('work.skills.label')}
        placeholder="Project Management"
        value={_.get(item,'hasOccupation.skills', [])}
        onChange={v => setValue('hasOccupation', "skills", v)}
        AddItem={()=>{}}
        type="multitext"
      />

      <TextArea
        rows="5"
        className="mb-6"
        label={t('app:item.description.label')}
        value={_.get(item, 'description', '')}
        onChange={v => onChange(`${identifier}description`, v)}
      />
    </div>
  );
};

const emptyItem = () => {
  let id = uuidv4();
  return ({
    "@type": "EmployeeRole",
    "@id": "_:"+id+"#enable",
    hasOccupation: {
      "@id": "_:"+id+"#hasOccupation",
      "@type": "Occupation",
      name: "",
      skills: [],
      responsibilities: []
    },
    subjectOf: {
      "@type": "BusinessEvent",
      id: "_:"+id+"#subjectOf",
      organizer: {
        "@type": "Organization",
        id: "_:"+id+"#subjectOf#organizer",
        name: ''
      }
    },
    roleName: '',
    startDate: '',
    endDate: '',
    description: ''
  });
};
const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState(emptyItem());

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const onSubmit = () => {
    if (item.roleName === '') return;
    addItem(dispatch, "data.jsonld['@graph'][1].hasOccupation", item);

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
  const identifier = `data.jsonld["@graph"][1].hasOccupation[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading title={item.roleName+" "+item.subjectOf.organizer.name} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="data.jsonld['@graph'][1].hasOccupation"
          enableAction={ItemActionEnable}
        />
      </div>
    </div>
  );
};

export default WorkTab;
