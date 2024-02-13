import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface InstitutionDetails { 'item' : Item }
export type InstitutionId = bigint;
export interface InstitutionOverview { 'id' : InstitutionId, 'item' : Item }
export interface Item {
  'title' : string,
  'description' : string,
  'image' : Uint8Array | number[],
}
export interface PersonalProfile {
  'id' : bigint,
  'firstname' : string,
  'country' : string,
  'created_by' : bigint,
  'email' : string,
  'middlename' : string,
  'address' : string,
  'gender' : string,
  'date_of_birth' : string,
  'phone_number' : string,
  'lastname' : string,
}
export interface _SERVICE {
  'getInstitutionDetails' : ActorMethod<[InstitutionId], InstitutionDetails>,
  'getOverviewList' : ActorMethod<[], Array<InstitutionOverview>>,
  'newInstitution' : ActorMethod<[Item], undefined>,
  'newProfile' : ActorMethod<[PersonalProfile], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
