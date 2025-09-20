export type SuccessStory = {
  id: string;
  name: string;
  role: string;
  story: string;
  imageId: string;
};

export const stories: SuccessStory[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Software Engineer @ Google',
    story: '"Disha Guru helped me realize my passion for coding. The structured plan for cracking technical interviews was a game-changer. From a small town to Silicon Valley, it feels surreal!"',
    imageId: 'success-1'
  },
  {
    id: '2',
    name: 'Dr. Rohan Mehra',
    role: 'Cardiologist @ AIIMS Delhi',
    story: '"The medical field is vast. The chatbot helped me narrow down my specialization to cardiology based on my interests. The guidance on preparing for NEET PG was invaluable."',
    imageId: 'success-2'
  },
  {
    id: '3',
    name: 'Aisha Khan',
    role: 'Founder & CEO, EduVate',
    story: '"I always wanted to start my own business but didn\'t know where to begin. Disha Guru provided a roadmap, connected me with mentors, and helped me build my EdTech startup from scratch."',
    imageId: 'success-3'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    role: 'IAS Officer',
    story: '"Clearing the UPSC exam requires immense dedication. The study strategies and time management techniques suggested by the platform were crucial to my preparation and success."',
    imageId: 'success-4'
  },
];
