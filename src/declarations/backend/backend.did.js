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
  return IDL.Service({
    'getInstitutionDetails' : IDL.Func(
        [InstitutionId],
        [InstitutionDetails],
        ['query'],
      ),
    'getOverviewList' : IDL.Func([], [IDL.Vec(InstitutionOverview)], ['query']),
    'newInstitution' : IDL.Func([Item], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
