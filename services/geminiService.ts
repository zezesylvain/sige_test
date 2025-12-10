import { GoogleGenAI } from "@google/genai";
import { Grade, Student } from "../types";

// Initialize Gemini
// Note: process.env.API_KEY must be set in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateReportCardComment = async (
  student: Student,
  grades: Grade[]
): Promise<string> => {
  try {
    const studentGrades = grades.filter(g => g.studentId === student.id);
    
    // Prepare a structured prompt
    const prompt = `
      Agis comme un professeur principal expérimenté et bienveillant dans une école française.
      Rédige une appréciation trimestrielle courte (environ 30-50 mots) pour le bulletin scolaire de l'élève suivant :
      
      Nom : ${student.firstName} ${student.lastName}
      Classe : ${student.classGrade}
      Taux de présence : ${student.attendanceRate}%
      
      Notes obtenues (Note/Total) :
      ${studentGrades.map(g => `- ${g.subject}: ${g.score}/${g.maxScore} (${g.type})`).join('\n')}
      
      Consignes :
      - Sois constructif et encourageant.
      - Mentionne les points forts.
      - Suggère des axes d'amélioration si nécessaire.
      - Ne signe pas le commentaire.
      - Réponds uniquement avec le texte de l'appréciation.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Impossible de générer le commentaire pour le moment.";
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "Erreur lors de la génération de l'appréciation. Veuillez vérifier votre clé API ou réessayer plus tard.";
  }
};

export const analyzeClassPerformance = async (
  grades: Grade[]
): Promise<string> => {
    try {
        const prompt = `
            Analyse les notes suivantes d'une classe et donne-moi une synthèse pédagogique en 3 points clés (Points forts, Points faibles, Recommandations).
            Formatte la réponse en HTML simple (sans balises body/head, juste <ul> <li> <strong> etc).
            
            Données brutes :
            ${JSON.stringify(grades.map(g => ({ subject: g.subject, score: g.score })))}
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Analyse indisponible.";
    } catch (error) {
        console.error("Erreur Gemini:", error);
        return "Erreur lors de l'analyse.";
    }
}
