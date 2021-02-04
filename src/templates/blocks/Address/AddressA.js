import React, { memo, useContext } from 'react';
import PageContext from '../../../context/PageContext';
import { safetyCheck } from '../../../utils';

import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const AddressItem = ({x, index, subclassName}) => (
    x && (
      <div className={subclassName}>
        <span>{x.streetAddress}</span>
        <span>&nbsp;{x.addressLocality} {x.addressRegion}</span>
        <span>&nbsp;{x.addressCountry} {x.postalCode}</span>
      </div>
    )
);
  
const AddressA = ({data, mainclassName="", hclassName="capitalize font-semibold"}, subclassName="flex flex-col text-xs") => (
    (
      data.jsonld["@graph"][1].address && data.jsonld["@graph"][1].address.length>0 &&
      data.address.enable && (
        <div className={mainclassName}>
          <h6 className={hclassName}>{_.get(data, 'profile.address.heading', "Address")}</h6>
          
          {data.jsonld["@graph"][1].address.filter(x => (Date.parse(x.hoursAvailable.validThrough) - Date.parse(new Date()))>0).map((x, index) => (<AddressItem x={x} index={index} subclassName={subclassName} key={index} />))}
        </div>
      )
    ) || ("")
);

export default memo(AddressA);
