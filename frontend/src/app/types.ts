export interface NdaFormData {
  party1Name: string;
  party1Address: string;
  party1City: string;
  party1State: string;
  party1Zip: string;
  party2Name: string;
  party2Address: string;
  party2City: string;
  party2State: string;
  party2Zip: string;
  effectiveDate: string;
  purpose: string;
  duration: string;
  governingState: string;
}

export const EMPTY_FORM: NdaFormData = {
  party1Name: "",
  party1Address: "",
  party1City: "",
  party1State: "",
  party1Zip: "",
  party2Name: "",
  party2Address: "",
  party2City: "",
  party2State: "",
  party2Zip: "",
  effectiveDate: "",
  purpose: "",
  duration: "",
  governingState: "",
};
