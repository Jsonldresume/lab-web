import set from 'lodash/set';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '../../../context/AppContext';
import AddItemButton from '../../../shared/AddItemButton';
import Checkbox from '../../../shared/Checkbox';
import ItemActions from '../../../shared/ItemActions';
import ItemHeading from '../../../shared/ItemHeading';
import TextField from '../../../shared/TextField';
import { addItem } from '../../../utils';

import * as _  from 'lodash';

const LanguagesTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  useEffect(() => {
    if (!('languages' in data)) {
      dispatch({
        type: 'migrate_section',
        payload: {
          key: 'languages',
          value: {
            enable: false,
            heading: 'Languages'
          },
        },
      });

      dispatch({ type: 'save_data' });
    }
  }, [data, dispatch]);

  return (
    'languages' in data && (
      <>
        <div className="mb-6 grid grid-cols-6 items-center">
          <div className="col-span-1">
            <Checkbox
              checked={data.languages.enable}
              onChange={v => onChange('data.languages.enable', v)}
            />
          </div>
          <div className="col-span-5">
            <TextField
              placeholder="Heading"
              value={data.languages.heading}
              onChange={v => onChange('data.languages.heading', v)}
            />
          </div>
        </div>

        <hr className="my-6" />

        {_.get(data.jsonld["@graph"][1], 'knowsLanguage', []).map((x, index) => (
          <Item
            item={x}
            key={_.get(x,'@id', 'item')}
            index={index}
            onChange={onChange}
            dispatch={dispatch}
            first={index === 0}
            last={index === _.size(_.get(data.jsonld["@graph"][1], 'knowsLanguage', [])) - 1}
          />
        ))}

        <AddItem heading={data.languages.heading} dispatch={dispatch} />
      </>
    )
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation('leftSidebar');

  return (
    <div>
      <TextField
        className="mb-6"
        label={t('languages.key.label')}
        placeholder="English"
        value={_.get(item,'name', '')}
        onChange={v => onChange(`${identifier}name`, v)}
      />
    </div>
  );
};

const emptyItem = () => {
  let id = uuidv4();
  return ({
    "@type": "Language",
    "@id": "_:"+id,
    "name": ""
  });
}
const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  
  const [item, setItem] = useState(emptyItem());

  const onChange = (key, value) => setItem(items => set({ ...items }, key, value));

  const onSubmit = () => {
    if (_.get(item, 'name', '') === '') return;

    addItem(dispatch, 'data.jsonld["@graph"][1].knowsLanguage', item);

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
  const identifier = `data.jsonld["@graph"][1].knowsLanguage[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading title={_.get(item, 'name', '')} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="data.jsonld['@graph'][1].knowsLanguage"
        />
      </div>
    </div>
  );
};

export default LanguagesTab;
