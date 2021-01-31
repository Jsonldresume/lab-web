import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import { addItem } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';
import ItemHeading from '../../../shared/ItemHeading';
import AddItemButton from '../../../shared/AddItemButton';

import * as _  from 'lodash';

const ExtrasTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.extras.enable}
            onChange={v => onChange('data.extras.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.extras.heading}
            onChange={v => onChange('data.extras.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {_.get(data.jsonld["@graph"][1], 'identifier', []).map((x, index) => (
        <Item
          item={x}
          key={_.get(x, '@id', 'main')}
          index={index}
          onChange={onChange}
          dispatch={dispatch}
          first={index === 0}
          last={index === _.get(data.jsonld["@graph"][1], 'identifier', []).length - 1}
        />
      ))}

      <AddItem heading={data.extras.heading} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation('leftSidebar');

  return (
    <div>
      <TextField
        className="mb-6"
        label={t('extras.key.label')}
        placeholder="Date of Birth"
        value={_.get(item, 'propertyID', '')}
        onChange={v => onChange(`${identifier}propertyID`, v)}
      />

      <TextField
        className="mb-6"
        label={t('extras.value.label')}
        placeholder="6th August 1995"
        value={_.get(item, 'value', '')}
        onChange={v => onChange(`${identifier}value`, v)}
      />
    </div>
  );
};

const emptyItem = () => {
  let id = uuidv4();
  return ({
    "@type": "PropertyValue",
    "@id": "_:Extras_"+id,
    "propertyID": "",
    "value": ""
  });
}

const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState(emptyItem());

  const onChange = (key, value) => setItem(items => set({ ...items }, key, value));

  const onSubmit = () => {
    if (_.get(item, 'propertyID', '') === '' || _.get(item, 'value', '') === '') return;

    addItem(dispatch, 'data.jsonld["@graph"][1].identifier', item);

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

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.jsonld["@graph"][1].identifier[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading title={_.get(item, 'propertyID', '')} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="data.jsonld['@graph'][1].identifier"
        />
      </div>
    </div>
  );
};

export default ExtrasTab;
