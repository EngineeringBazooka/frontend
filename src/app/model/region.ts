
export class Region{
  constructor(data: any){
    this.id = data.id;
    this.name = data.name;
    this.ITCompany = data.ITCompany;
    this.ITVacancy = data.ITVacancy;
    this.ITworker = data.ITworker;
    this.ITgraduate = data.ITgraduate;
    this.medianZP = data.medianZP;
    this.impactITinGRP = data.impactITinGRP;
    this.result = data.result;
  }
  id: number;
  name: string;
  ITCompany: number;
  ITVacancy: number;
  ITworker: number;
  ITgraduate: number;
  medianZP: number;
  impactITinGRP: number;
  result: boolean;
}
