import React, { useState } from 'react';
import { Brain, Star, CheckCircle, Loader2 } from 'lucide-react';
import { MOCK_GRADES, MOCK_STUDENTS } from '../constants';
import { generateReportCardComment, analyzeClassPerformance } from '../services/geminiService';

const Grades = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [aiComment, setAiComment] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [classAnalysis, setClassAnalysis] = useState<string | null>(null);
  const [isAnalyzingClass, setIsAnalyzingClass] = useState(false);

  const selectedStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId);
  
  const handleGenerateComment = async (studentId: string) => {
    const student = MOCK_STUDENTS.find(s => s.id === studentId);
    if (!student) return;

    setIsLoadingAi(true);
    setAiComment(null);
    const comment = await generateReportCardComment(student, MOCK_GRADES);
    setAiComment(comment);
    setIsLoadingAi(false);
  };

  const handleAnalyzeClass = async () => {
      setIsAnalyzingClass(true);
      const result = await analyzeClassPerformance(MOCK_GRADES);
      setClassAnalysis(result);
      setIsAnalyzingClass(false);
  }

  return (
    <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
            <h2 className="text-xl font-bold text-gray-900">Gestion des Notes</h2>
            <p className="text-gray-500 text-sm">Vue d'ensemble des résultats et outils IA</p>
        </div>
        <button 
            onClick={handleAnalyzeClass}
            disabled={isAnalyzingClass}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
            {isAnalyzingClass ? <Loader2 className="animate-spin" size={18}/> : <Brain size={18} />}
            Analyser la performance de la classe (IA)
        </button>
      </div>

      {classAnalysis && (
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl animate-fade-in">
              <h3 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                  <Brain size={20} className="text-indigo-600"/> Synthèse Pédagogique (IA)
              </h3>
              <div 
                className="text-indigo-800 text-sm leading-relaxed prose prose-indigo max-w-none"
                dangerouslySetInnerHTML={{ __html: classAnalysis }}
              />
              <button onClick={() => setClassAnalysis(null)} className="text-xs text-indigo-500 mt-4 hover:underline">Fermer l'analyse</button>
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List for Grading */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
          <div className="p-4 border-b border-gray-100 font-medium text-gray-700">
            Relevé de notes récent
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Élève</th>
                <th className="px-4 py-3 text-left">Matière</th>
                <th className="px-4 py-3 text-left">Note</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_GRADES.map((grade) => {
                const student = MOCK_STUDENTS.find(s => s.id === grade.studentId);
                return (
                  <tr key={grade.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{student?.firstName} {student?.lastName}</td>
                    <td className="px-4 py-3 text-gray-600">{grade.subject}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${grade.score >= 15 ? 'bg-green-100 text-green-700' : grade.score >= 10 ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
                        {grade.score}/{grade.maxScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{grade.type}</td>
                    <td className="px-4 py-3 text-right">
                        <button 
                            onClick={() => {
                                setSelectedStudentId(student?.id || null);
                                setAiComment(null);
                            }}
                            className="text-brand-600 hover:bg-brand-50 p-2 rounded-lg text-xs font-medium"
                        >
                            Détails
                        </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* AI Assistant Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Star className="text-yellow-400 fill-current" size={20}/>
                    Assistant Bulletin
                </h3>
                <p className="text-gray-500 text-xs mt-1">Sélectionnez un élève pour générer une appréciation automatique.</p>
            </div>

            {selectedStudent ? (
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                        <img src={selectedStudent.avatarUrl} className="w-10 h-10 rounded-full" alt="" />
                        <div>
                            <p className="font-bold text-gray-900">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                            <p className="text-xs text-gray-500">{selectedStudent.classGrade}</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => handleGenerateComment(selectedStudent.id)}
                        disabled={isLoadingAi}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 rounded-lg text-sm font-medium shadow-sm transition-all flex justify-center items-center gap-2 mb-4 disabled:opacity-70"
                    >
                        {isLoadingAi ? <Loader2 className="animate-spin" size={16}/> : <Brain size={16}/>}
                        Générer Appréciation IA
                    </button>

                    {aiComment && (
                        <div className="bg-purple-50 border border-purple-100 p-4 rounded-lg flex-1 relative animate-in fade-in zoom-in duration-300">
                             <h4 className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-2">Suggestion IA</h4>
                             <p className="text-gray-800 text-sm italic leading-relaxed">
                                 "{aiComment}"
                             </p>
                             <div className="mt-4 flex justify-end gap-2">
                                 <button className="text-xs text-gray-500 hover:text-gray-800">Copier</button>
                                 <button className="text-xs text-purple-700 font-medium hover:text-purple-900 flex items-center gap-1">
                                     <CheckCircle size={12}/> Utiliser
                                 </button>
                             </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm text-center border-2 border-dashed border-gray-100 rounded-lg">
                    Sélectionnez un élève dans la liste à gauche.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Grades;