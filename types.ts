export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  classGrade: string; // e.g., "5ème A"
  email: string;
  parentEmail: string;
  attendanceRate: number;
  avatarUrl: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  maxScore: number;
  date: string;
  type: 'Homework' | 'Exam' | 'Project';
}

export interface FeeStatus {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
}

export type ViewState = 'DASHBOARD' | 'STUDENTS' | 'GRADES' | 'FEES' | 'TIMETABLE' | 'ATTENDANCE';
