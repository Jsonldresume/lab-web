import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const Jsonize = ( variable ) => {
	let jsonizedVar = variable;
	if(typeof variable === 'object' && variable !== null){
		
	}else{
		jsonizedVar = JSON.parse(variable);
	}
	return jsonizedVar;
};

const convertDate = (date) =>{
	return date;
}

const makeCap = (input) => {
	return input;
}

const mapPerson = (jsonRxResume, person) => {
	
	let firstname = _.get(jsonRxResume, 'profile["firstName"]', '');
	_.set(person, 'givenName[0]["@value"]',firstname);
	_.set(person, 'givenName[0]["@language"]','en');
	
	let additionalName = _.get(jsonRxResume, 'profile["additionalName"]', []);
	_.set(person, 'additionalName',additionalName);
	
	let lastname = _.get(jsonRxResume, 'profile["lastName"]', '');
	_.set(person, 'familyName[0]["@value"]',lastname);
	_.set(person, 'familyName[0]["@language"]','en');
	
	let honorificPrefix = _.get(jsonRxResume, 'profile["honorificPrefix"]', []);
	_.set(person, 'honorificPrefix',honorificPrefix);
	
	let birthDate = _.get(jsonRxResume, 'profile["birthDate"]', '');
	_.set(person, 'birthDate',convertDate(birthDate));
	
	let birthPlace = _.get(jsonRxResume, 'profile["birthPlace"]', {});
	_.set(person, 'birthPlace', birthPlace);
	
	let nationality = _.get(jsonRxResume, 'profile["nationality"]', []);
	_.set(person, 'nationality',nationality);
	
	let height = _.get(jsonRxResume, 'profile["height"]', {});
	_.set(person, 'height',height);
	
	
	let weight = _.get(jsonRxResume, 'profile["weight"]', {});
	_.set(person, 'weight',weight);
	
	//person.hasCredential
	let credentials = _.get(jsonRxResume, 'education', '');
	for(let i=0; i<credentials["items"].length; i++){
		
		_.set(person, 'hasCredential['+i+']["@type"]', "EducationalOccupationalCredential");
		
		let educationalLevel = _.get(credentials["items"][i], 'degree', '');
		_.set(person, 'hasCredential['+i+']["educationalLevel"]', educationalLevel);
		
		let degreeUrl = _.get(credentials["items"][i], 'degreeUrl', "_:hasCredential_"+makeCap(educationalLevel)+"_"+i);
		_.set(person, 'hasCredential['+i+']["@id"]', degreeUrl);
		
		let degree = _.get(credentials["items"][i], 'degreeType', 'degree');
		_.set(person, 'hasCredential['+i+']["credentialCategory"]',degree);
		
		let endDate = _.get(credentials["items"][i], 'end', '');
		
		let dateCreated = _.get(credentials["items"][i], 'dateGraduated', endDate);
		_.set(person, 'hasCredential['+i+']["dateCreated"]',convertDate(dateCreated));
		
		let description = _.get(credentials["items"][i], 'description', '');
		_.set(person, 'hasCredential['+i+']["abstract"]',description);
		
		let studyType = _.get(credentials["items"][i], 'studyType', '');
		_.set(person, 'hasCredential['+i+']["educationalLevel"]',studyType);
		
		let grade = _.get(credentials["items"][i], 'grade', '');
		let aggregateRating = {
			"@id": degreeUrl+"#gpa",
			"@type": "aggregateRating",
			"name": "GPA",
			"ratingValue": grade,
			"itemReviewed": {
				"@id": degreeUrl
			}
		};
		_.set(person, 'hasCredential['+i+']["aggregateRating"]',aggregateRating);
		
		//person.hasCredential.about
		let about = {
			"@id": degreeUrl+"#program",
			"@type": "EducationalOccupationalProgram"
		}
		_.set(person, 'hasCredential['+i+']["about"]', about);
		
		let startDate = _.get(credentials["items"][i], 'start', '');
		_.set(person, 'hasCredential['+i+']["about"]["startDate"]',convertDate(startDate));
		
		_.set(person, 'hasCredential['+i+']["about"]["endDate"]',convertDate(endDate));
		
		
		
	}
	
	console.log(person);
	
	
	return person;
};

const mapResume = (jsonRxResume, resume) => {
	return resume;
};

export const JsontoJsonld = ( rxResume ) => {
	let personId = uuidv4();
	let jsonRxResume = Jsonize(rxResume);
	let jsonldresume = {
		"@context": [
			"https://jsonldresume.github.io/skill/context.json",
			{
				"gender": {
					"@id": "schema:gender",
					"@type": "@vocab"
				},
				"skill:classOfAward": {
					"@id": "skill:classOfAward",
					"@type": "@vocab"
				},
				"skill:securityClearance": {
					"@id": "skill:securityClearance",
					"@type": "@vocab"
				},
				"category": {
					"@id": "schema:category",
					"@type": "@vocab"
				},
				"dayOfWeek": {
					"@id": "schema:dayOfWeek",
					"@type": "@vocab"
				}
			}
		],
		"@graph": [
		]
	};
	let resume = {
		"@type": "skill:Resume"
	};
	let person = {
		"@type": "Person"
	};
	
	resume = mapResume(jsonRxResume, resume);
	resume["@id"] = _.get(jsonRxResume+'?resume', 'profile.website', '_:'+personId+'?resume');
	
	person["@id"] = _.get(jsonRxResume, 'profile.website', '_:'+personId);
	person = mapPerson(jsonRxResume, person);
	
	jsonldresume["@graph"].push(resume);
	jsonldresume["@graph"].push(person);
	
	return jsonldresume;
};