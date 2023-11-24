export type TUserName = {
  firstName: string
  lastName: string
  middleName?: string
}

export type TGuardian = {
  fatherName: string
  fatherOccupation?: string
  fatherContactNo: string
  motherName: string
  motherOccupation?: string
  motherContactNo?: string
}

export type TLocalGuardian = {
  name: string
  occupation?: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  name: TUserName
  email: string
  gender: 'male' | 'female'
  dateOfBirth?: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian?: TLocalGuardian
  isActive: 'active' | 'inactive'
  profileImg?: string
}
