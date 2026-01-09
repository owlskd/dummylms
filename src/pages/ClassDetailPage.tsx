import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Bookmark,
    Share2,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    LayoutGrid,
    FileText,
    FolderOpen,
    HelpCircle,
    Check,
    Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

// Sample course data
const courseData = {
    title: "React for Beginners – Build your first web app",
    level: "Beginner",
    lessonsCount: 12,
    duration: "3h 45min",
    progress: 75,
    currentLesson: 3,
    lessons: [
        { id: 1, title: "Introduction to React", duration: "5:12", progress: 100 },
        { id: 2, title: "How React Works", duration: "8:24", progress: 100 },
        { id: 3, title: "What is a Component?", duration: "11:02", progress: 75 },
        { id: 4, title: "JSX Basics & Syntax", duration: "14:32", progress: 0 },
        { id: 5, title: "Quiz – Module Fundamentals", duration: "17:56", progress: 0 },
        { id: 6, title: "Reusable Components", duration: "23:12", progress: 0 },
        { id: 7, title: "Props in react", duration: "31:02", progress: 0 },
    ],
    lessonRecap: `In this lesson, we explored the fundamental building blocks of React: **Components**. We learned that components are independent and reusable bits of code. They serve the same purpose as JavaScript functions but work in isolation and return HTML.`,
    keyConcepts: [
        "How to create and export a functional component",
        "Understanding JSX (JavaScript XML) syntax rules",
        "Common errors beginners face (e.g., adjacent JSX elements)",
        "Rendering components inside other components"
    ]
};

// Circular Progress Component
const CircularProgress = ({ progress, size = 60, strokeWidth = 6 }: { progress: number; size?: number; strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-gray-200"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-emerald-500 transition-all duration-500"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-600">{progress}%</span>
            </div>
        </div>
    );
};

// Small Progress Badge
const ProgressBadge = ({ progress }: { progress: number }) => {
    if (progress === 100) {
        return (
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-xs font-bold text-white">100%</span>
            </div>
        );
    }
    if (progress > 0) {
        return (
            <div className="relative w-10 h-10">
                <svg className="transform -rotate-90" width="40" height="40">
                    <circle
                        className="text-gray-200"
                        strokeWidth={3}
                        stroke="currentColor"
                        fill="transparent"
                        r={16}
                        cx={20}
                        cy={20}
                    />
                    <circle
                        className="text-blue-500"
                        strokeWidth={3}
                        strokeDasharray={100}
                        strokeDashoffset={100 - progress}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={16}
                        cx={20}
                        cy={20}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-blue-600">{progress}%</span>
                </div>
            </div>
        );
    }
    return (
        <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-400">0%</span>
        </div>
    );
};

// Tab Button Component
const TabButton = ({ active, icon: Icon, label, onClick }: { active: boolean; icon: React.ElementType; label: string; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${active
            ? 'bg-blue-50 text-blue-600 border border-blue-200'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
    >
        <Icon size={16} />
        {label}
    </button>
);

// Key Concept Card
const KeyConceptCard = ({ text }: { text: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mt-0.5">
                <Check size={14} className="text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
        </div>
    </motion.div>
);

// Lesson Item Component
const LessonItem = ({ lesson, index, isActive }: { lesson: typeof courseData.lessons[0]; index: number; isActive: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${isActive
            ? 'bg-blue-50 border border-blue-200'
            : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm'
            }`}
    >
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
            {index + 1}
        </div>
        <div className="flex-1 min-w-0">
            <h4 className={`font-medium truncate ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                {lesson.title}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">{lesson.duration}</p>
        </div>
        <ProgressBadge progress={lesson.progress} />
    </motion.div>
);

// Video Player Component - YouTube Embed yang bisa diklik
const VideoPlayer = () => {
    return (
        <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* YouTube Video Embed - tanpa overlay agar bisa diklik */}
            <iframe
                src="https://www.youtube.com/embed/lt-hAsZ4bBE?si=h9jbKlmCELFvEzYD"
                title="YouTube video player"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
};

export default function ClassDetailPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('summary');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-medium">Back</span>
                        </button>
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <Bookmark size={18} className="text-gray-600" />
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                                <Share2 size={16} />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Course Title & Meta */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        {courseData.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            {courseData.level}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FileText size={14} />
                            {courseData.lessonsCount} Lessons
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {courseData.duration}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Video & Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        <VideoPlayer />

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2">
                            <TabButton
                                active={activeTab === 'summary'}
                                icon={LayoutGrid}
                                label="Summary"
                                onClick={() => setActiveTab('summary')}
                            />
                            <TabButton
                                active={activeTab === 'files'}
                                icon={FileText}
                                label="Files"
                                onClick={() => setActiveTab('files')}
                            />
                            <TabButton
                                active={activeTab === 'resources'}
                                icon={FolderOpen}
                                label="Resources"
                                onClick={() => setActiveTab('resources')}
                            />
                            <TabButton
                                active={activeTab === 'qa'}
                                icon={HelpCircle}
                                label="Q&A"
                                onClick={() => setActiveTab('qa')}
                            />
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'summary' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {/* Lesson Recap */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Lesson Recap</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        In this lesson, we explored the fundamental building blocks of React: <strong>Components</strong>. We learned that components are independent and reusable bits of code. They serve the same purpose as JavaScript functions but work in isolation and return HTML.
                                    </p>
                                </div>

                                {/* Key Concepts */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Key Concepts</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {courseData.keyConcepts.map((concept, index) => (
                                            <KeyConceptCard key={index} text={concept} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'files' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Files</h3>
                                <p className="text-gray-500">No files available for this lesson.</p>
                            </motion.div>
                        )}

                        {activeTab === 'resources' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
                                <p className="text-gray-500">No resources available for this lesson.</p>
                            </motion.div>
                        )}

                        {activeTab === 'qa' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Questions & Answers</h3>
                                <p className="text-gray-500">No questions yet. Be the first to ask!</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Study Progress Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <CircularProgress progress={courseData.progress} size={64} strokeWidth={6} />
                                <div>
                                    <h3 className="font-bold text-gray-900">Study Progress</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Track your learning milestones and where you left off.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Course Content */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Course Content</h3>
                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {courseData.lessons.map((lesson, index) => (
                                    <LessonItem
                                        key={lesson.id}
                                        lesson={lesson}
                                        index={index}
                                        isActive={index + 1 === courseData.currentLesson}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Custom Scrollbar Styles */}
            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
        </div>
    );
}