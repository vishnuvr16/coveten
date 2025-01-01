'use client';
import React, { useState } from 'react';

// Types and Interfaces
interface Article {
    id: string;
    heading: string;
    image?: File | null;
    startAt: string;
    endAt: string;
    description: string;
    location: string;
    createdBy: string;
    registrationUrl: string;
    registrationLabel: string;
}

interface NewsContent {
    category: string;
    mainImage: File | null;
    mainHeading: string;
    mainDescription: string;
    registrationUrl: string;
    articles: Article[];
    startAt: string;
    endAt: string;
    createdBy: string;
    registrationLabel: string;
    location: string;
}

// Sample Data
const sampleCategories = [
    { id: '1', name: 'Technology' },
    { id: '2', name: 'Business' },
    { id: '3', name: 'Health' },
    { id: '4', name: 'Entertainment' }
];

interface TrendingNewsProps {
    onComplete?: () => void;
}

const TrendingNews: React.FC<TrendingNewsProps> = ({ onComplete }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [newsContents, setNewsContents] = useState<NewsContent>({
        category: '',
        mainImage: null,
        mainHeading: '',
        mainDescription: '',
        registrationUrl: '',
        registrationLabel: '',
        location: '',
        articles: [{
            id: '1',
            heading: '',
            image: null,
            startAt: '',
            endAt: '',
            description: '',
            location: '',
            createdBy: '',
            registrationUrl: '',
            registrationLabel: ''
        }],
        startAt: '',
        endAt: '',
        createdBy: ''
    });

    // Validation
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!selectedCategory) newErrors.category = 'Category is required';
        if (!newsContents.mainHeading) newErrors.mainHeading = 'Main heading is required';
        if (!newsContents.mainDescription) newErrors.mainDescription = 'Main description is required';
        if (!newsContents.location) newErrors.location = 'Location is required';

        newsContents.articles.forEach((article, index) => {
            if (!article.heading) newErrors[`article${index}heading`] = 'Article heading is required';
            if (!article.description) newErrors[`article${index}description`] = 'Article description is required';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNewsContentChange = (field: keyof NewsContent, value: any) => {
        setNewsContents(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleArticleChange = (index: number, field: keyof Article, value: any) => {
        setNewsContents(prev => ({
            ...prev,
            articles: prev.articles.map((article, i) =>
                i === index ? { ...article, [field]: value } : article
            )
        }));
    };

    const addArticle = () => {
        setNewsContents(prev => ({
            ...prev,
            articles: [...prev.articles, {
                id: Math.random().toString(),
                heading: '',
                image: null,
                startAt: '',
                endAt: '',
                description: '',
                location: '',
                createdBy: '',
                registrationUrl: '',
                registrationLabel: ''
            }]
        }));
    };

    const removeArticle = (index: number) => {
        setNewsContents(prev => ({
            ...prev,
            articles: prev.articles.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', newsContents);
            if (onComplete) onComplete();
        }
    };

    return (
        <div className="min-h-screen">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
                <div className="bg-gray-800 rounded-lg p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-indigo-400 mb-6">Create News Content</h2>

                    {/* Category Selection */}
                    <div className="mb-6">
                        <label className="block text-indigo-300 text-sm mb-2">Category*</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-lg p-3 border-2 border-gray-600 focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="">Select a Category</option>
                            {sampleCategories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    {/* Main Content Section */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-indigo-300 text-sm mb-2">Main Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        handleNewsContentChange('mainImage', e.target.files[0]);
                                    }
                                }}
                                className="w-full bg-gray-700 text-white rounded-lg p-3 border-2 border-gray-600 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-indigo-300 text-sm mb-2">Main Heading*</label>
                            <input
                                type="text"
                                value={newsContents.mainHeading}
                                onChange={(e) => handleNewsContentChange('mainHeading', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-3 border-2 border-gray-600 focus:border-indigo-500"
                                placeholder="Enter main heading"
                            />
                            {errors.mainHeading && <p className="text-red-500 text-sm mt-1">{errors.mainHeading}</p>}
                        </div>

                        {/* Articles Section */}
                        <div className="space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-indigo-400">Articles</h3>
                                <button
                                    type="button"
                                    onClick={addArticle}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Add Article
                                </button>
                            </div>

                            {newsContents.articles.map((article, index) => (
                                <div key={article.id} className="p-6 bg-gray-700 rounded-lg space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-medium text-indigo-300">Article {index + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => removeArticle(index)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={article.heading}
                                            onChange={(e) => handleArticleChange(index, 'heading', e.target.value)}
                                            placeholder="Article Heading"
                                            className="w-full bg-gray-600 text-white rounded-lg p-3 border-2 border-gray-500 focus:border-indigo-500"
                                        />
                                        <input
                                            type="text"
                                            value={article.location}
                                            onChange={(e) => handleArticleChange(index, 'location', e.target.value)}
                                            placeholder="Location"
                                            className="w-full bg-gray-600 text-white rounded-lg p-3 border-2 border-gray-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <textarea
                                        value={article.description}
                                        onChange={(e) => handleArticleChange(index, 'description', e.target.value)}
                                        placeholder="Article Description"
                                        className="w-full bg-gray-600 text-white rounded-lg p-3 border-2 border-gray-500 focus:border-indigo-500 h-32"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            Submit News Content
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TrendingNews;