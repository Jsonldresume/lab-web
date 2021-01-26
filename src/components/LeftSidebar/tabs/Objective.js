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

const ObjectiveTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox checked={data.objective.enable} onChange={v => onChange('data.objective.enable', v)} />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.objective.heading}
            onChange={v => onChange('data.objective.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {data.jsonld["@graph"][1].seeks && data.jsonld["@graph"][1].seeks.map((x, index) => (
        <Item
          dispatch={dispatch}
          first={index === 0}
          index={index}
          item={x}
          key={x["@id"]}
          last={index === data.jsonld["@graph"][1].seeks.length - 1}
          onChange={onChange}
        />
      ))}

      <AddItem heading={data.objective.heading} dispatch={dispatch} size={_.size(data.jsonld["@graph"][1].seeks)} />
    </>
  );
};

const Availablity = ({item, onChange}) => {
  if(!item){
    item = {};
  }
  const { t } = useTranslation(['leftSidebar', 'app']);
  return (
    <div>
      <TextField
        className="mb-6"
        label={t('address.addressLocality.label')}
        placeholder="Toronto"
        value={_.get(item,'addressLocality', '')}
        onChange={v => onChange('addressLocality', v)}
      />
      
      <div className="grid grid-cols-2 col-gap-4">
        <TextField
          className="mb-6"
          label={t('address.addressRegion.label')}
          placeholder="ON"
          value={_.get(item,'addressRegion','')}
          onChange={v => onChange('addressRegion', v)}
        />

        <TextField
          className="mb-6"
          label={t('address.addressCountry.label')}
          placeholder="Canada"
          value={_.get(item,'addressCountry','')}
          onChange={v => onChange('addressCountry', v)}
        />
      </div>
    </div>
  );
}

const Form = ({ item, onChange, identifier = '', index=0 }) => {
    
  const { t } = useTranslation(['leftSidebar', 'app']);
  const addAvailability = (value, key, availableAtOrFrom) => {
    if(value && key){
      let address = _.get(availableAtOrFrom,'address', {});
      if(!address['@type']){
        address['@type'] = "PostalAddress";
        address['@id'] = item['@id']+"_availableAtOrFrom_address";
      }
      address[key] = value;
      
      _.set(availableAtOrFrom, 'address', address);
      if(!availableAtOrFrom['@type']){
        availableAtOrFrom['@type'] = "Place";
        availableAtOrFrom['@id'] = item['@id']+"_availableAtOrFrom";
      }
      onChange(`${identifier}availableAtOrFrom`, availableAtOrFrom);
    }
  }
  
  return (
    <div>
      {(index===0) ? (<TextArea
        rows="15"
        className="mb-4"
        label={t('objective.objective.label')}
        value={_.get(item,'description', '')}
        placeholder="Looking for a challenging role in a reputable organization to utilize my technical, database, and management skills for the growth of the organization as well as to enhance my knowledge about new and emerging trends in the IT sector."
        onChange={v => onChange(`${identifier}description`, v)}
      />) : (<></>)}

      <TextField
        className="mb-6"
        label={t('objective.availabilityStarts.label')}
        placeholder="2022-01-01"
        value={_.get(item,'availabilityStarts', '')}
        onChange={v => onChange(`${identifier}availabilityStarts`, v)}
      />
      
      <TextField
        className="mb-6"
        label={t('objective.availabilityEnds.label')}
        placeholder="2022-12-01"
        item={_.get(item, 'availabilityEnds', '')}
        onChange={v => onChange(`${identifier}availabilityEnds`, v)}
      />
      
      <Availablity
        item={_.get(item, 'availableAtOrFrom.address', {})}
        onChange={(key, value) => addAvailability(value, key, item.availableAtOrFrom)}
      />
      
    </div>
  );
};

const AddItem = ({ heading, dispatch, size }) => {

  let id = "_:"+uuidv4();
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    "@id": id,
    "@type": "Demand",
    description: '',
    availabilityStarts: '',
    availabilityEnds: '',
    availableAtOrFrom: {},
    deliveryLeadTime: {}
  });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));
  const onSubmit = () => {
    let id = "_:"+uuidv4();
    if ( item.description === '' && item.availableAtOrFrom === [] ) return;

    addItem(dispatch, 'data.jsonld["@graph"][1].seeks', item);

    setItem({
      "@id": id,
      "@type": "Demand",
      description: '',
      availabilityStarts: '',
      availabilityEnds: '',
      availableAtOrFrom: {},
      deliveryLeadTime: {}
    });

    setOpen(false);
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} index={size} />

        <AddItemButton onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const ItemActionEnable = (identifier, item, onChange) => {
  
    return (
    <Checkbox
      size="2.25rem"
      checked={(item && item.availabilityEnds && (Date.parse(item.availabilityEnds) - Date.parse(new Date()))>0) }
      onChange={v => {
        let availabilityEnds = "1900-01-01";
        if(v){availabilityEnds = "2099-01-01";}
        onChange(`${identifier}availabilityEnds`, availabilityEnds);
      }}
    />
  )
}

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.jsonld["@graph"][1].seeks[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading title={item.availableAtOrFrom.address.addressCountry || (item.description.substring(0, 10)+"...")} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} index={index} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="data.jsonld['@graph'][1].seeks"
          enableAction={ItemActionEnable}
        />
      </div>
    </div>
  );
};

export default ObjectiveTab;
