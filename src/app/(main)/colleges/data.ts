export type College = {
  id: string;
  name: string;
  location: string;
  description: string;
  programs: string[];
  placements: string;
  cutoffs: string;
  imageId: string;
};

export const colleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Bombay (IITB)',
    location: 'Mumbai, Maharashtra',
    description: 'A leading public technical and research university, renowned for its engineering and technology programs.',
    programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Aerospace Engineering'],
    placements: 'Average package of ₹21.82 LPA (2023)',
    cutoffs: 'JEE Advanced Rank < 2000 for most branches',
    imageId: 'college-1'
  },
  {
    id: '2',
    name: 'Indian Institute of Technology Delhi (IITD)',
    location: 'New Delhi, Delhi',
    description: 'Globally acclaimed for its excellence in training, research, and innovation in science, engineering, and technology.',
    programs: ['Computer Science', 'Textile Technology', 'Biochemical Engineering', 'Civil Engineering'],
    placements: 'Average package of ₹25.82 LPA (2023)',
    cutoffs: 'JEE Advanced Rank < 3000 for most branches',
    imageId: 'college-2'
  },
  {
    id: '3',
    name: 'Indian Institute of Management Ahmedabad (IIMA)',
    location: 'Ahmedabad, Gujarat',
    description: 'A premier business school in India, known for its Post Graduate Program in Management.',
    programs: ['PGP in Management', 'PGP in Food & Agri-Business Management', 'ePGD in Advanced Business Analytics'],
    placements: 'Average domestic package of ₹34.36 LPA (2023)',
    cutoffs: 'CAT Percentile > 99%',
    imageId: 'college-3'
  },
  {
    id: '4',
    name: 'All India Institute of Medical Sciences (AIIMS)',
    location: 'New Delhi, Delhi',
    description: 'A globally recognized medical college and medical research public university.',
    programs: ['MBBS', 'B.Sc. Nursing', 'MD/MS', 'M.Ch'],
    placements: 'High demand in top hospitals in India and abroad.',
    cutoffs: 'NEET UG Rank < 100 for General category',
    imageId: 'college-4'
  },
  {
    id: '5',
    name: 'University of Delhi (DU)',
    location: 'New Delhi, Delhi',
    description: 'A premier university of the country with a venerable legacy and international acclaim for highest academic standards.',
    programs: ['B.Com (Hons)', 'B.A. (Hons) English', 'B.Sc. (Hons) Physics', 'B.A. Political Science'],
    placements: 'Varies by college and course, with top colleges having excellent placement records.',
    cutoffs: 'Based on CUET scores, highly competitive for top colleges.',
    imageId: 'college-5'
  },
  {
    id: '6',
    name: 'Jawaharlal Nehru University (JNU)',
    location: 'New Delhi, Delhi',
    description: 'Known for its leading faculties and research emphasis on liberal arts and applied sciences.',
    programs: ['M.A. in International Relations', 'M.Sc. in Life Sciences', 'Ph.D. programs', 'B.A. (Hons) in Foreign Languages'],
    placements: 'Strong focus on academia, research, and civil services.',
    cutoffs: 'Based on CUET scores, extremely competitive.',
    imageId: 'college-6'
  },
];
