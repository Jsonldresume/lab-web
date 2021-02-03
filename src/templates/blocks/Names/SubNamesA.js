import React, { memo, useContext } from 'react';
import PageContext from '../../../context/PageContext';
import { safetyCheck } from '../../../utils';

import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';
  
const SubnamesA = ({data}) => (
    <h6 className="text-lg tracking-wider uppercase">{(
    (_.get(data,"jsonld['@graph'][1].givenName[1]", "")) ? (" ("+_.get(data,"jsonld['@graph'][1].givenName", []).map(function(elem,index){
              if(index > 0 && elem['@value']){
                let name = elem['@value'];
                let familynameIndex = _.get(data,"jsonld['@graph'][1].familyName",[]).findIndex(x=>x['@language']===elem['@language']);
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
            }).join(", ")+")") 
            : 
            ("")
            )}
            </h6>
  );

export default memo(SubnamesA);
