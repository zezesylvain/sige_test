import { Student, Grade, FeeStatus } from './types';

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'S001',
    firstName: 'Lucas',
    lastName: 'Dubois',
    classGrade: '3ème B',
    email: 'lucas.d@school.edu',
    parentEmail: 'parents.dubois@email.com',
    attendanceRate: 98,
    avatarUrl: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: 'S002',
    firstName: 'Emma',
    lastName: 'Martin',
    classGrade: '3ème B',
    email: 'emma.m@school.edu',
    parentEmail: 'parents.martin@email.com',
    attendanceRate: 92,
    avatarUrl: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: 'S003',
    firstName: 'Gabriel',
    lastName: 'Bernard',
    classGrade: '4ème A',
    email: 'gabriel.b@school.edu',
    parentEmail: 'parents.bernard@email.com',
    attendanceRate: 85,
    avatarUrl: 'https://picsum.photos/200/200?random=3'
  },
  {
    id: 'S004',
    firstName: 'Chloé',
    lastName: 'Petit',
    classGrade: '4ème A',
    email: 'chloe.p@school.edu',
    parentEmail: 'parents.petit@email.com',
    attendanceRate: 99,
    avatarUrl: 'https://picsum.photos/200/200?random=4'
  },
  {
    id: 'S005',
    firstName: 'Louis',
    lastName: 'Robert',
    classGrade: '3ème B',
    email: 'louis.r@school.edu',
    parentEmail: 'parents.robert@email.com',
    attendanceRate: 88,
    avatarUrl: 'https://picsum.photos/200/200?random=5'
  }
];

export const MOCK_GRADES: Grade[] = [
  { id: 'G1', studentId: 'S001', subject: 'Mathématiques', score: 18, maxScore: 20, date: '2023-10-15', type: 'Exam' },
  { id: 'G2', studentId: 'S001', subject: 'Français', score: 14, maxScore: 20, date: '2023-10-18', type: 'Homework' },
  { id: 'G3', studentId: 'S001', subject: 'Histoire', score: 16, maxScore: 20, date: '2023-10-20', type: 'Project' },
  { id: 'G4', studentId: 'S002', subject: 'Mathématiques', score: 12, maxScore: 20, date: '2023-10-15', type: 'Exam' },
  { id: 'G5', studentId: 'S002', subject: 'Français', score: 17, maxScore: 20, date: '2023-10-18', type: 'Homework' },
  { id: 'G6', studentId: 'S003', subject: 'Mathématiques', score: 9, maxScore: 20, date: '2023-10-15', type: 'Exam' },
  { id: 'G7', studentId: 'S003', subject: 'Physique', score: 11, maxScore: 20, date: '2023-10-22', type: 'Exam' },
];

export const MOCK_FEES: FeeStatus[] = [
  { id: 'F1', studentId: 'S001', studentName: 'Lucas Dubois', amount: 450, dueDate: '2023-11-01', status: 'PAID' },
  { id: 'F2', studentId: 'S002', studentName: 'Emma Martin', amount: 450, dueDate: '2023-11-01', status: 'PENDING' },
  { id: 'F3', studentId: 'S003', studentName: 'Gabriel Bernard', amount: 450, dueDate: '2023-10-01', status: 'OVERDUE' },
  { id: 'F4', studentId: 'S004', studentName: 'Chloé Petit', amount: 450, dueDate: '2023-11-01', status: 'PAID' },
];

export const TIMETABLE_DATA = [
  { time: '08:00 - 09:00', monday: 'Maths (S.101)', tuesday: 'Histoire (S.202)', wednesday: 'EPS (Gym)', thursday: 'Français (S.104)', friday: 'Anglais (S.103)' },
  { time: '09:00 - 10:00', monday: 'Physique (S.301)', tuesday: 'Anglais (S.103)', wednesday: 'EPS (Gym)', thursday: 'Maths (S.101)', friday: 'SVT (Labo)' },
  { time: '10:00 - 10:15', monday: 'PAUSE', tuesday: 'PAUSE', wednesday: 'PAUSE', thursday: 'PAUSE', friday: 'PAUSE' },
  { time: '10:15 - 11:15', monday: 'Français (S.104)', tuesday: 'Maths (S.101)', wednesday: 'Techno (S.001)', thursday: 'Histoire (S.202)', friday: 'Physique (S.301)' },
  { time: '11:15 - 12:15', monday: 'Anglais (S.103)', tuesday: 'Espagnol (S.105)', wednesday: 'Techno (S.001)', thursday: 'SVT (Labo)', friday: 'Maths (S.101)' },
];
