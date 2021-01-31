import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import { addItem } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';
import AddItemButton from '../../../shared/AddItemButton';
import ItemHeading from '../../../shared/ItemHeading';

import * as _  from 'lodash';

const MembershipsTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="my-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={_.get(data,'Memberships.enable', true)}
            onChange={v => onChange('data.Memberships.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={_.get(data, 'Memberships.heading', '')}
            onChange={v => onChange('data.Memberships.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {_.get(data.jsonld["@graph"][1], 'memberOf', []).map((x, index) => (
        <Item
          item={x}
          key={_.get(x, '@id', 'item')}
          index={index}
          onChange={onChange}
          dispatch={dispatch}
          first={index === 0}
          last={index === _.size(_.get(data.jsonld["@graph"][1], 'memberOf', [])) - 1}
        />
      ))}

      <AddItem heading={_.get(data, 'Memberships.heading', '')} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation(['leftSidebar', 'app']);
  
  return (
    <div>
      <TextField
          className="mb-6"
          label={t('membership.programName.label')}
          placeholder="Salsa Dance Class"
          value={_.get(item, "memberOf.programName", "")}
          onChange={v => onChange(`${identifier}memberOf.programName`, v)}
      />
      
      <div className="grid grid-cols-2 col-gap-4">
        <TextField
            className="mb-6"
            label={t('membership.startDate.label')}
            placeholder="2019-01-01"
            value={_.get(item, "startDate", "")}
            onChange={v => onChange(`${identifier}startDate`, v)}
        />
      
        <TextField
            className="mb-6"
            label={t('membership.endDate.label')}
            placeholder="2020-01-01"
            value={_.get(item, "endDate", "")}
            onChange={v => onChange(`${identifier}endDate`, v)}
        />
      </div>
        <TextField
            className="mb-6"
            label={t('membership.roleName.label')}
            placeholder = "VIP member"
            value={_.get(item, "roleName", "")}
            onChange={v => onChange(`${identifier}roleName`, v)}
        />
    </div>
  );
};

const emptyItem = () => {
  let id = uuidv4();
  return (
    {
      "@id": "_:"+id+"#enable",
      "@type": "Role",
      "startDate": "",
      "endDate": "",
      "roleName": "member",
      "memberOf": {
        "@id": "_:"+id+"#memberOf",
        "@type": "ProgramMembership",
        "url": "",
        "programName": "",
        "description": ""
      }
    }
  );
};

const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState(emptyItem());
  
  const onChange = (key, value) => setItem(set({ ...item }, key, value));
  const onSubmit = () => {
    if (_.get(item, 'roleName', '') === '') return;

    addItem(dispatch, 'data.jsonld["@graph"][1].memberOf', item);

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
  const identifier = `data.jsonld['@graph'][1].memberOf[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading title={_.get(item, "memberOf.programName", "")} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="data.jsonld['@graph'][1].memberOf"
          enableAction={ItemActionEnable}
        />
      </div>
    </div>
  );
};

export default MembershipsTab;
