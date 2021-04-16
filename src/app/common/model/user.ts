export class User {
  username?: string;
  name?: string;
  nameEn?: string;
  orgName?: string;
  departmentName?: string;
  designationName?: string;
  access_token?: string;
  employeeId?: string;
  officeOid?: string;
  exp?: number;
  oid?: string;
  employeeOfficeId?: string;
  projectId?: string;
  roles?: Set<string>;
  privilege?:Set<string>
}
