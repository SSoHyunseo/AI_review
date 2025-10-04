// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
// import { Textarea } from './components/ui/textarea';
// import { Button } from './components/ui/button';
// import { Input } from './components/ui/input';
// import { Label } from './components/ui/label';

// // shadcn/ui components (simplified for this example)
// const components = {
//   Card, CardContent, CardDescription, CardHeader, CardTitle,
//   Textarea,
//   Button,
//   Input,
//   Label,
// };

// // --- API Calls (Mock) ---
// const mockAnalyzeReview = async (text) => {
//   console.log("Analyzing review:", text);
//   return new Promise(resolve => setTimeout(() => {
//     resolve({
//       "입력 리뷰": text,
//       "분석 결과": "긍정",
//       "광고성 리뷰 가능성": "낮음",
//       "핵심 키워드": ["아주 좋아요", "만족스러운", "따뜻하게"],
//       "감정 분석": "매우 긍정적입니다."
//     });
//   }, 1500));
// };

// const mockSubmitQuestion = async (question) => {
//   console.log("Submitting question:", question);
//   return new Promise(resolve => setTimeout(() => {
//     resolve(question);
//   }, 1000));
// };

// // --- Layout & Components ---
// const Header = ({ onToggleSidebar }) => {
//   return (
//     <header className="flex items-center justify-between h-16 px-4 bg-gray-50 shadow-md">
//       <Link to="/" className="text-2xl font-bold font-['Playfair_Display'] text-black">re:view</Link>
//       <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden text-black">
//         <Menu className="h-6 w-6" />
//       </Button>
//       <nav className="hidden lg:flex items-center space-x-6 text-black">
//         <Link to="/" className="text-lg font-['IBM_Plex_Sans_KR'] hover:text-blue-600 transition-colors">상품 비교하기</Link>
//         <Link to="/contact" className="text-lg font-['IBM_Plex_Sans_KR'] hover:text-blue-600 transition-colors">문의하기</Link>
//         <Link to="/about" className="text-lg font-['IBM_Plex_Sans_KR'] hover:text-blue-600 transition-colors">About Us</Link>
//       </nav>
//     </header>
//   );
// };

// const Sidebar = ({ isOpen, onToggleSidebar }) => {
//   return (
//     <nav className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-800 text-white p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
//       <div className="flex justify-between items-center mb-8">
//         <span className="text-2xl font-bold">re:view</span>
//         <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="text-white">
//           <X className="h-6 w-6" />
//         </Button>
//       </div>
//       <ul className="space-y-4 font-['IBM_Plex_Sans_KR']">
//         <li>
//           <Link to="/" className="block text-lg hover:text-gray-300 transition-colors" onClick={onToggleSidebar}>상품 비교하기</Link>
//         </li>
//         <li>
//           <Link to="/contact" className="block text-lg hover:text-gray-300 transition-colors" onClick={onToggleSidebar}>문의하기</Link>
//         </li>
//         <li>
//           <Link to="/about" className="block text-lg hover:text-gray-300 transition-colors" onClick={onToggleSidebar}>About Us</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// // --- Pages ---
// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-gray-800 text-white text-center font-['Playfair_Display'] p-4" style={{ backgroundImage: `url('hero.jpg')`, backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
//       <p className="text-xl md:text-2xl lg:text-3xl font-['IBM_Plex_Sans_KR'] mb-2">WELCOME TO</p>
//       <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4">re:view</h1>
//       <p className="text-lg md:text-xl lg:text-2xl font-['IBM_Plex_Sans_KR'] max-w-2xl mx-auto">
//         AI 기반 리뷰 분석 플랫폼으로, 광고성 리뷰와 진짜 사용자의 리뷰를 구분하여 현명한 소비를 돕습니다.
//       </p>
//       <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//         <Button className="bg-white text-black hover:bg-gray-200 transition-colors" onClick={() => navigate('/main')}>
//           서비스 시작하기
//         </Button>
//         <Button className="bg-white text-black hover:bg-gray-200 transition-colors" onClick={() => navigate('/about')}>
//           자세히 알아보기
//         </Button>
//       </div>
//     </div>
//   );
// };

// const MainPage = () => {
//   const [review, setReview] = useState('');
//   const [result, setResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleAnalyze = async () => {
//     if (!review.trim()) {
//       alert("리뷰를 입력해주세요!");
//       return;
//     }
//     setIsLoading(true);
//     const data = await mockAnalyzeReview(review);
//     setResult(data);
//     setIsLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50 text-black">
//       <Header onToggleSidebar={() => { }} />
//       <main className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl mt-8">
//         <h1 className="text-3xl font-bold text-center mb-6 font-['Playfair_Display']">상품 리뷰 분석</h1>
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <Textarea
//             placeholder="리뷰를 입력해 주세요..."
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             className="flex-1 min-h-[150px] p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
//           />
//           <Button onClick={handleAnalyze} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-['IBM_Plex_Sans_KR'] font-bold py-3 px-6 rounded-lg shadow-md">
//             {isLoading ? '분석 중...' : '검색'}
//           </Button>
//         </div>
//         {result && (
//           <div id="result" className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner">
//             <h3 className="text-2xl font-semibold mb-4 font-['Playfair_Display']">분석 결과</h3>
//             <p className="mb-2 font-['IBM_Plex_Sans_KR']">
//               <strong>입력 리뷰:</strong> {result["입력 리뷰"]}
//             </p>
//             <p className="mb-2 font-['IBM_Plex_Sans_KR']">
//               <strong>분석 결과:</strong> <span className="text-green-600 font-bold">{result["분석 결과"]}</span>
//             </p>
//             <p className="mb-2 font-['IBM_Plex_Sans_KR']">
//               <strong>광고성 리뷰 가능성:</strong> {result["광고성 리뷰 가능성"]}
//             </p>
//             <p className="font-['IBM_Plex_Sans_KR']">
//               <strong>핵심 키워드:</strong> {result["핵심 키워드"].join(', ')}
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// const AboutPage = () => {
//   return (
//     <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50 text-black">
//       <Header onToggleSidebar={() => { }} />
//       <main className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl mt-8 text-center">
//         <h1 className="text-4xl font-bold mb-4 font-['Playfair_Display']">About Us</h1>
//         <p className="text-lg mb-2 font-['IBM_Plex_Sans_KR']">
//           우리는 "신뢰할 수 있는 소비"를 꿈꾸는 개발자들입니다.
//         </p>
//         <p className="text-xl leading-relaxed font-['IBM_Plex_Sans_KR'] max-w-2xl mx-auto">
//           <strong className="text-blue-600">re:view</strong>는 AI 기반 리뷰 분석 플랫폼으로, 광고성 리뷰와 진짜 사용자의 리뷰를 구분하여 소비자가 더 똑똑하게 선택할 수 있도록 돕는 서비스입니다.
//           문장 유사도 분석, 키워드 시각화, 감정 분석 등을 통해 한눈에 리뷰의 신뢰도를 파악할 수 있습니다.
//         </p>
//       </main>
//     </div>
//   );
// };

// const ContactPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [name, setName] = useState('');
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !title || !content) {
//       alert("모든 필드를 입력해주세요.");
//       return;
//     }
//     setIsLoading(true);
//     const newQuestion = { name, title, content };
//     await mockSubmitQuestion(newQuestion);
//     setQuestions([...questions, newQuestion]);
//     setName('');
//     setTitle('');
//     setContent('');
//     setIsLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50 text-black">
//       <Header onToggleSidebar={() => { }} />
//       <main className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl mt-8">
//         <h1 className="text-3xl font-bold text-center mb-6 font-['Playfair_Display']">문의하기</h1>
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="font-['IBM_Plex_Sans_KR']">문의 등록</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form id="questionForm" onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <Label htmlFor="name" className="font-['IBM_Plex_Sans_KR']">이름</Label>
//                 <Input id="name" type="text" placeholder="이름을 입력해주세요." value={name} onChange={(e) => setName(e.target.value)} />
//               </div>
//               <div>
//                 <Label htmlFor="title" className="font-['IBM_Plex_Sans_KR']">제목</Label>
//                 <Input id="title" type="text" placeholder="제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
//               </div>
//               <div>
//                 <Label htmlFor="content" className="font-['IBM_Plex_Sans_KR']">내용</Label>
//                 <Textarea id="content" placeholder="문의 내용을 입력해주세요." value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[100px]" />
//               </div>
//               <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-['IBM_Plex_Sans_KR'] font-bold py-3 rounded-lg shadow-md">
//                 {isLoading ? '등록 중...' : '등록하기'}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <div id="questionList" className="mt-8">
//           <h2 className="text-2xl font-bold mb-4 font-['Playfair_Display']">문의 목록</h2>
//           {questions.length > 0 ? (
//             <div className="space-y-4">
//               {questions.map((q, index) => (
//                 <Card key={index}>
//                   <CardHeader>
//                     <CardTitle className="font-['IBM_Plex_Sans_KR']">
//                       {index + 1}. {q.title} <span className="font-normal text-gray-500">({q.name})</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="bg-gray-50 p-4 rounded-b-lg">
//                     <p className="font-['IBM_Plex_Sans_KR']">{q.content}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 font-['IBM_Plex_Sans_KR']">아직 등록된 문의가 없습니다.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <Header onToggleSidebar={toggleSidebar} />
//         <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
//         <div className="flex-1 overflow-auto">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/main" element={<MainPage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
