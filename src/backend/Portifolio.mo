/// Import the necessary libraries:

import Principal "mo:base/Principal";
import Timer "mo:base/Timer";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";


/// Next, define the actor fort he institution platform:

actor {
  /// Define an item for the Institution: 
  type Item = {
    /// Define a title for the Institution:
    title : Text;
    /// Define a description for the Institution:
    description : Text;
    /// Define an image used as an icon for the Institution:
    image : Blob;
  };

  type PersonalProfile = {
  id : Nat64;
  firstname : Text;
  middlename : Text;
  lastname : Text;
  email : Text;
  phone_number : Text;
  date_of_birth : Text;
  gender : Text;
  country : Text;
  address : Text;
  created_by : Nat;
  };

// certificate
 type CertificateInfo = {
  id:Nat;
  description: Text;
  start_date: Text;
  end_date: Text;
  created_by:Nat;
  isued_at:Text;
  profile_id:Text;
 };

//  experience
type ExperienceInfo = {
  id:Nat;
  position:Text;
  start_date: Text;
  end_date : Text;
  created_by: Nat;
  profile_id: Text;
  short_note: Text;
};

  /// Define an institution ID to uniquely identify the institution:
  type InstitutionId = Nat;
  type ProfileId = Nat64;
  // 18446744073709551615

  /// Define an institution overview:
  type InstitutionOverview = {
    id : InstitutionId;
    /// Define the institution sold at the item:
    item : Item;
  };

  /// Define the details of the institution:
  type InstitutionDetails = {
    item : Item;
  
  };

  /// Define an internal, non-shared type for storing info about the institution:
  type Institution = {
    id : InstitutionId;
    item : Item;
 
  };

  type ProfileType = {
    profile:PersonalProfile;
  };

  /// Create a stable variable to store the institutions:
  stable var Institutions = List.nil<Institution>();
  stable var Profiles = List.nil<ProfileType>();
  /// Define a counter for generating new institution IDs.
  stable var idCounter = 0;
  stable var proileId = 00000000000000000000;

 


  /// Define a function to generating a new Institution:
  func newInstitutionId() : InstitutionId {
    let id = idCounter;
    idCounter += 1;
    id;
  };

  func newProfileId() : ProfileId {
    let pid = idCounter;
    idCounter += 1;
    Nat64.fromNat(pid);
    // Nat64.fromNat(123)
  };

  /// Define a function to register a new institution that is open for the defined duration:
  public func newInstitution(item : Item) : async () {
    let id = newInstitutionId();
 
    let newInstitution = { id; item; };
    Institutions := List.push(newInstitution, Institutions);
  };

  // define function to register profile
  // public func newProfile(profile : PersonalProfile) : async (){
  //    Profiles := List.push(profile, Profiles);
  // };

  public func newProfile(profile : PersonalProfile) : async () {
    let id = newProfileId();
     
    let newProfile = { id; profile = profile; }; // Create a ProfileType object
    Profiles := List.push(newProfile, Profiles); // Push the ProfileType object into the Profiles list
};


  /// Define a function to retrieve all institutions: 
  /// Specific institutions can be separately retrieved by `getinstitutionDetail`:
 public query func getOverviewList() : async [InstitutionOverview] {
  func getOverview(institution : Institution) : InstitutionOverview = {
    id = institution.id;
    item = institution.item;
  };
  let overviewList = List.map<Institution, InstitutionOverview>(Institutions, getOverview); // Use Institutions instead of institution
  List.toArray(overviewList); // No need to reverse the list here
};


  /// Define an internal helper function to retrieve institutions by ID: 
func findInstitution(institutionId : InstitutionId) : Institution {
  let result = List.find<Institution>(Institutions, func(inst : Institution) { inst.id == institutionId });
  switch (result) {
    case null { Debug.trap("Inexistent id"); };
    case (?institution) { institution };
  }
};


  /// Define a function to retrieve detailed info about an institution using its ID: 
public query func getInstitutionDetails(institutionId : InstitutionId) : async InstitutionDetails {
  let institution = findInstitution(institutionId);
  { item = institution.item };
};




 
};
