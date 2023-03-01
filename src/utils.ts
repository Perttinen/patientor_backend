import { NewPatient, Gender, NewEntry, HealthCheckRating, Diagnosis } from "./types";

export const toNewEntry = (obj:unknown): NewEntry => {
	try{
	if(!obj || typeof obj !== 'object'){
    throw new Error('incorrect or missing data');
  }
  if('type' in obj && 
			'description' in obj &&
			'date' in obj &&
			'specialist' in obj){
		if(obj.type === 'HealthCheck' && 'healthCheckRating' in obj){
			let healthEntry: NewEntry = {
				type: obj.type,
				description: parseDescription(obj.description),
				date: parseDate(obj.date),
				specialist: parseSpecialist(obj.specialist),
				healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
			};
			if('diagnosisCodes' in obj){
				healthEntry = {...healthEntry,diagnosisCodes: parseDiagnosisCodes( obj.diagnosisCodes)};
			}
			return healthEntry;
		}
		if(obj.type === 'OccupationalHealthcare' && 'employerName' in obj){
			let occuEntry: NewEntry = {
				type: obj.type,
				description: parseDescription(obj.description),
				date: parseDate(obj.date),
				specialist: parseSpecialist(obj.specialist),
				employerName: parseEmployer(obj.employerName)
			};
			if('sickLeave' in obj){
					occuEntry = {...occuEntry, sickLeave: parseSickLeave(obj.sickLeave)};
				}
			return occuEntry;
		}
		if(obj.type === 'Hospital' && 'discharge' in obj){
			const hospitalEntry: NewEntry = {
				type: obj.type,
				description: parseDescription(obj.description),
				date: parseDate(obj.date),
				specialist: parseSpecialist(obj.specialist),
				discharge: parseDischarge(obj.discharge)
			};
			return hospitalEntry;
		}
  }
}catch(error){
	if(error instanceof Error && error.message){
		throw new Error(error.message);
	}
}
	throw new Error('Incorrect data: missing or malformatted field');
};

const parseEmployer = (name: unknown): string => {
  if (!isString(name) || name === '') {
    throw new Error('Incorrect or missing employer');
  }
  return name;
};

const parseDischarge = (discharge: unknown):{date:string, criteria:string} => {
	if(discharge &&
		typeof discharge === 'object'
		&& 'date' in discharge
		&& 'criteria' in discharge
		&& isString(discharge.date)
		&& isString(discharge.criteria)
		&& discharge.date !== ''
		&& discharge.criteria !== ''){
		return {date: discharge.date, criteria: discharge.criteria};
	}
	throw new Error('Incorrect discharge');
};

const parseSickLeave = (leave: unknown): {startDate: string, endDate: string} => {
	if(
		typeof leave === 'object' &&
		leave !== null &&
		'endDate' in leave &&
		'startDate' in leave &&		
		isString(leave.startDate) &&
		isString(leave.endDate)){
		return {startDate: leave.startDate, endDate: leave.endDate};
	}
	throw new Error('Incorrect sickleave');
};

const parseDiagnosisCodes = (codes: unknown):Array<Diagnosis['code']> => {
	if(Array.isArray(codes) && codes.every(c => typeof c === 'string')){
		return codes as Array<Diagnosis['code']>;
	}
	throw new Error('Incorrect diagnosiscodes');
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || description === '') {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!isString(specialist) || specialist === '') {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
	if(typeof rating === 'number' && (rating in Object.values(HealthCheckRating).filter(v => !isNaN(Number(v))))){
		return rating;
	}
	throw new Error('Incorrect healthcheckrating');
	
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!isString(name) || name === '') {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
	if(!isString(ssn) || ssn.length > 11 || ssn.length < 10 || !ssn.includes('-')){
		throw new Error('malformatted or missing ssn');
	}
	return ssn;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if(!isString(gender) || !isGender(gender)){
		throw new Error('Incorrect gender');
	}
	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if(!isString(occupation)){
		throw new Error('incorrect or missing occupation');
	}
	return occupation;
};

export const toNewPatient = (obj: unknown):NewPatient => {
	if(!obj || typeof obj !== 'object'){
    throw new Error('incorrect or missing data');
  }
  if('name' in obj &&
			'dateOfBirth' in obj &&
			'ssn' in obj &&
			'gender' in obj &&
			'occupation' in obj){
		const newPatient: NewPatient = {
			name: parseName(obj.name),
			dateOfBirth: parseDate(obj.dateOfBirth),
			ssn: parseSsn(obj.ssn),
			gender: parseGender(obj.gender),
			occupation: parseOccupation(obj.occupation)
		};
		return newPatient;
  }
	throw new Error('Incorrect data: missing field');
};