export const idlFactory = ({ IDL }) => {
  const InstitutionId = IDL.Nat;
  const Item = IDL.Record({
    'title' : IDL.Text,
    'description' : IDL.Text,
    'image' : IDL.Vec(IDL.Nat8),
  });
  const InstitutionDetails = IDL.Record({ 'item' : Item });
  const InstitutionOverview = IDL.Record({
    'id' : InstitutionId,
    'item' : Item,
  });
  const PersonalProfile = IDL.Record({
    'id' : IDL.Nat64,
    'firstname' : IDL.Text,
    'country' : IDL.Text,
    'created_by' : IDL.Nat,
    'email' : IDL.Text,
    'middlename' : IDL.Text,
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'date_of_birth' : IDL.Text,
    'phone_number' : IDL.Text,
    'lastname' : IDL.Text,
  });
  return IDL.Service({
    'getInstitutionDetails' : IDL.Func(
        [InstitutionId],
        [InstitutionDetails],
        ['query'],
      ),
    'getOverviewList' : IDL.Func([], [IDL.Vec(InstitutionOverview)], ['query']),
    'newInstitution' : IDL.Func([Item], [], []),
    'newProfile' : IDL.Func([PersonalProfile], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
